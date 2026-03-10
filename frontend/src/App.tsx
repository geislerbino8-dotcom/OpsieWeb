import { useState, useEffect } from 'react';
import { Outlet, useLocation } from "react-router-dom";
import './App.css';

import Navigation from './components/Navigation';
import Footer from './components/Footer';

import BookingPage from './components/BookingPage'

import AOS from "aos";
import "aos/dist/aos.css";


const App = () => {
  const [name, setName] = useState<string>('');


  

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
      <div className='font-poppins'>
          <Navigation />
          <Outlet />
        <Footer />
      </div>

    </>
  );
}

export default App;
