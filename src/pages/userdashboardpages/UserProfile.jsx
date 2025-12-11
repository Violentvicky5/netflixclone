import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const API = import.meta.env.VITE_BACKEND_URL;
const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API}/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setUser(data);
    };

    loadProfile();
  }, []);

  if (!user)
    return (
      <div className="text-center text-light mt-5">
        <div className="spinner-border text-light"></div>
      </div>
    );

  const cardStyle = { minHeight: "350px", backgroundColor: "#000" };

  return (
    <div className="container p-5 text-light bg-black">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
        <img src={logo} alt="logo" width={120} />
            </div>
            <div>
              <button
                className="btn text-white para"
                onClick={() => navigate(-1)}
              >
                <i className="fa fa-arrow-left me-2"></i>
                Back
              </button>
            </div>
            
          </div>
      <div className="text-center mb-4">
        <h2 className="mt-3">Profile</h2>
        <p className="text-white">Manage your account and subscription</p>
      </div>

      <div className="row g-4">
        {/* USER INFO */}
        <div className="col-md-6">
          <div
            className="card text-light border-secondary shadow"
            style={cardStyle}
          >
            <div className="card-body">
              <h4 className="card-title mb-3">User Information</h4>

              <p className="mb-2">
                <strong>Name:</strong> {user.userName || "-"}
              </p>

              <p className="mb-2">
                <strong>Email:</strong> {user.email}
              </p>

              <p className="mb-2">
                <strong>Verified:</strong>{" "}
                {user.isVerified ? (
                  <span className="text-success">Yes</span>
                ) : (
                  <span className="text-danger">No</span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* PLAN INFO */}
        <div className="col-md-6">
          <div
            className="card text-light border-secondary shadow"
            style={cardStyle}
          >
            <div className="card-body">
              <h4 className="card-title mb-3">Your Plan</h4>

              {user.plan?.name ? (
                <>
                  <p className="mb-2">
                    <strong>Plan:</strong> {user.plan.name}
                  </p>
                  <p className="mb-2">
                    <strong>Price:</strong> ₹{user.plan.price}
                  </p>
                  <p className="mb-2">
                    <strong>Quality:</strong> {user.plan.quality}
                  </p>
                  <p className="mb-2">
                    <strong>Start Date:</strong>{" "}
                    {new Date(user.plan.start).toLocaleDateString()}
                  </p>
                  <p className="mb-2">
                    <strong>Expiry Date:</strong>{" "}
                    {new Date(user.plan.expiry).toLocaleDateString()}
                  </p>
                </>
              ) : (
                <p className="text-warning">No active plan found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
