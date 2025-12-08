import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderSignOutBar from "../../components/HeaderSignOutBar";

const LikedMovies = () => {
  const [likedMovies, setLikedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch liked movies
  useEffect(() => {
    const fetchLikedMovies = async () => {
      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        const res = await fetch(`${API}/api/liked/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setLikedMovies(data);
      } catch (err) {
        console.error("Failed to fetch liked movies", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedMovies();
  }, []);

  // Remove from liked movies
  const removeLiked = async (tmdbId) => {
    try {
      await fetch(`${API}/api/liked/remove/${tmdbId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setLikedMovies((prev) => prev.filter((movie) => movie.tmdbId !== tmdbId));
    } catch (err) {
      console.error("Failed to remove liked movie", err);
    }
  };

  if (loading) return <h4 className="text-white p-4">Loading liked movies...</h4>;

  return (
    <div className="bg-black min-vh-100">
      <HeaderSignOutBar />
      <div className="container py-4">
        <h2 className="text-white mb-4">Your Liked Movies</h2>

        {likedMovies.length === 0 ? (
          <p className="text-secondary">You haven’t liked any movies yet.</p>
        ) : (
          <div className="row">
            {likedMovies.map((movie) => (
              <div key={movie.tmdbId} className="col-6 col-md-3 col-lg-2 mb-4">
                <div className="position-relative">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="img-fluid rounded"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/know-more/${movie.tmdbId}`)}
                  />

                  {/* Remove button */}
                  <button
                    className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1"
                    onClick={() => removeLiked(movie.tmdbId)}
                  >
                    ×
                  </button>
                </div>

                <p className="text-light mt-2">
                  {movie.title}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedMovies;
