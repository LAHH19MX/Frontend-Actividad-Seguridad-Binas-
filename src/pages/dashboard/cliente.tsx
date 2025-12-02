import { useState } from "react";
import Head from "next/head";
import { Navbar, Footer } from "@/components/layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { ShoppingCart, Heart, Package } from "lucide-react";

export default function DashboardCliente() {
  const { user, logout } = useAuth();
  const [showConfig, setShowConfig] = useState(false);

  // Datos simulados
  const stats = [
    {
      icon: <Package className="w-8 h-8 text-[#3498db]" />,
      label: "Pedidos",
      value: "12",
      bg: "bg-blue-50",
    },
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      label: "Favoritos",
      value: "8",
      bg: "bg-red-50",
    },
    {
      icon: <ShoppingCart className="w-8 h-8 text-green-500" />,
      label: "Carrito",
      value: "3",
      bg: "bg-green-50",
    },
  ];

  const recentOrders = [
    {
      id: "#ORD-2024-001",
      product: "Laptop Dell Inspiron 15",
      date: "15 Oct 2024",
      status: "Entregado",
      total: "$15,999",
      statusColor: "text-green-600 bg-green-50",
    },
    {
      id: "#ORD-2024-002",
      product: "Mouse Logitech MX Master 3",
      date: "20 Oct 2024",
      status: "En tránsito",
      total: "$1,499",
      statusColor: "text-blue-600 bg-blue-50",
    },
    {
      id: "#ORD-2024-003",
      product: "Teclado Mecánico Keychron K2",
      date: "25 Oct 2024",
      status: "Procesando",
      total: "$2,299",
      statusColor: "text-yellow-600 bg-yellow-50",
    },
  ];

  // Vista de Configuración
  if (showConfig) {
    return (
      <ProtectedRoute requireAuth={true} requireRole="CLIENTE">
        <Head>
          <title>Mi Perfil - SySCOM</title>
        </Head>

        <Navbar
          isAuthenticated={true}
          user={{ name: user?.name || "", role: "CLIENTE" }}
          onLogout={logout}
        />

        <div className="min-h-screen bg-gray-50 py-8 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <button
                onClick={() => setShowConfig(false)}
                className="text-[#3498db] hover:text-[#2980b9] font-medium mb-4 flex items-center gap-2"
              >
                Volver
              </button>
              <h1 className="text-3xl font-bold text-gray-900">
                Configuración de Cuenta
              </h1>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#3498db] to-[#2980b9] rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {user?.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {user?.name}
                  </h2>
                  <p className="text-gray-600">Cliente</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border-t pt-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    ID de Usuario
                  </label>
                  <p className="text-gray-900">{user?.id}</p>
                </div>

                <div className="border-t pt-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Correo Electrónico
                  </label>
                  <p className="text-gray-900">{user?.email}</p>
                </div>

                <div className="border-t pt-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <p className="text-gray-900">{user?.phone}</p>
                </div>

                <div className="border-t pt-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Rol
                  </label>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {user?.role}
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t">
                <button
                  onClick={logout}
                  className="w-full px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </ProtectedRoute>
    );
  }

  // Vista Principal Dashboard
  return (
    <ProtectedRoute requireAuth={true} requireRole="CLIENTE">
      <Head>
        <title>Dashboard Cliente - SySCOM</title>
      </Head>

      <Navbar
        isAuthenticated={true}
        user={{ name: user?.name || "", role: "CLIENTE" }}
        onLogout={logout}
      />

      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Bienvenido, {user?.name}
            </h1>
            <p className="text-gray-600">
              Este es tu panel de control personal
            </p>
          </div>

          <div className="mb-6">
            <button
              onClick={() => setShowConfig(true)}
              className="px-6 py-2 bg-[#3498db] text-white rounded-lg font-semibold hover:bg-[#2980b9] transition-colors"
            >
              Ver Configuración
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`${stat.bg} p-4 rounded-lg`}>{stat.icon}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Últimos Pedidos
              </h2>
              <button className="text-[#3498db] hover:text-[#2980b9] font-semibold">
                Ver todos →
              </button>
            </div>

            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-[#3498db] transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {order.product}
                      </p>
                      <p className="text-sm text-gray-600">{order.id}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${order.statusColor}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>📅 {order.date}</span>
                    <span className="font-bold text-[#3498db]">
                      {order.total}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </ProtectedRoute>
  );
}
