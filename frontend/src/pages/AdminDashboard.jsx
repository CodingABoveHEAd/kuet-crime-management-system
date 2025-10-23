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

// Helpers: build YYYY-MM keys, parse various backend month formats, and build a zero-filled series
const toMonthKey = (year, monthIndex0) => {
  const y = String(year);
  const m = String(monthIndex0 + 1).padStart(2, "0");
  return `${y}-${m}`;
};

const parseMonthId = (id) => {
  if (!id) return null;

  // String formats
  if (typeof id === "string") {
    // "YYYY-MM"
    const isoMatch = id.match(/^(\d{4})-(\d{1,2})$/);
    if (isoMatch) {
      const year = parseInt(isoMatch[1], 10);
      const monthIndex0 = parseInt(isoMatch[2], 10) - 1; // 0-based
      if (monthIndex0 >= 0 && monthIndex0 <= 11) return toMonthKey(year, monthIndex0);
    }
    // Try Date.parse (e.g., "September 2025" or "2025-09-01")
    const d = new Date(id);
    if (!isNaN(d)) return toMonthKey(d.getFullYear(), d.getMonth());
    return null;
  }

  // Object formats: {_id: {year: 2025, month: 9}} or {_id:{y:2025,m:9}}
  if (typeof id === "object") {
    const year = id.year ?? id.y;
    let month = id.month ?? id.m;
    if (typeof year === "number" && typeof month === "number") {
      // Some APIs send 1-12
      const monthIndex0 = month > 0 ? month - 1 : month;
      if (monthIndex0 >= 0 && monthIndex0 <= 11) return toMonthKey(year, monthIndex0);
    }
  }

  return null;
};

const buildMonthSeries = (monthlyStats = [], monthsBack = 12) => {
  // Map incoming stats to key -> count
  const countByKey = new Map();
  for (const item of monthlyStats) {
    const key = parseMonthId(item._id ?? item.id ?? item.date ?? item.month);
    const count = Number(item.count ?? item.total ?? 0) || 0;
    if (key) {
      countByKey.set(key, (countByKey.get(key) || 0) + count);
    }
  }

  // Build a continuous range for the last N months including current month
  const now = new Date();
  const endYear = now.getFullYear();
  const endMonth0 = now.getMonth();

  const labels = [];
  const data = [];

  for (let i = monthsBack - 1; i >= 0; i--) {
    const d = new Date(endYear, endMonth0 - i, 1);
    const y = d.getFullYear();
    const m0 = d.getMonth();
    const key = toMonthKey(y, m0);
    labels.push(d.toLocaleString(undefined, { month: "short", year: "numeric" })); // e.g., "Sep 2025"
    data.push(countByKey.get(key) || 0);
  }

  return { labels, data };
};

