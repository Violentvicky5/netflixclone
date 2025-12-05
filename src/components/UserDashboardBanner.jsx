import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import UserDashboardHeader from "./UserDashboardHeader";
import logo from "../assets/logo.png";

const UserDashboardBanner = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const API = import.meta.env.VITE_BACKEND_URL;

  const toggleMute = () => setIsMuted(!isMuted);

 //fetching movies from movies collection (db)
  useEffect(() => {
    const loadMovies = async () => {
      try {
        const res = await fetch(`${API}/api/movies/banner`);
        const data = await res.json();
        setMovies(data);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      }
    };
    loadMovies();
  }, []);


  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        let newIndex = prev;
        while (newIndex === prev) {
          newIndex = Math.floor(Math.random() * movies.length);
        }
        return newIndex;
      });
    }, 7000);

    return () => clearInterval(interval);
  }, [movies]);

  if (movies.length === 0) {
    return <div>Loading...</div>;
  }

  const movie = movies[currentIndex];
  const backdropUrl = movie.backdrop; 
  return (
    <div
      className="banner-bg d-flex flex-column justify-content-end text-start p-4"
      style={{
        backgroundImage: `url(${backdropUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        color: "#fff",
        height: "85vh",
        width: "100%",
        transition: "background-image 1s ease-in-out",
      }}
    >
      <div className="banner-header">
        <UserDashboardHeader />
      </div>

      <div className="container">
        <div>
          <img src={logo} alt="logo" style={{ height: "20px" }} />
          <h1 className="fw-bold mb-3">{movie.title}</h1>
        </div>

        <div>
          <p
            className="para"
            style={{ height: "100px", width: "80%", overflow: "auto" }}
          >
            {movie.description}
          </p>
        </div>

        <div className="d-flex justify-content-between">
          <div className="d-flex flex-row">
            <Button variant="light" className="me-2 fw-bold">
              Play
            </Button>
            <Button variant="secondary" className="fw-bold">
              ! More Info
            </Button>
          </div>

          <div className="d-flex align-items-center" style={{ gap: "10px" }}>
            <div
              onClick={toggleMute}
              className="d-flex justify-content-center align-items-center"
              style={{
                width: "35px",
                height: "35px",
                background: "rgba(0,0,0,0.3)",
                borderRadius: "50%",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              <i
                className={
                  isMuted
                    ? "fa-solid fa-volume-xmark"
                    : "fa-solid fa-volume-high"
                }
              ></i>
            </div>

            <div
              className="d-flex align-items-center"
              style={{ backgroundColor: "rgba(0,0,0,0.3)", gap: "10px" }}
            >
              <span
                className="badge d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: "grey",
                  width: "3px",
                  height: "25px",
                  padding: "0",
                  fontSize: "25px",
                }}
              >
                |
              </span>

              <p className="fw-bold m-0">
                {movie.rating >= 9 ? "UA 18+" : "UA 16+"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardBanner;
