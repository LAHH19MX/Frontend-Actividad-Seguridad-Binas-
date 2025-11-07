import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Input, Button, Alert } from "@/components/ui";
import { Navbar, Footer } from "@/components/layout";
import authService from "@/services/authService";
import { isValidCode } from "@/utils/validators";

export default function VerifyRegistration() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState(""); // Solo un código
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos = 300 segundos

  useEffect(() => {
    // Obtener email del localStorage
    const savedEmail = localStorage.getItem("registerEmail");
    if (!savedEmail) {
      router.push("/register");
      return;
    }
    setEmail(savedEmail);

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
    // Solo permitir números y máximo 6 dígitos
    const numericValue = value.replace(/\D/g, "").slice(0, 6);
    setEmailCode(numericValue);
    if (errors.emailCode) {
      setErrors({ ...errors, emailCode: "" });
    }
    setApiError("");
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!emailCode) {
      newErrors.emailCode = "El código de email es obligatorio";
    } else if (!isValidCode(emailCode)) {
      newErrors.emailCode = "El código debe tener 6 dígitos";
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
      const response = await authService.verifyRegistration({
        email,
        emailCode: emailCode,
        // smsCode: ""
      });

      console.log("✅ Verificación exitosa:", response);

      setSuccessMessage(response.message);

      // Limpiar localStorage
      localStorage.removeItem("registerEmail");

      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      console.error("❌ Error en verificación:", error);
      const errorMessage =
        error.response?.data?.error || "Error al verificar cuenta";
      setApiError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Verificar Cuenta - SySCOM</title>
        <meta name="description" content="Verifica tu cuenta" />
      </Head>

      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          {/* Card principal */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Icono de verificación */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-[#3498db] to-[#2980b9] rounded-full flex items-center justify-center">
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>

            {/* Título */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Verifica tu cuenta
              </h1>
              <p className="text-gray-600 text-sm">
                Hemos enviado un código de verificación a tu email:
              </p>
              <p className="text-[#3498db] font-semibold mt-2">{email}</p>
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
                    timeLeft < 60 ? "text-red-500" : "text-[#3498db]"
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
              {/* Código de Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Código de Verificación
                </label>
                <Input
                  type="text"
                  name="emailCode"
                  placeholder="000000"
                  value={emailCode}
                  onChange={handleChange}
                  error={errors.emailCode}
                  maxLength={6}
                  className="text-center text-2xl font-bold tracking-widest"
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
              </div>

              {/* Botón de verificar */}
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                className="w-full"
                disabled={timeLeft === 0}
              >
                Verificar Cuenta
              </Button>
            </form>

            {/* Información adicional */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
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
                <span>Si no recibes el código, revisa tu bandeja de spam.</span>
              </p>
            </div>
          </div>

          {/* Link para volver */}
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/register")}
              className="text-gray-600 hover:text-[#3498db] text-sm font-medium transition-colors"
            >
              ← Volver al registro
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
