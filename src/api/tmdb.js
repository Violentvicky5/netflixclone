const BASE_URL = "https://api.themoviedb.org/3";

export const tmdbFetch = async (endpoint) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
    },
  });

  return res.json();
};


export const tmdbVideoUrl = async (movieId) => {
  const data = await tmdbFetch(`/movie/${movieId}/videos`);

  const trailer = data.results?.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  );

  return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : "";
};
