import React, { useContext, useState, useEffect } from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import logoImg from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";

const UserDashboardHeader = () => {
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm, setSearchResults } = useContext(SearchContext);
  const [allMovies, setAllMovies] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const API = import.meta.env.VITE_BACKEND_URL;

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch all movies
  useEffect(() => {
    const loadMovies = async () => {
      const res = await fetch(`${API}/api/movies/all`);
      const data = await res.json();
      setAllMovies(data);
    };
    loadMovies();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(results);
  };

  const signOut = async () => {
    try {
      const token = localStorage.getItem("token");
      const result = await fetch(`${API}/signOut`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (result.ok) {
        localStorage.removeItem("token");
        alert("Successfully logged out");
        navigate("/Login");
      } else {
        console.error("Sign out failed");
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Responsive sizes
  const getProfileSize = () => (windowWidth < 576 ? 24 : windowWidth < 768 ? 28 : 32);
  const getSearchWidth = () =>
    windowWidth < 576 ? "120px" : windowWidth < 768 ? "150px" : windowWidth < 992 ? "180px" : "200px";
  const getSignOutSize = () =>
    windowWidth < 576 ? "btn-sm p-1" : windowWidth < 768 ? "btn-sm p-2" : "btn p-2";
  const getBrowseSize = () =>
    windowWidth < 576 ? "sm" : windowWidth < 768 ? "sm" : "md";

  return (
    <Navbar   className="customNav">
      <Container className="d-flex justify-content-between align-items-center">
        {/* Left side: Logo & mobile dropdown */}
        <div className="d-flex align-items-center" style={{ gap: "10px" }}>
          <Navbar.Brand href="#">
            <img
              src={logoImg}
              alt="logo"
              style={{ height: windowWidth < 576 ? 25 : 30, filter: "brightness(1.2)" }}
            />
          </Navbar.Brand>

          {windowWidth < 992 && (
            <Dropdown>
              <Dropdown.Toggle
                variant="secondary"
                size={getBrowseSize()}
                style={{ backgroundColor: "grey", border: "none" }}
              >
                Browse
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate("/UserDashboard")}>
                  Home
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/LikedMovies")}>
                  Liked Movies
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/WatchList")}>
                  Watch List
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>

        {/* Desktop nav */}
        <Nav className="d-none d-lg-flex ms-4" style={{ gap: "15px" }}>
          <button
            className="btn btn-link p-1 text-danger fw-bold border-2"
            style={{ textDecoration: "none", borderColor: "grey", borderRadius: "15px" }}
            onClick={() => navigate("/userDashboard")}
          >
            Home
          </button>
          <button
            className="btn btn-link p-1 para fw-bold border-2"
            style={{ textDecoration: "none" }}
            onClick={() => navigate("/LikedMovies")}
          >
            Liked Movies
          </button>
          <button
            className="btn btn-link  p-0 para fw-bold"
            style={{ textDecoration: "none" }}
            onClick={() => navigate("/WatchList")}
          >
            Watch List
          </button>
        </Nav>

        {/* Right side: Search & profile/signout */}
        <div className="d-flex align-items-center" style={{ gap: "12px" }}>
          {/* Mobile search icon */}
          {windowWidth < 992 && !showSearch && (
            <i
              className="fa fa-search"
              style={{ fontSize: "1.2rem", cursor: "pointer", color: "grey" }}
              onClick={() => setShowSearch(true)}
            ></i>
          )}

          {/* Search input */}
          {(showSearch || windowWidth >= 992) && (
            <div className="position-relative">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
                className="form-control"
                style={{
                  height: "32px",
                  width: getSearchWidth(),
                  border: "1px solid grey",
                  color: "black",
                  transition: "width 0.3s ease",
                }}
              />
              {showSearch && windowWidth < 992 && (
                <i
                  className="fa fa-times position-absolute "
                  style={{
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    
                  }}
                  onClick={() => setShowSearch(false)}
                ></i>
              )}
            </div>
          )}

          {/* Profile & SignOut hidden on mobile when search active */}
          {(!showSearch || windowWidth >= 992) && (
            <>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                alt="profile"
                style={{ height: getProfileSize(), borderRadius: "4px", cursor: "pointer" }}
                onClick={() => navigate("/UserProfile")}
              />
              <button
                type="button"
                className={`btn loginBtn text-white ${getSignOutSize()}`}
                onClick={signOut}
              >
                SignOut
              </button>
            </>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default UserDashboardHeader;
