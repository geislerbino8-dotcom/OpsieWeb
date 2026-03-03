import { useState } from 'react';
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
import AboutUsSection from './components/sections/AboutUsSection';

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
