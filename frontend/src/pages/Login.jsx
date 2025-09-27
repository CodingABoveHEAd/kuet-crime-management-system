import { useState, useContext } from "react";
import axios from "axios";
//import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../styles/pagestyles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", { email, password });

      const token = res.data.token;

      // Call login with token only; AuthContext will decode and set user
      login(null, token);

      // Save token in localStorage (already done inside AuthContext)
      localStorage.setItem("token", token);

      // Force reload to ensure AuthContext updates
      window.location.href = "/dashboard"; // this reloads the page and redirects
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
}

export default Login;
