import { useState } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom"
import GetName from './api/getName';
import WhatWeDo from "./pages/WhatWeDo"
import WhoWeAre from './pages/WhoWeAre';
import LandingPage from "./pages/LandingPage"

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
      <Routes>
         <Route path="/" element={<LandingPage />} />
         <Route path="/whoWeAre" element={<WhoWeAre />} />
         <Route path="/whatWeDo" element={<WhatWeDo />} />
      </Routes>
    </>
  );
}

export default App;
