import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/HomePage";
import Search from "./components/Search";
import "./App.css";
import Auth from "./pages/Auth/Auth";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ProductDetailPage from "./pages/Product/ProductDetailPage";
import ProductPage from "./pages/Product/ProductPage";
import FigurePage from "./pages/Product/FigurePage";
import type { JSX } from "react";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import BlindboxPage from "./pages/Product/BlindboxePage";
import OrderPage from "./pages/OrderPage";

function PrivateRoute({ children, role }: { children: JSX.Element, role: string | null }) {
  const userRole = localStorage.getItem("role"); // Giả sử bạn lưu vai trò người dùng trong localStorage
  return role === userRole ? children : <Navigate to="/" />;
}

function App() {

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/order" element={<OrderPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/product/figures" element={<FigurePage />} />
        <Route path="/product/blindboxes" element={<BlindboxPage />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/search" element={<Search />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
      />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
