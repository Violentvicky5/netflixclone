import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import movieImg from "../assets/card.jpg";

const TrendingCarousel = () => {
  return (
    <>
      <div className="trendingWrapper sectionPadd">
        <div className="container">
          <h2 className="headText">Trending Now</h2>
        </div>

        <div className="container mt-3">
          <Swiper
            spaceBetween={10}    
            slidesPerView={5}    
            loop={false}           
            grabCursor={true}     
          >
            {[
              1,2,3,4,5,6,7,8,9,10
            ].map((num) => (
              <SwiperSlide key={num}>
               
                  <a className="trendingItem mt-2" href="#">
                    <img src={movieImg} alt="movieImg" />
                    <span className="text-black">{num}</span>
                  </a>
                
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default TrendingCarousel;
