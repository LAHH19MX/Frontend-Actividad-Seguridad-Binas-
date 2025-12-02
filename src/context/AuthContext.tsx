import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/router";
import authService from "@/services/authService";

interface User {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "CLIENTE";
  phone: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  tempToken: string | null;
  requires2FA: boolean;
  login: (email: string, password: string) => Promise<any>;
  verify2FA: (code: string) => Promise<any>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setTempToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [tempToken, setTempToken] = useState<string | null>(null);
  const [requires2FA, setRequires2FA] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar autenticación al cargar la app
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setIsLoading(true);

      // Las cookies se envían automáticamente (withCredentials: true)
      const response = await authService.getProfile();

      if (response.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return response.data.user; // Devolver usuario para uso externo
      } else {
        setUser(null);
        setIsAuthenticated(false);
        return null;
      }
    } catch (error: any) {
      // Si hay error 401, no está autenticado
      if (error.response?.status === 401) {
        setUser(null);
        setIsAuthenticated(false);
      }
      // Otros errores no cambian el estado
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });

      if (response.success && response.data?.requires2FA) {
        // Guardar tempToken para 2FA
        setTempToken(response.data.tempToken);
        setRequires2FA(true);
        return {
          requires2FA: true,
          tempToken: response.data.tempToken,
        };
      }

      // Si no requiere 2FA (raro en tu sistema), verificar auth
      await checkAuth();
      return { success: true };
    } catch (error: any) {
      throw error;
    }
  };

  const verify2FA = async (code: string) => {
    if (!tempToken) {
      throw new Error("No hay token temporal para 2FA");
    }

    try {
      const response = await authService.verify2FA({
        tempToken,
        code,
      });

      if (response.success) {
        // 1. Primero actualizar el estado local INMEDIATAMENTE
        if (response.data?.user) {
          setUser(response.data.user);
          setIsAuthenticated(true);
        }

        setTempToken(null);
        setRequires2FA(false);

        // 2. Pequeño delay para asegurar que el estado se actualizó
        await new Promise((resolve) => setTimeout(resolve, 100));

        // 3. Obtener rol para redirección
        const userRole = response.data?.user?.role || user?.role;

        // 4. Forzar redirección con window.location como FALLBACK
        const targetPath =
          userRole === "ADMIN" ? "/dashboard/admin" : "/dashboard/cliente";

        // Intentar con router.push primero
        try {
          router.push(targetPath);
        } catch (routerError) {
          console.error("❌ Error en router.push:", routerError);
        }

        // 5. FALLBACK ABSOLUTO: Si después de 1.5s seguimos en verify-2fa, usar window.location
        setTimeout(() => {
          if (
            typeof window !== "undefined" &&
            window.location.pathname.includes("/verify-2fa")
          ) {
            console.warn("⚠️ router.push() falló, usando window.location.href");
            window.location.href = targetPath;
          }
        }, 1500);

        return response;
      }

      return response;
    } catch (error: any) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Primero intentar logout en el backend
      await authService.logout();
    } catch (error: any) {
      console.error("⚠️ Error en logout del backend:", error);
      // Continuar aunque falle para limpiar el frontend
    } finally {
      // Siempre limpiar estado local
      setUser(null);
      setIsAuthenticated(false);
      setTempToken(null);
      setRequires2FA(false);

      // Limpiar cookies del lado del cliente
      if (typeof document !== "undefined") {
        document.cookie =
          "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "csrf_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }

      // Limpiar localStorage si existe
      if (typeof window !== "undefined") {
        localStorage.removeItem("tempToken");
        localStorage.removeItem("registerEmail");
      }

      // Redirigir al home
      router.push("/");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        tempToken,
        requires2FA,
        login,
        verify2FA,
        logout,
        checkAuth,
        setTempToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de AuthProvider");
  }
  return context;
};
