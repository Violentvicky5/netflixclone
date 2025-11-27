import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import loginImg from "../assets/login.png";

const ForgotPassword = () => {
  const [formdata, setFormdata] = useState({ email: "" });

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };
  const API = import.meta.env.VITE_BACKEND_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formdata);

    try {
      const res = await fetch(`${API}/forgotpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
    console.log(data);

    if (res.ok) {
      alert("password reset link sent Successfully");
      setFormdata({email:""});
     
    } else {
      alert(data.msg || "Failed to send reset pwd link");
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
      <Header />

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

          <button
            type="submit"
            className="btn w-100 text-light mb-3"
            style={{ backgroundColor: "rgba(218,6,17,0.918)" }}
          >
            Send Reset link
          </button>
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

export default ForgotPassword;
