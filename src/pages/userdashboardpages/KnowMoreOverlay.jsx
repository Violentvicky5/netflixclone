import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { FaPlay } from "react-icons/fa";
import WatchListBtn from "../../components/WatchListBtn";

const KnowMoreOverlay = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [watchlist, setWatchlist] = useState(false);
  const API = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
  const fetchMovie = async () => {
    if (!movieId) return;
    const token = localStorage.getItem("token");
    if (!token) {
      onClose();
      window.location.href = "/login";
      return;
    }

    try {
      // Fetch movie details
      const res = await fetch(`${API}/api/movies/movie/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMovie(data);

      // Check watchlist using data.tmdbId (NOT movie.tmdbId)
      const res2 = await fetch(`${API}/api/watchlist/check/${data.tmdbId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data2 = await res2.json();
      setWatchlist(data2.exists);

    } catch (err) {
      console.error("KnowMoreOverlay Error:", err);
    }
  };

  fetchMovie();
}, [movieId, API, onClose]);


  if (!movieId) return null;

  return (
    <div className="overlay-bg">
      <div className="overlay-box">
        <button className="overlay-close-btn" onClick={onClose}>
          ×
        </button>

        {!movie ? (
          <div className="d-flex justify-content-center align-items-center h-100">
            <Spinner animation="border" variant="light" />
          </div>
        ) : (
          <>
            <div className="overlay-poster-wrapper position-relative">
              <img
                src={movie.poster}
                alt={movie.title}
                className="overlay-poster img-fluid rounded"
              />
              <div className="position-absolute bottom-0 start-0 p-2 d-flex gap-2 align-items-center">
                <button
                  className="btn btn-light d-flex align-items-center gap-1 border"
                  onClick={() => alert("Play movie!")}
                >
                  <FaPlay /> Play
                </button>

                <WatchListBtn
                  movie={{ ...movie, watchlist }}
                  onChange={(val) => setWatchlist(val)}
                />
              </div>
            </div>

            <div className="overlay-details p-3 text-white">
              <h3>{movie.title}</h3>
              <p className="text-secondary">{movie.category}</p>
              <p className="mt-3">{movie.description}</p>
              <p className="mt-3">
                <strong>Rating:</strong> ⭐ {movie.rating}
              </p>
              <p>
                <strong>TMDB ID:</strong> {movie.tmdbId}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default KnowMoreOverlay;
