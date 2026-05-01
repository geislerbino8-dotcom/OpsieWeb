import { useEffect } from 'react';
import { Outlet } from "react-router-dom";
import './App.css';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import "aos/dist/aos.css";
import './App.css';
import ChatHelp from './components/ChatHelp';
import AOS from "aos";
import { useLocation } from 'react-router-dom';
import { supabase } from './utils/supabase';
import { useBotpress } from './hooks/useBotpress';


const App = () => {

  useBotpress()

  
  const currentLocation = useLocation()

  
   useEffect(() => {
    async function getTodos() {
      const { data } = supabase
        .storage
        .from('Opsie Tickets')
        .getPublicUrl('sample.pdf')

      console.log(data.publicUrl)
      }

    getTodos()
  }, [])



  useEffect(()=> {

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })

  }, [currentLocation] )

  
  useEffect(() => {
  AOS.init({
      duration: 1000,         
      once: true,            
      mirror: false,        
    });

  }, []);

 

  return (
   
      <div className='select-none'>
          <ChatHelp />
          <Navigation />
          <Outlet />
          <Footer/>
      </div>

  );
}

export default App;
