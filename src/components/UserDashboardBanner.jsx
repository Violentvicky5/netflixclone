import React, { useState } from "react";
import { Button } from "react-bootstrap";
import UserDashboardHeader from "./UserDashboardHeader";
import Poster from "../assets/home.jpg";
import logo from "../assets/logo.png";

const UserDashboardBanner = () => {
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div
      className="banner-bg d-flex flex-column justify-content-end text-start p-4"
      style={{
        backgroundImage: `url(${Poster})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        color: "#fff",
      }}
    >
      {/* ⭐ HEADER INSIDE BANNER AND ON TOP ⭐ */}
      <div className="banner-header">
        <UserDashboardHeader />
      </div>

      <div className="container">
        <div>
          <img src={logo} alt="logo" style={{ height: "20px" }} />
          <h1 className="fw-bold mb-3">stranger things</h1>
        </div>

        {/* CONTENT */}
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-row">
            <Button variant="light" className="me-2 fw-bold">
              Play
            </Button>
            <Button variant="secondary" className="fw-bold">
              ! More Info
            </Button>
          </div>

          {/* 🔊 MUTE / UNMUTE TOGGLE */}
          <div className="d-flex align-items-center" style={{ gap: "10px" }}>
            
            {/* CIRCLE ICON - CLICK TO TOGGLE */}
            <div
              onClick={toggleMute}
              className="d-flex justify-content-center align-items-center"
              style={{
                width: "35px",
                height: "35px",
                background: "rgba(0,0,0,0.3)",
                borderRadius: "50%",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              <i
                className={
                  isMuted
                    ? "fa-solid fa-volume-xmark"
                    : "fa-solid fa-volume-high"
                }
              ></i>
            </div>

            {/* BAR + UA 16+ */}
            <div
              className="d-flex align-items-center"
              style={{ backgroundColor: "rgba(0,0,0,0.3)", gap: "10px" }}
            >
              <span
                className="badge d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: "grey",
                  width: "3px",
                  height: "25px",
                  padding: "0",
                  fontSize: "25px",
                }}
              >
                |
              </span>

              <p className="fw-bold m-0">UA 16+</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardBanner;
