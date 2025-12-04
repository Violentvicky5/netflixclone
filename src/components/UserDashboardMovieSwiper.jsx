import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const UserDashboardMovieSwiper = ({ title, movies = [] }) => {
  const safeId = title.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className="container movie-row mb-5">
      <h3 className="text-white mb-3">{title}</h3>

      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{
          el: `.pagination-${safeId}`,
          clickable: true,
          renderBullet: (index, className) =>
            `<span class="swiper-pagination-bullet ${className} dash-pagination">—</span>`,
        }}
        spaceBetween={15}
        slidesPerView={6}
        breakpoints={{
          0: { slidesPerView: 2 },
          480: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
        className="movie-swiper"
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index} className="movie-slide">
            <div className="movie-card">
              <img src={movie.img} alt={movie.title} className="movie-img" />
              <p className="movie-title text-white mt-1">{movie.title}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={`custom-pagination pagination-${safeId} mt-2`}></div>
    </div>
  );
};

export default UserDashboardMovieSwiper;
