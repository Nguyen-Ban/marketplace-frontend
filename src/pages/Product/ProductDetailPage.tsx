import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate} from "react-router-dom";
import { getPublicProductById } from "../../services/productService";
import { createOrder } from "../../services/orderService";
import type { Product } from "../../services/productService";
// import { mockProduct } from "./mockData";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const location = useLocation();
  const [selectedTitle, setSelectedTitle] = useState("1 BLINDBOX");
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy dữ liệu sản phẩm từ state của location nếu tồn tại
    const productFromState = location.state?.product;

    if (productFromState) {
      setProduct(productFromState);
    } else if (id) {
      // Nếu không có dữ liệu trong state, mới gọi API
      const fetchProduct = async () => {
        try {
          const res = await getPublicProductById(Number(id));
          setProduct(res);
        } catch (error) {
          console.error("Lỗi load sản phẩm", error);
        }
      };
      fetchProduct();
    }
  }, [id, location.state]);

    // useEffect(() => {
    //     setProduct(mockProduct);
    // }, []);
  const handleAddToCart = async () => {
    if (!product) return;
    let orderQuantity = quantity;
    if (selectedTitle === "SET 6 BLINDBOX" && product.category.toLowerCase() === "blindbox") {
      orderQuantity = 6 * 0.9;
    }
    try {
      const order = await createOrder({
        items: [{ productId: product.id, quantity: orderQuantity }]
      });
      navigate("/order", { state: { order } });
    } catch (error) {
      console.error("Lỗi thêm vào giỏ hàng", error);
    }
  };

  const basePrice =
    product && product.category.toLowerCase() === "blindbox" &&
    selectedTitle === "SET 6 BLINDBOX"
      ? product.price * 6 * 0.9
      : product?.price ?? 0;

  const calculatedPrice = basePrice * quantity;

  if (!product) return <p className="p-6">Đang tải sản phẩm...</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4">
  {/* Hình ảnh */}
  <div className="flex justify-center items-start">
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <img
        src={product.imageUrl || `http://localhost:3002${product.imageUrl}` || "/placeholder.png"}
        alt={product.name}
        className="w-150 h-150 object-contain"
      />
    </div>
  </div>

  {/* Thông tin */}
  <div className="flex flex-col justify-start">
    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
    <p className="text-red-500 text-2xl font-semibold mb-6">
      {calculatedPrice.toLocaleString()} đ
    </p>

    <p className="mb-3">
      <span className="font-semibold">Mô tả:</span> {product.description}
    </p>
    <p className="mb-6">
      <span className="font-semibold">Danh mục:</span> {product.category}
    </p>

    {/* Nếu là Blindbox thì hiện phần chọn Title */}
        {product.category.toLowerCase() === "blindbox" && (
          <div className="mb-4">
            <p className="font-semibold mb-2">Title</p>
            <div className="flex gap-2">
              {["1 BLINDBOX", "SET 6 BLINDBOX"].map((title) => (
                <button
                  key={title}
                  onClick={() => setSelectedTitle(title)}
                  className={`px-4 py-2 border rounded ${
                    selectedTitle === title
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {title}
                </button>
              ))}
            </div>
          </div>
        )}

    {/* Input + Button */}
    <div className="flex items-center gap-4">
          <input
            type="number"
            value={quantity}
            min={1}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-20 border rounded px-3 py-2 text-center"
          />
      <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        onClick={handleAddToCart}>
        THÊM VÀO GIỎ HÀNG
      </button>
    </div>
  </div>
</div>
  );
}
