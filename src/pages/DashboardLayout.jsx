import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import logoImg from "../assets/logo.png";

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true); // track sidebar state

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="container-fluid py-3" style={{ background: "#000" }}>
      {/* HEADER */}
      <div
        className="d-flex justify-content-between align-items-center bg-dark rounded-2 px-4 py-2 mb-4"
        style={{ margin: "0 auto", maxWidth: "98%" }}
      >
        <img src={logoImg} alt="logo" style={{ width: "140px", height: "60px" }} />
        <button className="btn btn-danger px-4" onClick={() => navigate("/")}>
          Sign Out
        </button>
      </div>

      {/* TOGGLE BUTTON FOR SMALL SCREENS */}
      <button
        className="btn btn-outline-light mb-3 d-lg-none w-100"
        onClick={toggleSidebar}
      >
        ☰ Menu
      </button>

      {/* MAIN LAYOUT */}
      <div className="d-flex">
        {/* SIDEBAR */}
        {sidebarOpen && (
          <div className="sidebar-wrapper me-3" style={{ minWidth: "230px" }}>
            <div className="bg-secondary text-white p-4 rounded-2  sidebarsticky">
              <h4 className="fw-bold mb-4">Dashboard</h4>
              <nav>
                <Link to="/admin" className="text-white d-block mb-3">Home</Link>
                <Link to="/admin/users" className="text-white d-block mb-3">User Management</Link>
                <Link to="/admin/movies" className="text-white d-block mb-3">Movie Management</Link>
                <Link to="/admin/moviesdelete" className="text-white d-block mb-3">Delete movie</Link>

              </nav>
            </div>
          </div>
        )}

        {/* CONTENT AREA */}
        <div
          className="flex-grow-1 bg-white p-4 rounded-2"
          style={{ minHeight: "calc(100vh - 120px)" }}
        >
          {children}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
