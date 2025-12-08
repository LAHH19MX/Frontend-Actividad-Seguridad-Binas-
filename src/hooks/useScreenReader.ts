import { useEffect } from "react";
import { useVoice } from "@/context/VoiceContext";

export const useScreenReader = () => {
  const { isVoiceEnabled, speak, stopSpeaking } = useVoice();

  useEffect(() => {
    if (!isVoiceEnabled) return;

    const getElementDescription = (element: HTMLElement): string => {
      const ariaLabel = element.getAttribute("aria-label");
      if (ariaLabel) return ariaLabel;

      // Para inputs, buscar label asociado
      if (
        element instanceof HTMLInputElement ||
        element instanceof HTMLTextAreaElement
      ) {
        const id = element.id;
        if (id) {
          const label = document.querySelector(`label[for="${id}"]`);
          if (label?.textContent) {
            const type =
              element.type === "password"
                ? "contraseña"
                : element.type === "email"
                ? "correo electrónico"
                : element.type === "number"
                ? "número"
                : element.type === "tel"
                ? "teléfono"
                : "texto";
            return `${label.textContent.trim()}, campo de ${type}`;
          }
        }

        const placeholder = element.placeholder;
        if (placeholder) {
          const type =
            element.type === "password"
              ? "contraseña"
              : element.type === "email"
              ? "correo electrónico"
              : "texto";
          return `${placeholder}, campo de ${type}`;
        }
      }

      // Para botones
      if (element instanceof HTMLButtonElement) {
        const text = element.textContent?.trim();
        if (text) return `Botón: ${text}`;
        return "Botón";
      }

      // Para links - MEJORADO: Leer el texto del enlace
      if (element instanceof HTMLAnchorElement) {
        // Caso especial: Logo de la empresa
        const hasLogo = element.querySelector(
          'img[alt*="SySCOM"], img[src*="logo"]'
        );
        if (hasLogo) {
          return "Enlace: Logo de SySCOM";
        }

        // Caso especial: Redes sociales (por SVG o iconos)
        const hasSocialIcon = element.querySelector("svg");
        if (
          hasSocialIcon &&
          element.getAttribute("href")?.includes("facebook")
        ) {
          return "Enlace: Facebook";
        }
        if (
          hasSocialIcon &&
          (element.getAttribute("href")?.includes("twitter") ||
            element.getAttribute("href")?.includes("x.com"))
        ) {
          return "Enlace: Twitter";
        }
        if (
          hasSocialIcon &&
          element.getAttribute("href")?.includes("instagram")
        ) {
          return "Enlace: Instagram";
        }
        if (
          hasSocialIcon &&
          element.getAttribute("href")?.includes("linkedin")
        ) {
          return "Enlace: LinkedIn";
        }
        if (
          hasSocialIcon &&
          element.getAttribute("href")?.includes("youtube")
        ) {
          return "Enlace: YouTube";
        }
        // Si tiene SVG pero no identificamos la red social
        if (hasSocialIcon && !element.textContent?.trim()) {
          return "Enlace: Red social";
        }

        const text = element.textContent?.trim();
        if (text) return `Enlace: ${text}`;

        const title = element.getAttribute("title");
        if (title) return `Enlace: ${title}`;

        return "Enlace";
      }

      // Para imágenes
      if (element instanceof HTMLImageElement) {
        const alt = element.alt;
        if (alt) return `Imagen: ${alt}`;
        return "Imagen";
      }

      // Para cards de productos - MEJORADO para tu estructura específica
      // Validar que classList sea un string válido
      let classList = "";
      try {
        classList =
          typeof element.className === "string" ? element.className : "";
      } catch (e) {
        classList = "";
      }

      const isProductCard =
        (classList && classList.includes("card")) ||
        (classList && classList.includes("product")) ||
        (element.classList?.contains("bg-white") &&
          element.classList?.contains("border") &&
          element.classList?.contains("rounded-lg")) ||
        element.getAttribute("role") === "article" ||
        element.tagName.toLowerCase() === "article";

      if (isProductCard) {
        // Buscar título (h1-h6 o elemento con font-semibold)
        const heading = element.querySelector(
          "h1, h2, h3, h4, h5, h6, .font-semibold"
        );
        const titleText = heading?.textContent?.trim();

        if (titleText) {
          // Buscar precio (elemento con $ o clase price/precio)
          const priceElement = element.querySelector(
            '[class*="price"], [class*="precio"], .text-2xl, .font-bold'
          );
          let price = "";

          if (priceElement) {
            const priceText = priceElement.textContent?.trim();
            if (priceText?.includes("$")) {
              price = priceText.split("$")[1]?.trim() || priceText;
            }
          }

          // Buscar descuento
          const discountElement = element.querySelector(
            '.absolute.top-3.left-3, [class*="descuento"]'
          );
          const discount = discountElement?.textContent?.trim();

          // Construir descripción completa
          let description = `Producto: ${titleText}`;
          if (price) {
            description += `, Precio: $${price}`;
          }
          if (discount) {
            description += `, ${discount} de descuento`;
          }

          return description;
        }

        // Fallback: Si no hay heading específico, buscar texto general
        const allText = element.textContent?.trim();
        if (allText && allText.length < 200) {
          // Extraer solo las primeras 2 líneas relevantes
          const lines = allText
            .split("\n")
            .map((l) => l.trim())
            .filter((l) => l.length > 0);
          if (lines.length > 0) {
            return `Producto: ${lines[0]}`;
          }
        }
      }

      const title = element.getAttribute("title");
      if (title) return title;

      const text = element.textContent?.trim();
      if (text && text.length < 100) return text;

      const tagName = element.tagName.toLowerCase();
      const typeMap: Record<string, string> = {
        input: "campo de entrada",
        textarea: "área de texto",
        select: "menú de selección",
        button: "botón",
        a: "enlace",
        img: "imagen",
        nav: "navegación",
        header: "encabezado",
        footer: "pie de página",
        main: "contenido principal",
        section: "sección",
        article: "artículo",
      };

      return typeMap[tagName] || `elemento ${tagName}`;
    };

    const handleFocus = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      if (!target) return;

      if (target.getAttribute("aria-hidden") === "true") return;
      if (window.getComputedStyle(target).display === "none") return;

      const description = getElementDescription(target);
      if (description) {
        setTimeout(() => speak(description), 100);
      }
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target) return;

      if (
        target instanceof HTMLButtonElement ||
        target instanceof HTMLAnchorElement ||
        target.getAttribute("role") === "button"
      ) {
        const description = getElementDescription(target);
        if (description) {
          speak(`Activado: ${description}`);
        }
      }
    };

    // Nuevo: Manejar hover del mouse
    const handleMouseEnter = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target || !target.getAttribute) return;

      if (target.getAttribute("aria-hidden") === "true") return;
      if (window.getComputedStyle(target).display === "none") return;

      // Solo leer elementos interactivos en hover
      if (
        target instanceof HTMLButtonElement ||
        target instanceof HTMLAnchorElement ||
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target.getAttribute("role") === "button" ||
        target.getAttribute("role") === "link"
      ) {
        const description = getElementDescription(target);
        if (description) {
          setTimeout(() => speak(description), 50);
        }
        return;
      }

      // NUEVO: Detectar si pasamos sobre una card de producto
      // Validar que classList sea un string válido
      let classList = "";
      try {
        classList =
          typeof target.className === "string" ? target.className : "";
      } catch (e) {
        classList = "";
      }

      const isProductCard =
        (classList && classList.includes("card")) ||
        (classList && classList.includes("product")) ||
        (target.classList?.contains("bg-white") &&
          target.classList?.contains("border") &&
          target.classList?.contains("rounded-lg"));

      if (isProductCard) {
        const description = getElementDescription(target);
        if (description && description.startsWith("Producto:")) {
          setTimeout(() => speak(description), 50);
        }
      }
    };

    document.addEventListener("focusin", handleFocus);
    document.addEventListener("click", handleClick);
    document.addEventListener("mouseenter", handleMouseEnter, true);

    return () => {
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      stopSpeaking();
    };
  }, [isVoiceEnabled, speak, stopSpeaking]);
};
