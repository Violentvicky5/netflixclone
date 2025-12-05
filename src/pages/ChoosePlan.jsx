import React, { useContext, useState } from "react";
import HeaderSignOutBar from "../components/HeaderSignOutBar";
import Footer from "../components/Footer";
import { PlanContext } from "../context/PlanContext";
import { EmailContext } from "../context/EmailContext";
import { PlanData } from "../data/PlanData";
import { useNavigate } from "react-router-dom";

const ChoosePlan = () => {
  const navigate = useNavigate();
  const { selectedPlan, setSelectedPlan } = useContext(PlanContext);
  const { email } = useContext(EmailContext);

  const [activeId, setActiveId] = useState(null);
  const API = import.meta.env.VITE_BACKEND_URL;

  const handleSelect = (plan) => {
    setActiveId(plan.id);
    setSelectedPlan(plan); // stored in context + localStorage
  };

  const handleNext = async () => {
  if (!activeId) {
    alert("Please choose a plan");
    return;
  }

  try {
    // Convert ₹149 → 149
    const cleanPrice = Number(String(selectedPlan.price).replace(/[^0-9]/g, ""));

    const res = await fetch(`${API}/updateplan`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        planName: selectedPlan.name,
        planPrice: cleanPrice,  // <--- FIXED
        planQuality: selectedPlan.quality,
      }),
    });

    const data = await res.json();
    console.log("Plan saved in DB →", data);

    navigate("/Payment");
  } catch (error) {
    console.error("Error saving plan:", error);
  }
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
                className="col-6 col-md-3 d-flex"
                onClick={() => handleSelect(plan)}
                style={{ cursor: "pointer" }}
              >
                <div
                  className={`card flex-fill ${
                    isSelected ? "border-primary shadow" : "border-secondary"
                  }`}
                  style={{ minHeight: "400px", position: "relative" }}
                >
                  <div className="gradientStyle" style={{ padding: "20px" }}>
                    {plan.isPopular && (
                      <span
                        className="badge position-absolute"
                        style={{
                          left: "0px",
                          top: "0px",
                          width: "100%",
                          backgroundColor: "#7f32e4",
                          fontWeight: "300",
                        }}
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

                    <div className="fw-bold">{plan.name}</div>
                    <small>{plan.resolution}</small>
                  </div>

                  <ul className="list-group list-group-flush flex-grow-1">
                    <li className="list-group-item">
                      <strong>Monthly price:</strong>
                      <p>{plan.price}</p>
                    </li>
                    <li className="list-group-item">
                      <strong>Video Quality:</strong>
                      <p>{plan.videoQuality}</p>
                    </li>
                    <li className="list-group-item">
                      <strong>Resolution:</strong>
                      <p>{plan.quality}</p>
                    </li>
                    <li className="list-group-item">
                      <strong>Supported devices:</strong>
                      <p>{plan.devices}</p>
                    </li>
                    <li className="list-group-item">
                      <strong>Devices your household can watch at same time:</strong>
                      <p>{plan.screens}</p>
                    </li>
                    <li className="list-group-item">
                      <strong>Download devices:</strong>
                      <p>{plan.downloads}</p>
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
            className="btn btn-danger mt-4"
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
