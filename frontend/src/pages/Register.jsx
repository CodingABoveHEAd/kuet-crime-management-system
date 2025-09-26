import { useState } from "react";
import axios from "axios";
import "../styles/pagestyles/Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
        role,
      });
      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
      //console.log(error.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Role (e.g., admin, user)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="register-btn">
          Create Account
        </button>
      </form>

      {/* Optional: Add login redirect link */}
      <div className="login-link">
        <p>
          Already have an account? <a href="/login">Sign in here</a>
        </p>
      </div>
    </div>
  );
}
export default Register;