function AdminDashboard({ token }) {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Range in months for "Complaints Over Time"
  const [monthRange, setMonthRange] = useState(12);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const authToken = token || localStorage.getItem("token");
      if (!authToken) {
        setError("Only authorized admin can access the page");
        setLoading(false);
        return;
      }

      const res = await axios.get("/api/analytics/complaints", {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setStats(res.data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Error fetching analytics:", err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (error) {
    return (
      <div className="analytics-container">
        <div className="error-state">
          <p>Error: {error}</p>
          <button className="btn btn-retry" onClick={fetchStats}>Retry</button>
        </div>
      </div>
    );
  }

  if (loading || !stats) {
    return (
      <div className="analytics-container">
        <div className="loading-state">Loading analytics data...</div>
      </div>
    );
  }

  const categories = stats.categoryStats || [];
  const statuses = stats.statusStats || [];
  const monthlyRaw = stats.monthlyStats || [];

  // Overview totals
  const totalComplaints = categories.reduce((sum, c) => sum + (c.count || 0), 0);
  const pendingCount = statuses.find((s) => (s._id || s.id) === "Pending")?.count || 0;
  const resolvedCount = statuses.find((s) => (s._id || s.id) === "Resolved")?.count || 0;
  const underReviewCount =
    statuses.find((s) => (s._id || s.id) === "Under Review")?.count || 0;

  // Charts
  const categoryData = {
    labels: categories.map((c) => c._id || c.id || "Unknown"),
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
    labels: statuses.map((s) => s._id || s.id || "Unknown"),
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

  // Proper month ordering + gap filling for last N months
  const series = buildMonthSeries(monthlyRaw, monthRange);
  const monthlyData = {
    labels: series.labels,
    datasets: [
      {
        label: "Complaints Filed",
        data: series.data,
        borderColor: "#4caf50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        fill: true,
        tension: 0.35,
        pointRadius: 4,
        pointHoverRadius: 6,
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
          font: { size: 12, family: "'Inter', sans-serif", weight: "600" },
          color: "#2e7d32",
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      title: { display: false },
      tooltip: {
        backgroundColor: "rgba(46, 125, 50, 0.95)",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
        borderColor: "#4caf50",
        borderWidth: 1,
        cornerRadius: 8,
        titleFont: { size: 14, family: "'Inter', sans-serif", weight: "700" },
        bodyFont: { size: 13, family: "'Inter', sans-serif" },
      },
    },
  };

  const barOptions = {
    ...commonOptions,
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "rgba(76, 175, 80, 0.1)" },
        ticks: { color: "#2e7d32", font: { size: 11, family: "'Inter', sans-serif" } },
      },
      x: {
        grid: { display: true },
        ticks: { color: "#2e7d32", font: { size: 11, family: "'Inter', sans-serif" } },
      },
    },
  };

  const lineOptions = {
    ...commonOptions,
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "rgba(76, 175, 80, 0.1)" },
        ticks: { color: "#2e7d32", font: { size: 11, family: "'Inter', sans-serif" } },
      },
      x: {
        grid: { color: "rgba(76, 175, 80, 0.05)" },
        ticks: { color: "#2e7d32", font: { size: 11, family: "'Inter', sans-serif" } },
      },
    },
  };

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <div>
          <h2>📊 Admin Analytics Dashboard</h2>
          <p className="analytics-subtitle">
            Comprehensive insights and statistics for crime management
          </p>
        </div>
        <div className="header-actions">
          <button className="btn btn-refresh" onClick={fetchStats}>Refresh</button>
          {lastUpdated && (
            <span className="last-updated">
              Updated: {lastUpdated.toLocaleString()}
            </span>
          )}
        </div>
      </div>

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
          <div className="chart-card-header">
            <h3>Complaints by Category</h3>
          </div>
          <div className="chart-wrapper small">
            <div className="chart-canvas-wrapper">
              {categoryData.labels.length ? (
                <Pie data={categoryData} options={commonOptions} />
              ) : (
                <div className="empty-chart">No category data</div>
              )}
            </div>
          </div>
        </div>

        {/* Status Chart */}
        <div className="chart-card">
          <div className="chart-card-header">
            <h3>Complaints by Status</h3>
          </div>
          <div className="chart-wrapper medium">
            <div className="chart-canvas-wrapper">
              {statusData.labels.length ? (
                <Bar data={statusData} options={barOptions} />
              ) : (
                <div className="empty-chart">No status data</div>
              )}
            </div>
          </div>
        </div>

        {/* Monthly Trend Chart */}
        <div className="chart-card full-width">
          <div className="chart-card-header">
            <h3>Complaints Over Time</h3>
            <div className="range-controls" role="group" aria-label="Months range">
              {[6, 12, 24].map((n) => (
                <button
                  key={n}
                  className={`range-btn ${monthRange === n ? "active" : ""}`}
                  onClick={() => setMonthRange(n)}
                >
                  Last {n}m
                </button>
              ))}
            </div>
          </div>
          <div className="chart-wrapper large">
            <div className="chart-canvas-wrapper">
              {monthlyData.labels.length ? (
                <Line data={monthlyData} options={lineOptions} />
              ) : (
                <div className="empty-chart">No monthly data</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
