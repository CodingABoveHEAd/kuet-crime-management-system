import { useEffect, useState } from "react";
import axios from "axios";

function AllComplaints() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5001/api/complaints/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComplaints(res.data);
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    };
    fetchComplaints();
  }, []);

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:5001/api/complaints/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComplaints((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status } : c))
      );
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>All Complaints (Admin/Authority)</h2>
      <ul>
        {complaints.map((c) => (
          <li key={c._id}>
            <strong>{c.title}</strong> - {c.description} by {c.user?.name}  
            <em> ({c.status})</em>
            <select value={c.status} onChange={(e) => updateStatus(c._id, e.target.value)}>
              <option value="Pending">Pending</option>
              <option value="Under Review">Under Review</option>
              <option value="Resolved">Resolved</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllComplaints;
