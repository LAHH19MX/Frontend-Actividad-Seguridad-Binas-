import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { VoiceProvider } from "@/context/VoiceContext";
import dynamic from "next/dynamic";

const AccessibilityButtons = dynamic(
  () => import("@/components/ui/AccessibilityButtons"),
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <VoiceProvider>
        <AuthProvider>
          <AccessibilityButtons />
          <Component {...pageProps} />
        </AuthProvider>
      </VoiceProvider>
    </ThemeProvider>
  );
}
