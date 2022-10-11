import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "./Reviews.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper";
import { reviewData } from "./ReviewData";
import { Animation } from './../../../Hooks/Animation';
import { motion } from 'framer-motion';

const Reviews = () => {
  const mobileView = window.matchMedia("(max-width:668px)");
    const [ref, animation] = Animation();
    const imageAnimation = {
        show: {x:0, opacity:1}
    };

    const commentAnimation = {
        show: {x:-35, y:35, opacity:1}
    };

    const mobileCommentAnimation = {
      show: {x:0, y:0, opacity:1}
    }

    const transition = {
        duration: 0.8,
        type: "tween"
    }
  return (
    <section ref={ref} className="review">
        <h1>Words from my couples</h1>
      <Swiper 
        pagination={{
            clickable: true,
          }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        >
        {reviewData.map(({name,image,weddingPic,comment,id}) => (
          <SwiperSlide key={id}>
            <img className="bg" src={weddingPic} alt="" />
            <div className="review-content">
                <motion.img variants={imageAnimation} initial={
                  {
                    x:mobileView.matches ? 0 : -200,  
                    opacity:0
                    }
                    } animate={animation} transition={transition} src={weddingPic} alt="" />
                
                <motion.div 
                variants={
                  mobileView.matches ? mobileCommentAnimation : commentAnimation
                } 
                initial={
                  {
                    x:mobileView.matches ? 0 : 200,
                    y:mobileView.matches ? 0 : 35, 
                    opacity:0}
                  } animate={animation} transition={transition}>
                    <div>
                        <img src={image} alt="" />
                        <h3>{name}</h3>
                    </div>
                    <p>{comment}</p>
                </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Reviews;
