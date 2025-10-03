import { useEffect, useState } from "react";
import { getOrdersByUser, type Order, type OrderItem } from "../services/orderService";
// import { mockOrders, type Order, type OrderItem } from "./mockDataOrder";

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"pending" | "paid" | "cancelled">("pending");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrdersByUser();
        setOrders(res);
        console.log(res);
      } catch {
        setError("Lỗi khi tải đơn hàng");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();

    // setOrders(mockOrders);
    // setLoading(false);
  }, []);

  if (loading) return <p className="p-6">Đang tải đơn hàng...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  // Map trạng thái sang text và màu
  const renderStatus = (status: string) => {
    switch (status) {
      case "pending":
        return <span className="text-yellow-600">Chờ thanh toán...</span>;
      case "paid":
        return <span className="text-green-600">Đã thanh toán</span>;
      case "cancelled":
        return <span className="text-red-600">Đã hủy</span>;
      default:
        return <span className="text-gray-600">{status}</span>;
    }
  };

  // Chia orders theo trạng thái
  const pendingOrders = orders.filter((o) => o.status === "pending");
  const paidOrders = orders.filter((o) => o.status === "paid");
  const cancelledOrders = orders.filter((o) => o.status === "cancelled");

  // Component hiển thị danh sách orders
  const renderOrderSection = (orders: Order[]) => (
    <div className="mt-6">
      {orders.length === 0 ? (
        <p className="text-gray-500">Không có đơn hàng</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg p-4 mb-6 bg-white shadow"
          >
            <h3 className="font-semibold mb-2">
              Mã đơn: #{order.id} — Trạng thái: {renderStatus(order.status)}
            </h3>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b p-2 whitespace-nowrap">Thông tin sản phẩm</th>
                  <th className="border-b p-2 whitespace-nowrap">Đơn giá</th>
                  <th className="border-b p-2 whitespace-nowrap">Số lượng</th>
                  <th className="border-b p-2 whitespace-nowrap">Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {order.OrderItems?.map((item: OrderItem) => (
                  <tr key={item.id}>
                    <td className="border-b p-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product?.imageUrl || "/placeholder.png"}
                          alt={item.product?.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{item.product?.name}</p>
                          <p className="text-sm text-gray-500">
                            {item.product?.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="border-b p-2 text-red-500 whitespace-nowrap">
                      {Number(item.product?.price).toLocaleString()} đ
                    </td>
                    <td className="border-b p-2 text-center">{item.quantity}</td>
                    <td className="border-b p-2 text-red-500 whitespace-nowrap">
                      {Number(item.price).toLocaleString()} đ
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-3">
              <p className="font-semibold">
                Tổng tiền:{" "}
                <span className="text-red-600">
                  {Number(order.totalPrice).toLocaleString()} đ
                </span>
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Thanh Tabs */}
      <div className="flex gap-4 border-b mb-6">
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "pending"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 hover:text-blue-500"
          }`}
        >
          Giỏ hàng của bạn
        </button>
        <button
          onClick={() => setActiveTab("paid")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "paid"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 hover:text-blue-500"
          }`}
        >
          Đơn hàng đã mua
        </button>
        <button
          onClick={() => setActiveTab("cancelled")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "cancelled"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 hover:text-blue-500"
          }`}
        >
          Đơn hàng bị hủy
        </button>
      </div>

      {/* Nội dung tab */}
      {activeTab === "pending" && renderOrderSection(pendingOrders)}
      {activeTab === "paid" && renderOrderSection(paidOrders)}
      {activeTab === "cancelled" && renderOrderSection(cancelledOrders)}
    </div>
  );
}
