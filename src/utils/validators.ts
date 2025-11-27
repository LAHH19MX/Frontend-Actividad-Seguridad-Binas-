const DANGEROUS_CHARS = /[<>'"`;`\\]/g;

/**
 * Sanitiza un string eliminando caracteres peligrosos
 * Protege contra XSS y SQL Injection básicos
 */
export const sanitizeInput = (input: string): string => {
  if (!input) return "";
  return input.replace(DANGEROUS_CHARS, "");
};

/**
 * Valida que un input NO contenga caracteres peligrosos
 * Retorna true si es seguro, false si contiene caracteres prohibidos
 */
export const isInputSafe = (input: string): boolean => {
  if (!input) return true;
  return !DANGEROUS_CHARS.test(input);
};

/**
 * Obtiene mensaje de error para inputs no seguros
 */
export const getSafeInputError = (): string => {
  return "No se permiten los caracteres: < > ' \" ` ; \\ ‘ '";
};

// Regex para validar email
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

// Regex para validar teléfono (formato internacional con +)
const phoneRegex = /^\d{10}$/;

// Regex para validar contraseña fuerte
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#/])[A-Za-z\d@$!%*?&#/]{8,}$/;

// Regex para validar código de 6 dígitos
const codeRegex = /^\d{6}$/;

// Validar email
export const isValidEmail = (email: string): boolean => {
  if (!isInputSafe(email)) return false;
  return emailRegex.test(email);
};

// Validar teléfono
export const isValidPhone = (phone: string): boolean => {
  return phoneRegex.test(phone);
};

// Validar contraseña
export const isValidPassword = (password: string): boolean => {
  return passwordRegex.test(password);
};

// Validar código de verificación
export const isValidCode = (code: string): boolean => {
  return codeRegex.test(code);
};

// Validar nombre
export const isValidName = (name: string): boolean => {
  if (!isInputSafe(name)) return false;
  return name.trim().length >= 2 && name.trim().length <= 100;
};

// Mensaje de error de contraseña
export const getPasswordErrorMessage = (): string => {
  return "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&#)";
};

// Calcular fortaleza de contraseña (0-4)
export const getPasswordStrength = (password: string): number => {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[@$!%*?&#/]/.test(password)) strength++;

  return strength;
};

// Obtener etiqueta de fortaleza de contraseña
export const getPasswordStrengthLabel = (strength: number): string => {
  const labels = ["Muy débil", "Débil", "Regular", "Fuerte", "Muy fuerte"];
  return labels[strength - 1] || "Muy débil";
};

// Obtener color de fortaleza de contraseña
export const getPasswordStrengthColor = (strength: number): string => {
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
  ];
  return colors[strength - 1] || "bg-gray-300";
};
