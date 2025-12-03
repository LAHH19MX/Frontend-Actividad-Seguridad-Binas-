import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireRole?: "ADMIN" | "CLIENTE";
  redirectTo?: string;
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
    if (isLoading) return;

    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo || "/login");
      return;
    }

    if (requireRole && user?.role !== requireRole) {
      if (user?.role === "ADMIN") {
        router.push("/dashboard/admin");
      } else if (user?.role === "CLIENTE") {
        router.push("/dashboard/cliente");
      } else {
        router.push("/login");
      }
      return;
    }
  }, [
    isLoading,
    isAuthenticated,
    user,
    requireAuth,
    requireRole,
    router,
    redirectTo,
  ]);

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

  if (requireAuth && !isAuthenticated) {
    return null;
  }

  if (requireRole && user?.role !== requireRole) {
    return null;
  }

  return <>{children}</>;
}
