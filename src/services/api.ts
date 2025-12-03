import axios from "axios";

// Función para obtener CSRF token de las cookies
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

const API_URL = "https://backend-actividad-seguridad-binas.onrender.com/api";

// Crear instancia de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    // Solo agregar CSRF token a métodos que modifican datos
    const method = config.method?.toUpperCase();
    if (method && ["POST", "PUT", "DELETE", "PATCH"].includes(method)) {
      const csrfToken = getCSRFToken();
      if (csrfToken) {
        config.headers["X-CSRF-Token"] = csrfToken;
      } else {
        console.warn("No se encontró CSRF token en las cookies");
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === "development") {
      console.log(``);
    }
    return response;
  },
  (error) => {
    const EXPECTED_ERRORS = [400, 401, 403, 409, 429, 404];
    const status = error.response?.status;

    // Solo logear errores inesperados
    if (status && !EXPECTED_ERRORS.includes(status)) {
      console.error("Error de API:", {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
    }

    // Manejo especial de 401
    if (status === 401) {
      const publicPaths = [
        "/login",
        "/register",
        "/forgot-password",
        "/verify-registration",
        "/verify-2fa",
        "/reset-password-link",
        "/reset-password",
        "/verify-recovery",
        "/security-question",
        "/verify-email-link",
      ];
      const currentPath =
        typeof window !== "undefined" ? window.location.pathname : "";

      if (!publicPaths.includes(currentPath)) {
        // Limpiar cookies y localStorage
        if (typeof document !== "undefined") {
          document.cookie =
            "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie =
            "csrf_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
        if (typeof window !== "undefined") {
          localStorage.clear();
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
