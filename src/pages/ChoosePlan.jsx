import React, { useContext, useState } from "react";
import HeaderSignOutBar from "../components/HeaderSignOutBar";
import Footer from "../components/Footer";
import { PlanContext } from "../context/PlanContext";
import PlanData from "../data/PlanData";
import { useNavigate } from "react-router-dom";

const ChoosePlan = () => {
  const navigate = useNavigate();
  const { setSelectedPlan } = useContext(PlanContext);
  const [activeId, setActiveId] = useState(null);

  const handleSelect = (plan) => {
    setActiveId(plan.id);
    setSelectedPlan(plan);
  };

  const handleNext = () => {
    if (!activeId) {
      alert("Please choose a plan");
      return;
    }
    navigate("/Payment");
  };

  const gradientStyle = {
    background: "linear-gradient(135deg, #6a11cb, #2575fc)", // same gradient for all top sections
    color: "white",
    borderTopLeftRadius: "0.375rem",
    borderTopRightRadius: "0.375rem",
    padding: "1rem",
    fontWeight: "bold",
    position: "relative",
  };

  return (
    <div>
      <HeaderSignOutBar />

      <div className="container" style={{ width: "70%" }}>
        <p className="para text-secondary">Step 4 of 4</p>
        <h6>Choose the plan that's right for you</h6>

        <div className="row mt-4 g-3">
          {PlanData.map((plan) => {
            const isSelected = activeId === plan.id;
            return (
              <div
                key={plan.id}
                className="col-6 col-md-3 d-flex" // 2 per row on small, 4 per row md+
                onClick={() => handleSelect(plan)}
                style={{ cursor: "pointer" }}
              >
                <div
                  className={`card flex-fill ${
                    isSelected ? "border-primary shadow" : "border-secondary"
                  }`}
                  style={{ minHeight: "400px" }} // equal height cards
                >
                  <div style={gradientStyle}>
                    {plan.isPopular && (
                      <span
                        className="badge   position-absolute"
                        style={{ left:"0px", top:"0px",fontWeight: "300",width:"100%", backgroundColor:"#7f32e4" }}
                      >
                        Most Popular
                      </span>
                    )}

                    {isSelected && (
                      <span
                        className="badge bg-primary position-absolute"
                        style={{ top: "10px", right: "10px", fontWeight: "600" }}
                      >
                        <i className="fa-solid fa-check"></i>
                      </span>
                    )}

                    <div>{plan.name}</div>
                    <small>{plan.resolution}</small>
                  </div>

                  <ul className="list-group list-group-flush flex-grow-1">
                    <li className="list-group-item">
                      <strong>Monthly price:</strong> {plan.price}
                    </li>
                    <li className="list-group-item">
                      <strong>Video Quality:</strong> {plan.videoQuality}
                    </li>
                    <li className="list-group-item">
                      <strong>Resolution:</strong> {plan.quality}
                    </li>
                    <li className="list-group-item">
                      <strong>Supported devices:</strong> {plan.devices}
                    </li>
                    <li className="list-group-item">
                      <strong>Devices your household can watch at the same
                      time:</strong> {plan.screens}
                    </li>
                    <li className="list-group-item">
                      <strong>Download devices:</strong> {plan.downloads}
                    </li>
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
<div className="container center">
        <button
          type="button"
          onClick={handleNext}
          className=" btn btn-danger mt-4"
          style={{ width: "30%" }}
        >
          Next
        </button>
     </div>
      </div>

      <div className="signup-footer" style={{ backgroundColor: "#f1eaea" }}>
        <Footer />
      </div>
    </div>
  );
};

export default ChoosePlan;
