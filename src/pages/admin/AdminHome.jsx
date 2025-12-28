import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useNavigate } from "react-router-dom";
const AdminHome = () => {
  const API = import.meta.env.VITE_BACKEND_URL;

  const [stats, setStats] = useState({
    totalUsers: 0,
    verifiedUsers: 0,
    notVerifiedUsers: 0,
    delUser: 0,
    totalMovies: 0,
    categories: {}, //{ popular: 5, toprated: 10, upcoming: 3 }
  });

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        navigate("/AdminLoginPage"); // Redirect if no token
        return;
      }

      const res = await fetch(`${API}/api/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        // Token might be invalid/expired
        localStorage.removeItem("adminToken");
        navigate("/AdminLoginPage");
        return;
      }

      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch stats", err);
      navigate("/AdminLoginPage"); // Redirect on error
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Card colors (professional, readable with white text)
  const CARD_COLORS = [
    "#1f77b4", // blue
    "#2ca02c", // green
    "#ff7f0e", // orange
    "#d62728", // red
    "#9467bd", // purple
    "#8c564b", // brown
    "#e377c2", // pink
    "#7f7f7f", // gray
    "#bcbd22", // olive
    "#17becf", // cyan
  ];

  // Bar chart data
  const barData = [
    { name: "Total Users", value: stats.totalUsers },
    { name: "Verified Users", value: stats.verifiedUsers },
    { name: "Not Verified", value: stats.notVerifiedUsers },
    { name: "Deleted Users", value: stats.delUser },
    { name: "Total Movies", value: stats.totalMovies },
  ];

  // Pie chart data
  const pieData = Object.entries(stats.categories || {}).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Admin Dashboard</h2>

      {/* User & Movie Stats Cards */}
      <div className="row mb-4">
        {[
          { name: "Total Users", value: stats.totalUsers },
          { name: "Verified Users", value: stats.verifiedUsers },
          { name: "Not Verified", value: stats.notVerifiedUsers },
          { name: "Deleted Users", value: stats.delUser },
          { name: "Total Movies", value: stats.totalMovies },
        ].map((item, index) => (
          <div className="col-md-3 mb-3" key={item.name}>
            <div
              className="card text-white text-center p-3"
              style={{ backgroundColor: CARD_COLORS[index % CARD_COLORS.length] }}
            >
              <h5>{item.name}</h5>
              <h2>{item.value}</h2>
            </div>
          </div>
        ))}

        {/* Movie Category Cards */}
        {Object.entries(stats.categories || {}).map(([name, value], index) => (
          <div className="col-md-3 mb-3" key={name}>
            <div
              className="card text-white text-center p-3"
              style={{ backgroundColor: CARD_COLORS[(index + 5) % CARD_COLORS.length] }}
            >
              <h5>{name.charAt(0).toUpperCase() + name.slice(1)} Movies</h5>
              <h2>{value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="card mb-4">
        <div className="card-body">
          <h4 className="text-center mb-3">Platform Stats</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#1f77b4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="card mb-4">
        <div className="card-body">
          <h4 className="text-center mb-3">Movie Categories Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name }) => name} // Fixed label showing category name
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={CARD_COLORS[(index + 3) % CARD_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
