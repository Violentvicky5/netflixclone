import React from "react";
import HeaderSignOutBar from "../components/HeaderSignOutBar";
import Footer from "../components/Footer";
import { useContext } from "react";
import { PlanContext } from "../context/PlanContext";

const Payment = () => {
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
      </div>
      <div className="signup-footer" style={{ backgroundColor: "#f1eaea" }}>
        <Footer />
      </div>
    </div>
  );
};

export default Payment;
