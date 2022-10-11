import React from "react";
import { useContext } from "react";
import "./PopUpPackages.css";
import { UseContext } from "../../../App";
import { elite, premium, standard } from "../Packages/deals";
import { RiCameraLensLine } from "react-icons/ri";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { ImCross } from 'react-icons/im'

const PopUp = ({selectedService}) => {
    const [selectedPackage, setSelectedPackage] = useState({
        packageId : ""
    });


    const [isActive, setIsActive] = useState(false);

    const updatePackage = (id) => {
        setSelectedPackage({
            packageId : id
        })
    };

    const {Standard, Premium, Elite} = selectedService.price;

  const { setPopUpPackage } = useContext(UseContext);

  const navigate = useNavigate();

  const handleNavigate = () =>{
      navigate(`${selectedService.id}-${selectedPackage.packageId}-clientInfo`
      )
      setPopUpPackage(false)
  };

  useEffect(()=>{
    if(selectedPackage.packageId){
      setIsActive(true);
    }
    else{
      setIsActive(false);
    }
  },[selectedPackage]);

  return (
    <div className="popup" >
      <div className="popup-container" data-aos="zoom-in" data-aos-duration = "500">
        <h1>Choose Packages</h1>
        <div className="popup-card-container">
          <div className={selectedPackage.packageId === 'Standard' ? 'popup-package-card active-package' : "popup-package-card"}>
            <div onClick={()=> updatePackage("Standard")}>
            <p className="package-title">Standard</p>
            <p className="package-price">
              <small>$</small>{Standard}
            </p>
            <ul>
              {standard.map((deal, index) => (
                <li key={index}>
                  <RiCameraLensLine className="popup-list-icon" /> {deal}
                </li>
              ))}
            </ul>
            </div>
          {
              selectedPackage.packageId === "Standard" && <button  onClick={()=> setSelectedPackage({})}><ImCross/></button>
            }
          </div>

          <div className={selectedPackage.packageId === 'Premium' ? 'popup-package-card active-package' : "popup-package-card"}>
            <div onClick={()=> updatePackage("Premium")}>
            <p className="package-title">Premium</p>
            <p className="package-price">
              <small>$</small>{Premium}
            </p>
            <ul>
              {premium.map((deal, index) => (
                <li key={index}>
                  <RiCameraLensLine className="popup-list-icon" /> {deal}
                </li>
              ))}
            </ul>
            </div>
            {
              selectedPackage.packageId === "Premium" && <button onClick={()=> setSelectedPackage({})}><ImCross/></button>
            }  
          </div>

          <div className={selectedPackage.packageId === 'Elite' ? 'popup-package-card active-package' : "popup-package-card"}>
            <div onClick={()=> updatePackage("Elite")}>
            <p className="package-title">Elite</p>
            <p className="package-price">
              <small>$</small>{Elite}
            </p>
            <ul>
              {elite.map((deal, index) => (
                <li key={index}>
                  <RiCameraLensLine className="popup-list-icon" /> {deal}
                </li>
              ))}
            </ul>
            </div>
          {
              selectedPackage.packageId === "Elite" && <button onClick={()=> setSelectedPackage({})}><ImCross/></button>
            }
          </div>
        </div>
        <div className="popup-buttons">
          <button className="cancel-btn" onClick={()=>setPopUpPackage(false)}>
                Cancel
          </button>
          <button className={isActive? "next-btn hover" : "next-btn"} disabled={!isActive} onClick={()=>{
            handleNavigate()
          }}>
                Next
          </button>
        </div>
      </div>      
    </div>
  );
};

export default PopUp;
