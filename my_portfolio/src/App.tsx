import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return !window.matchMedia('(prefers-color-scheme: light)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Scroll reveal animation setup
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Once revealed, we don't need to observe it anymore
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: '0px 0px -50px 0px',
      }
    );

    revealElements.forEach((el) => observer.observe(el));
    
    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      {/* Decorative ambient glowing background circles */}
      <div className="bg-ambient-glow bg-glow-1"></div>
      <div className="bg-ambient-glow bg-glow-2"></div>

      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
