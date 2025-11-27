import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Input, Button, Alert } from "@/components/ui";
import { Navbar, Footer } from "@/components/layout";
import authService from "@/services/authService";
import { isValidCode } from "@/utils/validators";
import { useAuth } from "@/context/AuthContext";

export default function Verify2FA() {
  const router = useRouter();
  const [tempToken, setTempToken] = useState("");
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos
  const { login } = useAuth();

  useEffect(() => {
    // Obtener tempToken del localStorage
    const savedToken = localStorage.getItem("tempToken");
    if (!savedToken) {
      router.push("/login");
      return;
    }
    setTempToken(savedToken);

    // Timer de 5 minutos
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numericValue = value.replace(/\D/g, "").slice(0, 6);
    setCode(numericValue);
    if (errors.code) {
      setErrors({});
    }
    setApiError("");
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!code) {
      newErrors.code = "El código es obligatorio";
    } else if (!isValidCode(code)) {
      newErrors.code = "El código debe tener 6 dígitos";
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
      const response = await authService.verify2FA({
        tempToken,
        code,
      });

      console.log("✅ 2FA verificado:", response);

      login(response.data.token, response.data.user);
      localStorage.removeItem("tempToken");

      setSuccessMessage("Login exitoso. Redirigiendo...");
    } catch (error: any) {
      // Capturar todos los errores sin propagarlos
      const errorMessage =
        error.response?.data?.error || "Error al verificar código";
      setApiError(errorMessage);

      // Mostrar intentos restantes si están disponibles
      const attemptsLeft = error.response?.data?.attemptsLeft;
      if (attemptsLeft !== undefined) {
        setApiError(`${errorMessage}. Intentos restantes: ${attemptsLeft}`);
      }

      // Solo logear errores inesperados (500+, network, etc.)
      const status = error.response?.status;
      if (!status || status >= 500) {
        console.error("Error inesperado en verificación 2FA:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setApiError("");
    setSuccessMessage("");
    setIsResending(true);
    setCode("");

    try {
      const response = await authService.resend2FA({
        tempToken,
        method: "email",
      });

      console.log("✅ Código reenviado por email");
      setSuccessMessage(
        "Código reenviado a tu email. Ingresa el nuevo código."
      );
      setTimeLeft(300);
    } catch (error: any) {
      // Capturar TODOS los errores sin propagarlos
      const errorMessage =
        error.response?.data?.error || "Error al reenviar código";
      setApiError(errorMessage);

      // Solo logear errores inesperados (500+)
      const status = error.response?.status;
      if (!status || status >= 500) {
        console.error("Error inesperado reenviando código:", error);
      }
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      <Head>
        <title>Verificación 2FA - SySCOM</title>
        <meta name="description" content="Verifica tu identidad" />
      </Head>

      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          {/* Card principal */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Icono de seguridad */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-[#3498db] to-[#2980b9] rounded-full flex items-center justify-center animate-pulse">
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>

            {/* Título */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Verificación de Seguridad
              </h1>
              <p className="text-gray-600 text-sm">
                Hemos enviado un código de 6 dígitos a tu email
              </p>
            </div>

            {/* Timer */}
            <div className="bg-gradient-to-r from-[#3498db]/10 to-[#2980b9]/10 rounded-lg p-4 mb-6 border border-[#3498db]/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
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
                    El código expira en:
                  </span>
                </div>
                <span
                  className={`font-bold text-lg ${
                    timeLeft < 60
                      ? "text-red-500 animate-pulse"
                      : "text-[#3498db]"
                  }`}
                >
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>

            {/* Alertas */}
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

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Código de Verificación
                </label>
                <Input
                  type="text"
                  name="code"
                  placeholder="000000"
                  value={code}
                  onChange={handleChange}
                  error={errors.code}
                  maxLength={6}
                  className="text-center text-3xl font-bold tracking-widest"
                  autoFocus
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                className="w-full"
                disabled={timeLeft === 0}
              >
                Verificar e Iniciar Sesión
              </Button>
            </form>

            {/* ✅ CAMBIO: Botón único de reenvío por email */}
            <div className="mt-6 space-y-3">
              <p className="text-sm text-gray-600 text-center">
                ¿No recibiste el código?
              </p>
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="w-full px-4 py-3 border-2 border-[#3498db] text-[#3498db] rounded-lg font-semibold hover:bg-[#3498db] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {isResending ? "Reenviando..." : "Reenviar código por email"}
              </button>
            </div>

            {/* Info de seguridad */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex gap-3">
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
                <div className="text-sm text-gray-700">
                  <p className="font-semibold mb-1">
                    ¿Por qué esto es importante?
                  </p>
                  <p>
                    El código de verificación nos ayuda a confirmar tu identidad
                    y mantener tu cuenta segura.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Link para cancelar */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                localStorage.removeItem("tempToken");
                router.push("/login");
              }}
              className="text-gray-600 hover:text-[#3498db] text-sm font-medium transition-colors"
            >
              Cancelar y volver
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
