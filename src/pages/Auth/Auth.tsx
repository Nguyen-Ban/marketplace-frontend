// src/components/AuthPage.jsx
import { useState } from "react";
import LoginForm from "./Login";
import RegisterForm from "./Register";
import backgroundImage from "../../assets/background.jpeg";

export default function AuthPage() {
  const [isLoginActive, setIsLoginActive] = useState(true); // Trạng thái để xác định form nào đang hoạt động

  const switchToRegister = () => setIsLoginActive(false);
  const switchToLogin = () => setIsLoginActive(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="relative w-full max-w-4xl bg-white shadow-lg rounded-md overflow-hidden flex h-[600px]"> {/* Thêm chiều cao cố định */}
        {/* Phần trang trí bên trái (sẽ trượt) */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full bg-cover bg-center transition-transform duration-700 ease-in-out z-20 ${
            isLoginActive ? "translate-x-0" : "translate-x-0"
          }`}
          style={{
            backgroundImage: `url(${backgroundImage})`
          }}
        >
          {/* Lớp phủ để làm tối hình ảnh, giúp chữ dễ đọc hơn */}
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white p-6">
            <h2 className="text-4xl font-bold mb-4 text-center">
              {isLoginActive ? "Chào mừng trở lại!" : "Chào bạn mới!"}
            </h2>
            <p className="text-center text-lg leading-relaxed">
              {isLoginActive
                ? "Để giữ kết nối với chúng tôi, vui lòng đăng nhập bằng thông tin cá nhân của bạn."
                : "Nhập thông tin cá nhân của bạn và bắt đầu hành trình với chúng tôi."}
            </p>
            <button
              onClick={isLoginActive ? switchToRegister : switchToLogin}
              className="mt-8 px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition duration-300 transform hover:scale-105"
            >
              {isLoginActive ? "Đăng ký" : "Đăng nhập"}
            </button>
          </div>
        </div>

        {/* Phần chứa form đăng nhập và đăng ký */}
        <div className="flex-1 flex overflow-hidden">
          {/* Form Đăng nhập */}
          <div
            className={`w-1/2 flex-shrink-0 transition-transform duration-700 ease-in-out ${
              isLoginActive ? "translate-x-full" : "-translate-x-0"
            }`}
          >
            <LoginForm
              onSwitchToRegister={switchToRegister}
              isActive={isLoginActive}
            />
          </div>

          {/* Form Đăng ký */}
          <div
            className={`w-1/2 flex-shrink-0 transition-transform duration-700 ease-in-out ${
              isLoginActive ? "translate-x-full" : "-translate-x-0"
            }`}
          >
            <RegisterForm
              onSwitchToLogin={switchToLogin}
              isActive={!isLoginActive}
            />
          </div>
        </div>
      </div>
    </div>
  );
}