import React from "react";
import "./Gears.css";
import camera from "../../../images/Gears/camera.jpg";
import lens from "../../../images/Gears/lens.jpg";
import gimbal from "../../../images/Gears/gimbal.jpg";
import drone from "../../../images/Gears/drone.jpg";
import { Animation } from "../../../Hooks/Animation";
import { motion } from "framer-motion";

const Gears = () => {
    const [ref, animation] = Animation();

    const gears = [
        camera,
        lens,
        gimbal,
        drone
    ];

    const cardAnimation = {
      hidden:{
        opacity:0,
      },
      show:{
        opacity:1,
        transition:{
          staggerChildren: 0.2
        }
      }
    };

    const imageAnimation = {
        hidden:{
          scale:.5,
          opacity:0
        },
        show:{
          scale:1, 
          opacity:1, 
          transition:{
            duration:.8,
            type:"tween"
          }
        }
    };

  return (
    <section ref={ref} className="gears">
      <div>
        <div
        data-aos = "zoom-in"
        data-aos-duration = "800"
        className="gears-content">
          <h1>Professional Gears</h1>
          <p>
          I use a professional gears in my sessions, these gears allows me to
          get high resolution and clarity images with natural colors being
          represented accurately. <br /><br/> I use professional high aperture
          L-class lenses to get the best shots.
          </p>
        </div>
        <motion.div 
          className="gears-card-container"
          animate={animation}
          variants={cardAnimation}
          initial="hidden"
        >
          {
            gears.map((gear,index) => <motion.img
                key={index}
                src={gear} 
                variants={imageAnimation}
                alt="" 
              />
            )
          }
        </motion.div>
      </div>
    </section>
  );
};

export default Gears;
