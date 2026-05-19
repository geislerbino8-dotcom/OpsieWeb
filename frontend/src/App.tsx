import { useEffect, createContext, useState } from 'react';
import './App.css';
import "aos/dist/aos.css";
import './App.css';
import AOS from "aos";
import { useLocation } from 'react-router-dom';
import { useBotpress } from './hooks/useBotpress';
import Layout from './Layout';
import { getContent } from './api/getContent';

type ContentType = Record<string, any>


export const ContentContext = createContext<ContentType | null>(null)


const App = () => {

  const [ content, setContent ] = useState<ContentType | null>(null)

  

  useEffect(()=> {
    const fetchContent = async()=> {
      let res = await getContent()
      setContent(res.data[0])
    }

    fetchContent()
  }, [])
  

  useBotpress()

  
  const currentLocation = useLocation()

  
   



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
   <ContentContext.Provider value={content}>
      <Layout />
   </ContentContext.Provider>
  );
}

export default App;
