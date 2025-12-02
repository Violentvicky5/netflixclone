import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import loginImg from "../assets/login.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formdata, setFormdata] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });

    if (e.target.name === "email") setEmailError("");
    if (e.target.name === "password") setPasswordError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    let valid = true;

    setEmailError("");
    setPasswordError("");

    if (!formdata.email.trim()) {
      setEmailError("Email cannot be empty");
      valid = false;
    }
    if (!formdata.password.trim()) {
      setPasswordError("Password cannot be empty");
      valid = false;
    }

    if (!valid) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/Userdashboard");
      } else {
        setEmailError("Invalid credentials");
        setPasswordError("Invalid credentials");
        setFormdata({ email: "", password: "" });
      }
    } catch (error) {
      console.error(error);
      setEmailError("Server error");
      setPasswordError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-black d-flex flex-column"
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${loginImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header />

      <div className="d-flex justify-content-center align-items-center flex-grow-1 px-3 mb-5">
        <form
          onSubmit={handleSubmit}
          className="p-4 rounded"
          style={{
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "rgba(0,0,0,0.75)",
          }}
        >
          <h3 className="text-light fw-bold mb-3">Sign In</h3>

          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Enter your email"
            value={formdata.email}
            onChange={handleChange}
            style={{
              border: emailError ? "2px solid red" : "1px solid #ccc",
            }}
          />
          {emailError && <p className="text-danger mb-2">{emailError}</p>}

          <input
            type="password"
            name="password"
            className="form-control mb-3"
            placeholder="Enter your password"
            value={formdata.password}
            onChange={handleChange}
            style={{
              border: passwordError ? "2px solid red" : "1px solid #ccc",
            }}
          />
          {passwordError && <p className="text-danger mb-3">{passwordError}</p>}

          <button
            type="submit"
            className="btn w-100 text-light mb-3"
            style={{ backgroundColor: "rgba(218,6,17,0.918)" }}
            disabled={loading}
          >
            {loading ? "Please wait..." : "Sign In"}
          </button>

          <div className="text-center">
            <p className="text-light">or</p>
            <button
              type="button"
              className="text-white btn para hovr"
              onClick={() => navigate("/ForgotPassword")}
            >
              Forgot Password
            </button>
          </div>

          <p className="para mt-3 text-light">
            New to Netflix?{" "}
            <a href="#" className="text-primary">
              Sign Up now
            </a>
          </p>

          <p className="para text-light small">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.
            <br />
            <a href="#" className="text-primary">
              Learn more
            </a>
          </p>
        </form>
      </div>

      <div
        className="signup-footer"
        style={{ backgroundColor: "rgba(114,114,114,1)" }}
      >
        <Footer />
      </div>
    </div>
  );
};

export default Login;
