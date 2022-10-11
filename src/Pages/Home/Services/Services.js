import React from "react";
import "./Services.css";

import { useState } from "react";

import { useContext } from "react";
import { UseContext } from "../../../App";
import PopUp from './../PopUpPackages/PopUpPackages';
import useFetch from './../../../Hooks/useFetch';

const Services = () => {
  const {services} = useFetch();
  const [selectedService, setSelectedService] = useState({})

  const {popUpPackage, setPopUpPackage} = useContext(UseContext);

  return (
    <section id="services" className="services">
      <h1
      >
        What I do?
      </h1>
      <div 
      className="service-cart-container"
      >
          {services.map((service) => (
            <div 
            data-aos="zoom-in"
            data-aos-duration = "800"
            key={service.id}
              className="service-card"
            >
              <img src={service.image} alt="" />
              <div className="service-card-content">
                <p>{service.title}</p>
                <p>{service.description}</p>
                <button onClick={()=>{
                  setPopUpPackage(true)
                  setSelectedService(service)
                }}>Book now</button>
              </div>
            </div>
          ))}
        </div>
      {popUpPackage && <PopUp selectedService={selectedService}></PopUp>}
    </section>
  );
};

export default Services;
