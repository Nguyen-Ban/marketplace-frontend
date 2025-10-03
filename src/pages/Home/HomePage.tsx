import { useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import { Link } from "react-router-dom";
import { getAllPublicProducts, type Product } from "../../services/productService";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getAllPublicProducts();
        setProducts(productList);
        console.log(productList);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const getFilteredProducts = (category: string) => {
    if (category === "Figure") {
      return products.filter(p => p.category === "Figure").slice(0, 20);
    }
    if (category === "Blindbox") {
      return products.filter(p => p.category === "Blindbox").slice(0, 20);
    }
    return [];
  };

  const figureProducts = getFilteredProducts("Figure");
  const blindboxProducts = getFilteredProducts("Blindbox");

  return (
    <div>
      <HeroSection />
      <div className="p-6 max-w-screen-xl mx-auto">
        <h2 className="text-2xl font-bold text-center after:content-[''] after:block after:w-10 after:h-[2px] after:bg-black after:mx-auto after:mt-4 after:mb-8">SẢN PHẨM NỔI BẬT</h2>
        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded-full ${selectedCategory === "All" ? "bg-blue-600 text-white" : "border hover:bg-blue-700 hover:text-white"}`}
            onClick={() => setSelectedCategory("All")}
          >
            ALL PRODUCTS
          </button>
          <button
            className={`px-4 py-2 rounded-full ${selectedCategory === "Figure" ? "bg-blue-600 text-white" : "border hover:bg-blue-700 hover:text-white"}`}
            onClick={() => setSelectedCategory("Figure")}
          >
            FIGURE ART
          </button>
          <button
            className={`px-4 py-2 rounded-full ${selectedCategory === "Blindbox" ? "bg-blue-600 text-white" : "border hover:bg-blue-700 hover:text-white"}`}
            onClick={() => setSelectedCategory("Blindbox")}
          >
            BLINDBOX
          </button>
        </div>
        
        {/* Hiển thị tất cả sản phẩm khi selectedCategory là "All" */}
        {selectedCategory === "All" && (
          <>
            <h3 className="text-xl font-bold mt-8 mb-4">FIGURE ART</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
              {figureProducts.slice(0, 10).map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="border p-4 rounded-lg shadow hover:shadow-lg transition"
                  state={{ product: p }}
                >
                  <img
                    src={p.imageUrl || `http://localhost:3002${p.imageUrl}` || "/placeholder.png"}
                    alt={p.name}
                    className="w-full h-40 object-cover"
                  />
                  <h3 className="mt-2 font-semibold">{p.name}</h3>
                  <p className="text-red-500">{p.price.toLocaleString()} đ</p>
                </Link>
              ))}
            </div>
            <h3 className="text-xl font-bold mt-8 mb-4">BLINDBOX</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {blindboxProducts.slice(0, 10).map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="border p-4 rounded-lg shadow hover:shadow-lg transition"
                  state={{ product: p }}
                >
                  <img
                    src={p.imageUrl || `http://localhost:3002${p.imageUrl}` || "/placeholder.png"}
                    alt={p.name}
                    className="w-full h-40 object-cover"
                  />
                  <h3 className="mt-2 font-semibold">{p.name}</h3>
                  <p className="text-red-500">{p.price.toLocaleString()} đ</p>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Hiển thị sản phẩm Figure khi được chọn */}
        {selectedCategory === "Figure" && (
          <>
          <h3 className="text-xl font-bold mt-8 mb-4">FIGURE ART</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {figureProducts.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="border p-4 rounded-lg shadow hover:shadow-lg transition"
                state={{ product: p }}
              >
                <img
                  src={p.imageUrl || `http://localhost:3002${p.imageUrl}` || "/placeholder.png"}
                  alt={p.name}
                  className="w-full h-40 object-cover"
                />
                <h3 className="mt-2 font-semibold">{p.name}</h3>
                <p className="text-red-500">{p.price.toLocaleString()} đ</p>
              </Link>
            ))}
          </div>
          </>
        )}

        {/* Hiển thị sản phẩm Blindbox khi được chọn */}
        {selectedCategory === "Blindbox" && (
          <>
          <h3 className="text-xl font-bold mt-8 mb-4">BLINDBOX</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {blindboxProducts.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="border p-4 rounded-lg shadow hover:shadow-lg transition"
                state={{ product: p }}
              >
                <img
                  src={p.imageUrl || `http://localhost:3002${p.imageUrl}` || "/placeholder.png"}
                  alt={p.name}
                  className="w-full h-40 object-cover"
                />
                <h3 className="mt-2 font-semibold">{p.name}</h3>
                <p className="text-red-500">{p.price.toLocaleString()} đ</p>
              </Link>
            ))}
          </div>
          </>
        )}
      </div>
    </div>
  );
}