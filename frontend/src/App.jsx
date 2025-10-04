import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ComplaintForm from "./pages/ComplaintForm";
import Navbar from "./components/Nav";
import Footer from "./components/Footer"; // ✅ new footer
import AdminDashboard from "./pages/AdminDashboard";
import AdminMap from "./pages/AdminMap";

function App() {
  return (
    <div
      className="app-container"
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar />

      <div style={{ flex: 1, paddingTop: "70px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/complaint" element={<ComplaintForm />} />
          <Route path="/analytics" element={<AdminDashboard />} />
          <Route path="/map" element={<AdminMap />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
