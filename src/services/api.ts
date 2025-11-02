import axios from "axios";

// URL base del backend
const API_URL = "https://backend-actividad-seguridad-binas.onrender.com/api";

// Crear instancia de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Para enviar cookies si las usas
});

// Interceptor para agregar token JWT en cada request
api.interceptors.request.use(
  (config) => {
    // Obtener token de localStorage
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Solo redirigir en 401 si NO estamos en páginas públicas
    if (error.response?.status === 401) {
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
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
