import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import HeaderSignOutBar from "../components/HeaderSignOutBar";
import { EmailContext } from "../context/EmailContext";

const SignUp2 = () => {
  const navigate = useNavigate();
  const { email } = useContext(EmailContext); // get email from context

  return (
    <div>
      <HeaderSignOutBar />

      <div className="container" style={{ width: "50%" }}>
        <p className="para text-secondary mt-5">step 2 of 3</p>
        <h3>Great, now let's verify your Email</h3>
        <p className="para mt-0">Just a few more steps and you're done!</p>

        <p className="para mt-0">
          Click the link we sent to <strong>{email}</strong> to verify
        </p>
        <p className="para mt-0">
          Verifying your email will improve your account security and help you receive important Netflix communication.
        </p>

        <button
          type="button"
          style={{
            width: "100%",
            backgroundColor: "rgba(252, 2, 15, 0.918)",
          }}
          className="text-white btn"
          onClick={() => navigate("/signUp3")}
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
