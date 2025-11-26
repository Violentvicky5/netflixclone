import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { EmailContext } from "../context/EmailContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { email, setEmail } = useContext(EmailContext);

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
const API = import.meta.env.VITE_BACKEND_URL;
  const handlePwd = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;          
    setLoading(true);

    if (!email.trim()) {
      alert("Email cannot be empty");
      setLoading(false);
      return;
    }
    if (!password.trim()) {
      alert("Password cannot be empty");
      setLoading(false);
      return;
    }

    try {
      const result = await fetch(`${API}/register`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});

      const data = await result.json();

      if (!result.ok) {
        alert(data.msg); 
        setLoading(false);
        return;
      }

      alert("Verification email sent. Check your inbox!");
      navigate("/signUp2");

    } catch (error) {
      console.log(error);
      alert("Error registering user");
    } finally {
      setLoading(false);
    }
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
            disabled={loading} // <-- disables button
            style={{
              width: "100%",
              backgroundColor: "rgba(252, 2, 15, 0.918)",
            }}
            className="text-white btn"
          >
            {loading ? "Please wait..." : "Next"} {/* Button text updates */}
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
