import Head from "next/head";
import Link from "next/link";
import { Navbar, Footer } from "@/components/layout";

export default function Terminos() {
  return (
    <>
      <Head>
        <title>Términos y Condiciones - SySCOM</title>
        <meta
          name="description"
          content="Términos y condiciones de SySCOM - Tu tienda de tecnología"
        />
      </Head>

      <Navbar />

      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Términos y Condiciones
              </h1>
              <p className="text-gray-600 text-lg">
                Última actualización:{" "}
                {new Date().toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            {/* Contenido */}
            <div className="space-y-8">
              {/* 1. Aceptación de Términos */}
              <section className="border-l-4 border-[#3498db] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  1. Aceptación de los Términos
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Al acceder y utilizar los servicios de{" "}
                    <strong>SySCOM</strong>, usted acepta estar sujeto a estos
                    términos y condiciones. Si no está de acuerdo con alguna
                    parte de estos términos, no podrá acceder a nuestros
                    servicios.
                  </p>
                  <p>
                    Nos reservamos el derecho de actualizar estos términos en
                    cualquier momento. Las modificaciones entrarán en vigor
                    inmediatamente después de su publicación en nuestro sitio
                    web.
                  </p>
                </div>
              </section>

              {/* 2. Descripción del Servicio */}
              <section className="border-l-4 border-[#3498db] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  2. Descripción del Servicio
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    <strong>SySCOM</strong> es una empresa especializada en la
                    venta de productos tecnológicos incluyendo:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Laptops y computadoras de escritorio</li>
                    <li>Impresoras y equipos de oficina</li>
                    <li>Componentes de hardware</li>
                    <li>Dispositivos de almacenamiento</li>
                    <li>Cámaras y equipos de fotografía</li>
                    <li>Servicios de mantenimiento técnico</li>
                  </ul>
                </div>
              </section>

              {/* 3. Registro de Usuario */}
              <section className="border-l-4 border-[#3498db] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  3. Registro de Usuario
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Para realizar compras y acceder a ciertas funcionalidades,
                    deberá registrarse proporcionando información veraz y
                    actualizada.
                  </p>
                  <p>
                    Usted es responsable de mantener la confidencialidad de su
                    cuenta y contraseña, y de restringir el acceso a su equipo.
                  </p>
                </div>
              </section>

              {/* 4. Política de Compras */}
              <section className="border-l-4 border-[#3498db] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  4. Política de Compras
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Los precios están sujetos a cambio sin previo aviso. Nos
                    reservamos el derecho de modificar o descontinuar productos.
                  </p>
                  <p>
                    Todas las compras están sujetas a disponibilidad de
                    inventario. En caso de agotamiento, nos contactaremos para
                    ofrecer alternativas.
                  </p>
                </div>
              </section>

              {/* 5. Garantías y Devoluciones */}
              <section className="border-l-4 border-[#3498db] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  5. Garantías y Devoluciones
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Todos nuestros productos cuentan con garantía del
                    fabricante. Los términos específicos varían según el
                    producto.
                  </p>
                  <p>
                    Aceptamos devoluciones dentro de los primeros 15 días
                    posteriores a la compra, siempre que el producto esté en su
                    empaque original y sin señales de uso.
                  </p>
                </div>
              </section>

              {/* 6. Propiedad Intelectual */}
              <section className="border-l-4 border-[#3498db] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  6. Propiedad Intelectual
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Todo el contenido del sitio web, incluyendo logotipos,
                    textos, gráficos y software, es propiedad de{" "}
                    <strong>SySCOM</strong>y está protegido por leyes de
                    propiedad intelectual.
                  </p>
                </div>
              </section>

              {/* 7. Limitación de Responsabilidad */}
              <section className="border-l-4 border-[#3498db] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  7. Limitación de Responsabilidad
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    <strong>SySCOM</strong> no será responsable por daños
                    indirectos, incidentales o consecuentes resultantes del uso
                    o la imposibilidad de uso de nuestros productos.
                  </p>
                </div>
              </section>

              {/* 8. Servicios Técnicos */}
              <section className="border-l-4 border-[#3498db] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  8. Servicios Técnicos
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Los servicios de mantenimiento y reparación están sujetos a
                    disponibilidad y pueden requerir diagnóstico previo.
                  </p>
                  <p>
                    No nos hacemos responsables por datos perdidos durante
                    procesos de reparación. Recomendamos realizar backup previo
                    al servicio técnico.
                  </p>
                </div>
              </section>

              {/* 9. Ley Aplicable */}
              <section className="border-l-4 border-[#3498db] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  9. Ley Aplicable
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Estos términos se rigen por las leyes de México. Cualquier
                    disputa será resuelta en los tribunales competentes de
                    nuestra jurisdicción.
                  </p>
                </div>
              </section>

              {/* 10. Contacto */}
              <section className="border-l-4 border-[#3498db] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  10. Contacto
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Para preguntas sobre estos términos, contáctenos a través
                    de:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Email: legal@syscom.com</li>
                    <li>Teléfono: +52 123 456 7890</li>
                    <li>Dirección: Av. Tecnología #123, Ciudad Tecnológica</li>
                  </ul>
                </div>
              </section>

              {/* Aviso Final */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">
                      Importante
                    </h3>
                    <p className="text-blue-800 text-sm">
                      Al utilizar nuestros servicios, usted reconoce haber
                      leído, entendido y aceptado estos términos y condiciones
                      en su totalidad.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Link de regreso */}
            <div className="mt-12 pt-6 border-t border-gray-200 text-center">
              <Link
                href="/"
                className="text-[#3498db] hover:text-[#2980b9] font-semibold"
              >
                Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
