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
  const [method, setMethod] = useState<"link" | "security_question">("link");
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
      // FLUJO NUEVO: PREGUNTA SECRETA
      if (method === "security_question") {
        const response = await authService.forgotPasswordWithSecurity({
          email,
          method: "security_question",
        });

        // Mensaje genérico (seguridad)
        setSuccessMessage(
          "Si el email está registrado y tiene pregunta de seguridad configurada, podrás responderla."
        );

        // Si tiene pregunta de seguridad, redirigir
        if (response.data && response.data.hasSecurityQuestion) {
          localStorage.setItem("securityToken", response.data.tempToken);
          localStorage.setItem("securityEmail", email);
          localStorage.setItem(
            "securityQuestion",
            response.data.securityQuestion
          );

          setTimeout(() => {
            router.push("/security-question");
          }, 2000);
        }
      }
      // FLUJO EXISTENTE: ENLACE
      else {
        const response = await authService.forgotPassword({
          email,
          method: "link",
        });

        setSuccessMessage(
          "Hemos enviado un enlace de recuperación a tu email. Válido por 5 minutos."
        );
      }
    } catch (error: any) {
      console.error("Error solicitando recuperación:", error);
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
              {method === "link" ? (
                <>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">1</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">
                        Ingresa tu email
                      </h3>
                      <p className="text-white/80 text-sm">
                        Te enviaremos un enlace seguro
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">2</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">
                        Haz clic en el enlace
                      </h3>
                      <p className="text-white/80 text-sm">
                        El enlace es válido por 5 minutos
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
                </>
              ) : (
                // MÉTODO PREGUNTA SECRETA
                <>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">1</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">
                        Ingresa tu email
                      </h3>
                      <p className="text-white/80 text-sm">
                        Verificaremos si tienes pregunta de seguridad
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">2</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">
                        Responde tu pregunta
                      </h3>
                      <p className="text-white/80 text-sm">
                        Contesta la pregunta de seguridad que elegiste
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">3</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">
                        Recibe y verifica el código
                      </h3>
                      <p className="text-white/80 text-sm">
                        Te enviaremos un código por email para continuar
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">4</span>
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
                </>
              )}
            </div>
          </div>
        </div>

        {/* Lado Derecho */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
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
                Elige cómo deseas recuperar tu contraseña
              </p>
            </div>

            {/* Selector de método */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Método de recuperación
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setMethod("link")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    method === "link"
                      ? "border-[#3498db] bg-[#3498db]/10 text-[#3498db]"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                    <span className="font-semibold text-sm">Enlace</span>
                    <span className="text-xs opacity-75">Recomendado</span>
                  </div>
                </button>

                {/* REEMPLAZO: Pregunta secreta en lugar de código directo */}
                <button
                  type="button"
                  onClick={() => setMethod("security_question")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    method === "security_question"
                      ? "border-[#3498db] bg-[#3498db]/10 text-[#3498db]"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-semibold text-sm">Pregunta</span>
                    <span className="text-xs opacity-75">Secreta</span>
                  </div>
                </button>
              </div>
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
                {method === "link" ? "Enviar Enlace" : "Continuar con Pregunta"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="text-[#3498db] hover:text-[#2980b9] font-semibold text-sm"
              >
                Volver al login
              </Link>
            </div>

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
