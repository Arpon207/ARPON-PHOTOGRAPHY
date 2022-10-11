import React from "react";
import "./Loading.css";
import icon from "../../images/Icons/lens.png";
import { motion } from "framer-motion";

const Loading = ({ loading }) => {
  return (
    <div className="loading-container">
      <div>
        <motion.img
          animate={{ rotate: 360 }}
          transition={{ duration: 1, loop: Infinity }}
          src={icon}
          alt=""
          height={"50"}
        />
      </div>
    </div>
  );
};

export default Loading;
