import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EmailInput = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter a valid email.");
      return;
    }

    // Pass email to signup page
    navigate("/signup", { state: { email } });
  };

  return (
    <div className="container text-white mt-5">
      <p className="d-flex center para" style={{ flexDirection: "column" }}>
        Ready to watch? Enter your email to create or restart your membership.
      </p>

      <form className="d-flex center" onSubmit={handleSubmit}>
        <input
          className="form-control me-2 text-white emailInput"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={handleChange}
          style={{
            height: "3rem",
            width: "20rem",
            backgroundColor: "transparent",
            border: "1px solid grey",
            borderRadius: "3px",
          }}
        />

        <button
          type="submit"
          className="btn text-white"
          style={{
            backgroundColor: "rgba(218,6,17,0.918)",
            height: "3rem",
            width: "10rem",
            borderRadius: "3px",
          }}
        >
          Get Started <i className="fa-solid fa-chevron-right"></i>
        </button>
      </form>
    </div>
  );
};

export default EmailInput;
