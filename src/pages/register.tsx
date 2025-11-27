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
  sanitizeInput,
  isInputSafe,
  getSafeInputError,
} from "@/utils/validators";

// Preguntas de seguridad (deben coincidir con las del backend)
const SECURITY_QUESTIONS = [
  { id: "pet_name", question: "¿Cuál es el nombre de tu primera mascota?" },
  { id: "birth_city", question: "¿En qué ciudad naciste?" },
  {
    id: "mother_maiden",
    question: "¿Cuál es tu color favorito?",
  },
  {
    id: "first_school",
    question: "¿Cuál fue el nombre de tu primera escuela?",
  },
  {
    id: "childhood_friend",
    question: "¿Cómo se llamaba tu mejor amigo/a de la infancia?",
  },
  { id: "first_car", question: "¿Cuál fue la marca de tu primer auto?" },
  {
    id: "favorite_teacher",
    question: "¿Cómo se llamaba tu maestro/a favorito/a?",
  },
  { id: "first_job", question: "¿Cuál fue tu primer trabajo?" },
  { id: "favorite_book", question: "¿Cuál es el título de tu libro favorito?" },
  { id: "childhood_nickname", question: "¿Cuál era tu apodo en la infancia?" },
];

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "", // Solo los 10 dígitos
    password: "",
    confirmPassword: "",
    securityQuestion: "", // Nuevo campo: pregunta de seguridad
    securityAnswer: "", // Nuevo campo: respuesta de seguridad
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    // Si es checkbox, usar 'checked', si no, usar 'value'
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: "" }));
    }
    setApiError("");
  };

  // Manejar cambios en el select de pregunta de seguridad
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: "" }));
    }
    setApiError("");
  };

  const validateForm = () => {
    const newErrors: any = {};

    // Validar nombre
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    } else if (!isInputSafe(formData.name)) {
      newErrors.name = getSafeInputError();
    } else if (!isValidName(formData.name)) {
      newErrors.name = "El nombre debe tener entre 2 y 100 caracteres";
    }

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!isInputSafe(formData.email)) {
      newErrors.email = getSafeInputError();
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "El formato del email es inválido";
    }

    // Validar teléfono (solo 10 dígitos)
    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio";
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = "El teléfono debe tener exactamente 10 dígitos";
    }

    // Validar contraseña
    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (!isValidPassword(formData.password)) {
      newErrors.password =
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial valido(@$!%*?&#/)";
    }

    // Validar confirmación de contraseña
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirma tu contraseña";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    // Validar pregunta de seguridad
    if (!formData.securityQuestion) {
      newErrors.securityQuestion =
        "Debes seleccionar una pregunta de seguridad";
    }

    // Validar respuesta de seguridad
    if (!formData.securityAnswer.trim()) {
      newErrors.securityAnswer = "La respuesta de seguridad es obligatoria";
    } else if (formData.securityAnswer.trim().length < 2) {
      newErrors.securityAnswer =
        "La respuesta debe tener al menos 2 caracteres";
    } else if (formData.securityAnswer.trim().length > 100) {
      newErrors.securityAnswer =
        "La respuesta no puede tener más de 100 caracteres";
    }

    // Validar términos y condiciones
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Debes aceptar los términos y condiciones";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Sanitizar inputs antes de enviar
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        phone: `+52${formData.phone}`, // Agregar +52 automáticamente
        password: formData.password, // La contraseña NO se sanitiza
        confirmPassword: formData.confirmPassword,
        securityQuestion: formData.securityQuestion, // Nuevo campo
        securityAnswer: formData.securityAnswer, // Nuevo campo
        // acceptTerms NO se envía al backend
      };

      const response = await authService.register(sanitizedData);

      // Guardar email para la siguiente pantalla
      localStorage.setItem("registerEmail", formData.email);

      // Redirigir a verificación
      router.push("/verify-registration");
    } catch (error: any) {
      // NO hacer console.error para errores esperados (400, 409, etc.)
      const status = error.response?.status;
      const EXPECTED_ERRORS = [400, 409, 429];

      if (!EXPECTED_ERRORS.includes(status)) {
        console.error("Error en registro:", error);
      }

      // Manejo específico de errores
      if (status === 409) {
        const errorMsg =
          error.response?.data?.error ||
          "El email o teléfono ya está registrado";
        setApiError(errorMsg);
      } else if (status === 400) {
        const errorMsg = error.response?.data?.error || "Datos inválidos";
        setApiError(errorMsg);
      } else if (status === 429) {
        setApiError("Demasiados intentos. Por favor, espera unos minutos.");
      } else {
        setApiError("Error al registrar usuario. Intenta nuevamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Crear Cuenta - SySCOM</title>
        <meta name="description" content="Crea tu cuenta en SySCOM" />
      </Head>

      <Navbar />

      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Formulario */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Crear Cuenta
              </h2>
              <p className="text-gray-600">
                Completa el formulario para registrarte en SySCOM
              </p>
            </div>

            {apiError && (
              <div className="mb-6">
                <Alert type="error" message={apiError} />
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* ==================== INFORMACIÓN PERSONAL ==================== */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Información Personal
                </h3>
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
              </div>

              {/* ==================== DATOS DE CONTACTO ==================== */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Datos de Contacto
                </h3>

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

                  {/* Campo de teléfono con +52 fijo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <div className="flex gap-2">
                      {/* +52 fijo (no editable) */}
                      <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-700 font-medium">
                        +52
                      </div>

                      {/* Input para los 10 dígitos */}
                      <div className="flex-1">
                        <Input
                          type="tel"
                          name="phone"
                          placeholder="1234567890"
                          value={formData.phone}
                          onChange={handleChange}
                          error={errors.phone}
                          maxLength={10}
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
                      </div>
                    </div>
                    {!errors.phone && (
                      <p className="text-sm text-gray-500 mt-1 ml-1">
                        Solo para contacto. La verificación se enviará por
                        email.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* ==================== SEGURIDAD ==================== */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Seguridad
                </h3>

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

                  {/* NUEVA SECCIÓN: PREGUNTA DE SEGURIDAD */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pregunta de Seguridad
                    </label>
                    <select
                      name="securityQuestion"
                      value={formData.securityQuestion}
                      onChange={handleSelectChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#3498db] focus:border-[#3498db] transition-colors ${
                        errors.securityQuestion
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">
                        Selecciona una pregunta de seguridad
                      </option>
                      {SECURITY_QUESTIONS.map((q) => (
                        <option key={q.id} value={q.id}>
                          {q.question}
                        </option>
                      ))}
                    </select>
                    {errors.securityQuestion && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.securityQuestion}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 mt-1">
                      Esta pregunta te ayudará a recuperar tu cuenta si olvidas
                      tu contraseña.
                    </p>
                  </div>

                  <Input
                    label="Respuesta de Seguridad"
                    type="text"
                    name="securityAnswer"
                    placeholder="Tu respuesta"
                    value={formData.securityAnswer}
                    onChange={handleChange}
                    error={errors.securityAnswer}
                    icon={
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    }
                  />
                </div>
              </div>

              {/* ==================== TÉRMINOS Y CONDICIONES ==================== */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 text-[#3498db] bg-gray-100 border-gray-300 rounded focus:ring-[#3498db] focus:ring-2"
                  />
                  <label
                    htmlFor="acceptTerms"
                    className="text-sm text-gray-700"
                  >
                    Acepto los{" "}
                    <Link
                      href="/terminos"
                      target="_blank"
                      className="text-[#3498db] hover:text-[#2980b9] font-semibold"
                    >
                      Términos y Condiciones
                    </Link>{" "}
                    y la{" "}
                    <Link
                      href="/privacidad"
                      target="_blank"
                      className="text-[#3498db] hover:text-[#2980b9] font-semibold"
                    >
                      Política de Privacidad
                    </Link>
                  </label>
                </div>
                {errors.acceptTerms && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.acceptTerms}
                  </p>
                )}
              </div>

              {/* ==================== BOTÓN DE REGISTRO ==================== */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isLoading}
                  className="w-full"
                >
                  Crear Cuenta
                </Button>
              </div>
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
