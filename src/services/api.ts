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

const API_URL = "http://localhost:5000/api";

// Crear instancia de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Interceptor para agregar token CSRF
api.interceptors.request.use(
  (config) => {
    // Solo agregar CSRF token a métodos que modifican datos
    const method = config.method?.toLowerCase();
    if (method && ["post", "put", "delete", "patch"].includes(method)) {
      const csrfToken = getCSRFToken();
      if (csrfToken) {
        config.headers["X-CSRF-Token"] = csrfToken;
      }
    }

    // Logging para debugging
    if (process.env.NODE_ENV === "development") {
      console.log(``, {
        withCredentials: config.withCredentials,
        headers: config.headers,
      });
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === "development") {
      console.log(``, response.data);
    }
    return response;
  },
  (error) => {
    // Errores esperados que NO deben mostrarse en consola
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

    // Manejo de redirección para 401
    if (status === 401) {
      const publicPaths = [
        "/login",
        "/register",
        "/forgot-password",
        "/verify-registration",
        "/verify-2fa",
      ];
      const currentPath =
        typeof window !== "undefined" ? window.location.pathname : "";

      if (!publicPaths.includes(currentPath)) {
        document.cookie =
          "csrf_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
