import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Activities from './components/Activities';
import Certificates from './components/Certificates';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Privacy from './components/Privacy';

function App() {
  return (
    <div className="min-h-screen bg-base-bg text-text-primary">
      <a href="#main-content" className="skip-link">ข้ามไปยังเนื้อหา</a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Activities />
        <Certificates />
        <Resume />
        <Contact />
        <Privacy />
      </main>
      <Footer />
    </div>
  );
}

export default App;
