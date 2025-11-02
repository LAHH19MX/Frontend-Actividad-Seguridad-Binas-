import Head from "next/head";
import { Navbar, Footer, CTA } from "@/components/layout";
import {
  Zap,
  Shield,
  Headphones,
  TrendingUp,
  Monitor,
  Package,
  Settings,
  Headset,
  Star,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  // Prueba con usuario NO autenticado
  const isAuthenticated = false;

  // Para probar con usuario autenticado, descomentar:
  // const isAuthenticated = true;
  // const user = { name: "Juan Pérez", role: "CLIENTE" as const };
  // const user = { name: "Admin", role: "ADMIN" as const };

  return (
    <>
      <Head>
        <title>Sistema de Autenticación Seguro</title>
        <meta name="description" content="Proyecto de Seguridad" />
      </Head>

      {/* Navbar */}
      <Navbar
        isAuthenticated={isAuthenticated}
        // user={user}
        onLogout={() => {
          console.log("Cerrando sesión...");
          alert("Sesión cerrada");
        }}
      />

      {/* Contenido principal */}
      <main className="min-h-screen bg-gradient-to-br from-white to-white">
        <section className="bg-gradient-to-r from-[#4facdb] to-[#2980b9] py-16 p-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Texto */}
              <div className="text-white">
                <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  🎉 Promoción
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Componentes para Gaming
                </h1>
                <p className="text-lg mb-6 text-white/90">
                  Arma tu PC gamer con los mejores componentes a precios
                  increíbles.
                </p>
                <button className="bg-white text-[#2980b9] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-2">
                  Ver Componentes
                  <ArrowRight size={20} />
                </button>
              </div>

              {/* Imagen ilustrativa */}
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <div className="aspect-video bg-gradient-to-br from-white/20 to-white/5 rounded-lg flex items-center justify-center">
                    <img src="/banner.png" alt="" height={120} />
                  </div>
                  <div className="absolute top-4 right-4 bg-white text-[#2980b9] px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                    Hasta 12 MSI
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CARACTERÍSTICAS - 4 Bloques */}
        <section className="py-12 bg-white p-14">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Envío Rápido */}
              <div className="text-center border p-10 mt-5 mb-5 rounded-xl shadow-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Zap className="w-8 h-8 text-[#3498db]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Envío Rápido</h3>
                <p className="text-gray-600 text-sm">
                  Entrega en 24-48 horas en área metropolitana
                </p>
              </div>

              {/* Garantía Extendida */}
              <div className="text-center border p-10 mt-5 mb-5 rounded-xl shadow-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Shield className="w-8 h-8 text-[#3498db]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Garantía Extendida
                </h3>
                <p className="text-gray-600 text-sm">
                  Todos nuestros productos con garantía oficial
                </p>
              </div>

              {/* Soporte 24/7 */}
              <div className="text-center border p-10 mt-5 mb-5 rounded-xl shadow-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Headphones className="w-8 h-8 text-[#3498db]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Soporte 24/7</h3>
                <p className="text-gray-600 text-sm">
                  Atención al cliente siempre disponible
                </p>
              </div>

              {/* Mejores Precios */}
              <div className="text-center border p-10 mt-5 mb-5 rounded-xl shadow-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <TrendingUp className="w-8 h-8 text-[#3498db]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Mejores Precios</h3>
                <p className="text-gray-600 text-sm">
                  Precios competitivos y promociones constantes
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORÍAS PRINCIPALES */}
        <section className="py-16 bg-gray-50 p-14">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Categorías Principales
              </h2>
              <p className="text-gray-600">
                Encuentra todo lo que necesitas para tu negocio
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {/* Computadoras */}
              <div className="group cursor-pointer border shadow-lg rounded-lg overflow-hidden transition-all hover:shadow-2xl">
                <div className="bg-gradient-to-br from-[#5dade2] to-[#3498db] py-20 px-12 text-center transition-transform hover:scale-105">
                  <Monitor
                    className="w-20 h-28 text-white mx-auto"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="p-4 transition-all group-hover:bg-gray-50 mt-2 m-2">
                  <h3 className="text-lg font-semibold text-center">
                    Computadoras
                  </h3>
                  <p className="text-gray-600 text-sm text-center">
                    Laptops, desktops y workstations
                  </p>
                </div>
              </div>

              {/* Componentes */}
              <div className="group cursor-pointer border shadow-lg rounded-lg overflow-hidden transition-all hover:shadow-2xl">
                <div className="bg-gradient-to-br from-[#5dade2] to-[#2e86c1] py-20 px-12 text-center transition-transform hover:scale-105">
                  <Package
                    className="w-20 h-28 text-white mx-auto"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="p-4 transition-all group-hover:bg-gray-50 mt-2 m-2">
                  <h3 className="text-lg font-semibold text-center">
                    Componentes
                  </h3>
                  <p className="text-gray-600 text-sm text-center">
                    Hardware y partes de computadora
                  </p>
                </div>
              </div>

              {/* Servicios Técnicos */}
              <div className="group cursor-pointer border shadow-lg rounded-lg overflow-hidden transition-all hover:shadow-2xl">
                <div className="bg-gradient-to-br from-[#5499c7] to-[#2874a6] py-20 px-12 text-center transition-transform hover:scale-105">
                  <Settings
                    className="w-20 h-28 text-white mx-auto"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="p-4 transition-all group-hover:bg-gray-50 mt-2 m-2">
                  <h3 className="text-lg font-semibold text-center">
                    Servicios Técnicos
                  </h3>
                  <p className="text-gray-600 text-sm text-center">
                    Reparación y mantenimiento
                  </p>
                </div>
              </div>

              {/* Periféricos */}
              <div className="group cursor-pointer border shadow-lg rounded-lg overflow-hidden transition-all hover:shadow-2xl">
                <div className="bg-gradient-to-br from-[#5499c7] to-[#1f618d] py-20 px-12 text-center transition-transform hover:scale-105">
                  <Headset
                    className="w-20 h-28 text-white mx-auto"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="p-4 transition-all group-hover:bg-gray-50 mt-2 m-2">
                  <h3 className="text-lg font-semibold text-center">
                    Periféricos
                  </h3>
                  <p className="text-gray-600 text-sm text-center">
                    Teclados, mouse, monitores y más
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCTOS DESTACADOS */}
        <section className="py-16 bg-white p-14 mb-5">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  Productos Destacados
                </h2>
                <p className="text-gray-600">Los más vendidos de la semana</p>
              </div>
              <button className="text-[#3498db] hover:text-[#2980b9] font-semibold flex items-center gap-2">
                Ver todos
                <ArrowRight size={20} />
              </button>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {/* Producto 1 */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <div className="absolute top-3 left-3 bg-[#3498db] text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                    -20%
                  </div>
                  <div className="aspect-square bg-gray-100 flex items-center justify-center p-8">
                    <img
                      src="/img1.png"
                      alt="Producto 1"
                      width={500}
                      height={500}
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 mb-2">
                    <Star
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <Star
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <Star
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <Star
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <Star
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <span className="text-sm text-gray-600 ml-1">(128)</span>
                  </div>
                  <h3 className="font-semibold mb-1 text-gray-900">
                    Laptop Dell Inspiron 15
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Intel Core i7, 16GB RAM, 512GB SSD
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-[#3498db]">
                      $15,999
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      $19,999
                    </span>
                  </div>
                  <button className="w-full bg-[#3498db] text-white py-2 rounded-lg font-semibold hover:bg-[#2980b9] transition-colors flex items-center justify-center gap-2">
                    <ShoppingCart size={18} />
                    Agregar al carrito
                  </button>
                </div>
              </div>

              {/* Producto 2 */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <div className="absolute top-3 left-3 bg-[#3498db] text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                    -20%
                  </div>
                  <div className="aspect-square bg-gray-100 flex items-center justify-center p-8">
                    <img
                      src="/img1.png"
                      alt="Producto 1"
                      width={500}
                      height={500}
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 mb-2">
                    <Star
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <Star
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <Star
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <Star
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <Star
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <span className="text-sm text-gray-600 ml-1">(128)</span>
                  </div>
                  <h3 className="font-semibold mb-1 text-gray-900">
                    Laptop Dell Inspiron 15
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Intel Core i7, 16GB RAM, 512GB SSD
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-[#3498db]">
                      $15,999
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      $19,999
                    </span>
                  </div>
                  <button className="w-full bg-[#3498db] text-white py-2 rounded-lg font-semibold hover:bg-[#2980b9] transition-colors flex items-center justify-center gap-2">
                    <ShoppingCart size={18} />
                    Agregar al carrito
                  </button>
                </div>
              </div>

              {/* Producto 3 */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <div className="absolute top-3 left-3 bg-[#3498db] text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                    -20%
                  </div>
                  <div className="aspect-square bg-gray-100 flex items-center justify-center p-8">
                    <img
                      src="/img1.png"
                      alt="Producto 1"
                      width={500}
                      height={500}
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 mb-2">
                    <Star
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <Star
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <Star
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <Star
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <Star
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <span className="text-sm text-gray-600 ml-1">(128)</span>
                  </div>
                  <h3 className="font-semibold mb-1 text-gray-900">
                    Laptop Dell Inspiron 15
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Intel Core i7, 16GB RAM, 512GB SSD
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-[#3498db]">
                      $15,999
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      $19,999
                    </span>
                  </div>
                  <button className="w-full bg-[#3498db] text-white py-2 rounded-lg font-semibold hover:bg-[#2980b9] transition-colors flex items-center justify-center gap-2">
                    <ShoppingCart size={18} />
                    Agregar al carrito
                  </button>
                </div>
              </div>

              {/* Producto 4 */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <div className="absolute top-3 left-3 bg-[#3498db] text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                    -20%
                  </div>
                  <div className="aspect-square bg-gray-100 flex items-center justify-center p-8">
                    <img
                      src="/img1.png"
                      alt="Producto 1"
                      width={500}
                      height={500}
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 mb-2">
                    <Star
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <Star
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <Star
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <Star
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <Star
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <span className="text-sm text-gray-600 ml-1">(128)</span>
                  </div>
                  <h3 className="font-semibold mb-1 text-gray-900">
                    Laptop Dell Inspiron 15
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Intel Core i7, 16GB RAM, 512GB SSD
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-[#3498db]">
                      $15,999
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      $19,999
                    </span>
                  </div>
                  <button className="w-full bg-[#3498db] text-white py-2 rounded-lg font-semibold hover:bg-[#2980b9] transition-colors flex items-center justify-center gap-2">
                    <ShoppingCart size={18} />
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* CTA*/}
      <CTA />
      {/* Footer */}
      <Footer />
    </>
  );
}
