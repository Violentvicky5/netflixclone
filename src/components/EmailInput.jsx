import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmailContext } from "../context/EmailContext";

const EmailInput = () => {
  const navigate = useNavigate();
  const { setEmail } = useContext(EmailContext);
  const [localEmail, setLocalEmail] = useState("");

  const handleChange = (e) => setLocalEmail(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!localEmail.trim()) {
      alert("Please enter a valid email.");
      return;
    }

    setEmail(localEmail);
    navigate("/signup");
  };

  return (
    <div className="container text-white mt-5">
      <p className="text-center para mb-4">
        Ready to watch? Enter your email to create or restart your membership.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="row justify-content-center g-3">
          <div className=" col-md-6 col-lg-5">
            <input
              className="form-control text-white emailInput"
              type="email"
              placeholder="Email Address"
              value={localEmail}
              onChange={handleChange}
              style={{
                height: "3rem",
                backgroundColor: "transparent",
                border: "1px solid grey",
                borderRadius: "4px",
              }}
            />
          </div>

          <div className=" col-md-4 col-lg-2">
            <button
              type="submit"
              className="btn text-white w-100"
              style={{
                backgroundColor: "rgba(218,6,17,0.918)",
                height: "3rem",
                borderRadius: "4px",
                padding: "0 1.5rem",
              }}
            >
              Get Started <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmailInput;
