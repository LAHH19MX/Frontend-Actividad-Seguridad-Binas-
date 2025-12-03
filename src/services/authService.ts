import api from "./api";

// Tipos de datos
export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface VerifyRegistrationData {
  email: string;
  emailCode: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface Verify2FAData {
  tempToken: string;
  code: string;
}

export interface Resend2FAData {
  tempToken: string;
  method: "email" | "sms";
}

export interface ForgotPasswordData {
  email: string;
  method?: "code" | "link";
}

export interface VerifyRecoveryCodeData {
  tempToken: string;
  code: string;
}

export interface ResetPasswordData {
  resetToken: string;
  newPassword: string;
  confirmPassword: string;
}

// TIPOS PARA RESET CON ENLACE
export interface ResetPasswordWithLinkData {
  tempToken: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ForgotPasswordSecurityData {
  email: string;
  method: "security_question";
}

export interface VerifySecurityAnswerData {
  tempToken: string;
  answer: string;
}

// Servicio de autenticación
const authService = {
  // Registro
  register: async (data: RegisterData) => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  // Verificar registro
  verifyRegistration: async (data: VerifyRegistrationData) => {
    const response = await api.post("/auth/verify-registration", data);
    return response.data;
  },

  // Login (Parte 1)
  login: async (data: LoginData) => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  // Reenviar código 2FA
  resend2FA: async (data: Resend2FAData) => {
    const response = await api.post("/auth/resend-2fa", data);
    return response.data;
  },

  // Verificar 2FA (Parte 2 del login)
  verify2FA: async (data: Verify2FAData) => {
    const response = await api.post("/auth/verify-2fa", data);
    return response.data;
  },

  // Solicitar recuperación de contraseña
  forgotPassword: async (data: ForgotPasswordData) => {
    const response = await api.post("/auth/forgot-password", data);
    return response.data;
  },

  // VERIFICAR TOKEN DE RESET (ENLACE)
  verifyResetToken: async (resetId: string) => {
    const response = await api.get(`/auth/verify-reset-id/${resetId}`);
    return response.data;
  },

  // CAMBIAR CONTRASEÑA CON ENLACE
  resetPasswordWithLink: async (data: ResetPasswordWithLinkData) => {
    const response = await api.post("/auth/reset-password-link", data);
    return response.data;
  },

  // Reenviar código de recuperación
  resendRecoveryCode: async (data: Resend2FAData) => {
    const response = await api.post("/auth/resend-recovery-code", data);
    return response.data;
  },

  // Verificar código de recuperación
  verifyRecoveryCode: async (data: VerifyRecoveryCodeData) => {
    const response = await api.post("/auth/verify-recovery-code", data);
    return response.data;
  },

  // Resetear contraseña (con código)
  resetPassword: async (data: ResetPasswordData) => {
    const response = await api.post("/auth/reset-password", data);
    return response.data;
  },

  // Obtener perfil
  getProfile: async () => {
    const response = await api.get("/user/profile");
    return response.data;
  },

  // Logout
  // Logout
  logout: async () => {
    // 👇 OBTENER CSRF TOKEN MANUALMENTE
    const getCSRFToken = (): string | null => {
      if (typeof document === "undefined") return null;
      const cookies = document.cookie.split(";");
      for (let cookie of cookies) {
        const [name, value] = cookie.trim().split("=");
        if (name === "csrf_token") {
          return decodeURIComponent(value);
        }
      }
      return null;
    };

    const csrfToken = getCSRFToken();

    const response = await api.post(
      "/user/logout",
      {},
      {
        headers: {
          "X-CSRF-Token": csrfToken || "",
        },
      }
    );

    return response.data;
  },

  // Refrescar token
  refreshToken: async () => {
    const response = await api.post("/auth/refresh-token");
    return response.data;
  },

  forgotPasswordWithSecurity: async (data: ForgotPasswordSecurityData) => {
    const response = await api.post("/auth/forgot-password-security", data);
    return response.data;
  },

  verifySecurityAnswer: async (data: VerifySecurityAnswerData) => {
    const response = await api.post("/auth/verify-security-answer", data);
    return response.data;
  },
};

export default authService;
