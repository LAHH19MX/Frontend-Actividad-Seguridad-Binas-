import Head from "next/head";
import Link from "next/link";
import { Navbar, Footer } from "@/components/layout";

export default function Privacidad() {
  return (
    <>
      <Head>
        <title>Política de Privacidad - SySCOM</title>
        <meta
          name="description"
          content="Política de privacidad de SySCOM - Protección de datos personales"
        />
      </Head>

      <Navbar />

      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Política de Privacidad
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
              {/* 1. Introducción */}
              <section className="border-l-4 border-[#3498db] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  1. Introducción
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    En <strong>SySCOM</strong>, valoramos y respetamos su
                    privacidad. Esta política describe cómo recopilamos, usamos
                    y protegemos su información personal.
                  </p>
                </div>
              </section>

              {/* 2. Información que Recopilamos */}
              <section className="border-l-4 border-[#3498db] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  2. Información que Recopilamos
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>Recopilamos los siguientes tipos de información:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Información personal:</strong> nombre, email,
                      teléfono, dirección
                    </li>
                    <li>
                      <strong>Información de compras:</strong> historial de
                      pedidos, productos adquiridos
                    </li>
                    <li>
                      <strong>Información técnica:</strong> dirección IP, tipo
                      de dispositivo, navegador
                    </li>
                    <li>
                      <strong>Información de pago:</strong> procesada de forma
                      segura por nuestros socios
                    </li>
                  </ul>
                </div>
              </section>

              {/* 3. Uso de la Información */}
              <section className="border-l-4 border-[#3498db] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  3. Uso de la Información
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>Utilizamos su información para:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Procesar y gestionar sus pedidos</li>
                    <li>Proporcionar soporte técnico y servicio al cliente</li>
                    <li>
                      Enviar actualizaciones sobre productos y promociones
                    </li>
                    <li>Mejorar nuestros servicios y experiencia de usuario</li>
                    <li>Cumplir con obligaciones legales y regulatorias</li>
                  </ul>
                </div>
              </section>

              {/* 4. Protección de Datos */}
              <section className="border-l-4 border-[#3498db] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  4. Protección de Datos
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Implementamos medidas de seguridad técnicas y organizativas
                    para proteger su información contra acceso no autorizado,
                    alteración o destrucción.
                  </p>
                  <p>
                    Utilizamos encriptación SSL para proteger la transmisión de
                    datos sensibles y almacenamos la información en servidores
                    seguros.
                  </p>
                </div>
              </section>

              {/* 5. Compartir Información */}
              <section className="border-l-4 border-[#3498db] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  5. Compartir Información
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    No vendemos ni alquilamos su información personal a
                    terceros. Podemos compartir información con:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Proveedores de servicios de pago</li>
                    <li>Empresas de transporte para entregas</li>
                    <li>Proveedores de servicios técnicos</li>
                    <li>Autoridades cuando lo requiera la ley</li>
                  </ul>
                </div>
              </section>

              {/* 6. Cookies y Tecnologías Similares */}
              <section className="border-l-4 border-[#3498db] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  6. Cookies y Tecnologías Similares
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Utilizamos cookies para mejorar su experiencia de
                    navegación, analizar el tráfico del sitio y personalizar
                    contenido.
                  </p>
                  <p>
                    Puede controlar el uso de cookies a través de la
                    configuración de su navegador.
                  </p>
                </div>
              </section>

              {/* 7. Sus Derechos */}
              <section className="border-l-4 border-[#3498db] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  7. Sus Derechos
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>Usted tiene derecho a:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Acceder a su información personal</li>
                    <li>Rectificar información inexacta</li>
                    <li>Eliminar su información personal</li>
                    <li>Oponerse al procesamiento de sus datos</li>
                    <li>Portabilidad de datos</li>
                  </ul>
                </div>
              </section>

              {/* 8. Retención de Datos */}
              <section className="border-l-4 border-[#3498db] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  8. Retención de Datos
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Conservamos su información personal solo durante el tiempo
                    necesario para los fines descritos en esta política, a menos
                    que la ley requiera un período de retención más largo.
                  </p>
                </div>
              </section>

              {/* 9. Menores de Edad */}
              <section className="border-l-4 border-[#3498db] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  9. Menores de Edad
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Nuestros servicios no están dirigidos a menores de 18 años.
                    No recopilamos conscientemente información de menores.
                  </p>
                </div>
              </section>

              {/* 10. Cambios a esta Política */}
              <section className="border-l-4 border-[#3498db] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  10. Cambios a esta Política
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Podemos actualizar esta política periódicamente. Las
                    modificaciones se publicarán en esta página con la fecha de
                    actualización.
                  </p>
                </div>
              </section>

              {/* 11. Contacto */}
              <section className="border-l-4 border-[#3498db] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  11. Contacto
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Para ejercer sus derechos o realizar consultas sobre
                    privacidad, contáctenos en:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Email: privacidad@syscom.com</li>
                    <li>Teléfono: +52 123 456 7890</li>
                    <li>
                      Responsable de Protección de Datos: Departamento Legal
                      SySCOM
                    </li>
                  </ul>
                </div>
              </section>

              {/* Aviso Final */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2">
                      Su privacidad es importante
                    </h3>
                    <p className="text-green-800 text-sm">
                      Estamos comprometidos con la protección de sus datos
                      personales y el cumplimiento de las leyes aplicables de
                      protección de datos.
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
