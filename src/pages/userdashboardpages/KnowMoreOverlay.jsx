import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark, FaPlay } from "react-icons/fa";
import WatchListBtn from "../../components/WatchListBtn";
const KnowMoreOverlay = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [liked, setLiked] = useState(false);
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
        const res = await fetch(`${API}/api/movies/movie/${movieId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401 || res.status === 403) {
          onClose();
          window.location.href = "/login"; 
          return;
        }

        const data = await res.json();
        setMovie(data);
        setLiked(data.liked || false);
        setWatchlist(data.watchlist || false);

      } catch (err) {
        console.error(err);
      }
    };

    setMovie(null);
    fetchMovie();
  }, [movieId, API, onClose]);

  if (!movieId) return null;

  return (
    <div className="overlay-bg">
      <div className="overlay-box">
        <button className="overlay-close-btn" onClick={onClose}>×</button>

        {!movie ? (
          <div className="d-flex justify-content-center align-items-center h-100">
            <Spinner animation="border" variant="light" />
          </div>
        ) : (
          <>
           {/* Poster */}
<div className="overlay-poster-wrapper position-relative">
  <img
    src={movie.poster}
    alt={movie.title}
    className="overlay-poster img-fluid rounded"
  />

  {/* Icons over poster in bottom-left */}
  <div className="position-absolute bottom-0 start-0 p-2 d-flex gap-2 align-items-center">
    {/* Play Button */}
    <button
      className="btn btn-light d-flex align-items-center gap-1 border"
      onClick={() => alert("Play movie!")}
    >
      <FaPlay /> Play
    </button>

    {/* Liked */}
    <button
      className={`btn border rounded-circle d-flex align-items-center justify-content-center ${
        liked ? "text-danger" : "text-dark"
      }`}
      style={{ backgroundColor: "white", padding: "6px" }}
      onClick={() => setLiked(!liked)}
    >
      {liked ? <FaHeart /> : <FaRegHeart />}
    </button>

    {/* Watchlist */}
 <WatchListBtn 
  movie={movie}
  onChange={(val) => setMovie({ ...movie, watchlist: val })}
/>


  </div>
</div>


            {/* Details */}
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
