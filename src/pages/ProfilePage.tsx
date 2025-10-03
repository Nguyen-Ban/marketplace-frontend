import { useState, useEffect } from "react";
import { upgradeToSeller, verifyUser } from "../services/userService";
import type { User } from "../services/userService";
import { AxiosError } from "axios";

function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  // Khi vào trang Profile thì tự verify user (để lấy thông tin user hiện tại)
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token") || "";
      if (!token) return;
      try {
        const res = await verifyUser();
        setUser(res);
      } catch (err: unknown) {
        const axiosErr = err as AxiosError<{ error: string }>;
        console.error("Verify failed:", axiosErr.response?.data?.error || axiosErr.message);
      }
    };
    fetchUser();
  }, []);

  const handleUpgrade = async () => {
    try {
      const res = await upgradeToSeller();
      alert(res.message);
      // gọi lại verify để cập nhật role mới
      const updated = await verifyUser();
      setUser(updated);
    } catch (err: unknown) {
      const axiosErr = err as AxiosError<{ error: string }>;
      alert("Upgrade failed: " + (axiosErr.response?.data?.error || axiosErr.message));
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      {user ? (
        <div>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          {user.role !== "seller" && (
            <button onClick={handleUpgrade}>
              Trở thành Seller
            </button>
          )}
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
}

export default ProfilePage;
