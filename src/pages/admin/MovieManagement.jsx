import React, { useState } from "react";

const MovieManagement = () => {
  const [movie, setMovie] = useState({ title: "", movieId: "", description: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: call backend to add movie
    console.log("Add movie:", movie);
    setMovie({ title: "", movieId: "", description: "" });
  };

  return (
    <div>
      <h2>Movie Management</h2>

      <form onSubmit={handleSubmit} className="bg-light p-3 rounded">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input className="form-control" value={movie.title}
            onChange={(e) => setMovie({...movie, title:e.target.value})} />
        </div>
        <div className="mb-3">
          <label className="form-label">TMDB ID</label>
          <input className="form-control" value={movie.movieId}
            onChange={(e) => setMovie({...movie, movieId:e.target.value})} />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" rows="3" value={movie.description}
            onChange={(e) => setMovie({...movie, description:e.target.value})} />
        </div>
        <button className="btn btn-primary">Add Movie</button>
      </form>
    </div>
  );
};

export default MovieManagement;
