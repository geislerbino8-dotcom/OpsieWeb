import { useEffect } from 'react';
import { Outlet } from "react-router-dom";
import './App.css';

import Navigation from './components/Navigation';
import Footer from './components/Footer';

import "aos/dist/aos.css";

import { useLocation } from "react-router-dom";
import './App.css';

import ChatHelp from './components/ChatHelp';


import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {

  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: true,
      offset: 0,
    });
  }, []);




  useEffect(() => {
    if (document.getElementById("botpress-script")) return;
  
    const script1 = document.createElement("script");
    script1.src = "https://cdn.botpress.cloud/webchat/v3.6/inject.js";
    script1.id = "botpress-script";
    script1.async = true;
  
    const script2 = document.createElement("script");
    script2.src = "https://files.bpcontent.cloud/2026/03/08/17/20260308173901-3FOO88VO.js";
    script2.defer = true;
  
    document.body.appendChild(script1);
    document.body.appendChild(script2);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll("[data-aos]");
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          el.classList.add("aos-animate");
        } else {
          el.classList.remove("aos-animate"); 
        }
      });
    };
  
    window.addEventListener("scroll", handleScroll);
    handleScroll(); 
  
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    
    window.scrollTo(0, 0);
    
    AOS.refreshHard();
  }, [location.pathname]);



  return (
    <>
      <div className='font-monserrat'>
          <ChatHelp />
          <Navigation />
          <Outlet />
          <Footer/>
      </div>

    </>
  );
}

export default App;
