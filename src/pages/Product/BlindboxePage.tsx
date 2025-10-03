import { useEffect, useState, useMemo } from "react";
import { getAllPublicProducts, type Product } from "../../services/productService";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination"; // Nhập component Pagination
import QuickViewModal from "../../components/QuickView"; // Nhập component QuickViewModal
import { createOrder } from "../../services/orderService";

export default function BlindboxPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortOption, setSortOption] = useState<string>("default");
    const [productsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFigures = async () => {
            try {
                const products = await getAllPublicProducts();
                const blindboxes = products.filter(p => p.category === "Blindbox");
                setProducts(blindboxes);
            } catch {
                setError("Failed to fetch blindboxes");
            } finally {
                setLoading(false);
            }
        };
        fetchFigures();
    }, []);

    const sortedProducts = useMemo(() => {
        const sorted = [...products];
        if (sortOption === "price-asc") {
            sorted.sort((a, b) => a.price - b.price);
        } else if (sortOption === "price-desc") {
            sorted.sort((a, b) => b.price - a.price);
        }
        return sorted;
    }, [products, sortOption]);

    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const handleQuickView = (product: Product) => {
        setSelectedProduct(product);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    const handleBuyNow = async (product: Product) => {
        try {
            const order = await createOrder({
            items: [{ productId: product.id, quantity: 1 }]
            });
            navigate("/order", { state: { order } });
        } catch (error) {
            console.error("Lỗi tạo đơn hàng", error);
        }
        };

    if (loading) return <p className="p-6">Đang tải sản phẩm Figures...</p>;
    if (error) return <p className="p-6 text-red-500">Lỗi khi tải dữ liệu. Vui lòng thử lại sau.</p>;

    return (
        <div className="p-6 max-w-screen-xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">TẤT CẢ SẢN PHẨM FIGURES</h2>
                <div className="flex items-center gap-2">
                    <span className="text-gray-600">Sắp xếp:</span>
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="border rounded-md px-2 py-1 cursor-pointer"
                    >
                        <option value="default">Mặc định</option>
                        <option value="price-asc">Giá tăng dần</option>
                        <option value="price-desc">Giá giảm dần</option>
                    </select>
                </div>
            </div>

            {/* Grid sản phẩm */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {currentProducts.map((p) => (
                    <div
                        key={p.id}
                        className="relative group border p-4 rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                    >
                        <Link to={`/product/${p.id}`} state={{ product: p }}>
                            <img
                                src={p.imageUrl || `http://localhost:3002${p.imageUrl}` || "/placeholder.png"}
                                alt={p.name}
                                className="w-full h-40 object-cover"
                            />
                            <h3 className="mt-2 font-semibold">{p.name}</h3>
                            <p className="text-red-500">{p.price.toLocaleString()} đ</p>
                        </Link>
                        {/* Nút Xem Nhanh & Mua hàng */}
                        <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-60 text-white p-2 flex justify-center items-center gap-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <button
                                onClick={() => handleBuyNow(p)}
                                className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700 cursor-pointer"
                            >
                                Mua hàng
                            </button>
                            <button
                                onClick={() => handleQuickView(p)}
                                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 cursor-pointer"
                            >
                                Xem nhanh
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Component Phân trang */}
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />

            {/* Component Modal Xem Nhanh */}
            <QuickViewModal product={selectedProduct} onClose={handleCloseModal} />
        </div>
    );
}