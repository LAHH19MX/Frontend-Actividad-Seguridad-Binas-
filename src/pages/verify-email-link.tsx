import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Alert, Button } from "@/components/ui";
import { Navbar, Footer } from "@/components/layout";
import authService from "@/services/authService";

export default function VerifyEmailLink() {
  const router = useRouter();
  const { id } = router.query;

  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (!id) return;

    const verifyLink = async () => {
      try {
        setIsVerifying(true);
        setError("");

        const response = await authService.verifyEmailLink(id as string);

        if (response.success && response.data?.isValid) {
          setIsValid(true);
          setEmail(response.data.email || "");

          // Iniciar countdown
          const timer = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(timer);
                router.push("/login");
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        } else {
          setError(response.error || "Enlace inválido");
        }
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error ||
          "Error al verificar enlace. Por favor intenta nuevamente.";
        setError(errorMessage);
        setIsValid(false);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyLink();
  }, [id, router]);

  const handleGoToLogin = () => {
    router.push("/login");
  };

  const handleResendLink = () => {
    router.push("/verify-registration");
  };

  return (
    <>
      <Head>
        <title>Verificar Email - SySCOM</title>
        <meta name="description" content="Verificación de email" />
      </Head>

      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* ESTADO: Verificando */}
            {isVerifying && (
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#3498db] to-[#2980b9] rounded-full flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Verificando tu email
                </h1>
                <p className="text-gray-600">
                  Por favor espera mientras verificamos tu cuenta...
                </p>
              </div>
            )}

            {/* ESTADO: Éxito */}
            {!isVerifying && isValid && (
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  ¡Email Verificado!
                </h1>
                <p className="text-gray-600 mb-4">
                  Tu cuenta ha sido verificada exitosamente.
                </p>

                {email && (
                  <div className="bg-green-50 rounded-lg p-4 mb-6 border border-green-200">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Email verificado:</span>
                      <br />
                      <span className="text-green-700">{email}</span>
                    </p>
                  </div>
                )}

                <Alert
                  type="success"
                  message="Ya puedes iniciar sesión con tu cuenta."
                />

                <div className="mt-6 bg-gradient-to-r from-[#3498db]/10 to-[#2980b9]/10 rounded-lg p-4 border border-[#3498db]/20">
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5 text-[#3498db]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm text-gray-700">
                      Redirigiendo al login en{" "}
                      <span className="font-bold text-[#3498db]">
                        {countdown}
                      </span>{" "}
                      segundos...
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleGoToLogin}
                  variant="primary"
                  className="w-full mt-4"
                >
                  Ir al Login Ahora
                </Button>
              </div>
            )}

            {/* ESTADO: Error */}
            {!isVerifying && !isValid && (
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Error de Verificación
                </h1>
                <p className="text-gray-600 mb-6">
                  No pudimos verificar tu email.
                </p>

                {error && (
                  <div className="mb-6">
                    <Alert type="error" message={error} />
                  </div>
                )}

                <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-100">
                  <p className="text-sm text-gray-700 flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-[#3498db] flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      Posibles razones:
                      <br />• El enlace ha expirado (válido por 5 minutos)
                      <br />• El enlace ya fue usado
                      <br />• La cuenta ya está verificada
                    </span>
                  </p>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handleResendLink}
                    variant="primary"
                    className="w-full"
                  >
                    Solicitar Nuevo Enlace
                  </Button>

                  <button
                    onClick={handleGoToLogin}
                    className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Ir al Login
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Links */}
          <div className="mt-6 text-center space-y-2">
            <button
              onClick={() => router.push("/register")}
              className="text-gray-600 hover:text-[#3498db] text-sm font-medium transition-colors block w-full"
            >
              ¿No tienes cuenta? Regístrate
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
