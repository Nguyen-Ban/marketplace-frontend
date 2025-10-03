import React, { useState } from "react";
import type { User } from "../../services/userService";
import type { Product, ProductCreate } from "../../services/productService";
import { createProduct, updateProduct } from "../../services/productService";

interface MainContentProps {
  activeTab: "users" | "products";
  users: User[];
  products: Product[];
  loading: boolean;
  message: string | null;
  isSuccess: boolean;
  handleDeleteUser: (id: number) => void;
  handleChangeRole: (id: number, role: "buyer" | "seller") => void;
  handleDeleteProduct: (id: number) => Promise<void>;
  refreshProducts: () => void;
}

const MainContent: React.FC<MainContentProps> = ({
  activeTab,
  users,
  products,
  loading,
  message,
  isSuccess,
  handleDeleteUser,
  handleChangeRole,
  handleDeleteProduct,
  refreshProducts
}) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null);

  // Modal thêm/sửa sản phẩm
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<
    Partial<ProductCreate & { id?: number }>
  >({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const openConfirmModal = (id: number) => {
    setProductIdToDelete(id);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (productIdToDelete === null) return;
    await handleDeleteProduct(productIdToDelete);
    setIsConfirmModalOpen(false);
    setProductIdToDelete(null);
  };

  const handleAddProduct = () => {
    setIsEditing(false);
    setCurrentProduct({});
    setSelectedFile(null);
    setIsProductModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setSelectedFile(null);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", currentProduct.name || "");
    formData.append("price", (currentProduct.price || "").toString());
    formData.append("category", currentProduct.category || "");
    formData.append("description", currentProduct.description || "");
    if (selectedFile) formData.append("image", selectedFile);

    try {
      if (isEditing && currentProduct.id) {
        await updateProduct(currentProduct.id, formData);
      } else {
        await createProduct(formData);
      }
      setIsProductModalOpen(false);
      refreshProducts();
    } catch (err) {
      console.error("Lỗi khi lưu sản phẩm:", err);
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-100">
      {loading && <p className="text-blue-500">Đang tải...</p>}
      {message && (
        <p className={isSuccess ? "text-green-600" : "text-red-600"}>
          {message}
        </p>
      )}
      {/* Quản lý User */}
      {activeTab === "users" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Quản lý Người dùng</h2>
          <table className="w-full bg-white shadow rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3">ID</th>
                <th className="p-3">Tên</th>
                <th className="p-3">Email</th>
                <th className="p-3">Vai trò</th>
                <th className="p-3">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b">
                  <td className="p-3">{u.id}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3 capitalize">{u.role}</td>
                  <td className="p-3 flex space-x-2">
                    <button
                      onClick={() =>
                        handleChangeRole(
                          u.id,
                          u.role === "buyer" ? "seller" : "buyer"
                        )
                      }
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Đổi vai trò
                    </button>
                    <button
                      onClick={() => handleDeleteUser(u.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Quản lý Sản phẩm */}
      {activeTab === "products" && (
        <div>
          <h2 className="text-2xl font-bold mb-4 flex justify-between">
            Quản lý Sản phẩm
            <button
              onClick={handleAddProduct}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              + Thêm sản phẩm
            </button>
          </h2>
          <table className="w-full bg-white shadow rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3">ID</th>
                <th className="p-3">Tên sản phẩm</th>
                <th className="p-3">Danh mục</th>
                <th className="p-3">Ảnh</th>
                <th className="p-3">Giá</th>
                <th className="p-3">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b">
                  <td className="p-3">{p.id}</td>
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3"><img className="w-16 h-16 object-cover rounded" src={p.imageUrl} alt={p.name} /></td>
                  <td className="p-3">{p.price.toLocaleString()} đ</td>
                  <td className="p-3 flex space-x-2">
                    <button
                      onClick={() => handleEditProduct(p)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => openConfirmModal(p.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal thêm/sửa sản phẩm */}
      {isProductModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">
              {isEditing ? "Sửa sản phẩm" : "Thêm sản phẩm"}
            </h3>
            <form onSubmit={handleSaveProduct}>
              <input
                type="text"
                placeholder="Tên sản phẩm"
                value={currentProduct.name || ""}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, name: e.target.value })
                }
                className="w-full mb-3 p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Giá"
                value={currentProduct.price || ""}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    price: parseFloat(e.target.value),
                  })
                }
                className="w-full mb-3 p-2 border rounded"
              />
              <select
                value={currentProduct.category || ""}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    category: e.target.value,
                  })
                }
                className="w-full mb-3 p-2 border rounded"
              >
                <option value="">-- Chọn danh mục --</option>
                <option value="Figure">Figure</option>
                <option value="Blindbox">Blindbox</option>
              </select>

              <textarea
                placeholder="Mô tả"
                value={currentProduct.description || ""}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    description: e.target.value,
                  })
                }
                className="w-full mb-3 p-2 border rounded"
              />
              <input
                type="file"
                onChange={(e) =>
                  setSelectedFile(e.target.files ? e.target.files[0] : null)
                }
                className="w-full mb-3"
              />
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {isEditing ? "Lưu" : "Thêm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal xác nhận xóa */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <p className="mb-4">Bạn có chắc muốn xóa sản phẩm?</p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Xóa
              </button>
              <button
                onClick={() => setIsConfirmModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContent;
