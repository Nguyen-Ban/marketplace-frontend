import React, { useEffect, useState } from "react";
import { getAllUsers, updateUserRole, deleteUser, type User } from "../../services/userService";
import { getAllPublicProducts, deleteProduct, type Product } from "../../services/productService";
import AdminSidebar from "./AdminSidebar";
import MainContent from "./MainContent";

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"users" | "products">("users");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [userList, productList] = await Promise.all([
          getAllUsers(),
          getAllPublicProducts(),
        ]);
        setUsers(userList);
        setProducts(productList);
      } catch (error) {
        console.error("Không thể tải dữ liệu:", error);
        setMessage("Không thể tải dữ liệu.");
        setIsSuccess(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u.id !== id));
      setMessage("Xóa người dùng thành công!");
      setIsSuccess(true);
    } catch {
      setMessage("Lỗi khi xóa người dùng.");
      setIsSuccess(false);
    }
  };

  const handleChangeRole = async (id: number, role: string) => {
    try {
      await updateUserRole(id, role);
      setUsers(users.map((u) =>
        u.id === id ? { ...u, role: role as User["role"] } : u
      ));
      setMessage("Cập nhật vai trò thành công!");
      setIsSuccess(true);
    } catch {
      setMessage("Lỗi khi cập nhật vai trò.");
      setIsSuccess(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
      setMessage("Xóa sản phẩm thành công!");
      setIsSuccess(true);
    } catch {
      setMessage("Lỗi khi xóa sản phẩm.");
      setIsSuccess(false);
    }
  };

  // Function to refresh products list
  const refreshProducts = async () => {
    try {
      setLoading(true);
      const productList = await getAllPublicProducts();
      setProducts(productList);
    } catch {
      setMessage("Không thể tải lại sản phẩm.");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex-1 transition-all duration-300">
      <MainContent
        activeTab={activeTab}
        users={users}
        products={products}
        loading={loading}
        message={message}
        isSuccess={isSuccess}
        handleDeleteUser={handleDeleteUser}
        handleChangeRole={handleChangeRole}
        handleDeleteProduct={handleDeleteProduct}
        refreshProducts={refreshProducts}
      />
        </div>
    </div>
  );
};

export default AdminDashboard;