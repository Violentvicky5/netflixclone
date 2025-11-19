import React from "react";

const EmailInput = () => {
  return (
    <>
      <div>
        <div className="container text-white mt-5">
          <div>
            <p
              className="d-flex center para "
              style={{ flexDirection: "column" }}
            >
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>
          </div>

          <form className="d-flex center">
            <input
              className="form-control me-2 text-white emailInput "
              type="email"
              placeholder="Email Address"
              style={{
                height: "3rem",
                width: "20rem",
                backgroundColor: "transparent",
                border: "1px solid grey",
                borderRadius:"3px"
              }}
            />
            <button
              className="btn text-white"
              style={{
                backgroundColor: "rgba(218,6,17,0.918)",
                height: "3rem",
                width: "9rem",
                borderRadius:"3px"
              }}
            >
              Get Started <i className="fa-solid fa-chevron-right"></i>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EmailInput;
