import axios from "axios";

// URL base del backend - usa variable de entorno o fallback a localhost
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Crear instancia de axios
const api = axios.create({
  baseURL: "https://backend-actividad-seguridad-binas.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Interceptor para agregar token JWT en cada request
api.interceptors.request.use(
  (config) => {
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
    // Errores esperados que NO deben mostrarse en consola
    const EXPECTED_ERRORS = [
      400, // Validaciones (código incorrecto, etc.)
      401, // Credenciales incorrectas
      403, // Cuenta bloqueada
      409, // Email/teléfono duplicado
      429, // Rate limit
    ];

    const status = error.response?.status;

    // Solo hacer console.error si NO es un error esperado
    if (!EXPECTED_ERRORS.includes(status)) {
      console.error("Error de API:", error);
    }

    // Manejo de redirección para 401 (solo en rutas protegidas)
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
