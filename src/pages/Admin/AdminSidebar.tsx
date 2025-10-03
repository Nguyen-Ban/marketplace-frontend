import React from "react";
import { Users, Package, Home } from "lucide-react";

interface AdminSidebarProps {
  activeTab: "users" | "products";
  setActiveTab: (tab: "users" | "products") => void;
  isOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab, isOpen, setIsSidebarOpen }) => {
  return (
    // Dùng class "w-64" khi mở và "w-20" khi đóng. Thêm transition cho hiệu ứng mượt mà
    <div className={`
      bg-gray-800 text-white flex flex-col p-4 min-h-screen 
      transition-all duration-300 ease-in-out
      ${isOpen ? "w-64" : "w-20"}
    `}>
      {/* Ẩn/hiện tiêu đề và các nhãn dựa trên state */}
      <div className="flex items-center text-2xl font-bold mb-8">
        <button
          onClick={() => setIsSidebarOpen(!isOpen)}
          className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 transition-colors duration-200"
        >
          <Home size={24} />
        </button>
        {isOpen && <span className="ml-4">Dashboard</span>}
      </div>
      <nav className="flex-1">
        <ul>
          <li className="mb-2">
            <button
              onClick={() => setActiveTab("users")}
              className={`flex items-center w-full p-3 rounded-lg transition-colors duration-200 ${
                activeTab === "users" ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              <Users className={`${isOpen ? "mr-3" : "mx-auto"}`} size={20} />
              {isOpen && "Quản lý Người dùng"}
            </button>
          </li>
          <li className="mb-2">
            <button
              onClick={() => setActiveTab("products")}
              className={`flex items-center w-full p-3 rounded-lg transition-colors duration-200 ${
                activeTab === "products" ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              <Package className={`${isOpen ? "mr-3" : "mx-auto"}`} size={20} />
              {isOpen && "Quản lý Sản phẩm"}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;