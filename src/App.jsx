import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import { CTA, Footer } from './components/Footer';
import ProjectDetails from './pages/ProjectDetails';
import Schedule from './pages/Schedule';
import Admin from './pages/Admin';
import ShootingStarsGrid from './components/ShootingStarsGrid';

const Home = () => (
  <>
    <Hero />
    <About />
    <Events />
    <CTA />
  </>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black selection:bg-primary selection:text-black relative">
        <ShootingStarsGrid />
        <Navbar />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:id" element={<ProjectDetails />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
