import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const LikeBtn = ({ movieId, movieData, onChange }) => {
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);

  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_BACKEND_URL;

  // Check if movie is already liked
  useEffect(() => {
    const fetchStatus = async () => {
      if (!token) return;
      try {
        const res = await fetch(`${API}/api/liked/movie/${movieId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setLiked(data.isLiked);
        onChange(data.isLiked);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStatus();
  }, [movieId]);

  const toggleLiked = async () => {
    if (!token) return (window.location.href = "/login");
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/liked/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(movieData),
      });
      const data = await res.json();
      setLiked(data.liked.isLiked);
      onChange(data.liked.isLiked);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <button
      className="btn border rounded-circle d-flex justify-content-center align-items-center"
      style={{ padding: "6px", backgroundColor: "white" }}
      onClick={toggleLiked}
      disabled={loading}
    >
      {liked ? <FaHeart color="red" /> : <FaRegHeart />}
    </button>
  );
};

export default LikeBtn;
