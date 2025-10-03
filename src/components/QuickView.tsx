import React from 'react';
import type { Product } from "../services/productService";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../services/orderService";

interface QuickViewModalProps {
    product: Product | null;
    onClose: () => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {

    const navigate = useNavigate();
    const [quantity, setQuantity] = React.useState(1);
    if (!product) return null;

    const handleAddToCart = async () => {
    if (!product) return;
    try {
      const order = await createOrder({
        items: [{ productId: product.id, quantity }]
      });
      navigate("/order", { state: { order } });
    } catch (error) {
      console.error("Lỗi thêm vào giỏ hàng", error);
    }
  };


    return (
        // Sử dụng backdrop-filter để làm mờ nền
        <div className="fixed inset-0 flex items-start justify-center z-[100] bg-black/80 overflow-auto">
            <div className="bg-white rounded-lg p-8 max-w-4xl w-full relative shadow-xl mt-20">
                {/* Nút đóng nổi bật hơn */}
                <button 
                    onClick={onClose} 
                    className="absolute top-2 right-2 text-3xl text-gray-500 hover:text-red-600 cursor-pointer transition-colors"
                >
                    &times;
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Ảnh sản phẩm */}
                    <div className="flex justify-center items-center">
                        <img
                            src={product.imageUrl || `http://localhost:3002${product.imageUrl}` || "/placeholder.png"}
                            alt={product.name}
                            className="w-full h-auto object-contain max-h-80"
                        />
                    </div>
                    {/* Thông tin sản phẩm */}
                    <div className="flex flex-col justify-center">
                        <h2 className="text-2xl font-bold">{product.name}</h2>
                        <p className="text-red-500 text-xl font-semibold my-2">{product.price.toLocaleString()} đ</p>
                        <p className="text-gray-700">{product.description}</p>
                        <div className="flex items-center gap-4 mt-4">
                            <input
                                type="number"
                                value={quantity}
                                min={1}
                                className="w-20 border rounded px-3 py-2"
                                onChange={(e) => setQuantity(Number(e.target.value))}
                            />
                            <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 cursor-pointer transition"
                                onClick={handleAddToCart}>
                                THÊM VÀO GIỎ HÀNG
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickViewModal;