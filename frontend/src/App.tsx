<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
=======
import { useState } from 'react';
>>>>>>> a68b8d75a068078bd35e10af51f81c773624a34b
import './App.css';
import GetName from './api/getName';
import Navigation from './components/Navigation';
import HeroPage from './components/HeroPage';
import ServicesSection from './components/sections/ServicesSection';
import Analytics from './components/sections/Analytics';
import ProductSection from './components/sections/ProductSection';
import PartnerSection from './components/sections/PartnerSection';
import FeedbackSection from './components/sections/FeedbackSection';
import ContactUsSection from './components/sections/ContactUsSection';
import EncourageSection from './components/sections/EncourageSection';
import Footer from './components/Footer';
<<<<<<< HEAD
import { getInquiries } from './api/getInquiries';
=======
import AboutUsSection from './components/sections/AboutUsSection';
>>>>>>> a68b8d75a068078bd35e10af51f81c773624a34b

const App = () => {
  const [name, setName] = useState<string>('');

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const data = await getInquiries();
        console.log(data)
      } catch (err: any) {
        console.log(err)
      } finally {
      }
    };

    fetchInquiries();
  }, []);

  getInquiries()
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

  fetchName();

  return (
    <>
      <div>
        <Navigation />
        <HeroPage />
        <AboutUsSection />
        <ServicesSection />
        <ProductSection />
        <Analytics />
        <FeedbackSection />
        <PartnerSection />

        <ContactUsSection />
        <EncourageSection />
        <Footer />

      </div>
    </>
  );
}

export default App;
