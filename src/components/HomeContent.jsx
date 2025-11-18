import React from "react";
import Header from "./Header";
import TrendingCarousel from "./TrendingCarousel";
import loginImg from "../assets/login.jpg";
const HomeContent = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),url(${loginImg})`,
        }}
      >
        <Header />
        <div className="homeWrapper">
          <div className="container text-white ">
            <h1 className="fw-bold">Unlimited movies, shows, and more</h1>
            <h6>Starts at ₹149. Cancel at any time.</h6>
                            <p className="para">Ready to watch? Enter your email to create or restart your membership.</p>

            <form className="d-flex center">
              <input
                className="form-control me-2 text-white emailInput"
                type="email"
                placeholder="Email Address"
                style={{ height: "3rem", width: "20rem",backgroundColor:"transparent",border:"1px solid grey" }}
              />
              <button
                className="btn text-white"
                style={{ backgroundColor: "rgba(218,6,17,0.918)",height: "3rem", width: "9rem"  }}
              >
                Get Started <i className="fa-solid fa-chevron-right"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
      <TrendingCarousel/>
    </>
  );
};

export default HomeContent;
