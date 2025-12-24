import React from "react";
import { Link } from "react-router-dom";

const LearnMore = () => {
  return (
    <div className="container py-5">
      {/* Header */}
      <div className="row justify-content-center mb-4">
        <div className="col-12 col-md-10 col-lg-8 text-center">
          <h1 className="fw-bold mb-3">About NetflixClone</h1>
          <p className="text-muted">
            A full-stack movie streaming platform built for learning 
            authentication, watchlists, email verification, admin dashboard, 
            and modern API integrations.
          </p>
        </div>
      </div>

      {/* What Can This Project Do */}
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h4 className="fw-semibold mb-3">What This Project Offers</h4>
              
              <ul className="list-group list-group-flush">
                <li className="list-group-item">✔ User Authentication (Signup, Login, Logout)</li>
                <li className="list-group-item">✔ Email Verification & Password Reset (via Resend / SMTP)</li>
                <li className="list-group-item">✔ Movie Browsing, Details & Watchlist</li>
                <li className="list-group-item">✔ Subscription Plans, User & Movies Management</li>
                <li className="list-group-item">✔ Admin Dashboard for analytics</li>
              </ul>
            </div>
          </div>

          {/* Email Issue Note */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="fw-semibold mb-2">Email Not Received?</h5>
              <p className="text-muted mb-0">
                If you don't receive the email even though the alert shows 
                "<b>Email Sent Successfully</b>", it may be due to your email provider 
                blocking or delaying messages.
                <br />
                <b>Please try registering with another email ID or wait for a while you receive the Email.</b>
              </p>
            </div>
          </div>

          {/* Back Button */}
          <div className="d-flex justify-content-center">
            <Link to="/Login" className="btn btn-danger px-4 py-2">
              Back to Sign In
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LearnMore;
