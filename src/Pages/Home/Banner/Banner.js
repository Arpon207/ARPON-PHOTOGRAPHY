import React from "react";
import "./Banner.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper";
import "./Banner.css";
import Banner1 from "../../../images/Banner/Banner3-3.jpg";
import Banner2 from "../../../images/Banner/Banner9-9.jpg";
import Banner3 from "../../../images/Banner/Banner6-6.jpg";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const Banner = () => {
  const banners = [
    {
      image: Banner1,
      bannerContent: "Let's create some moments to remember."
    },
    {
      image: Banner2,
      bannerContent: "Create joy, love and everything in between."
    },
    {
      image: Banner3,
      bannerContent: "I capture emotions not images."
    },
  ];

  return (
    <section className="banner">
      <Swiper
        spaceBetween={30}
        loop={true}
        effect={"fade"}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectFade]}
        className="mySwiper"
      >
        {
          banners.map(({image,imageMobile, bannerContent},index)=><SwiperSlide key={index}>
          <img src={ image} alt="" />
          <div className="banner-content"
          >
            <h1>{bannerContent}</h1>
          </div>
        </SwiperSlide>
          )}
      </Swiper>
    </section>
  );
};

export default Banner;
