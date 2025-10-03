import api from "./api";

export interface AuthResponse {
  token: string;
  role: "buyer" | "seller";
}

export interface User {
  id: number;
  email: string;
  role: "buyer" | "seller";
}

export interface UpgradeResponse {
  role: "seller";
  message?: string;
}

export const register = async (email: string, password: string): Promise<User> => {
  const res = await api.post<User>("/user/register", { email, password });
  return res.data;
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/user/login", { email, password });
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("role", res.data.role);
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const verifyUser = async (): Promise<User> => {
  const res = await api.get<User>("/user/verify-user");
  return res.data;
};

export const upgradeToSeller = async (): Promise<UpgradeResponse> => {
  const res = await api.post<UpgradeResponse>("/user/upgrade");
  return res.data;
};

export const getAllUsers = async (): Promise<User[]> => {
  const res = await api.get<User[]>("/user/all");
  return res.data;
};
export const updateUserRole = async (id: number, role: string): Promise<void> => {
  await api.put(`/user/${id}/role`, { role });
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/user/${id}`);
};