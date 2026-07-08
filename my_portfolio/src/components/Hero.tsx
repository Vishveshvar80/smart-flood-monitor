import { useState, useEffect } from 'react';
import { Mail, Copy, Check } from 'lucide-react';
import avatarImg from '../assets/avatar.png';

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-github"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-linkedin"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    'Electronics & Telecommunication Engineer',
    'Software Developer',
    'AI Applications Enthusiast',
  ];

  const emailAddress = 'vishveshvar7776@gmail.com';

  useEffect(() => {
    let timer: number;
    const activeRole = roles[roleIndex];
    
    const tick = () => {
      if (!isDeleting) {
        setTypedText(activeRole.substring(0, typedText.length + 1));
        if (typedText === activeRole) {
          timer = setTimeout(() => setIsDeleting(true), 2000); // Wait before deleting
        } else {
          timer = setTimeout(tick, 100);
        }
      } else {
        setTypedText(activeRole.substring(0, typedText.length - 1));
        if (typedText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
          timer = setTimeout(tick, 200);
        } else {
          timer = setTimeout(tick, 50);
        }
      }
    };

    timer = setTimeout(tick, isDeleting ? 50 : 100);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, roleIndex]);

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-grid grid-2">
        <div className="hero-text-content">
          <div className="greeting-pill">Welcome to my Portfolio</div>
          <h1 className="hero-heading">
            Hi, I'm <br />
            <span>Vishveshvar Bidve</span>
          </h1>
          <div className="typing-container">
            <span className="role-typing">{typedText}</span>
            <span className="cursor-blink">|</span>
          </div>
          <p className="hero-description">
            Enthusiastic and dedicated Electronics and Telecommunication Engineering student with a strong interest
            in software development, Java programming, and AI applications. Eager to contribute technical skills and
            creative thinking to innovative projects while continuously learning new technologies.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View My Work
            </a>
            <button onClick={copyEmail} className="btn btn-secondary email-btn">
              {copied ? <Check size={18} className="success-icon" /> : <Copy size={18} />}
              {copied ? 'Email Copied!' : 'Copy Email'}
            </button>
          </div>

          <div className="hero-social-links">
            <a href="https://linkedin.com/in/Vishveshvar-Bidve" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedinIcon size={22} />
            </a>
            <a href="https://github.com/Vishveshvar80" target="_blank" rel="noreferrer" aria-label="GitHub">
              <GithubIcon size={22} />
            </a>
            <a href={`mailto:${emailAddress}`} aria-label="Email Direct">
              <Mail size={22} />
            </a>
          </div>
        </div>

        <div className="hero-image-content">
          <div className="avatar-frame">
            <div className="avatar-glow"></div>
            <img src={avatarImg} alt="Vishveshvar Bidve Avatar" className="avatar-image" />
          </div>
        </div>
      </div>
    </section>
  );
}
