import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Input, Button, Alert } from "@/components/ui";
import { Navbar, Footer } from "@/components/layout";
import authService from "@/services/authService";
import { isValidEmail } from "@/utils/validators";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors({});
    }
    setApiError("");
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!isValidEmail(email)) {
      newErrors.email = "El formato del email es inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    setSuccessMessage("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await authService.forgotPassword({ email });

      console.log("✅ Código de recuperación enviado:", response);

      // ✅ VERIFICAR SI response.data EXISTE ANTES DE ACCEDER
      if (response.data && response.data.tempToken) {
        // Guardar token temporal
        localStorage.setItem("recoveryToken", response.data.tempToken);
        localStorage.setItem("recoveryEmail", email);
      }

      setSuccessMessage(response.message);

      // ✅ REDIRIGIR SIEMPRE (tanto si el email existe como si no)
      setTimeout(() => {
        router.push("/verify-recovery");
      }, 2000);
    } catch (error: any) {
      console.error("❌ Error solicitando recuperación:", error);
      const errorMessage =
        error.response?.data?.error ||
        "Error al solicitar recuperación de contraseña";
      setApiError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Recuperar Contraseña - SySCOM</title>
        <meta name="description" content="Recupera tu contraseña" />
      </Head>

      <Navbar />

      <div className="min-h-screen flex bg-gray-50">
        {/* Lado Izquierdo */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#3498db] to-[#2980b9] p-12 flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-md mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <svg
                className="h-5 w-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-white font-semibold text-sm">
                🔐 Recuperación Segura
              </span>
            </div>

            <h1 className="text-4xl font-bold text-white mb-4">
              ¿Olvidaste tu contraseña?
            </h1>
            <p className="text-white/90 text-lg mb-8">
              No te preocupes, te ayudaremos a recuperar el acceso a tu cuenta
              de forma segura.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">
                    Ingresa tu email
                  </h3>
                  <p className="text-white/80 text-sm">
                    Te enviaremos un código de verificación
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">
                    Verifica el código
                  </h3>
                  <p className="text-white/80 text-sm">
                    Ingresa el código que recibiste por email o SMS
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">
                    Crea una nueva contraseña
                  </h3>
                  <p className="text-white/80 text-sm">
                    Elige una contraseña segura y vuelve a acceder
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lado Derecho */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
          <div className="absolute top-6 right-8 hidden lg:block">
            <Image
              src="/logoS.png"
              alt="SySCOM"
              width={100}
              height={32}
              priority
            />
          </div>

          <div className="w-full max-w-md">
            <div className="lg:hidden text-center mb-8">
              <h1 className="text-3xl font-bold">
                <span className="text-gray-900">S</span>
                <span className="text-[#3498db]">y</span>
                <span className="text-gray-900">S</span>
                <span className="text-[#3498db]">COM</span>
              </h1>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Recuperar Contraseña
              </h2>
              <p className="text-gray-600">
                Ingresa tu email para recibir un código de recuperación
              </p>
            </div>

            {apiError && (
              <div className="mb-6">
                <Alert type="error" message={apiError} />
              </div>
            )}

            {successMessage && (
              <div className="mb-6">
                <Alert type="success" message={successMessage} />
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Correo Electrónico"
                type="email"
                name="email"
                placeholder="tu@email.com"
                value={email}
                onChange={handleChange}
                error={errors.email}
                icon={
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                }
              />

              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                className="w-full"
              >
                Enviar Código
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="text-[#3498db] hover:text-[#2980b9] font-semibold text-sm"
              >
                Volver
              </Link>
            </div>
            {/* Divider */}
            <div className="my-6">
              <div className="border-t border-gray-300"></div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
