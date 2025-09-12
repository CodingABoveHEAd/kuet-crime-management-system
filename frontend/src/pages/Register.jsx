import { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const res= await axios.post("/api/auth/register",
         { name, email, password ,role});
      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
      //console.log(error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} /> <br />
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} /> <br />
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} /> <br />
         <input type="text" placeholder="role" value={role} onChange={(e)=>setRole(e.target.value)} /> <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
export default Register;
