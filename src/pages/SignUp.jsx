import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState("");

  const handlePwd = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Email cannot be empty");
      return;
    }

    if (!password.trim()) {
      alert("Password cannot be empty");
      return;
    }

    navigate("/signUp2", {
      state: { email},
    });
  };

  return (
    <div>
      <Header />

      <div className="container" style={{ width: "50%" }}>
        <p className="para text-secondary mt-5">step 1 of 3</p>
        <h3>Create a password to start your membership</h3>
        <p className="para mt-0">just a few more steps and you are done!</p>
        <p className="para mt-0">We hate paperwork, too.</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={handlePwd}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "rgba(252, 2, 15, 0.918)",
            }}
            className="text-white btn"
          >
            Next
          </button>
        </form>
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

export default SignUp;
