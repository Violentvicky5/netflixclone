import React from "react";
import HeaderSignOutBar from "../components/HeaderSignOutBar";
import Footer from "../components/Footer";
import { useContext } from "react";
import { PlanContext } from "../context/PlanContext";
import { useNavigate } from "react-router-dom";
const Payment = () => {
  const navigate=useNavigate();
  const { selectedPlan } = useContext(PlanContext);

  return (
    <div>
        <HeaderSignOutBar/>
        <div className="container" style={{width:"50%"}}>
      <h2>Selected Plan</h2>
      {selectedPlan ? (
        <>
          <p>Name: {selectedPlan.name}</p>
          <p>Price: {selectedPlan.price}</p>
          <p>Resolution: {selectedPlan.resolution}</p>
        </>
      ) : (
        <p>No plan selected</p>
      )}
      <div>
          <button
          type="button"
          style={{
            width: "100%",
            backgroundColor: "rgba(252, 2, 15, 0.918)"
          }}
          className="text-white btn mt-3"
          onClick={()=>navigate("/WelcomePage")}
        >
          finish setup
        </button>
      </div>
      </div>
      <div className="signup-footer" style={{ backgroundColor: "#f1eaea" }}>
        <Footer />
      </div>
    </div>
  );
};

export default Payment;
