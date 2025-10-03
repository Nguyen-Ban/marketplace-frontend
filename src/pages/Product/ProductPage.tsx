import React, { useState, useEffect } from 'react';
import {
  createProduct,
  getAllProductsBySeller,
  updateProduct,
  deleteProduct,
  type Product,
  type ProductCreate,
} from '../../services/productService.ts';
import type { User } from '../../services/userService.ts';
import { verifyUser } from '../../services/userService.ts';

import { SquarePen, Trash2, PlusCircle } from 'lucide-react';

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<ProductCreate & { id?: number }>>({});
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const initData = async () => {
      try {
        setLoading(true);
        const verifiedUser = await verifyUser();
        console.log("Verified user:", verifiedUser);
        setUser(verifiedUser);

        const productsList = await getAllProductsBySeller();
        setProducts(productsList);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Đã xảy ra lỗi khi tải dữ liệu.');
        }
      }
    };
    initData();
  }, []);

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    // Tạo đối tượng FormData để gửi dữ liệu đa phần (bao gồm cả file)
    const formData = new FormData();
    formData.append('name', currentProduct.name || '');
    formData.append('price', (currentProduct.price || '').toString());
    formData.append('category', currentProduct.category || '');
    formData.append('description', currentProduct.description || '');
    if (selectedFile) {
        formData.append('image', selectedFile);
    }
    
    try {
      if (isEditing && currentProduct.id) {
        // Cập nhật sản phẩm
        await updateProduct(currentProduct.id, formData as FormData);
        setIsSuccess(true);
        setMessage('Cập nhật sản phẩm thành công!');
      } else {
        // Tạo sản phẩm mới
        await createProduct(formData as FormData);
        setIsSuccess(true);
        setMessage('Tạo sản phẩm thành công!');
      }
      
      const updatedProducts = await getAllProductsBySeller();
      setProducts(updatedProducts);
      setIsProductModalOpen(false);
      setCurrentProduct({});
      setSelectedFile(null);
    } catch (err) {
      setIsSuccess(false);
      if (err instanceof Error) {
        setMessage(`Lỗi: ${err.message}`);
      } else {
        setMessage('Đã xảy ra lỗi khi lưu sản phẩm.');
      }
    }
  };

  const handleDeleteProduct = (id: number) => {
    setProductIdToDelete(id);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (productIdToDelete === null) return;
    try {
      await deleteProduct(productIdToDelete);
      const updatedProducts = await getAllProductsBySeller();
      setProducts(updatedProducts);
      setIsSuccess(true);
      setMessage('Xóa sản phẩm thành công!');
    } catch (err) {
      setIsSuccess(false);
      if (err instanceof Error) {
        setMessage(`Lỗi: ${err.message}`);
      } else {
        setMessage('Đã xảy ra lỗi khi xóa sản phẩm.');
      }
    } finally {
      setIsConfirmModalOpen(false);
      setProductIdToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmModalOpen(false);
    setProductIdToDelete(null);
  };

  const handleAddProduct = () => {
    setIsEditing(false);
    setCurrentProduct({});
    setSelectedFile(null); // Reset file khi thêm mới
    setIsProductModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setSelectedFile(null); // Reset file khi chỉnh sửa
    setIsProductModalOpen(true);
  };

  const isSeller = user?.role === 'seller' || 'admin';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold">Đang tải...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl text-red-600 font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Quản lý Sản phẩm</h1>
          {isSeller && (
            <button
              onClick={handleAddProduct}
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors transform hover:scale-105"
            >
              <PlusCircle size={20} className="mr-2" />
              Thêm Sản phẩm
            </button>
          )}
        </div>

        {message && (
          <div className={`p-4 mb-4 rounded-lg text-white ${isSuccess ? 'bg-green-500' : 'bg-red-500'}`}>
            {message}
          </div>
        )}

        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Tên sản phẩm</th>
                <th className="py-3 px-6 text-left">Giá</th>
                <th className="py-3 px-6 text-left">Danh mục</th>
                <th className="py-3 px-6 text-center">Hình ảnh</th>
                <th className="py-3 px-6 text-center">Trạng thái</th>
                {isSeller && <th className="py-3 px-6 text-center">Hành động</th>}
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{product.id}</td>
                    <td className="py-3 px-6 text-left">{product.name}</td>
                    <td className="py-3 px-6 text-left">{product.price.toLocaleString('vi-VN')} VNĐ</td>
                    <td className="py-3 px-6 text-left">{product.category}</td>
                    <td className="py-3 px-6 text-center">
                      {product.imageUrl && (
                        <img 
                          src={product.imageUrl || `http://localhost:3002${product.imageUrl}`} 
                          alt={product.name} 
                          className="w-16 h-16 object-cover mx-auto rounded"
                        />
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${product.sold ? 'bg-red-200 text-red-600' : 'bg-green-200 text-green-600'}`}>
                        {product.sold ? 'Đã bán' : 'Còn hàng'}
                      </span>
                    </td>
                    {isSeller && (
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center space-x-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="w-8 h-8 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center hover:bg-blue-200 transition-colors"
                            aria-label="Chỉnh sửa sản phẩm"
                          >
                            <SquarePen size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-200 transition-colors"
                            aria-label="Xóa sản phẩm"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={isSeller ? 7 : 6} className="py-6 text-center text-gray-500">
                    Chưa có sản phẩm nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{isEditing ? 'Chỉnh sửa Sản phẩm' : 'Thêm Sản phẩm'}</h2>
            <form onSubmit={handleSaveProduct}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
                  Tên sản phẩm
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={currentProduct.name || ''}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="price">
                  Giá
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={currentProduct.price || ''}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, price: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="category">
                  Danh mục
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={currentProduct.category || ''}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">
                  Mô tả
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={currentProduct.description || ''}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                ></textarea>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="image">
                  Hình ảnh
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors"
                >
                  {isEditing ? 'Lưu thay đổi' : 'Tạo sản phẩm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm text-center">
            <h3 className="text-xl font-bold mb-4">Xác nhận xóa</h3>
            <p className="mb-6 text-gray-700">Bạn có chắc chắn muốn xóa sản phẩm này không?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleConfirmDelete}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Xóa
              </button>
              <button
                onClick={handleCancelDelete}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
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

export default ProductPage;