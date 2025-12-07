import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderSignOutBar from "../../components/HeaderSignOutBar"
const WatchListPage = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch user watchlist
  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const res = await fetch(`${API}/api/watchlist/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setWatchlist(data);
      } catch (error) {
        console.log("Failed to fetch watchlist", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  // Remove function
  const removeItem = async (tmdbId) => {
    try {
      await fetch(`${API}/api/watchlist/remove/${tmdbId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove from UI
      setWatchlist((prev) => prev.filter((item) => item.tmdbId !== tmdbId));
    } catch (error) {
      console.log("Error removing item", error);
    }
  };

  if (loading) return <h4 className="text-white p-4">Loading WatchList...</h4>;

  return (
    <div className="bg-black">
      <HeaderSignOutBar/>
    <div className="container py-4">
      <h2 className="text-white mb-4">Your WatchList</h2>

      {watchlist.length === 0 ? (
        <p className="text-secondary">No items in your watchlist.</p>
      ) : (
        <div className="row">
          {watchlist.map((item) => (
            <div key={item.tmdbId} className="col-6 col-md-3 col-lg-2 mb-4">
              <div className="position-relative">
                <img
                  src={item.poster}
                  alt={item.title}
                  className="img-fluid rounded"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/know-more/${item.tmdbId}`)}
                />

                {/* Remove */}
                <button
                  className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1"
                  onClick={() => removeItem(item.tmdbId)}
                >
                  ×
                </button>
              </div>

              <p className="text-light mt-2">{item.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
</div>  );
};

export default WatchListPage;
