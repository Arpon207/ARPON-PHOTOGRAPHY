import "./App.css";
import Header from "./Pages/Shared/Header/Header";
import Router from "./Router/Router";
import Footer from "./Pages/Shared/Footer/Footer";
import { createContext, useEffect } from "react";
import { useState } from "react";

import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  once: true
});

export const UseContext = createContext("");

function App() {
  const [popUpPackage, setPopUpPackage] = useState(false);
  useEffect((arg) => {
    if(popUpPackage){
      document.body.style.overflow = "hidden"
    }else{
      document.body.style.overflow = "visible"
    }
  },[popUpPackage]);

  return (
    <UseContext.Provider value={{popUpPackage, setPopUpPackage}}>
      <div className="container">
        <Header />
        <Router />
        <Footer />
      </div>
    </UseContext.Provider>
  )

}

export default App;
