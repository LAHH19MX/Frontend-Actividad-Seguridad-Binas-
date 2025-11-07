import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Input, Button, Alert } from "@/components/ui";
import { Navbar, Footer } from "@/components/layout";
import PasswordStrength from "@/components/ui/PasswordStrength";
import authService from "@/services/authService";
import {
  isValidEmail,
  isValidPhone,
  isValidPassword,
  isValidName,
} from "@/utils/validators";

export default function Register() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
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
    setApiError("");
  };

  const validateStep1 = () => {
    const newErrors: any = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    } else if (!isValidName(formData.name)) {
      newErrors.name = "El nombre debe tener entre 2 y 100 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: any = {};

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "El formato del email es inválido";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio";
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone =
        "El formato del teléfono es inválido (ej: +521234567890)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: any = {};

    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (!isValidPassword(formData.password)) {
      newErrors.password =
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirma tu contraseña";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    if (!validateStep3()) return;

    setIsLoading(true);

    try {
      const response = await authService.register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      console.log("✅ Registro exitoso:", response);

      // Guardar email para la siguiente pantalla
      localStorage.setItem("registerEmail", formData.email);

      // Redirigir a verificación
      router.push("/verify-registration");
    } catch (error: any) {
      console.error("❌ Error en registro:", error);
      const errorMessage =
        error.response?.data?.error || "Error al registrar usuario";
      setApiError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { number: 1, label: "Información Personal" },
    { number: 2, label: "Datos de Contacto" },
    { number: 3, label: "Seguridad" },
  ];

  return (
    <>
      <Head>
        <title>Crear Cuenta - SySCOM</title>
        <meta name="description" content="Crea tu cuenta en SySCOM" />
      </Head>

      <Navbar />

      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Indicador de pasos */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                        currentStep >= step.number
                          ? "bg-[#3498db] text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {currentStep > step.number ? (
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        step.number
                      )}
                    </div>
                    <span
                      className={`text-sm mt-2 text-center ${
                        currentStep >= step.number
                          ? "text-[#3498db] font-semibold"
                          : "text-gray-500"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-4 rounded transition-all ${
                        currentStep > step.number
                          ? "bg-[#3498db]"
                          : "bg-gray-200"
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Formulario */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Crear Cuenta
              </h2>
              <p className="text-gray-600">
                Completa el formulario para registrarte en Syscom
              </p>
            </div>

            {apiError && (
              <div className="mb-6">
                <Alert type="error" message={apiError} />
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Paso 1: Información Personal */}
              {currentStep === 1 && (
                <div className="space-y-5">
                  <Input
                    label="Nombre Completo"
                    type="text"
                    name="name"
                    placeholder="Juan Pérez"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    icon={
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    }
                  />

                  <div className="pt-4">
                    <Button
                      type="button"
                      onClick={handleNext}
                      variant="primary"
                      className="w-full"
                    >
                      Siguiente
                    </Button>
                  </div>
                </div>
              )}

              {/* Paso 2: Datos de Contacto */}
              {currentStep === 2 && (
                <div className="space-y-5">
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
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    }
                  />

                  <Input
                    label="Teléfono"
                    type="tel"
                    name="phone"
                    placeholder="+521234567890"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    icon={
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    }
                  />
                  {!errors.phone && (
                    <p className="text-sm text-gray-500 mt-1 ml-1">
                      Solo para contacto. La verificación se enviará por email.
                    </p>
                  )}

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="button"
                      onClick={handleBack}
                      variant="outline"
                      className="flex-1"
                    >
                      Atrás
                    </Button>
                    <Button
                      type="button"
                      onClick={handleNext}
                      variant="primary"
                      className="flex-1"
                    >
                      Siguiente
                    </Button>
                  </div>
                </div>
              )}

              {/* Paso 3: Seguridad */}
              {currentStep === 3 && (
                <div className="space-y-5">
                  <div>
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
                    <PasswordStrength password={formData.password} />
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

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="button"
                      onClick={handleBack}
                      variant="outline"
                      className="flex-1"
                    >
                      Atrás
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      isLoading={isLoading}
                      className="flex-1"
                    >
                      Crear Cuenta
                    </Button>
                  </div>
                </div>
              )}
            </form>

            {/* Link a login */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                ¿Ya tienes una cuenta?{" "}
                <Link
                  href="/login"
                  className="text-[#3498db] hover:text-[#2980b9] font-semibold"
                >
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
