import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Footer } from "@/components/layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import {
  Home,
  Users,
  Package,
  FileText,
  Bell,
  User,
  Clock,
  Truck,
  CheckCircle,
  DollarSign,
} from "lucide-react";

export default function DashboardAdmin() {
  const { user, logout } = useAuth();
  const [currentView, setCurrentView] = useState<"dashboard" | "config">(
    "dashboard"
  );
  const [activeMenu, setActiveMenu] = useState("inicio");
  const [showDropdown, setShowDropdown] = useState(false);

  // Datos simulados
  const stats = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      label: "Ventas del Mes",
      value: "$248,500",
      change: "+12.5%",
      bg: "from-green-400 to-green-600",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      label: "Pendientes",
      value: "24",
      change: "-5%",
      bg: "from-yellow-400 to-yellow-600",
    },
    {
      icon: <Truck className="w-8 h-8" />,
      label: "En Tránsito",
      value: "15",
      change: "+8%",
      bg: "from-blue-400 to-blue-600",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      label: "Entregados",
      value: "342",
      change: "+18%",
      bg: "from-purple-400 to-purple-600",
    },
  ];

  const recentOrders = [
    {
      id: "#ORD-2024-045",
      customer: "Juan Pérez",
      product: "Laptop Dell Inspiron 15",
      date: "01 Nov 2024",
      status: "Entregado",
      total: "$15,999",
      statusColor: "text-green-600 bg-green-50",
    },
    {
      id: "#ORD-2024-046",
      customer: "María García",
      product: "Mouse Logitech MX Master",
      date: "01 Nov 2024",
      status: "En Tránsito",
      total: "$1,499",
      statusColor: "text-blue-600 bg-blue-50",
    },
    {
      id: "#ORD-2024-047",
      customer: "Carlos Rodríguez",
      product: "Teclado Mecánico Keychron",
      date: "01 Nov 2024",
      status: "Pendiente",
      total: "$2,299",
      statusColor: "text-yellow-600 bg-yellow-50",
    },
    {
      id: "#ORD-2024-048",
      customer: "Ana Martínez",
      product: "Monitor LG UltraWide 34",
      date: "31 Oct 2024",
      status: "Entregado",
      total: "$8,999",
      statusColor: "text-green-600 bg-green-50",
    },
    {
      id: "#ORD-2024-049",
      customer: "Pedro López",
      product: "Webcam Logitech C920",
      date: "31 Oct 2024",
      status: "En Tránsito",
      total: "$1,899",
      statusColor: "text-blue-600 bg-blue-50",
    },
  ];

  const menuItems = [
    { id: "inicio", label: "Inicio", icon: <Home size={20} /> },
    { id: "usuarios", label: "Usuarios", icon: <Users size={20} /> },
    { id: "productos", label: "Productos", icon: <Package size={20} /> },
    { id: "reportes", label: "Reportes", icon: <FileText size={20} /> },
  ];

  // Vista de Configuración
  if (currentView === "config") {
    return (
      <ProtectedRoute requireAuth={true} requireRole="ADMIN">
        <Head>
          <title>Configuración Admin - SySCOM</title>
        </Head>

        <div className="flex min-h-screen bg-gray-50">
          <aside className="w-64 bg-white shadow-lg fixed h-screen">
            <div className="p-6 border-b">
              <Image
                src="/logo.png"
                alt="SySCOM"
                width={120}
                height={40}
                priority
              />
            </div>
            <nav className="p-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveMenu(item.id);
                    setCurrentView("dashboard");
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                    activeMenu === item.id
                      ? "bg-[#3498db] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          <div className="flex-1 ml-64">
            <nav className="bg-white shadow-md sticky top-0 z-10">
              <div className="px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Panel Administrativo
                </h2>
                <div className="flex items-center gap-4">
                  <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                    <Bell size={22} className="text-gray-700" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>

                  <div className="relative">
                    <button
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <User size={22} className="text-gray-700" />
                    </button>

                    {showDropdown && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setShowDropdown(false)}
                        ></div>
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-20">
                          <button
                            onClick={() => {
                              setCurrentView("config");
                              setShowDropdown(false);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            Configuración
                          </button>
                          <button
                            onClick={logout}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                          >
                            Cerrar Sesión
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </nav>

            <div className="p-8">
              <div className="max-w-2xl mx-auto">
                <button
                  onClick={() => setCurrentView("dashboard")}
                  className="text-[#3498db] hover:text-[#2980b9] font-medium mb-6 flex items-center gap-2"
                >
                  Volver
                </button>

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
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                        👑 Administrador
                      </span>
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
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
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
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  // Vista Principal Dashboard
  return (
    <ProtectedRoute requireAuth={true} requireRole="ADMIN">
      <Head>
        <title>Dashboard Admin - SySCOM</title>
      </Head>

      <div className="flex min-h-screen bg-gray-50">
        <aside className="w-64 bg-white shadow-lg fixed h-screen">
          <div className="p-6 border-b">
            <Image
              src="/logo.png"
              alt="SySCOM"
              width={120}
              height={40}
              priority
            />
          </div>
          <nav className="p-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  activeMenu === item.id
                    ? "bg-[#3498db] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <div className="flex-1 ml-64">
          <nav className="bg-white shadow-md sticky top-0 z-10">
            <div className="px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                Panel Administrativo
              </h2>
              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                  <Bell size={22} className="text-gray-700" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <User size={22} className="text-gray-700" />
                  </button>

                  {showDropdown && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowDropdown(false)}
                      ></div>
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-20">
                        <button
                          onClick={() => {
                            setCurrentView("config");
                            setShowDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Configuración
                        </button>
                        <button
                          onClick={logout}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                        >
                          Cerrar Sesión
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </nav>

          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                👑 Bienvenido, {user?.name}
              </h1>
              <p className="text-gray-600">
                Panel de administración del sistema
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className={`bg-gradient-to-r ${stat.bg} p-4`}>
                    <div className="text-white">{stat.icon}</div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </p>
                    <p className="text-sm text-green-600 font-semibold">
                      {stat.change} vs mes anterior
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-gray-900">
                  📦 Pedidos Recientes
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                        ID Pedido
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                        Cliente
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                        Producto
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                        Fecha
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {order.customer}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {order.product}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {order.date}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${order.statusColor}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-[#3498db]">
                          {order.total}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </ProtectedRoute>
  );
}
