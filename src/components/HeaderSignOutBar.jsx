import React from "react";
import { useNavigate, Link } from "react-router-dom";
import logoImg from "../assets/logo.png";

const HeaderSignOutBar = () => {
  const navigate = useNavigate();

  return (
    <nav>
      <div className="container navAlign">
        <Link to="/">
          <img src={logoImg} alt="logo" style={{ height: "60px" }} />
        </Link>

        <button
          className="loginBtn btn text-white"
          style={{width:"90px"}}
          onClick={() => navigate("/")}
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default HeaderSignOutBar;
