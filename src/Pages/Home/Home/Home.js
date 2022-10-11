import React from "react";
import Banner from "../Banner/Banner";
import Gears from "../Gears/Gears";
import Packages from "../Packages/Packages";
import Retouching from "../Retouching/Retouching";
import Reviews from "../Reviews/Reviews";
import Services from "../Services/Services";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div>
        <Banner />
        <Services />
        <Gears />
        <Retouching />
        <Packages />
        <Reviews />
      </div>
    </>
  );
};

export default Home;
