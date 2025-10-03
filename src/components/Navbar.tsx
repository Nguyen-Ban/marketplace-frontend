import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [cartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    setIsLoggedIn(!!token);
    setRole(userRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setRole(null);
    navigate("/login"); // quay về trang login sau khi logout
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
    }
  };

  const profileLink = role === "admin" ? "/admin" : "/profile";

  return (
    <header className="sticky top-0 left-0 w-full flex items-center justify-between px-6 py-4 border-b shadow-sm bg-white z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img src="/logo.jpeg" alt="Logo" className="h-10" />
        <span className="font-bold text-lg">3DMj</span>
      </Link>

      {/* Menu */}
      <nav className="hidden md:flex gap-6 font-medium">
        <Link to="/">TRANG CHỦ</Link>
        <Link to="/product/figures">FIGURES</Link>
        <Link to="/product/blindboxes">BLINDBOXES</Link>
        <Link to="/aboutus">GIỚI THIỆU</Link>
        <Link to="/policy">CHÍNH SÁCH TRẢ HÀNG</Link>
        <Link to="/order">ĐƠN HÀNG</Link>
      </nav>

      <button className="md:hidden">
        <i className="fas fa-bars text-xl"></i>
      </button>

      {/* Search + Icons */}
      <div className="flex items-center gap-4">
        {/* Thanh tìm kiếm */}
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="border rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
          >
            <img src="/search.jpg" alt="Search" className="w-4 h-4" />
          </button>
        </form>

        <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            {/* Nút Profile */}
            <Link to={profileLink} className="relative">
              <img src="/profile1.jpg" alt="User" className="w-10 h-10 rounded-full object-cover cursor-pointer" />
            </Link>
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-full bg-red-600 text-white text-sm hover:bg-red-700 transition hover:scale-105"
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm hover:bg-blue-700 transition hover:scale-105"
          >
            Đăng nhập
          </Link>
        )}
        </div>

        {/* Giỏ hàng */}
        <Link to="/cart" className="relative">
          <i className="fas fa-shopping-cart text-lg" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
