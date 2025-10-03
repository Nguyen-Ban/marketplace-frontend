import { useState } from "react";
import { register } from "../../services/userService";
import type { AxiosError } from "axios";

export default function Register({ onSwitchToLogin, isActive }: { onSwitchToLogin?: () => void, isActive: boolean }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const res = await register(email, password);
        // Nếu thành công, hiển thị thông tin người dùng
        alert("Register success: " + JSON.stringify(res));
        if (onSwitchToLogin) {
          onSwitchToLogin();
        }
      } catch (err: unknown) {
        const axiosErr = err as AxiosError<{ message?: string; error?: string }>;
        
        let errorMessage = "Đã xảy ra lỗi không xác định.";
        if (axiosErr.response && axiosErr.response.data) {
          // Nếu có dữ liệu phản hồi từ backend
          // Sử dụng tùy chọn lỗi của bạn
          errorMessage = axiosErr.response.data.message || axiosErr.response.data.error || "Lỗi từ máy chủ.";
        } else if (axiosErr.message) {
          // Lỗi từ Axios
          errorMessage = axiosErr.message;
        }
        alert("Error: " + errorMessage);
      }
    };

  return (
    <div className="p-10 flex flex-col justify-center">
      <div className="flex justify-center mb-6">
        {/* Biểu tượng WordPress hoặc logo của bạn */}
        <img src="logo.jpeg" alt="Logo" className="h-12" />
      </div>
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Đăng ký tài khoản</h2>
      <form className="flex flex-col gap-4" onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={isActive}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={isActive}
        />
        <button
          type="submit"
          className="bg-green-600 text-white font-bold p-3 rounded-md hover:bg-green-700 transition duration-300 transform hover:scale-105"
        >
          Đăng ký
        </button>
      </form>
      <p className="text-center mt-6 text-gray-600 text-sm">
        Đã có tài khoản?{" "}
        <button
          onClick={onSwitchToLogin}
          className="text-blue-500 font-bold hover:underline focus:outline-none"
        >
          Đăng nhập
        </button>
      </p>
    </div>
  );
}