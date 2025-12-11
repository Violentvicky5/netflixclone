import React, { useState, useEffect } from "react";
import { FaPlay, FaTimes } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const PlayTrailer = ({ movieId, videoUrl: propVideoUrl }) => {
  const [open, setOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState(propVideoUrl || "");
  const API = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    // Only fetch from backend if no propVideoUrl
    if (!movieId || propVideoUrl) return;

    const fetchTrailer = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(`${API}/api/movies/trailer/${movieId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();

        // Make sure videoUrl exists
        if (data?.videoUrl) setVideoUrl(data.videoUrl);
      } catch (err) {
        console.error("Failed to fetch trailer:", err);
      }
    };

    fetchTrailer();
  }, [movieId, propVideoUrl, API]);

  if (!videoUrl) return null;

  const embedUrl = videoUrl.includes("watch?v=")
    ? videoUrl.replace("watch?v=", "embed/")
    : videoUrl;

  return (
    <>
      <button
        className="btn btn-light d-flex align-items-center gap-2 fw-bold px-3 py-2"
        style={{
          backgroundColor: "rgba(255,255,255,0.85)",
          color: "#000",
          borderRadius: "4px",
          fontSize: "0.9rem",
        }}
        onClick={() => setOpen(true)}
      >
        <FaPlay />
        Play Trailer
      </button>

      {open && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark d-flex justify-content-center align-items-center"
          style={{ zIndex: 99999 }}
        >
          <button
            onClick={() => setOpen(false)}
            className="btn btn-light position-absolute"
            style={{
              top: "20px",
              right: "20px",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 100000,
            }}
          >
            <FaTimes />
          </button>

          <iframe
            width="100%"
            height="100%"
            src={embedUrl}
            title="Trailer"
            allowFullScreen
            style={{ border: "none" }}
          />
        </div>
      )}
    </>
  );
};

export default PlayTrailer;
