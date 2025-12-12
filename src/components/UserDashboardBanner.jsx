import React, { useEffect, useState, useContext } from "react";
import { Button } from "react-bootstrap";
import UserDashboardHeader from "./UserDashboardHeader";
import logo from "../assets/logo.png";
import { SearchContext } from "../context/SearchContext";
import KnowMoreOverlay from "../pages/userdashboardpages/KnowMoreOverlay";
import PlayTrailer from "../pages/userdashboardpages/PlayTrailer";
const UserDashboardBanner = () => {
  const [showMovieId, setShowMovieId] = useState(null);
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const { searchTerm, searchResults } = useContext(SearchContext);

  const API = import.meta.env.VITE_BACKEND_URL;

  const toggleMute = () => setIsMuted(!isMuted);

  // Fetch movies for banner
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

  // Auto-change banner every 7s
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

  if (movies.length === 0) return <div>Loading...</div>;

  const movie = movies[currentIndex];
  const backdropUrl = movie.backdrop;

  return (
    <>
      <UserDashboardHeader />

      {searchTerm && searchResults.length === 0 && (
        <h2 className="text-center text-light mt-5">No movies found</h2>
      )}

      {!searchTerm && (
        <div
          className="banner-bg d-flex flex-column justify-content-end text-start p-4"
          style={{
            backgroundImage: `url(${backdropUrl})`,
            backgroundSize: "fill",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            position: "relative",
            color: "#fff",
            width: "100%",
            minHeight: "60vh",
            transition: "background-image 1s ease-in-out",
          }}
        >
          <div className="container">
            <div>
              <img
                src={logo}
                alt="logo"
                className="img-fluid"
                style={{ height: "20px", maxHeight: "4vh" }}
              />
              <h1 className="fw-bold mb-3 fs-5 fs-md-3 fs-lg-1">
                {movie.title}
              </h1>
            </div>

            <div>
              <p
                className="para"
                style={{
                  height: "auto",
                  maxHeight: "100px",
                  width: "100%",
                  maxWidth: "80%",
                  overflow: "auto",
                  fontSize: "0.7rem",
                }}
              >
                {movie.description}
              </p>
            </div>

            <div className="d-flex justify-content-between flex-wrap align-items-center mt-2">
              <div
                className="d-flex flex-row flex-wrap"
                style={{ gap: "0.5rem" }}
              >
                <PlayTrailer movieId={movie.tmdbId} />

                <Button
                  variant="secondary"
                  className="fw-bold"
                  style={{ fontSize: "0.7rem" }}
                  onClick={() => setShowMovieId(movie._id)}
                >
                  ! More Info
                </Button>
              </div>

              <div
                className="d-flex align-items-center mt-2 mt-md-0"
                style={{ gap: "10px" }}
              >
                <div
                  onClick={toggleMute}
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    width: "35px",
                    height: "35px",
                    minWidth: "30px",
                    minHeight: "30px",
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
                    style={{ fontSize: "1rem" }}
                  ></i>
                </div>

                <div
                  className="d-flex align-items-center px-2 py-1"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.3)",
                    gap: "10px",
                    borderRadius: "6px",
                  }}
                >
                  <span
                    className="badge d-flex align-items-center justify-content-center"
                    style={{
                      backgroundColor: "grey",
                      width: "3px",
                      height: "25px",
                      padding: "0",
                      fontSize: "1.2rem",
                    }}
                  >
                    |
                  </span>
                  <p className="fw-bold m-0" style={{ fontSize: "0.75rem" }}>
                    {movie.rating >= 9 ? "UA 18+" : "UA 16+"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {showMovieId && (
            <KnowMoreOverlay
              movieId={showMovieId}
              onClose={() => setShowMovieId(null)}
            />
          )}
        </div>
      )}
    </>
  );
};

export default UserDashboardBanner;
