import Head from "next/head";
import { Navbar, Footer } from "@/components/layout";
import { useState } from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  Grid3x3,
  List,
  Star,
  Heart,
  ShoppingCart,
  Laptop,
  X,
  Monitor,
  Mouse,
  Keyboard,
  Printer,
  HardDrive,
  Cpu,
} from "lucide-react";

const categories = [
  { id: "computadoras", name: "Computadoras", count: 245 },
  { id: "componentes", name: "Componentes", count: 189 },
  { id: "perifericos", name: "Periféricos", count: 312 },
  { id: "redes", name: "Redes", count: 156 },
  { id: "almacenamiento", name: "Almacenamiento", count: 98 },
  { id: "impresoras", name: "Impresoras", count: 67 },
];

const brands = [
  { id: "dell", name: "Dell", count: 89 },
  { id: "hp", name: "HP", count: 76 },
  { id: "lenovo", name: "Lenovo", count: 65 },
  { id: "asus", name: "ASUS", count: 54 },
  { id: "acer", name: "Acer", count: 43 },
  { id: "apple", name: "Apple", count: 32 },
];

const products = [
  {
    id: 1,
    name: "Laptop Lenovo IdeaPad 3",
    description: "Intel Core i5, 16GB RAM, 512GB SSD",
    price: 15999,
    originalPrice: 19999,
    discount: 20,
    rating: 4.5,
    reviews: 128,
    image: "/LENOVO1.jpg",
    category: "computadoras",
    brand: "lenovo",
    inStock: true,
  },
  {
    id: 2,
    name: "Mouse Logitech G203 LIGHTSYNC",
    description: "Ergonómico, 8000 DPI, Bluetooth",
    price: 1899,
    originalPrice: 2399,
    discount: 21,
    rating: 4.9,
    reviews: 312,
    image: "/LOGITECH1.jpg",
    category: "perifericos",
    brand: "logitech",
    inStock: true,
  },
  {
    id: 3,
    name: "Teclado Mecánico Logitech G715",
    description: "Switches mecánicos, RGB, wireless",
    price: 2499,
    originalPrice: 2999,
    discount: 17,
    rating: 4.8,
    reviews: 203,
    image: "/LOGTEC1.jpg",
    category: "perifericos",
    brand: "logitech",
    inStock: true,
  },
  {
    id: 4,
    name: "Monitor HP 27 4K UHD",
    description: "Pantalla IPS, 144Hz, HDR400",
    price: 8999,
    originalPrice: 10999,
    discount: 18,
    rating: 4.7,
    reviews: 95,
    image: "/monitor.png",
    category: "perifericos",
    brand: "hp",
    inStock: true,
  },
  {
    id: 5,
    name: "Impresora HP LaserJet Pro",
    description: "Multifuncional, WiFi, escáner",
    price: 5499,
    originalPrice: 6999,
    discount: 21,
    rating: 4.4,
    reviews: 87,
    image: "/impresora1.png",
    category: "impresoras",
    brand: "hp",
    inStock: true,
  },
  {
    id: 6,
    name: "SSD Samsung 980 PRO 1TB",
    description: "NVMe Gen4, 7000MB/s lectura",
    price: 2999,
    originalPrice: 3799,
    discount: 21,
    rating: 4.9,
    reviews: 445,
    image: "/samsungimg.png",
    category: "almacenamiento",
    brand: "samsung",
    inStock: true,
  },
];

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [showDesktopFilters, setShowDesktopFilters] = useState(true);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleBrand = (brandId: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 50000]);
    setSearchQuery("");
  };

  const activeFiltersCount =
    selectedCategories.length +
    selectedBrands.length +
    (priceRange[0] > 0 || priceRange[1] < 50000 ? 1 : 0);

  return (
    <>
      <Head>
        <title>Catálogo de Productos - SySCOM</title>
        <meta name="description" content="Productos de tecnología" />
      </Head>

      <Navbar isAuthenticated={false} />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#329ACF] to-[#2E78BF] text-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Catálogo de Productos
              </h1>
              <p className="text-lg text-white/90 mb-2">
                Encuentra los mejores productos de tecnología para tu negocio
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Desktop Filters Sidebar */}
            {showDesktopFilters && (
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-4 bg-white border shadow-lg rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Filtros</h2>
                    <div className="flex items-center gap-2">
                      {activeFiltersCount > 0 && (
                        <button
                          onClick={clearFilters}
                          className="text-sm text-[#329ACF] hover:underline"
                        >
                          Limpiar
                        </button>
                      )}
                      <button
                        onClick={() => setShowDesktopFilters(false)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3">Rango de Precio</h3>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>${priceRange[0].toLocaleString()}</span>
                      <span>${priceRange[1].toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="1000"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="w-full"
                    />
                  </div>

                  {/* Categories */}
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3">Categorías</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <label
                          key={category.id}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category.id)}
                            onChange={() => toggleCategory(category.id)}
                            className="rounded"
                          />
                          <span className="text-sm flex-1">
                            {category.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({category.count})
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Brands */}
                  <div>
                    <h3 className="font-semibold mb-3">Marcas</h3>
                    <div className="space-y-2">
                      {brands.map((brand) => (
                        <label
                          key={brand.id}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand.id)}
                            onChange={() => toggleBrand(brand.id)}
                            className="rounded"
                          />
                          <span className="text-sm flex-1">{brand.name}</span>
                          <span className="text-xs text-gray-500">
                            ({brand.count})
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            )}

            {/* Products Section */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  {!showDesktopFilters && (
                    <button
                      onClick={() => setShowDesktopFilters(true)}
                      className="hidden lg:flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                      <SlidersHorizontal className="h-4 w-4" />
                      Mostrar Filtros
                    </button>
                  )}
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">
                      {products.length}
                    </span>{" "}
                    productos encontrados
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border rounded-lg"
                  >
                    <option value="relevance">Relevancia</option>
                    <option value="price-asc">Precio: Menor a Mayor</option>
                    <option value="price-desc">Precio: Mayor a Menor</option>
                    <option value="name-asc">Nombre: A-Z</option>
                    <option value="rating">Mejor Valorados</option>
                  </select>

                  {/* View Toggle */}
                  <div className="hidden sm:flex items-center gap-1 border rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded ${
                        viewMode === "grid" ? "bg-gray-200" : ""
                      }`}
                    >
                      <Grid3x3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded ${
                        viewMode === "list" ? "bg-gray-200" : ""
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {products.map((product) => (
                  <div
                    key={product.id}
                    role="article"
                    className="group bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <Link href={`/product?id=${product.id}`}>
                      <div className="relative aspect-square bg-gray-100">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {product.discount > 0 && (
                          <div className="absolute top-3 left-3 bg-[#329ACF] text-white px-3 py-1 rounded-full text-sm font-bold">
                            -{product.discount}%
                          </div>
                        )}
                        <button className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                          <Heart className="h-5 w-5" />
                        </button>
                      </div>
                    </Link>

                    <div className="p-6">
                      <Link href={`/product?id=${product.id}`}>
                        <h3 className="font-bold text-lg mb-2 group-hover:text-[#329ACF] transition-colors">
                          {product.name}
                        </h3>
                      </Link>

                      <p className="text-sm text-gray-600 mb-3">
                        {product.description}
                      </p>

                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          ({product.reviews})
                        </span>
                      </div>

                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-2xl font-bold text-[#329ACF]">
                          ${product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ${product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <button className="w-full bg-[#329ACF] text-white py-2 rounded-lg font-semibold hover:bg-[#2E78BF] transition-colors flex items-center justify-center gap-2">
                        <ShoppingCart className="h-4 w-4" />
                        Agregar al carrito
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
