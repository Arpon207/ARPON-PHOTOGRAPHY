import React from "react";
import "./Footer.css";
import headerIcon from "../../../images/camera.png";
import { FaFacebook, FaFacebookMessenger, FaInstagram } from "react-icons/fa";

const Footer = () => {
    const year = new Date().getFullYear();
    return(
    <section className="footer-container">
      <footer>
        <div className="footer-logo">
          <img src={headerIcon} alt="" />
          <div>
            <h3>ARPON</h3>
            <p>Wedding Photographer</p>
          </div>
        </div>
        <div className="useful-links">
          <p className="footer-content-title">Useful Links</p>
          <ul>
            <a href="#services">Services</a>
            <a href="#packages">Packages</a>
            <a href="#gears">Gears</a>
          </ul>
        </div>
        <div className="terms">
          <p className="footer-content-title">Support</p>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of use</li>
            <li>Faq</li>
          </ul>
        </div>
        <div className="social">
          <p className="footer-content-title">FIND ME ON</p>
          <div>
            <a href="https://facebook.com">
              <FaFacebook />
            </a>
            <a href="https://facebook.com">
              <FaFacebookMessenger />
            </a>
            <a href="https://facebook.com">
              <FaInstagram />
            </a>
          </div>
        </div>
      </footer>
      <hr />
      <p style={{textAlign:"center", marginTop:"1rem"}}>&copy; {year}. All rights reserved</p>
    </section>
  );
};

export default Footer;
