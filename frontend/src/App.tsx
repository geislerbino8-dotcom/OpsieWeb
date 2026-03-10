import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import './App.css';
import { Routes, Route } from "react-router-dom"
import GetName from './api/getName';
import WhatWeDo from "./pages/WhatWeDo"
import WhoWeAre from './pages/WhoWeAre';
import LandingPage from "./pages/LandingPage"
import Header from './components/Header';
import ChatBot from './components/ChatBot';


import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  const [name, setName] = useState<string>('');

  

  const fetchName = async () => {
    try {
      // Please see my note in getName.ts regarding the use of the class here.
      // In a real application, you might want to refactor this to be more functional
      // or use a different pattern for API calls.
      const getNameClass = new GetName();
      const fetchedName = await getNameClass.fetchName();
      setName(fetchedName);
    } catch (error) {
      console.error('Error fetching name:', error);
    }
  };

  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      offset: 0, // important
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
          el.classList.remove("aos-animate"); // This allows animation to re-trigger script1.src =  script2.src = 
        }
      });
    };
  
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check
  
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    
    window.scrollTo(0, 0);
    
    AOS.refreshHard();
  }, [location.pathname]);

  fetchName();

  return (
    <>
       <Header />
      <Routes>
         <Route path="/" element={<LandingPage />} />
         <Route path="/whoWeAre" element={<WhoWeAre />} />
         <Route path="/whatWeDo" element={<WhatWeDo />} />
      </Routes>
    </>
  );
}

export default App;
