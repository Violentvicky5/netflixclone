import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import loginImg from "../assets/login.png";
import { useNavigate } from "react-router-dom";

const AdminLoginPage = () => {
  const Oemail=import.meta.env.VITE_ADMIN_EMAIL
  const Opassword=import.meta.env.VITE_ADMIN_PASSWORD
  const [formdata, setFormdata] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  setEmailError("");
  setPasswordError("");

  try {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/signin`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      setEmailError("Invalid admin credentials");
      setPasswordError("Invalid admin credentials");
      return;
    }

    // store admin token
    localStorage.setItem("adminToken", data.token);

    navigate("/admin");
  } catch (err) {
    setEmailError("Server error");
    setPasswordError("Server error");
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
          <h3 className="text-light fw-bold mb-3">Admin LogIn</h3>

        
          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Enter your email"
            onChange={handleChange}
            value={formdata.email}
            required
            style={{
              border: emailError ? "2px solid red" : "1px solid #ccc",
            }}
          />
          {emailError && (
            <p className="text-danger mb-3">{emailError}</p>
          )}

         
          <input
            type="password"
            name="password"
            className="form-control mb-3"
            placeholder="Enter your password"
            onChange={handleChange}
            value={formdata.password}
            required
            style={{
              border: passwordError ? "2px solid red" : "1px solid #ccc",
            }}
          />
          {passwordError && (
            <p className="text-danger mb-3">{passwordError}</p>
          )}

          <button
            type="submit"
            className="btn w-100 text-light mb-3"
            style={{ backgroundColor: "rgba(218,6,17,0.918)" }}
          >
            Sign In
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

export default AdminLoginPage;
