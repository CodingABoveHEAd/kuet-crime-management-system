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

import "../styles/pagestyles/AdminDashboard.css";

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
          setError("Only authorized admin can access the page");
          return;
        }

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

  if (error) {
    return (
      <div className="analytics-container">
        <div className="error-state">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="analytics-container">
        <div className="loading-state">Loading analytics data...</div>
      </div>
    );
  }

  const categories = stats.categoryStats || [];
  const statuses = stats.statusStats || [];
  const monthly = (stats.monthlyStats || [])
    .slice()
    .sort((a, b) => a._id.localeCompare(b._id));

  // Calculate totals for overview cards
  const totalComplaints = categories.reduce(
    (sum, c) => sum + (c.count || 0),
    0
  );
  const pendingCount = statuses.find((s) => s._id === "Pending")?.count || 0;
  const resolvedCount = statuses.find((s) => s._id === "Resolved")?.count || 0;
  const underReviewCount =
    statuses.find((s) => s._id === "Under Review")?.count || 0;

  // Chart Data Configurations
  const categoryData = {
    labels: categories.map((c) => c._id || "Unknown"),
    datasets: [
      {
        label: "Complaints per Category",
        data: categories.map((c) => c.count || 0),
        backgroundColor: [
          "rgba(76, 175, 80, 0.8)",
          "rgba(33, 150, 243, 0.8)",
          "rgba(255, 152, 0, 0.8)",
          "rgba(156, 39, 176, 0.8)",
          "rgba(255, 87, 34, 0.8)",
        ],
        borderColor: ["#4caf50", "#2196f3", "#ff9800", "#9c27b0", "#ff5722"],
        borderWidth: 2,
      },
    ],
  };

  const statusData = {
    labels: statuses.map((s) => s._id || "Unknown"),
    datasets: [
      {
        label: "Complaints per Status",
        data: statuses.map((s) => s.count || 0),
        backgroundColor: [
          "rgba(255, 152, 0, 0.8)",
          "rgba(33, 150, 243, 0.8)",
          "rgba(76, 175, 80, 0.8)",
        ],
        borderColor: ["#ff9800", "#2196f3", "#4caf50"],
        borderWidth: 2,
      },
    ],
  };

  const monthlyData = {
    labels: monthly.map((m) => m._id),
    datasets: [
      {
        label: "Complaints Filed",
        data: monthly.map((m) => m.count || 0),
        borderColor: "#4caf50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: "#4caf50",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 15,
          font: {
            size: 12,
            family: "'Inter', sans-serif",
            weight: "600",
          },
          color: "#2e7d32",
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(46, 125, 50, 0.95)",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
        borderColor: "#4caf50",
        borderWidth: 1,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          family: "'Inter', sans-serif",
          weight: "700",
        },
        bodyFont: {
          size: 13,
          family: "'Inter', sans-serif",
        },
      },
    },
  };

  const barOptions = {
    ...commonOptions,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(76, 175, 80, 0.1)",
        },
        ticks: {
          color: "#2e7d32",
          font: {
            size: 11,
            family: "'Inter', sans-serif",
          },
        },
      },
      x: {
        grid: {
          display: true,
        },
        ticks: {
          color: "#2e7d32",
          font: {
            size: 11,
            family: "'Inter', sans-serif",
          },
        },
      },
    },
  };

  const lineOptions = {
    ...commonOptions,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(76, 175, 80, 0.1)",
        },
        ticks: {
          color: "#2e7d32",
          font: {
            size: 11,
            family: "'Inter', sans-serif",
          },
        },
      },
      x: {
        grid: {
          color: "rgba(76, 175, 80, 0.05)",
        },
        ticks: {
          color: "#2e7d32",
          font: {
            size: 11,
            family: "'Inter', sans-serif",
          },
        },
      },
    },
  };

  return (
    <div className="analytics-container">
      <h2>📊 Admin Analytics Dashboard</h2>
      <p className="analytics-subtitle">
        Comprehensive insights and statistics for crime management
      </p>

      {/* Overview Stats Cards */}
      <div className="stats-overview">
        <div className="overview-card">
          <span className="card-icon">📊</span>
          <h3>{totalComplaints}</h3>
          <p>Total Complaints</p>
        </div>
        <div className="overview-card">
          <span className="card-icon">⏳</span>
          <h3>{pendingCount}</h3>
          <p>Pending Review</p>
        </div>
        <div className="overview-card">
          <span className="card-icon">👀</span>
          <h3>{underReviewCount}</h3>
          <p>Under Investigation</p>
        </div>
        <div className="overview-card">
          <span className="card-icon">✅</span>
          <h3>{resolvedCount}</h3>
          <p>Resolved Cases</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* Category Chart */}
        <div className="chart-card">
          <h3>Complaints by Category</h3>
          <div className="chart-wrapper small">
            <div className="chart-canvas-wrapper">
              <Pie data={categoryData} options={commonOptions} />
            </div>
          </div>
        </div>

        {/* Status Chart */}
        <div className="chart-card">
          <h3>Complaints by Status</h3>
          <div className="chart-wrapper medium">
            <div className="chart-canvas-wrapper">
              <Bar data={statusData} options={barOptions} />
            </div>
          </div>
        </div>

        {/* Monthly Trend Chart */}
        <div className="chart-card full-width">
          <h3>Complaints Over Time</h3>
          <div className="chart-wrapper large">
            <div className="chart-canvas-wrapper">
              <Line data={monthlyData} options={lineOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
