import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Dropdown,
  Form,
  FormControl,
} from "react-bootstrap";
import logoImg from "../assets/logo.png";
import { Navigate, useNavigate } from "react-router-dom";

const UserDashboardHeader = () => {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_BACKEND_URL;
  const signOut = async () => {
    try {
      const token = localStorage.getItem("token");

      let result = await fetch(`${API}/signOut`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (result.ok) {
        localStorage.removeItem("token");
        alert("successfully logedOut")
        navigate("/Login");
      } else {
        console.error("Sign out failed");
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Navbar variant="dark" style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
      <Container className="d-flex align-items-center">
        <div className="d-flex align-items-center">
          <Navbar.Brand href="#" className="me-2">
            <img
              src={logoImg}
              alt="logo"
              style={{ height: "30px", filter: "brightness(1.2)" }}
            />
          </Navbar.Brand>

          <div className="d-lg-none">
            <Dropdown>
              <Dropdown.Toggle
                variant="secondary"
                size="sm"
                style={{ backgroundColor: "grey", border: "none" }}
              >
                Browse
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#">Home</Dropdown.Item>
                <Dropdown.Item href="#">TV Shows</Dropdown.Item>
                <Dropdown.Item href="#">Movies</Dropdown.Item>
                <Dropdown.Item href="#">New & Popular</Dropdown.Item>
                <Dropdown.Item href="#">My List</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <Nav className="d-none d-lg-flex ms-4">
          <Nav.Link href="#">Home</Nav.Link>
          <Nav.Link href="#">TV Shows</Nav.Link>
          <Nav.Link href="#">Movies</Nav.Link>
          <Nav.Link href="#">New & Popular</Nav.Link>
          <Nav.Link href="#">My List</Nav.Link>
        </Nav>

        <div
          className="ms-auto d-flex align-items-center"
          style={{ gap: "12px" }}
        >
          <div className="position-relative">
            <i
              className="fa fa-search position-absolute"
              style={{
                left: "85%",
                top: "50%",
                transform: "translateY(-50%)",
                color: "black",
              }}
            ></i>

            <input
              type="text"
              placeholder="Search"
              className="form-control ps-4"
              style={{
                height: "32px",
                border: "1px solid grey",
                color: "black",
              }}
            />
          </div>

          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="profile"
            style={{ height: "32px", borderRadius: "4px", cursor: "pointer" }}
          />
          <button
            type="button "
            className="btn loginBtn text-white"
            style={{ opacity: "1.5" }}
            onClick={signOut}
          >
            SignOut
          </button>
        </div>
      </Container>
    </Navbar>
  );
};

export default UserDashboardHeader;
