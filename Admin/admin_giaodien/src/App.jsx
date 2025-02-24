import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import ProductList from "./components/ProductList";
import OrderList from "./components/OrderList";
import MaGiamGia from "./components/MaGiamGia"; // Thêm import cho MaGiamGia
import NhanVien from "./components/NhanVien"; // Thêm import cho MaGiamGia
function App() {
  return (
    <Router>
      <AdminLayout>
        <Routes>
          <Route path="/products" element={<ProductList />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/coupons" element={<MaGiamGia />} /> {/* Thêm route cho MaGiamGia */}
          <Route path="/employees" element={<NhanVien/>} />
          <Route path="/" element={<h1>Trang Chủ</h1>} /> {/* Thêm nội dung cho Trang Chủ */}
        </Routes>
      </AdminLayout>
    </Router>
  );
}

export default App;