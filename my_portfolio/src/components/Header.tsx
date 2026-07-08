import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function Header({ darkMode, setDarkMode }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`header-nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#" className="nav-logo">
          V<span>B</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-menu">
          <ul>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="theme-toggle-btn"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${isOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <ul>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
