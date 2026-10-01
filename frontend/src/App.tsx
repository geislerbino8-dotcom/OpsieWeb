import { useEffect, useState } from 'react';
import './App.css';
import "aos/dist/aos.css";
import AOS from "aos";
import { useLocation } from 'react-router-dom';
import Layout from './Layout';
import { getContent } from './api/getContent';
import { supabase } from './utils/supabase';
import { ContentContext, type ContentType } from './ContentContext';

const App = () => {

  const [ content, setContent ] = useState<ContentType | null>(null)

  
  useEffect(()=> {
    const fetchContent = async()=> {
      const res = await getContent()
      setContent(res.data[0].publishedContent)
    }

    fetchContent()
  }, [])
  
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

  useEffect(() => {
    async function getTodos() {
      const { data } = supabase
        .storage
        .from('Opsie Tickets')
        .getPublicUrl('sample.pdf')
        console.log(data)
      }
    getTodos()
  }, [])  

  return (
   <ContentContext.Provider value={content}>
      <Layout />
   </ContentContext.Provider>
  );
}

export default App;