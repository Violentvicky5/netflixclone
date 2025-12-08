import React, { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const WatchListBtn = ({ movie, onChange }) => {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_BACKEND_URL;

  const toggleWatchlist = async () => {
    if (!token) return (window.location.href = "/login");
    setLoading(true);

    try {
      if (movie.watchlist) {
        // Remove
        await fetch(`${API}/api/watchlist/remove/${movie.tmdbId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        onChange(false);
      } else {
        // Add
        await fetch(`${API}/api/watchlist/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            tmdbId: movie.tmdbId,
            title: movie.title,
            description: movie.description,
            rating: movie.rating,
            poster: movie.poster,
            category: movie.category,
          }),
        });
        onChange(true);
      }
    } catch (err) {
      console.error("WatchListBtn Error:", err);
    }

    setLoading(false);
  };

  return (
    <button
      className="btn border rounded-circle bg-white d-flex justify-content-center align-items-center"
      style={{ padding: "6px" }}
      onClick={toggleWatchlist}
      disabled={loading}
    >
      {movie.watchlist ? <FaBookmark /> : <FaRegBookmark />}
    </button>
  );
};

export default WatchListBtn;
