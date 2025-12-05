import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const MovieDelete = () => {
  const API = import.meta.env.VITE_BACKEND_URL;

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // UI States
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("A-Z");
  const [page, setPage] = useState(1);

  const PER_PAGE = 10;

  // Fetch all movies
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/movies/deletemovies`);
      const data = await res.json();
      setMovies(data);
    } catch (err) {
      console.error("Failed to fetch movies:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Delete movie
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;

    try {
      const res = await fetch(`${API}/api/movies/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      setMovies((prev) => prev.filter((m) => m._id !== id));
      alert("Movie deleted successfully!");
    } catch {
      alert("Failed to delete movie");
    }
  };

  // ---------- FILTERING ----------
  const filtered = movies
    .filter((m) =>
      m.title.toLowerCase().includes(search.toLowerCase().trim())
    )
    .filter((m) => (category === "All" ? true : m.category === category));

  // ---------- SORTING ----------
  const sorted = [...filtered].sort((a, b) =>
    sort === "A-Z"
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title)
  );

  // ---------- PAGINATION ----------
  const totalPages = Math.ceil(sorted.length / PER_PAGE);
  const paginated = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // ---------- EXCEL EXPORT ----------
  const exportExcel = () => {
    const toExport = sorted.map((m) => ({
      Title: m.title,
      Category: m.category,
    }));

    const ws = XLSX.utils.json_to_sheet(toExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Movies");

    XLSX.writeFile(wb, "movies_report.xlsx");
  };

  // Unique categories
  const categories = ["All", ...new Set(movies.map((m) => m.category))];

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Delete Movies</h2>

      {/* Search, Filter, Sort */}
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-control"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
          >
            {categories.map((c, idx) => (
              <option key={idx} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <select
            className="form-control"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="A-Z">Sort A–Z</option>
            <option value="Z-A">Sort Z–A</option>
          </select>
        </div>

        <div className="col-md-2">
          <button className="btn btn-success w-100" onClick={exportExcel}>
            Export Excel
          </button>
        </div>
      </div>

      {/* Count */}
      <p>
        <strong>Total:</strong> {movies.length} |{" "}
        <strong>Showing:</strong> {filtered.length}
      </p>

      {/* Table */}
      {loading ? (
        <p>Loading movies...</p>
      ) : paginated.length === 0 ? (
        <p>No movies found</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Poster</th>
                <th>Title</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((movie) => (
                <tr key={movie._id}>
                  <td>
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      style={{ width: "70px", borderRadius: "6px" }}
                    />
                  </td>
                  <td>{movie.title}</td>
                  <td>{movie.category}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(movie._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-primary mx-2"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>
        <span className="mt-2">
          Page {page} / {totalPages}
        </span>
        <button
          className="btn btn-primary mx-2"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MovieDelete;
