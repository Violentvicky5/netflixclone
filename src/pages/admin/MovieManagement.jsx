import React, { useState } from "react";
import { tmdbFetch, tmdbVideoUrl } from "../../api/tmdb";

{
  /*below categories shown as button */
}
const categories = [
  { label: "Popular", endpoint: "/movie/popular" },
  { label: "Top Rated", endpoint: "/movie/top_rated" },
  { label: "Upcoming", endpoint: "/movie/upcoming" },
];

const MovieManagement = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  {
    /*movies - stores fetched tmdb movies */
  }
  const [movies, setMovies] = useState([]);
  {
    /*formMovie - movie object submitting to backend */
  }
  const [formMovie, setFormMovie] = useState({
    tmdbId: "",
    title: "",
    description: "",
    rating: "",
    poster: "",
    backdrop: "",
    category: "",
     videoUrl:"",
  });
  {
    /*below states- pagination ,loading and UI status */
  }
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const API = import.meta.env.VITE_BACKEND_URL;
  {
    /*fetch movies by catagories- and clicks again to hide movies */
  }
  const fetchCategoryMovies = async (category) => {
    if (activeCategory === category.label) {
      setActiveCategory("");
      setMovies([]);
      return;
    }
    {
      /* show active state and loading messg*/
    }

    setActiveCategory(category.label);
    setLoading(true);
    {
      /*call TMDB and store movies */
    }
    try {
      const data = await tmdbFetch(category.endpoint);
      setMovies(data.results || []);
      setCurrentPage(1); // reset page
    } catch (err) {
      console.error(err);
      alert("Failed to fetch movies");
    }
    setLoading(false);
  };
  {
    /* When clicking Add on a TMDB movie:
  1)Pre-fills the form
  2)Sets poster/backdrop URLs
  3)Sets category from activeCategory
  */
  }
  const fillForm =async (movie) => {
    const videoUrl =await tmdbVideoUrl(movie.id);
    setFormMovie({
      tmdbId: movie.id,
      title: movie.title,
      description: movie.overview,
      rating: movie.vote_average,
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      backdrop: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
      category: activeCategory,
      videoUrl: videoUrl, 
    });
    {
      /*Shows the success toast for 3 seconds. */
    }
    setToastMessage(`"${movie.title}" added to the form`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };
  {
    /*submit to backend */
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/movies/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formMovie),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed: ${res.status}, ${text}`);
      }
      const data = await res.json();
      alert(data.message);
      setFormMovie({
        tmdbId: "",
        title: "",
        description: "",
        rating: "",
        poster: "",
        backdrop: "",
        category: "",
         videoUrl: "",
      });
    } catch (err) {
      console.error(err);
      alert(`"${formMovie.title}" is already in collection`);
    }
  };

  // Pagination
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentMovies = movies.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(movies.length / itemsPerPage);

  return (
    <div className="container my-4">
      <div
        className={`toast align-items-center text-white bg-success border-0 position-fixed top-0 end-0 m-3 ${
          showToast ? "show" : "hide"
        }`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">{toastMessage}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            onClick={() => setShowToast(false)}
          ></button>
        </div>
      </div>

      <h2 className="mb-3 text-center">Movie Management</h2>

      {/*add movie form*/}
      <form onSubmit={handleSubmit} className="bg-light p-3 rounded mb-4">
        <h5>Add Movie</h5>
        {[
          "tmdbId",
          "title",
          "description",
          "rating",
          "poster",
          "backdrop",
          "category",
          "videoUrl"
        ].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            {field === "description" ? (
              <textarea
                className="form-control"
                rows="3"
                value={formMovie[field]}
                onChange={(e) =>
                  setFormMovie({ ...formMovie, [field]: e.target.value })
                }
              />
            ) : (
              <input
                className="form-control"
                value={formMovie[field]}
                onChange={(e) =>
                  setFormMovie({ ...formMovie, [field]: e.target.value })
                }
              />
            )}
          </div>
        ))}
        <button className="btn btn-success w-100">Submit</button>
      </form>
      {/*CATEGORY BUTTONS*/}
      <div className="mb-4 text-center">
        <h3 className="fw-bold ">select movies</h3>
        {categories.map((cat) => (
          <button
            key={cat.label}
            className={`btn me-2 mb-2 ${
              activeCategory === cat.label
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() => fetchCategoryMovies(cat)}
            disabled={loading}
          >
            {loading && activeCategory === cat.label ? "Loading..." : cat.label}
          </button>
        ))}
      </div>
      {/*MOVIES TABLE*/}
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Poster</th>
              <th>Title</th>
              <th>Rating</th>
              <th>Description</th>
              <th>Add</th>
            </tr>
          </thead>
          <tbody>
            {currentMovies.map((m) => (
              <tr key={m.id}>
                <td>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${m.poster_path}`}
                    alt={m.title}
                    style={{ width: "70px", borderRadius: "6px" }}
                  />
                </td>
                <td>{m.title}</td>
                <td>{m.vote_average}</td>
                <td style={{ maxWidth: "250px" }}>
                  {m.overview.slice(0, 80)}...
                </td>
                <td>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => fillForm(m)}
                  >
                    Add
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*PAGINATION*/}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-3">
          <button
            className="btn btn-outline-secondary me-2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>
          <span className="align-self-center me-2">
            {currentPage} / {totalPages}
          </span>
          <button
            className="btn btn-outline-secondary"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieManagement;
