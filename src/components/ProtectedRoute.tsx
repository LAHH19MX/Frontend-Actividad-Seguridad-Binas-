import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean; // Si requiere estar autenticado
  requireRole?: "ADMIN" | "CLIENTE"; // Si requiere un rol específico
  redirectTo?: string; // Ruta de redirección personalizada
}

export default function ProtectedRoute({
  children,
  requireAuth = true,
  requireRole,
  redirectTo,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Esperar a que termine de cargar
    if (isLoading) return;

    const hasCookies =
      typeof document !== "undefined" && document.cookie.includes("auth_token");

    // Si requiere autenticación y no está autenticado
    if (requireAuth && (!isAuthenticated || !hasCookies)) {
      // 👇 Usar window.location para forzar recarga completa
      if (typeof window !== "undefined") {
        window.location.href = redirectTo || "/login";
      }
      return;
    }

    // Si requiere un rol específico y no lo tiene
    if (requireRole && user?.role !== requireRole) {
      if (user?.role === "ADMIN") {
        window.location.href = "/dashboard/admin";
      } else if (user?.role === "CLIENTE") {
        window.location.href = "/dashboard/cliente";
      } else {
        window.location.href = "/login";
      }
      return;
    }
  }, [isLoading, isAuthenticated, user, requireAuth, requireRole, redirectTo]);

  // Mostrar loading mientras verifica
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#3498db] mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado y requiere autenticación, no renderizar nada
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  // Si requiere un rol específico y no lo tiene, no renderizar nada
  if (requireRole && user?.role !== requireRole) {
    return null;
  }

  // Si todo está bien, renderizar el contenido
  return <>{children}</>;
}
