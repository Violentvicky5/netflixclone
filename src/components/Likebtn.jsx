import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const LikeBtn = ({ movie, onChange }) => {

  const[loading,setLoading]=useState(false);
  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_BACKEND_URL;

  const toggleLikeList = async () => {
if(!token)  return (window.location.href = "/login");
    setLoading(true);
  
    try{
      if(movie.likeList){
        await fetch(`${API}/api/likelist/remove/${movie.tmdbId}`,{
            method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        })
        
        onChange(false)
      }else{
        await fetch(`${API}/api/likelist/add`,{
          method:"POST",
          headers:{
             "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
          },
           body: JSON.stringify({
            tmdbId: movie.tmdbId,
            title: movie.title,
            description: movie.description,
            rating: movie.rating,
            poster: movie.poster,
            category: movie.category,
            videoUrl: movie.videoUrl,
            
          }),
        })
                

        onChange(true);
       

      }
    }catch (err) {
      console.error("likeListBtn Error:", err);

  }
         

  setLoading(false)

        

}
return(
   <button
        className="btn border rounded-circle bg-white d-flex justify-content-center align-items-center"
        style={{ padding: "6px" }}
        onClick={toggleLikeList}
        disabled={loading}
      >
        {movie.likeList? <FaHeart /> : <FaRegHeart />}
      </button>
)
}

export default LikeBtn
