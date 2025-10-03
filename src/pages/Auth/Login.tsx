import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../services/userService";

export default function Login({ onSwitchToRegister, isActive }: { onSwitchToRegister?: () => void, isActive: boolean }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      const role = localStorage.getItem("role");
      if (role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <div className="p-10 flex flex-col justify-center">
      <div className="flex justify-center mb-6">
        {/* Biểu tượng WordPress hoặc logo của bạn */}
        <img src="logo.jpeg" alt="Logo" className="h-12" />
      </div>
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Đăng nhập tài khoản</h2>
      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={isActive}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={isActive}
        />
        <div className="flex items-center justify-between">
          <label className="flex items-center text-gray-600 text-sm">
            <input type="checkbox" className="form-checkbox text-blue-500 rounded" />
            <span className="ml-2">Nhớ mật khẩu</span>
          </label>
          <Link to="#" className="text-sm text-blue-500 hover:underline">
            Quên mật khẩu?
          </Link>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white font-bold p-3 rounded-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
        >
          Đăng nhập
        </button>
      </form>
      <p className="text-center mt-6 text-gray-600 text-sm">
        Bạn chưa có tài khoản?{" "}
        <button
          onClick={onSwitchToRegister}
          className="text-blue-500 font-bold hover:underline focus:outline-none"
        >
          Đăng ký ngay
        </button>
      </p>
    </div>
  );
}
