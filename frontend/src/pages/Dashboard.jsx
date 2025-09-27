import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import "../styles/pagestyles/Dashboard.css";

function Dashboard() {
  const { token, user } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      if (!user) return; // <-- wait until user is loaded

      try {
        const endpoint =
          user.role === "admin" || user.role === "authority"
            ? "/api/complaints/all"
            : "/api/complaints/my";

        const res = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token || localStorage.getItem("token")}`,
          },
        });

        setComplaints(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch complaints");
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [token, user]);

  const handleStatusChange = async (complaintId, newStatus) => {
    try {
      await axios.put(
        `/api/complaints/${complaintId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token || localStorage.getItem("token")}`,
          },
        }
      );

      setComplaints((prev) =>
        prev.map((c) =>
          c._id === complaintId ? { ...c, status: newStatus } : c
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  if (!user) return <p>Loading user info...</p>; // <-- wait for user

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <p>
        Welcome, <strong>{user.name || "User"}</strong> ({user.role})
      </p>

      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <table className="complaints-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Category</th>
              <th>Status</th>
              <th>Submitted By</th>
              <th>Created At</th>
              {(user.role === "admin" || user.role === "authority") && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {complaints.map((c) => (
              <tr key={c._id}>
                <td>{c.title}</td>
                <td>{c.description}</td>
                <td>{c.category}</td>
                <td>{c.status}</td>
                <td>{c.user?.name || user.name}</td>
                <td>{new Date(c.createdAt).toLocaleString()}</td>
                {(user.role === "admin" || user.role === "authority") && (
                  <td>
                    <select
                      value={c.status}
                      onChange={(e) => handleStatusChange(c._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;
