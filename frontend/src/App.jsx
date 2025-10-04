import { Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ComplaintForm from "./pages/ComplaintForm";
import Navbar from "./components/Nav";
import AdminDashboard from "./pages/AdminDashboard"; 

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/complaint" element={<ComplaintForm />} />
        <Route path="/analytics" element={<AdminDashboard />} /> 
      </Routes>
    </div>
  );
}

export default App;
