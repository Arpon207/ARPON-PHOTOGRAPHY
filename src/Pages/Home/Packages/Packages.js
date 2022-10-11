import React from "react";
import "./Packages.css";
import {RiCameraLensLine} from 'react-icons/ri'
import { motion } from 'framer-motion';
import { elite, premium, standard } from "./deals";

const Packages = () => {

  return (
    <section id="packages" className="packages">
      <h1>Choose Your Packages</h1>
      <div className="packages-card-container">
        <motion.div
        
        className="package-card" data-aos="fade-up" data-aos-duration="800">
          <p className="package-title">Standard</p>
          <ul>
            {standard.map((deal,index) => <li key={index}><RiCameraLensLine className="list-icon"/> {deal}
            </li>)}
        </ul>
        <button>Learn More</button>
        </motion.div>

        <motion.div
        
        className="package-card" data-aos="fade-up" data-aos-duration="800">
          <p className="package-title">Premium</p>
          <ul>
            {premium.map((deal,index) => <li key={index}><RiCameraLensLine className="list-icon"/> {deal}
            </li>)}
        </ul>
        <button>Learn More</button>
        </motion.div>

        <motion.div
        
        className="package-card " data-aos="fade-up" data-aos-duration="800">
          <p className="package-title">Elite</p>
          <ul>
            {elite.map((deal,index) => <li key={index}><RiCameraLensLine className="list-icon"/> {deal}
            </li>)}
        </ul>
        <button>Learn More</button>
        </motion.div>
      </div>
    </section>
  );
};

export default Packages;
