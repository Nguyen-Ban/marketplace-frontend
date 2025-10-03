import { Facebook, Youtube, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Cột 1 - Thông tin công ty */}
        <div>
          <img
            src="/logo.jpeg"
            alt="Logo"
            className="h-12 mb-4"
          />
          <h3 className="font-bold text-lg">3DMj</h3>
          <p className="mt-2 text-sm text-gray-600">
            <i className="fas fa-map-marker-alt mr-2" />
            Địa chỉ: 123 Đường ABC, Cầu Giấy, Hà Nội
          </p>
          <p className="mt-2 text-sm text-gray-600">
            <i className="fas fa-phone mr-2" />
            Hotline: <span className="text-red-600 font-semibold">0987654321</span>
          </p>
          <p className="mt-2 text-sm text-gray-600">
            <i className="fas fa-envelope mr-2" />
            Email: <a href="mailto:support@3dmj.com" className="text-blue-600">
              Support@3dmj.com
            </a>
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-blue-600 hover:text-white transition">
              <Facebook size={18} />
            </a>
            <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-red-600 hover:text-white transition">
              <Youtube size={18} />
            </a>
            <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600 hover:text-white transition">
              <Instagram size={18} />
            </a>
            <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-black hover:text-white transition">
              <Twitter size={18} />
            </a>
          </div>
        </div>

        {/* Cột 2 - Hỗ trợ khách hàng */}
        <div>
          <h4 className="font-semibold mb-3">Hỗ trợ khách hàng</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#">Hướng dẫn mua hàng</a></li>
            <li><a href="#">Hướng dẫn thanh toán</a></li>
            <li><a href="#">Hướng dẫn giao nhận</a></li>
          </ul>
        </div>

        {/* Cột 3 - Chính sách */}
        <div>
          <h4 className="font-semibold mb-3">Chính sách</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#">Chính sách bảo mật</a></li>
            <li><a href="#">Chính sách đổi trả</a></li>
            <li><a href="#">Chính sách vận chuyển</a></li>
          </ul>
          <h4 className="font-semibold mt-4">Tổng đài hỗ trợ</h4>
          <p className="text-sm text-gray-600">Liên hệ: 0987654321 (10AM - 9PM)</p>
        </div>

        {/* Cột 4 - Đăng ký nhận tin */}
        <div>
          <h4 className="font-semibold mb-3">Đăng ký nhận thông báo</h4>
          <p className="text-sm text-gray-600 mb-3">
            Đừng bỏ lỡ bất kỳ món đồ chơi độc quyền nào
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Email của bạn..."
              className="flex-1 border border-gray-300 rounded-l px-3 py-2 text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="bg-red-600 text-white px-4 rounded-r hover:bg-red-700"
            >
              Đăng ký
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}
