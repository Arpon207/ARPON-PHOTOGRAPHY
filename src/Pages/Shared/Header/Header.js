import React, { useEffect } from "react";
import "./Header.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./../../../Firebase/Firebase.init";
import { signOut } from "firebase/auth";

import headerIcon from "../../../images/diaphragm.png";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { FaMicroblog } from "react-icons/fa";
import { TiContacts } from "react-icons/ti";
import { AiOutlineLogin } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";

const Header = () => {
  const [isNavActive, setIsNavActive] = useState(false);
  const [activeNav, setActiveNav] = useState(false);
  const [userName, setUserName] = useState("");
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const links = [
    {
      name: "Home",
      path: "/",
      icon: GoHome,
    },
    {
      name: "Blogs",
      path: "/blogs",
      icon: FaMicroblog,
    },
    {
      name: "About",
      path: "/about",
      icon: BiUserCircle,
    },
    {
      name: "Contact",
      path: "/contact",
      icon: TiContacts,
    },
  ];

  const handlePageScroll = () => {
    if (window.scrollY > 80) {
      setActiveNav(true);
    } else {
      setActiveNav(false);
    }
  };

  window.addEventListener("scroll", handlePageScroll);

  const handleNavigate = () => {
    navigate("/");
    setIsNavActive(false);
  };

  if (user) {
    setTimeout(() => {
      setUserName(user.displayName);
    }, 1000);
  }

  return (
    <header
      className={
        location.pathname === "/"
          ? `header ${activeNav ? "header-active" : "header-transparent"}`
          : ` header ${activeNav ? "header-active" : "header-bg"}`
      }
    >
      <div className="header-container">
        <div onClick={() => navigate("/")} className="header-title">
          <img src={headerIcon} alt="" />
          <div>
            <h3>ARPON</h3>
            <p>Wedding Photographer</p>
          </div>
        </div>
        <nav
          className={`nav-links ${isNavActive ? "menu-active" : "menu-close"}`}
        >
          <div onClick={handleNavigate} className="header-menu-title">
            <img src={headerIcon} alt="" />
            <div>
              <h3>ARPON</h3>
              <p>Wedding Photographer</p>
            </div>
          </div>
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                isActive ? "link" : "link link-inactive"
              }
              onClick={() => setIsNavActive(false)}
            >
              <link.icon />
              {link.name}
            </NavLink>
          ))}
          {user?.displayName ? (
            <p className="user-name">
              {userName}
              <button
                title="Sign Out"
                onClick={() => signOut(auth)}
                className="signout-btn"
              >
                <AiOutlineLogout />
              </button>
            </p>
          ) : (
            <NavLink
              to="/signin"
              className={({ isActive }) =>
                isActive ? "link" : "link link-inactive"
              }
              onClick={() => setIsNavActive(false)}
            >
              <AiOutlineLogin /> Sign In{" "}
            </NavLink>
          )}
        </nav>
        <button
          onClick={() => setIsNavActive(!isNavActive)}
          className="menu-btn"
        >
          {isNavActive ? (
            <MdOutlineClose className="menu-close-btn" />
          ) : (
            <FaBars />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
