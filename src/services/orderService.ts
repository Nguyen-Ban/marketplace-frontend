import api from "./api";
import type { Product } from "./productService";

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  product?: Product;
}

export interface Order {
  OrderItems: OrderItem[];
  id: number;
  userId: number;
  totalPrice: number;
  blindboxId?: number | null;
  status: "pending" | "paid" | "cancelled";
  items?: OrderItem[];
}

export interface CreateOrderItemInput {
  productId: number;
  quantity: number;
}

export interface CreateOrderInput {
  items: CreateOrderItemInput[];
  blindboxId?: number;
}

export const createOrder = async (orderData: CreateOrderInput): Promise<Order> => {
  const res = await api.post<Order>("/order/create", orderData);
  return res.data;
};

export const getOrdersByUser = async (): Promise<Order[]> => {
  const res = await api.get<Order[]>("/order/get-orders");
  return res.data;
};

export const updateOrderStatus = async (orderId: number, status: "pending" | "paid" | "cancelled"): Promise<Order> => {
  const res = await api.put<Order>(`/order/update-order-status/${orderId}`, { status });
  return res.data;
};

export const getOrderItemsByOrderId = async (orderId: number): Promise<OrderItem[]> => {
  const res = await api.get<OrderItem[]>(`/order/get-order-items/${orderId}`);
  return res.data;
};