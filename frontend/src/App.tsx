import { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import './App.css';
import GetName from './api/getName';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

import { getTickets } from './api/getTickets';

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

  getTickets()
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
          <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default App;
