import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  Filler,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  Filler
);

function AdminDashboard({ token }) {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const authToken = token || localStorage.getItem("token");
        if (!authToken) {
          setError("No auth token found. Please login.");
          return;
        }

        // NOTE: backend route is /api/analytics/complaints (see backend fix below)
        const res = await axios.get("/api/analytics/complaints", {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        setStats(res.data);
      } catch (err) {
        console.error("Error fetching analytics:", err);
        setError(err.response?.data?.message || err.message);
      }
    };

    fetchStats();
  }, [token]);

  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!stats) return <p>Loading analytics...</p>;

  const categories = stats.categoryStats || [];
  const statuses = stats.statusStats || [];
  const monthly = (stats.monthlyStats || []).slice().sort((a, b) => a._id.localeCompare(b._id));

  const categoryData = {
    labels: categories.map((c) => c._id || "Unknown"),
    datasets: [
      {
        label: "Complaints per Category",
        data: categories.map((c) => c.count || 0),
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const statusData = {
    labels: statuses.map((s) => s._id || "Unknown"),
    datasets: [
      {
        label: "Complaints per Status",
        data: statuses.map((s) => s.count || 0),
        backgroundColor: ["#FF6384", "#36A2EB", "#4BC0C0"],
      },
    ],
  };

  const monthlyData = {
    labels: monthly.map((m) => m._id),
    datasets: [
      {
        label: "Complaints Over Time",
        data: monthly.map((m) => m.count || 0),
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54,162,235,0.2)",
        fill: true,
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      title: { display: false },
    },
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📊 Admin Analytics Dashboard</h2>

      <div style={{ width: "400px", height: "320px", margin: "20px auto" }}>
        <h3>Complaints by Category</h3>
        <div style={{ height: "240px" }}>
          <Pie data={categoryData} options={commonOptions} />
        </div>
      </div>

      <div style={{ width: "720px", height: "360px", margin: "20px auto" }}>
        <h3>Complaints by Status</h3>
        <div style={{ height: "280px" }}>
          <Bar data={statusData} options={commonOptions} />
        </div>
      </div>

      <div style={{ width: "920px", height: "360px", margin: "20px auto" }}>
        <h3>Complaints Over Time</h3>
        <div style={{ height: "280px" }}>
          <Line data={monthlyData} options={commonOptions} />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
