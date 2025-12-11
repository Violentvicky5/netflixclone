import React, { useEffect, useState, useContext } from "react";
import UserDashboardBanner from "../components/UserDashboardBanner";
import UserDashboardMovieSwiper from "../components/UserDashboardMovieSwiper";
import { SearchContext } from "../context/SearchContext";

const Userdashboard = () => {
  const { searchTerm, searchResults } = useContext(SearchContext);

  const [moviesByCategory, setMoviesByCategory] = useState({});
  const API = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(`${API}/api/movies/grouped`);
        const data = await res.json();

        const formatted = {};
        ["Popular", "Top Rated", "Upcoming"].forEach((cat) => {
          formatted[cat] = (data[cat] || []).map((movie) => ({
            ...movie,
            img: movie.poster,
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

      {searchTerm.trim() !== "" ? (
        <div
          style={{ background: "#111", padding: "20px", minHeight: "100vh" }}
        >
          <h2 className="text-white mb-4">Search Results</h2>

          {searchResults.length > 0 ? (
            <div className="row">
              {searchResults.map((movie, index) => (
                <div className="col-6 col-md-3 mb-4" key={index}>
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    style={{ width: "100%", borderRadius: "6px" }}
                  />
                  <p className="text-white mt-2">{movie.title}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white">No movies found</p>
          )}
        </div>
      ) : (
        <div
          style={{ background: "#111", minHeight: "100vh", padding: "20px" }}
        >
          {categories.map((category) => (
            <UserDashboardMovieSwiper
              key={category}
              title={category}
              movies={moviesByCategory[category] || []}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Userdashboard;
