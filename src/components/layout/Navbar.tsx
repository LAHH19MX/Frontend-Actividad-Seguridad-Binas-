import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../ui/Button";

interface NavbarProps {
  isAuthenticated?: boolean;
  user?: {
    name: string;
    role: "ADMIN" | "CLIENTE";
  };
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isAuthenticated = false,
  user,
  onLogout,
}) => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <div className="relative w-32 h-10">
              <Image
                src="/logoS.png"
                alt="SySCOM"
                width={120}
                height={35}
                priority
              />
            </div>
          </Link>

          {/* Menú central + Buscador */}
          <div className="hidden lg:flex items-center gap-6 flex-1 justify-center mx-8">
            {/* Menú de navegación */}
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="text-gray-700 hover:text-[#3498db] transition-colors font-medium"
              >
                Productos
              </Link>
              <Link
                href="/"
                className="text-gray-700 hover:text-[#3498db] transition-colors font-medium"
              >
                Servicios
              </Link>
              <Link
                href="/"
                className="text-gray-700 hover:text-[#3498db] transition-colors font-medium"
              >
                Promociones
              </Link>
              <Link
                href="/"
                className="text-gray-700 hover:text-[#3498db] transition-colors font-medium"
              >
                Soporte
              </Link>
              <Link
                href="/"
                className="text-gray-700 hover:text-[#3498db] transition-colors font-medium"
              >
                Nosotros
              </Link>
            </div>

            {/* Buscador */}
            <form onSubmit={handleSearch} className="relative ml-10">
              <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-96 pl-10 pr-4 py-1.5  border border-gray-300 rounded-lg focus:outline-none focus:border-[#3498db] focus:ring-1 focus:ring-[#3498db] transition-all"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </form>
          </div>

          {/* Acciones de usuario */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {!isAuthenticated ? (
              // Botones cuando NO está autenticado
              <>
                <button
                  onClick={() => router.push("/login")}
                  className="hidden sm:block px-5 py-2 bg-[#3498db] text-white rounded-lg text-sm font-semibold hover:bg-[#2980b9] active:bg-[#1f6a99] transition-colors"
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => router.push("/register")}
                  className="hidden sm:block px-5 py-2 border-2 border-[#3498db] text-[#3498db] rounded-lg text-sm font-semibold hover:bg-[#3498db] hover:text-white transition-colors"
                >
                  Registrarse
                </button>

                {/* Versión móvil */}
                <div className="sm:hidden flex gap-2">
                  <button
                    onClick={() => router.push("/login")}
                    className="px-4 py-2 bg-[#3498db] text-white rounded-lg text-sm font-semibold"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => router.push("/register")}
                    className="px-4 py-2 border-2 border-[#3498db] text-[#3498db] rounded-lg text-sm font-semibold"
                  >
                    Registro
                  </button>
                </div>
              </>
            ) : (
              // Íconos cuando SÍ está autenticado
              <div className="flex items-center gap-3">
                {/* Iconos solo para CLIENTE */}
                {user?.role === "CLIENTE" && (
                  <>
                    {/* Favoritos */}
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>

                    {/* Carrito */}
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span className="absolute -top-1 -right-1 bg-[#3498db] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                        0
                      </span>
                    </button>
                  </>
                )}

                {/* Perfil con dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </button>

                  {/* Dropdown menu */}
                  {showDropdown && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowDropdown(false)}
                      ></div>

                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20 animate-slideDown">
                        <div className="px-4 py-3 border-b border-gray-200">
                          <p className="text-sm font-semibold text-gray-900">
                            {user?.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {user?.role === "ADMIN"
                              ? "Administrador"
                              : "Cliente"}
                          </p>
                        </div>

                        {user?.role === "CLIENTE" && (
                          <>
                            <Link
                              href="/dashboard/cliente"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                              onClick={() => setShowDropdown(false)}
                            >
                              Mi Perfil
                            </Link>
                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                              Mis Pedidos
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                              Configuración
                            </button>
                          </>
                        )}

                        {user?.role === "ADMIN" && (
                          <>
                            <Link
                              href="/dashboard/admin"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                              onClick={() => setShowDropdown(false)}
                            >
                              Panel Administrativo
                            </Link>
                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                              Configuración
                            </button>
                          </>
                        )}

                        <div className="border-t border-gray-200 mt-2 pt-2">
                          <button
                            onClick={() => {
                              setShowDropdown(false);
                              onLogout?.();
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-semibold"
                          >
                            Cerrar Sesión
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
