import { useEffect, useState } from "react";
import axios from "axios";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5001/api/complaints/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComplaints(res.data);
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    };
    fetchComplaints();
  }, []);

  return (
    <div>
      <h2>My Complaints</h2>
      <ul>
        {complaints.map((c) => (
          <li key={c._id}>
            <strong>{c.title}</strong> - {c.description}  
            <em> ({c.status})</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyComplaints;
