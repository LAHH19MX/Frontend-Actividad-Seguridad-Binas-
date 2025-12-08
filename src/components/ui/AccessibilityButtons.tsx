"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useVoice } from "@/context/VoiceContext";
import { useScreenReader } from "@/hooks/useScreenReader";

const AccessibilityButtons: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Solo usar los hooks DESPUÉS de montar
  if (!mounted) return null;

  return <AccessibilityButtonsContent />;
};

// Componente separado que usa los hooks
const AccessibilityButtonsContent: React.FC = () => {
  const { isHighContrast, toggleTheme } = useTheme();
  const { isVoiceEnabled, toggleVoice } = useVoice();

  useScreenReader();

  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-2">
      {/* Botón de Alto Contraste */}
      <button
        onClick={toggleTheme}
        className={`
          p-3 rounded-r-lg shadow-lg transition-all duration-300
          ${
            isHighContrast
              ? "bg-white text-black hover:bg-yellow-400"
              : "bg-gray-800 text-white hover:bg-gray-700"
          }
        `}
        aria-label={
          isHighContrast
            ? "Desactivar alto contraste"
            : "Activar alto contraste"
        }
        title={
          isHighContrast
            ? "Desactivar alto contraste"
            : "Activar alto contraste"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.3" />
          <path
            d="M12 2 C12 2, 12 2, 12 22 C17.5 22, 22 17.5, 22 12 C22 6.5, 17.5 2, 12 2 Z"
            fill="currentColor"
          />
        </svg>
      </button>

      {/* Botón de Lector de Voz */}
      <button
        onClick={toggleVoice}
        className={`
          p-3 rounded-r-lg shadow-lg transition-all duration-300
          ${
            isVoiceEnabled
              ? "bg-green-600 text-white hover:bg-green-500"
              : "bg-gray-800 text-white hover:bg-gray-700"
          }
        `}
        aria-label={
          isVoiceEnabled ? "Desactivar lector de voz" : "Activar lector de voz"
        }
        title={
          isVoiceEnabled ? "Desactivar lector de voz" : "Activar lector de voz"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          {isVoiceEnabled && (
            <>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </>
          )}
        </svg>
      </button>
    </div>
  );
};

export default AccessibilityButtons;
