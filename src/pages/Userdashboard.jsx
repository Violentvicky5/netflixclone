import React from 'react'
import UserDashboardBanner from '../components/UserDashboardBanner'
import UserDashboardHeader from '../components/UserDashboardHeader'
import UserDashboardMovieSwiper from '../components/UserDashboardMovieSwiper'
import card from "../assets/card.jpg"
const Userdashboard = () => {
  const sampleMovies = [
  { img: card, title: "Movie 1" },
  { img: card, title: "Movie 2" },
  { img: card, title: "Movie 3" },
  { img: card, title: "Movie 4" },
  { img: card, title: "Movie 5" },
  { img: card, title: "Movie 6" },
  { img: card, title: "Movie 7" },
];
  return (
    <div>

<UserDashboardBanner/>
<div style={{ background: "#111", minHeight: "100vh", padding: "20px" }}>
<UserDashboardMovieSwiper title="Trending Now" movies={sampleMovies}/>
<UserDashboardMovieSwiper title="Top Rated" movies={sampleMovies}/>
<UserDashboardMovieSwiper title="New and Popular" movies={sampleMovies}/>
<UserDashboardMovieSwiper title="Random" movies={sampleMovies}/>
</div>

    </div>
  )
}

export default Userdashboard