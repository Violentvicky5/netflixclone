import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderSignOutBar from "../components/HeaderSignOutBar";
import Footer from "../components/Footer";

const SignUp3 = () => {
  const navigate = useNavigate();

  const goToChoosePlan = () => {
    navigate("/ChoosePlan");
  };

  return (
    <div>
      <HeaderSignOutBar />

      <div className="container" style={{ width: "50%" }}>
        <p className="mt-5">
          <i
            className="fa-regular fa-circle-check"
            style={{ color: "red", fontSize: "25px", margin: "0px" }}
          ></i>
        </p>

        <p className="para text-secondary">step 3 of 3</p>
        <h3>Choose your plan!</h3>

        <p className="para mt-0">
          <i  
            className="fa-solid fa-check"
            style={{ color: "red", marginRight: "10px" }}
          ></i>
          No commitments, cancel anytime!
        </p>

        <p className="para mt-0">
          <i  
            className="fa-solid fa-check"
            style={{ color: "red", marginRight: "10px" }}
          ></i>
          Everything on Netflix for one low price!
        </p>

        <p className="para mt-0">
          <i  
            className="fa-solid fa-check"
            style={{ color: "red", marginRight: "10px" }}
          ></i>
          No ads, no additional fees. Ever!
        </p>

        <button
          type="button"
          style={{
            width: "100%",
            backgroundColor: "rgba(252, 2, 15, 0.918)"
          }}
          className="text-white btn mt-3"
          onClick={goToChoosePlan}
        >
          Choose Plan!
        </button>
      </div>

      <div
        className="signup-footer"
        style={{ backgroundColor: "rgb(241, 234, 234)" }}
      >
        <Footer />
      </div>
    </div>
  );
};

export default SignUp3;
