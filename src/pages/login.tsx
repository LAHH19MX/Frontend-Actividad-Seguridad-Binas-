import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Input, Button, Alert } from "@/components/ui";
import { Navbar, Footer } from "@/components/layout";
import authService from "@/services/authService";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: "" }));
    }
    // ✅ No limpiar apiError aquí - solo se limpia al enviar el form
  };
  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(""); // ✅ Limpiar error anterior

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await authService.login({
        email: formData.email,
        password: formData.password,
      });

      console.log("✅ Login exitoso:", response);

      localStorage.setItem("tempToken", response.data.tempToken);
      router.push("/verify-2fa");
    } catch (error: any) {
      console.error("❌ Error en login:", error);

      // ✅ Manejar diferentes tipos de errores
      if (error.response) {
        // El servidor respondió con un código de error
        const status = error.response.status;
        const errorMessage = error.response.data?.error || "Error desconocido";

        switch (status) {
          case 401:
            setApiError("Email o contraseña incorrectos");
            break;
          case 403:
            setApiError(errorMessage); // Cuenta bloqueada
            break;
          case 409:
            setApiError(errorMessage); // Conflicto (no debería pasar en login)
            break;
          case 500:
            setApiError("Error del servidor. Intenta nuevamente más tarde.");
            break;
          default:
            setApiError(errorMessage);
        }
      } else if (error.request) {
        // La petición se hizo pero no hubo respuesta
        setApiError(
          "No se pudo conectar con el servidor. Verifica tu conexión."
        );
      } else {
        // Error al configurar la petición
        setApiError("Error inesperado. Intenta nuevamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Iniciar Sesión - SySCOM</title>
        <meta name="description" content="Inicia sesión en tu cuenta" />
      </Head>

      {/* Navbar */}
      <Navbar />

      {/* Contenido principal */}
      <div className="min-h-screen flex bg-gray-50">
        {/* Lado Izquierdo - Bienvenida */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#3498db] to-[#2980b9] p-12 flex-col justify-center relative overflow-hidden">
          {/* Decoración de fondo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-md mx-auto">
            {/* Badge de seguridad */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-white font-semibold text-sm">
                🔐 Acceso Seguro
              </span>
            </div>

            {/* Título principal */}
            <h1 className="text-4xl font-bold text-white mb-4">
              Bienvenido de vuelta a <span className="text-white">S</span>
              <span className="text-[#1a1a1a]">y</span>
              <span className="text-white">S</span>
              <span className="text-[#1a1a1a]">COM</span>
            </h1>
            <p className="text-white/90 text-lg mb-8">
              Accede a tu cuenta para gestionar tus pedidos, servicios y
              disfrutar de ofertas exclusivas.
            </p>

            {/* Características */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">
                    Gestiona tus pedidos
                  </h3>
                  <p className="text-white/80 text-sm">
                    Rastrea y administra todas tus compras en un solo lugar
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">
                    Ofertas exclusivas
                  </h3>
                  <p className="text-white/80 text-sm">
                    Accede a promociones y descuentos especiales para clientes
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">
                    Soporte prioritario
                  </h3>
                  <p className="text-white/80 text-sm">
                    Recibe atención personalizada y soporte técnico 24/7
                  </p>
                </div>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">25+</div>
                <div className="text-white/80 text-sm">Años de experiencia</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">50K+</div>
                <div className="text-white/80 text-sm">
                  Clientes satisfechos
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">99.9%</div>
                <div className="text-white/80 text-sm">Tiempo activo</div>
              </div>
            </div>
          </div>
        </div>

        {/* Lado Derecho - Formulario */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
          {/* Logo en la esquina superior derecha */}
          <div className="absolute top-6 right-8 hidden lg:block">
            <Image
              src="/logo.png"
              alt="SySCOM"
              width={100}
              height={32}
              priority
            />
          </div>

          <div className="w-full max-w-md">
            {/* Logo móvil */}
            <div className="lg:hidden text-center mb-8">
              <h1 className="text-3xl font-bold">
                <span className="text-gray-900">S</span>
                <span className="text-[#3498db]">y</span>
                <span className="text-gray-900">S</span>
                <span className="text-[#3498db]">COM</span>
              </h1>
            </div>

            {/* Título del formulario */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Iniciar Sesión
              </h2>
              <p className="text-gray-600">
                Ingresa tus credenciales para acceder a tu cuenta
              </p>
            </div>

            {/* Alerta de error */}
            {apiError && (
              <div className="mb-6">
                <Alert
                  type="error"
                  message={apiError}
                  autoClose={true}
                  autoCloseDelay={5000}
                  onClose={() => setApiError("")}
                />
              </div>
            )}

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <Input
                label="Correo Electrónico"
                type="email"
                name="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                }
              />

              {/* Contraseña */}
              <Input
                label="Contraseña"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                showPasswordToggle
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              />

              {/* Olvidaste contraseña */}
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#3498db] hover:text-[#2980b9] font-medium"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              {/* Botón submit */}
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                className="w-full"
              >
                Iniciar Sesión
              </Button>
            </form>

            {/* Registro */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                ¿No tienes una cuenta?{" "}
                <Link
                  href="/register"
                  className="text-[#3498db] hover:text-[#2980b9] font-semibold"
                >
                  Regístrate aquí
                </Link>
              </p>
            </div>

            {/* Divider */}
            <div className="my-6">
              <div className="border-t border-gray-300"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
