import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Schedule from './pages/Schedule';
import Contact from './pages/Contact';
import JeetKuneDo from './pages/martial-arts/JeetKuneDo';
import MMA from './pages/martial-arts/MMA';
import BJJ from './pages/martial-arts/BJJ';
import SanDa from './pages/martial-arts/SanDa';
import Eskrima from './pages/martial-arts/Eskrima';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="contact" element={<Contact />} />
        <Route path="martial-arts">
          <Route path="jeet-kune-do" element={<JeetKuneDo />} />
          <Route path="mma" element={<MMA />} />
          <Route path="bjj" element={<BJJ />} />
          <Route path="san-da" element={<SanDa />} />
          <Route path="eskrima" element={<Eskrima />} />
        </Route>
      </Route>
      </Routes>
    </>
  );
}

export default App;
