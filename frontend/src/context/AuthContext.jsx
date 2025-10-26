import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Changed to named import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        
        const U = {
          id: decoded.id,
          role: decoded.role,
          name: decoded.name,
        };
        console.log(U);
        setUser(U);
      } catch (error) {
        console.error("Invalid token:", error);
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
      }
    }
  }, [token]);

  // Login method
  const login = (userData, tokenData) => {
    console.log("111" + userData);
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem("token", tokenData);
  };

  // Logout method
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;