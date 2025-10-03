import api from "./api";

export interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
    category: string;
    userId: number;
    sold: boolean;
}

export interface ProductCreate {
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
    category: string;
}

export interface ProductUpdate {
  name?: string;
  price?: number;
  description?: string;
  imageUrl?: string;
  category?: string;
  sold?: boolean;
}

export interface ProductFilterParams {
  topic?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const createProduct = async (product: FormData): Promise<Product> => {
    const res = await api.post<Product>("/product/create", product);
    return res.data;
};

export const getAllProductsBySeller = async (): Promise<Product[]> => {
    const res = await api.get<Product[]>("/product/get-all-products");
    return res.data;
};

export const getProductById = async (id: number): Promise<Product> => {
    const res = await api.get<Product>(`/product/get-product/${id}`);
    return res.data;
};

export const getPublicProductById = async (id: number): Promise<Product> => {
  const res = await api.get<Product>(`/product/get-public-product/${id}`);
  return res.data;
};

export const getAllPublicProducts = async (): Promise<Product[]> => {
  const res = await api.get<Product[]>("/product/get-all-public-products");
  return res.data;
}

export const getProductsByFilter = async (params: ProductFilterParams): Promise<Product[]> => {
  const res = await api.get<Product[]>("/product/get-filter-products", { params });
  return res.data;
};

export const updateProduct = async (id: number, productData: FormData): Promise<Product> => {
  const res = await api.put<Product>(`/product/update/${id}`, productData);
  return res.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/product/delete/${id}`);
};