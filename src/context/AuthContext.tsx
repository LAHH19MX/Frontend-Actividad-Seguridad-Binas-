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
  login: (token: string, userData: User) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar autenticación al cargar la app
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setIsLoading(true);

      // Obtener token y usuario del localStorage
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      if (!token || !userData) {
        setUser(null);
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      // Parsear datos del usuario
      const parsedUser = JSON.parse(userData);

      // Opcional: Verificar token con el backend
      try {
        const response = await authService.getProfile();
        setUser(response.data.user);
        setIsAuthenticated(true);
      } catch (error) {
        // Si el token es inválido, limpiar localStorage
        console.error("Token inválido, cerrando sesión");
        logout();
      }
    } catch (error) {
      console.error("Error verificando autenticación:", error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (token: string, userData: User) => {
    // Guardar en localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    // Actualizar estado
    setUser(userData);
    setIsAuthenticated(true);

    console.log("✅ Usuario autenticado:", userData);

    // Redirigir según rol
    if (userData.role === "ADMIN") {
      router.push("/dashboard/admin");
    } else {
      router.push("/dashboard/cliente");
    }
  };

  const logout = () => {
    // Limpiar localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Limpiar estado
    setUser(null);
    setIsAuthenticated(false);

    console.log("✅ Sesión cerrada");

    // Redirigir al home
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        checkAuth,
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
