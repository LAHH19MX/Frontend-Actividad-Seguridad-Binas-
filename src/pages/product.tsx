import Head from "next/head";
import { Navbar, Footer } from "@/components/layout";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Check,
  ZoomIn,
  X,
  Package,
  QrCode,
  Box,
} from "lucide-react";

// Mock data - En producción vendría de una API
const productsData = {
  1: {
    id: 1,
    name: "Laptop Lenovo IdeaPad 3",
    description: "Intel Core i5, 16GB RAM, 512GB SSD",
    fullDescription:
      "La Lenovo IdeaPad 3 es una laptop potente y versátil, perfecta para profesionales y estudiantes. Con su procesador Intel Core i7 de 12va generación y 16GB de RAM, ofrece un rendimiento excepcional para multitarea, edición de contenido y gaming ligero.",
    price: 15999,
    originalPrice: 19999,
    discount: 20,
    rating: 4.5,
    reviews: 128,
    images: ["/LENOVO1.jpg", "/LENOVO1.jpg", "/LENOVO1.jpg"],
    category: "computadoras",
    brand: "lenovo",
    inStock: true,
    stock: 10,
    specifications: [
      { label: "Procesador", value: "Intel Core i7-12700H (12th Gen)" },
      { label: "Memoria RAM", value: "16GB DDR5 4800MHz" },
      { label: "Almacenamiento", value: "512GB SSD NVMe M.2" },
      { label: "Pantalla", value: '15.6" FHD (1920x1080) IPS, 120Hz' },
      { label: "Tarjeta Gráfica", value: "NVIDIA GeForce RTX 3050 4GB" },
      { label: "Sistema Operativo", value: "Windows 11 Pro" },
      { label: "Conectividad", value: "WiFi 6E, Bluetooth 5.2" },
      { label: "Puertos", value: "3x USB 3.2, 1x USB-C, HDMI 2.1, RJ45" },
      { label: "Batería", value: "56Wh, hasta 8 horas de uso" },
      { label: "Peso", value: "1.8 kg" },
    ],
    userReviews: [
      {
        id: 1,
        author: "Carlos Méndez",
        rating: 5,
        date: "Hace 2 días",
        comment:
          "Excelente laptop, muy rápida y con gran calidad de construcción. La pantalla es increíble.",
        verified: true,
      },
      {
        id: 2,
        author: "Ana García",
        rating: 4,
        date: "Hace 1 semana",
        comment:
          "Muy buena relación calidad-precio. La batería dura bastante y el rendimiento es excelente.",
        verified: true,
      },
    ],
  },
  2: {
    id: 2,
    name: "Mouse Logitech G203 LIGHTSYNC",
    description: "Ergonómico, 8000 DPI, Bluetooth",
    fullDescription:
      "Mouse gaming de alta precisión con sensor de 8000 DPI y iluminación RGB personalizable. Diseño ergonómico para sesiones largas de juego y trabajo intensivo.",
    price: 1899,
    originalPrice: 2399,
    discount: 21,
    rating: 4.9,
    reviews: 312,
    images: ["/LOGITECH1.jpg", "/LOGITECH1.jpg", "/LOGITECH1.jpg"],
    category: "perifericos",
    brand: "logitech",
    inStock: true,
    stock: 25,
    specifications: [
      { label: "Sensor", value: "Óptico 8000 DPI" },
      { label: "Conectividad", value: "USB / Bluetooth" },
      { label: "Botones", value: "6 programables" },
      { label: "Iluminación", value: "RGB LIGHTSYNC" },
      { label: "Peso", value: "85g" },
      { label: "Compatibilidad", value: "Windows, Mac, Linux" },
      { label: "Cable", value: "USB trenzado 2.1m" },
      { label: "Garantía", value: "2 años" },
    ],
    userReviews: [
      {
        id: 1,
        author: "Roberto Silva",
        rating: 5,
        date: "Hace 3 días",
        comment: "Excelente mouse, muy preciso y cómodo para gaming.",
        verified: true,
      },
      {
        id: 2,
        author: "María López",
        rating: 5,
        date: "Hace 1 semana",
        comment: "La iluminación RGB es hermosa y el sensor es muy preciso.",
        verified: true,
      },
    ],
  },
  3: {
    id: 3,
    name: "Teclado Mecánico Logitech G715",
    description: "Switches mecánicos, RGB, wireless",
    fullDescription:
      "Teclado mecánico premium con switches de alta calidad, iluminación RGB por tecla y conectividad inalámbrica. Perfecto para gaming y productividad con su diseño elegante y duradero.",
    price: 2499,
    originalPrice: 2999,
    discount: 17,
    rating: 4.8,
    reviews: 203,
    images: ["/LOGTEC1.jpg", "/LOGTEC1.jpg", "/LOGTEC1.jpg"],
    category: "perifericos",
    brand: "logitech",
    inStock: true,
    stock: 15,
    specifications: [
      { label: "Switches", value: "Mecánicos GX Brown" },
      { label: "Conectividad", value: "Wireless 2.4GHz / Bluetooth" },
      { label: "Iluminación", value: "RGB por tecla LIGHTSYNC" },
      { label: "Batería", value: "Hasta 30 horas con RGB" },
      { label: "Layout", value: "Español ISO" },
      { label: "Teclas", value: "104 teclas + multimedia" },
      { label: "Reposamuñecas", value: "Incluido, magnético" },
      { label: "Garantía", value: "2 años" },
    ],
    userReviews: [
      {
        id: 1,
        author: "Luis Ramírez",
        rating: 5,
        date: "Hace 5 días",
        comment:
          "El mejor teclado que he tenido. Los switches se sienten increíbles.",
        verified: true,
      },
      {
        id: 2,
        author: "Sandra Torres",
        rating: 4,
        date: "Hace 2 semanas",
        comment: "Excelente calidad, aunque un poco caro. Vale la pena.",
        verified: true,
      },
    ],
  },
  4: {
    id: 4,
    name: "Monitor HP 27 4K UHD",
    description: "Pantalla IPS, 144Hz, HDR400",
    fullDescription:
      "Monitor profesional de 27 pulgadas con resolución 4K UHD, tecnología IPS para colores precisos y tasa de refresco de 144Hz. Ideal para diseño gráfico, edición de video y gaming de alta calidad.",
    price: 8999,
    originalPrice: 10999,
    discount: 18,
    rating: 4.7,
    reviews: 95,
    images: ["/monitor.png", "/monitor.png", "/monitor.png"],
    category: "perifericos",
    brand: "hp",
    inStock: true,
    stock: 8,
    specifications: [
      { label: "Tamaño", value: '27" (68.6 cm)' },
      { label: "Resolución", value: "3840 x 2160 (4K UHD)" },
      { label: "Panel", value: "IPS" },
      { label: "Tasa de refresco", value: "144Hz" },
      { label: "HDR", value: "HDR400" },
      { label: "Tiempo de respuesta", value: "1ms (MPRT)" },
      { label: "Puertos", value: "HDMI 2.1, DisplayPort 1.4, USB-C" },
      { label: "Ajustes", value: "Altura, inclinación, pivote" },
      { label: "Garantía", value: "3 años" },
    ],
    userReviews: [
      {
        id: 1,
        author: "Jorge Martínez",
        rating: 5,
        date: "Hace 1 semana",
        comment:
          "Calidad de imagen impresionante. Perfecto para edición de fotos.",
        verified: true,
      },
      {
        id: 2,
        author: "Patricia Gómez",
        rating: 4,
        date: "Hace 3 semanas",
        comment: "Excelente monitor, los colores son muy precisos.",
        verified: true,
      },
    ],
  },
  5: {
    id: 5,
    name: "Impresora HP LaserJet Pro",
    description: "Multifuncional, WiFi, escáner",
    fullDescription:
      "Impresora láser multifuncional profesional con impresión, escaneo y copia de alta velocidad. Conectividad WiFi y Ethernet para trabajo en red. Ideal para oficinas pequeñas y medianas con alto volumen de impresión.",
    price: 5499,
    originalPrice: 6999,
    discount: 21,
    rating: 4.4,
    reviews: 87,
    images: ["/impresora1.png", "/impresora1.png", "/impresora1.png"],
    category: "impresoras",
    brand: "hp",
    inStock: true,
    stock: 12,
    specifications: [
      { label: "Tecnología", value: "Láser monocromático" },
      { label: "Velocidad", value: "40 ppm (páginas por minuto)" },
      { label: "Resolución", value: "1200 x 1200 dpi" },
      { label: "Funciones", value: "Impresión, Escaneo, Copia" },
      { label: "Conectividad", value: "WiFi, Ethernet, USB" },
      { label: "Dúplex", value: "Automático" },
      { label: "Capacidad papel", value: "250 hojas" },
      { label: "Ciclo mensual", value: "80,000 páginas" },
      { label: "Garantía", value: "1 año" },
    ],
    userReviews: [
      {
        id: 1,
        author: "Fernando Ruiz",
        rating: 5,
        date: "Hace 4 días",
        comment:
          "Muy rápida y eficiente. Perfecta para la oficina, ahorra mucho tiempo.",
        verified: true,
      },
      {
        id: 2,
        author: "Elena Vargas",
        rating: 4,
        date: "Hace 2 semanas",
        comment: "Buena calidad de impresión, fácil de configurar.",
        verified: true,
      },
    ],
  },
  6: {
    id: 6,
    name: "SSD Samsung 980 PRO 1TB",
    description: "NVMe Gen4, 7000MB/s lectura",
    fullDescription:
      "Unidad de estado sólido de alto rendimiento con interfaz PCIe 4.0 NVMe. Velocidades de lectura de hasta 7000MB/s y escritura de hasta 5000MB/s. Perfecto para gamers, creadores de contenido y profesionales que requieren el máximo rendimiento.",
    price: 2999,
    originalPrice: 3799,
    discount: 21,
    rating: 4.9,
    reviews: 445,
    images: ["/samsungimg.png", "/samsungimg.png", "/samsungimg.png"],
    category: "almacenamiento",
    brand: "samsung",
    inStock: true,
    stock: 30,
    specifications: [
      { label: "Capacidad", value: "1TB (1000GB)" },
      { label: "Interfaz", value: "PCIe Gen 4.0 x4, NVMe 1.3c" },
      { label: "Factor de forma", value: "M.2 2280" },
      { label: "Velocidad lectura", value: "Hasta 7000 MB/s" },
      { label: "Velocidad escritura", value: "Hasta 5000 MB/s" },
      { label: "MTBF", value: "1.5 millones de horas" },
      { label: "TBW", value: "600 TB" },
      { label: "Tecnología", value: "V-NAND 3-bit MLC" },
      { label: "Garantía", value: "5 años" },
    ],
    userReviews: [
      {
        id: 1,
        author: "Miguel Ángel",
        rating: 5,
        date: "Hace 2 días",
        comment:
          "Velocidad increíble, Windows arranca en segundos. Altamente recomendado.",
        verified: true,
      },
      {
        id: 2,
        author: "Daniela Castro",
        rating: 5,
        date: "Hace 1 semana",
        comment:
          "El mejor SSD que he comprado. La diferencia de velocidad es notable.",
        verified: true,
      },
    ],
  },
};

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showARView, setShowARView] = useState(false);
  const [activeTab, setActiveTab] = useState("specs");

  // Obtener producto actual con validación de tipo
  const productId = typeof id === "string" ? parseInt(id) : null;
  const product =
    productId && productsData[productId as keyof typeof productsData]
      ? productsData[productId as keyof typeof productsData]
      : null;

  if (!product) {
    return (
      <>
        <Head>
          <title>Producto no encontrado - SySCOM</title>
        </Head>
        <Navbar isAuthenticated={false} />
        <main className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Producto no encontrado</h1>
            <Link
              href="/products"
              className="text-[#329ACF] hover:underline text-lg"
            >
              Volver al catálogo
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const handlePrevImage = () => {
    setSelectedImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      <Head>
        <title>{product.name} - SySCOM</title>
        <meta name="description" content={product.description} />
      </Head>

      <Navbar isAuthenticated={false} />

      <main className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="border-b">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-[#329ACF] transition-colors">
                Inicio
              </Link>
              <span>/</span>
              <Link
                href="/products"
                className="hover:text-[#329ACF] transition-colors"
              >
                Productos
              </Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">{product.name}</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Galería de Imágenes */}
            <div className="space-y-4">
              {/* Imagen Principal */}
              <div className="border shadow-lg rounded-lg overflow-hidden">
                <div className="relative aspect-square bg-gray-100 group">
                  {showARView ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-white">
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-[#329ACF] mb-2">
                          Vista en Realidad Aumentada
                        </h3>
                        <p className="text-gray-600">
                          Escanea el código QR con tu dispositivo móvil
                        </p>
                      </div>
                      {/* QR Code Container */}
                      <div className="bg-white p-6 rounded-2xl shadow-2xl border-4 border-[#329ACF]">
                        <img
                          src="/LAPTOP.png"
                          alt="Código QR para AR"
                          className="w-64 h-64"
                        />
                      </div>

                      <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 mb-4">
                          Apunta la cámara de tu teléfono al código QR para ver
                          el producto en 3D
                        </p>
                        <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                          <QrCode className="h-4 w-4" />
                          <span>Compatible con iOS y Android</span>
                        </div>
                      </div>

                      {/* Close Button */}
                      <button
                        onClick={() => setShowARView(false)}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 border-2 border-[#329ACF]"
                      >
                        <X className="h-5 w-5 text-[#329ACF]" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div
                        className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 cursor-zoom-in ${
                          isZoomed ? "scale-150 cursor-zoom-out" : ""
                        }`}
                        onClick={() => setIsZoomed(!isZoomed)}
                      >
                        <img
                          src={product.images[selectedImage]}
                          alt={product.name}
                          className="w-full h-full object-contain p-8"
                        />
                      </div>

                      {/* Botones de navegación */}
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg z-10"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg z-10"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>

                      {/* Botón de zoom */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsZoomed(!isZoomed);
                        }}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg z-10"
                      >
                        <ZoomIn className="h-5 w-5" />
                      </button>

                      {/* AR View Button */}
                      <button
                        onClick={() => setShowARView(true)}
                        className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-[#329ACF] text-white flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 shadow-lg font-medium z-10"
                      >
                        <Box className="h-4 w-4" />
                        Ver en AR
                      </button>

                      {/* Contador de imágenes */}
                      <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-black/60 text-white text-sm font-medium backdrop-blur-sm">
                        {selectedImage + 1} / {product.images.length}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Miniaturas */}
              {!showARView && (
                <div className="grid grid-cols-5 gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                        selectedImage === index
                          ? "border-[#329ACF] shadow-lg ring-2 ring-[#329ACF]/30"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <img
                          src={image}
                          alt={`Vista ${index + 1}`}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Información del Producto */}
            <div className="space-y-6">
              {/* Título y Rating */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h1 className="text-3xl md:text-4xl font-bold">
                    {product.name}
                  </h1>
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="w-12 h-12 rounded-full border-2 flex items-center justify-center hover:scale-110 transition-all duration-300"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isFavorite ? "fill-red-500 text-red-500" : ""
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium">
                      {product.rating}
                    </span>
                    <span className="text-sm text-gray-600">
                      ({product.reviews} reseñas)
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    En stock
                  </span>
                </div>
              </div>

              <div className="border-t pt-6"></div>

              {/* Precio */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-[#329ACF]">
                    ${product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {product.discount > 0 && (
                    <span className="px-3 py-1 bg-[#329ACF] text-white rounded-full text-sm font-bold">
                      -{product.discount}%
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  IVA incluido. Envío calculado al finalizar la compra.
                </p>
              </div>

              <div className="border-t pt-6"></div>

              {/* Descripción */}
              <div>
                <h3 className="font-semibold text-lg mb-2">Descripción</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.fullDescription}
                </p>
              </div>

              {/* Selector de Cantidad */}
              <div className="space-y-2">
                <label className="font-semibold text-sm">Cantidad</label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-semibold">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.stock} disponibles
                  </span>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="flex gap-3">
                <button className="flex-1 h-12 bg-[#329ACF] hover:bg-[#2E78BF] text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02]">
                  <ShoppingCart className="h-5 w-5" />
                  Agregar al carrito
                </button>
                <button className="h-12 px-4 border-2 rounded-lg hover:bg-gray-50 transition-all duration-300">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>

              <button className="w-full h-12 border-2 border-[#329ACF] text-[#329ACF] hover:bg-[#329ACF] hover:text-white rounded-lg font-semibold transition-all duration-300">
                Comprar ahora
              </button>

              {/* Características */}
              <div className="border rounded-lg p-6 bg-[#329ACF]/5">
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#329ACF]/10 flex items-center justify-center flex-shrink-0">
                      <Truck className="h-5 w-5 text-[#329ACF]" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Envío Gratis</p>
                      <p className="text-xs text-gray-600">
                        En compras +$1,000
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#329ACF]/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="h-5 w-5 text-[#329ACF]" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Garantía 2 años</p>
                      <p className="text-xs text-gray-600">Cobertura total</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#329ACF]/10 flex items-center justify-center flex-shrink-0">
                      <RotateCcw className="h-5 w-5 text-[#329ACF]" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">
                        Devolución 30 días
                      </p>
                      <p className="text-xs text-gray-600">Sin preguntas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sección de Tabs */}
          <div className="mt-16">
            <div className="border-b">
              <div className="flex gap-8">
                <button
                  onClick={() => setActiveTab("specs")}
                  className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                    activeTab === "specs"
                      ? "border-[#329ACF] text-[#329ACF]"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Especificaciones
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                    activeTab === "reviews"
                      ? "border-[#329ACF] text-[#329ACF]"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Reseñas ({product.reviews})
                </button>
                <button
                  onClick={() => setActiveTab("shipping")}
                  className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                    activeTab === "shipping"
                      ? "border-[#329ACF] text-[#329ACF]"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Envío y Devoluciones
                </button>
              </div>
            </div>

            <div className="mt-8">
              {/* Tab Especificaciones */}
              {activeTab === "specs" && (
                <div className="border shadow-lg rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-6">
                    Especificaciones Técnicas
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {product.specifications.map((spec, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-2 h-2 rounded-full bg-[#329ACF] mt-2 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-semibold text-sm mb-1">
                            {spec.label}
                          </p>
                          <p className="text-sm text-gray-600">{spec.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab Reseñas */}
              {activeTab === "reviews" && (
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Resumen de Rating */}
                  <div className="border shadow-lg rounded-lg p-6 text-center">
                    <div className="text-5xl font-bold text-[#329ACF] mb-2">
                      {product.rating}
                    </div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-5 w-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mb-6">
                      Basado en {product.reviews} reseñas
                    </p>

                    <button className="w-full bg-[#329ACF] hover:bg-[#2E78BF] text-white py-2 rounded-lg font-semibold transition-colors">
                      Escribir una reseña
                    </button>
                  </div>

                  {/* Lista de Reseñas */}
                  <div className="lg:col-span-2 space-y-4">
                    {product.userReviews.map((review) => (
                      <div
                        key={review.id}
                        className="border shadow-lg rounded-lg p-6"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold">{review.author}</p>
                              {review.verified && (
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center gap-1">
                                  <Check className="h-3 w-3" />
                                  Verificado
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-600">
                              {review.date}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab Envío */}
              {activeTab === "shipping" && (
                <div className="border shadow-lg rounded-lg p-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4">
                      Información de Envío
                    </h3>
                    <div className="space-y-3 text-sm text-gray-600">
                      <p>• Envío gratis en compras mayores a $1,000 MXN</p>
                      <p>• Entrega en 24-48 horas en área metropolitana</p>
                      <p>• Entrega en 3-5 días hábiles en el resto del país</p>
                      <p>• Rastreo en tiempo real de tu pedido</p>
                    </div>
                  </div>

                  <div className="border-t pt-6"></div>

                  <div>
                    <h3 className="text-xl font-bold mb-4">
                      Política de Devoluciones
                    </h3>
                    <div className="space-y-3 text-sm text-gray-600">
                      <p>• 30 días para devoluciones sin costo adicional</p>
                      <p>• El producto debe estar en su empaque original</p>
                      <p>• Reembolso completo o cambio por otro producto</p>
                      <p>• Proceso de devolución simple y rápido</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
