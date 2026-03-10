import { useState, useEffect } from 'react';
import { Outlet, useLocation } from "react-router-dom";
import './App.css';
import { Routes, Route } from "react-router-dom"
import GetName from './api/getName';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

import { getTickets } from './api/getTickets';
import WhatWeDo from "./pages/WhatWeDo"
import WhoWeAre from './pages/WhoWeAre';
import LandingPage from "./pages/LandingPage"


import AOS from "aos";
import "aos/dist/aos.css";
import Homepage from './pages/Homepage';
import ProductPage from './pages/ProductPage';
import OpsieTicketingSystem from './pages/OpsieTicketingSystem';
import ContactUsPage from './pages/ContactUsPage';

const App = () => {
  const [name, setName] = useState<string>('');

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const data = await getTickets();
        console.log(data)
      } catch (err: any) {
        console.log(err)
      } finally {
      }
    };

    fetchInquiries();
  }, []);

  

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
    const handleScroll = () => {
      const elements = document.querySelectorAll("[data-aos]");
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          el.classList.add("aos-animate");
        } else {
          el.classList.remove("aos-animate"); // This allows animation to re-trigger
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


  return (
    <>

      <div>
          <Navigation />
          <Outlet />
      </div>

    </>
  );
}

export default App;
