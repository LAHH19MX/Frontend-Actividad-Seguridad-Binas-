import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Input, Button, Alert } from "@/components/ui";
import { Navbar, Footer } from "@/components/layout";
import PasswordStrength from "@/components/ui/PasswordStrength";
import authService from "@/services/authService";
import { isValidPassword } from "@/utils/validators";

export default function ResetPasswordLink() {
  const router = useRouter();
  const { id } = router.query;
  const [tempToken, setTempToken] = useState("");
  const [isValidating, setIsValidating] = useState(true);
  const [isValidLink, setIsValidLink] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Validar el enlace cuando carga la página
  useEffect(() => {
    const validateLink = async () => {
      if (!router.isReady) {
        return;
      }
      if (!id || typeof id !== "string") {
        setIsValidating(false);
        setIsValidLink(false);
        return;
      }

      try {
        setIsValidating(true);
        const response = await authService.verifyResetToken(id);

        if (response.success && response.data.isValid) {
          setIsValidLink(true);
          setTempToken(response.data.tempToken);
        } else {
          setApiError("El enlace no es válido o ha expirado");
          setIsValidLink(false);
        }
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error || "El enlace no es válido o ha expirado";
        setApiError(errorMessage);
        setIsValidLink(false);
      } finally {
        setIsValidating(false);
      }
    };

    validateLink();
  }, [id, router.isReady]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: "" }));
    }
    setApiError("");
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.newPassword) {
      newErrors.newPassword = "La contraseña es obligatoria";
    } else if (!isValidPassword(formData.newPassword)) {
      newErrors.newPassword =
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirma tu contraseña";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
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
      const response = await authService.resetPasswordWithLink({
        tempToken,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      });

      setSuccessMessage(response.message);

      // Redirigir al login
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || "Error al cambiar contraseña";
      setApiError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // 👇 CAMBIO: Ahora verifica si isValidLink es null (cargando)
  // Pantalla de carga mientras valida el enlace
  if (isValidating || isValidLink === null) {
    return (
      <>
        <Head>
          <title>Validando enlace... - SySCOM</title>
        </Head>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#3498db] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Validando enlace...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // 👇 CAMBIO: Ahora verifica si isValidLink es explícitamente false
  // Pantalla de error si el enlace no es válido
  if (isValidLink === false) {
    return (
      <>
        <Head>
          <title>Enlace Inválido - SySCOM</title>
        </Head>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-red-500"
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
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Enlace Inválido
              </h1>
              <p className="text-gray-600 mb-6">{apiError}</p>
              <Button
                onClick={() => router.push("/forgot-password")}
                variant="primary"
                className="w-full"
              >
                Solicitar nuevo enlace
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // 👇 Solo llega aquí si isValidLink === true
  // Formulario para cambiar contraseña
  return (
    <>
      <Head>
        <title>Nueva Contraseña - SySCOM</title>
        <meta name="description" content="Crea tu nueva contraseña" />
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
                🔐 Contraseña Segura
              </span>
            </div>

            <h1 className="text-4xl font-bold text-white mb-4">
              Crea una contraseña segura
            </h1>
            <p className="text-white/90 text-lg mb-8">
              Elige una contraseña fuerte para proteger tu cuenta.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-white font-semibold mb-4">
                Requisitos de contraseña:
              </h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Mínimo 8 caracteres
                </li>
                <li className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Al menos una mayúscula
                </li>
                <li className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Al menos una minúscula
                </li>
                <li className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Al menos un número
                </li>
                <li className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Al menos un carácter especial valido(@$!%*?&#)
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Lado Derecho */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
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
                Nueva Contraseña
              </h2>
              <p className="text-gray-600">
                Crea una contraseña segura para tu cuenta
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
              <div>
                <Input
                  label="Nueva Contraseña"
                  type="password"
                  name="newPassword"
                  placeholder="••••••••"
                  value={formData.newPassword}
                  onChange={handleChange}
                  error={errors.newPassword}
                  showPasswordToggle
                  icon={
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  }
                />
                <PasswordStrength password={formData.newPassword} />
              </div>

              <Input
                label="Confirmar Contraseña"
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                showPasswordToggle
                icon={
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              />

              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                className="w-full"
              >
                Cambiar Contraseña
              </Button>
            </form>

            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
              <div className="flex gap-3">
                <svg
                  className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="text-sm text-gray-700">
                  <p className="font-semibold mb-1">Casi listo</p>
                  <p>
                    Después de cambiar tu contraseña, podrás iniciar sesión con
                    tus nuevas credenciales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
