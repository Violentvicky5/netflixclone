import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import logoImg from "../assets/logo.png";

const DashboardLayout = ({children}) => {
  const navigate = useNavigate();

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

      {/* TOGGLE BUTTON (ONLY SMALL & MEDIUM) */}
      <div>
        <button
          className="btn btn-outline-light mb-3 d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          style={{ width: "100%" }}
        >
          ☰ Menu
        </button>
      </div>

      {/* MAIN LAYOUT */}
      <div className="d-flex" style={{ maxWidth: "98%", margin: "0 auto" }}>
        {/* SIDEBAR */}
        <div className="d-lg-block">
          <div className="collapse d-lg-block" id="sidebarMenu">
            <div
              className="bg-secondary text-white p-4 rounded-2"
              style={{ minHeight: "calc(100vh - 120px)", minWidth: "230px" }}
            >
              <h4 className="fw-bold mb-4">Dashboard</h4>
              <nav>
                <Link to="/admin" className="text-white d-block mb-3">
                  Home
                </Link>
                <Link to="/admin/users" className="text-white d-block mb-3">
                  User Management
                </Link>
                <Link to="/admin/movies" className="text-white d-block mb-3">
                  Movie Management
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div
          className="flex-grow-1 bg-white p-4 rounded-2 ms-lg-3"
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
