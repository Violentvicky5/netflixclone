import React from "react";
import Header from "./Header";
import CardSection from "./CardSection";
import TrendingCarousel from "./TrendingCarousel";
import HeroSection from "./HeroSection";
import Faq from "./Faq";
import EmailInput from "./EmailInput";
import Footer from "./Footer";
import loginImg from "../assets/login.png";


const HomeContent = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${loginImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Header />
        <HeroSection/>
          </div>
      <TrendingCarousel />
      <CardSection/>
      <Faq/>
      <EmailInput/>
      <Footer/>
    </>
  );
};

export default HomeContent;
