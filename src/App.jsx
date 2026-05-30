import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import FAQ from './components/FAQ';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Sponsors from './components/Sponsors';
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
    <Sponsors />
    <Events />
    <FAQ />
  </>
);

const AppContent = () => {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';
  const isAboutSection = location.hash === '#about';

  return (
    <div className="min-h-screen bg-black selection:bg-primary selection:text-black relative">
      <ShootingStarsGrid />
      {!isAdminPage && !isAboutSection && <Navbar />}
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<ProjectDetails />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      {!isAdminPage && (
        <div className="relative z-20">
          <CTA />
          <Footer />
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
