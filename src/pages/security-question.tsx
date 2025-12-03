import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Input, Button, Alert } from "@/components/ui";
import { Navbar, Footer } from "@/components/layout";
import authService from "@/services/authService";

export default function SecurityQuestion() {
  const router = useRouter();
  const [tempToken, setTempToken] = useState("");
  const [email, setEmail] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Obtener tempToken y email del localStorage
    const savedToken = localStorage.getItem("securityToken");
    const savedEmail = localStorage.getItem("securityEmail");

    if (!savedToken || !savedEmail) {
      router.push("/forgot-password");
      return;
    }

    setTempToken(savedToken);
    setEmail(savedEmail);

    // También obtenemos la pregunta de seguridad de la respuesta anterior
    const savedQuestion = localStorage.getItem("securityQuestion");
    if (savedQuestion) {
      setSecurityQuestion(savedQuestion);
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
    if (errors.answer) {
      setErrors({});
    }
    setApiError("");
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!answer.trim()) {
      newErrors.answer = "La respuesta es obligatoria";
    } else if (answer.trim().length < 2) {
      newErrors.answer = "La respuesta debe tener al menos 2 caracteres";
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
      const response = await authService.verifySecurityAnswer({
        tempToken,
        answer,
      });

      // Guardar el nuevo tempToken (para el código) y email en localStorage
      localStorage.setItem("recoveryToken", response.data.tempToken);
      localStorage.setItem("recoveryEmail", email);
      // Limpiar los datos de seguridad
      localStorage.removeItem("securityToken");
      localStorage.removeItem("securityEmail");
      localStorage.removeItem("securityQuestion");

      setSuccessMessage("Respuesta correcta. Redirigiendo...");

      // Redirigir a verificar código de recuperación
      setTimeout(() => {
        router.push("/verify-recovery");
      }, 1500);
    } catch (error: any) {
      console.error("❌ Error verificando respuesta:", error);
      const errorMessage =
        error.response?.data?.error || "Error al verificar respuesta";
      setApiError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Pregunta de Seguridad - SySCOM</title>
        <meta name="description" content="Responde tu pregunta de seguridad" />
      </Head>

      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          {/* Card principal */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Icono */}
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
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Título */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Pregunta de Seguridad
              </h1>
              <p className="text-gray-600 text-sm">
                Responde la siguiente pregunta para continuar:
              </p>
              <p className="text-[#3498db] font-semibold mt-2">{email}</p>
            </div>

            {/* Pregunta */}
            <div className="bg-gradient-to-r from-[#3498db]/10 to-[#2980b9]/10 rounded-lg p-4 mb-6 border border-[#3498db]/20">
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
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm text-gray-700 font-semibold">
                  Pregunta:
                </span>
              </div>
              <p className="mt-2 text-gray-900 font-medium">
                {securityQuestion}
              </p>
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
                  Tu Respuesta
                </label>
                <Input
                  type="text"
                  name="answer"
                  placeholder="Escribe tu respuesta aquí"
                  value={answer}
                  onChange={handleChange}
                  error={errors.answer}
                  autoFocus
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                className="w-full"
              >
                Verificar Respuesta
              </Button>
            </form>

            {/* Info */}
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
                  <p className="font-semibold mb-1">Seguridad primero</p>
                  <p>
                    Esta pregunta ayuda a verificar que eres el propietario de
                    la cuenta.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Link para cancelar */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                localStorage.removeItem("securityToken");
                localStorage.removeItem("securityEmail");
                localStorage.removeItem("securityQuestion");
                router.push("/forgot-password");
              }}
              className="text-gray-600 hover:text-[#3498db] text-sm font-medium transition-colors"
            >
              Volver
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
