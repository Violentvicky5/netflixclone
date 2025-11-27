import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import loginImg from "../assets/login.png";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [formdata, setFormdata] = useState({ email: "", password: "" });
const navigate =useNavigate();
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

const API = import.meta.env.VITE_BACKEND_URL; 

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(`${API}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formdata)
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      alert("Login Successful");
      navigate("/Userdashboard")
    } else {
      alert(data.msg || "Login Failed");
    }

  } catch (error) {
    console.error(error);
    alert("Server Error");
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
      <Header/>

      
      <div className="d-flex justify-content-center align-items-center flex-grow-1 px-3">
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
            onChange={handleChange}
            value={formdata.email}
            required
          />

          <input
            type="password"
            name="password"
            className="form-control mb-3"
            placeholder="Enter your password"
            onChange={handleChange}
             value={formdata.password}
            required
          />

          <button
            type="submit"
            className="btn w-100 text-light mb-3"
            style={{ backgroundColor: "rgba(218,6,17,0.918)" }}
          >
            Sign In
          </button>
<div className="text-center">
            <p  className="text-light">or</p>
          </div>
          <div className="text-center">
            <button
          type="button"
          className="text-white btn para hovr"
          onClick={() => navigate("/ForgotPassword")}
        >
         Forgot Password
        </button>
                 </div>

          <p className="para mt-3 text-light">
            New to Netflix? <a href="#" className="text-primary">Sign Up now</a>
          </p>

          <p className="para text-light small">
            This page is protected by Google reCAPTCHA to ensure you're not a bot.
            <br />
            <a href="#" className="text-primary">Learn more</a>
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
