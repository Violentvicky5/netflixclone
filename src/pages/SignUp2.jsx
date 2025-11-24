import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import HeaderSignOutBar from "../components/HeaderSignOutBar";

const SignUp2 = () => {
    const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ""; // get email passed from step 1

  return (
    <div>
      <HeaderSignOutBar />

      <div className="container" style={{ width: "50%" }}>
        <p className="para text-secondary mt-5">step 2 of 3</p>
        <h3>Great, now let's verify your Email</h3>
        <p className="para mt-0">Just a few more steps and you're done!</p>

        <p className="para mt-0">Click the link we sent to <strong>{email} </strong>to verify</p>
      <p className="para mt-0">verifying your email will improve your account security and help you receive importat Netflix communication</p>
      
      <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "rgba(252, 2, 15, 0.918)",
            }}
            className="text-white btn"
            onClick={()=>navigate("/signUp3")}
          >
            Done
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

export default SignUp2;
