import React, { useEffect, useState } from "react";
import UserDashboardBanner from "../components/UserDashboardBanner";
import UserDashboardMovieSwiper from "../components/UserDashboardMovieSwiper";

const Userdashboard = () => {
  const [moviesByCategory, setMoviesByCategory] = useState({});
  const API = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(`${API}/api/movies/grouped`);
        const data = await res.json();

        // Ensure we have full poster URLs
        const formatted = {};
        ["Popular", "Top Rated", "Upcoming"].forEach((cat) => {
          formatted[cat] = (data[cat] || []).map((movie) => ({
            ...movie,
            img: movie.poster, // pass poster URL as img for swiper
          }));
        });

        setMoviesByCategory(formatted);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      }
    };

    fetchMovies();
  }, []);

  const categories = ["Popular", "Top Rated", "Upcoming"];

  return (
    <div>
      <UserDashboardBanner />

      <div style={{ background: "#111", minHeight: "100vh", padding: "20px" }}>
        {categories.map((category) => (
          <UserDashboardMovieSwiper
            key={category}
            title={category}
            movies={moviesByCategory[category] || []}
          />
        ))}
      </div>
    </div>
  );
};

export default Userdashboard;
