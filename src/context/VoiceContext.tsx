"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface VoiceContextType {
  isVoiceEnabled: boolean;
  toggleVoice: () => void;
  speak: (text: string) => void;
  stopSpeaking: () => void;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export const VoiceProvider = ({ children }: { children: ReactNode }) => {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);

  // Inicializar Speech Synthesis
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSynth(window.speechSynthesis);

      // Cargar preferencia guardada
      const savedPreference = localStorage.getItem("voiceEnabled");
      if (savedPreference === "true") {
        setIsVoiceEnabled(true);
      }
    }
  }, []);

  const speak = (text: string) => {
    if (!synth || !isVoiceEnabled || !text.trim()) return;

    // Cancelar cualquier lectura anterior
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Configuración de voz
    utterance.lang = "es-MX"; // Español de México
    utterance.rate = 0.9; // Velocidad de lectura
    utterance.pitch = 1; // Tono
    utterance.volume = 1; // Volumen

    // Intentar usar una voz en español si está disponible
    const voices = synth.getVoices();
    const spanishVoice = voices.find((voice) => voice.lang.startsWith("es"));
    if (spanishVoice) {
      utterance.voice = spanishVoice;
    }

    synth.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synth) {
      synth.cancel();
    }
  };

  const toggleVoice = () => {
    const newState = !isVoiceEnabled;
    setIsVoiceEnabled(newState);
    localStorage.setItem("voiceEnabled", String(newState));

    // Anunciar el cambio de estado
    if (synth) {
      synth.cancel();
      const message = newState
        ? "Lector de voz activado"
        : "Lector de voz desactivado";

      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.lang = "es-MX";
        synth.speak(utterance);
      }, 100);
    }
  };

  // Evitar flash de contenido
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <VoiceContext.Provider
      value={{
        isVoiceEnabled,
        toggleVoice,
        speak,
        stopSpeaking,
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoice = () => {
  const context = useContext(VoiceContext);
  if (context === undefined) {
    throw new Error("useVoice must be used within a VoiceProvider");
  }
  return context;
};
