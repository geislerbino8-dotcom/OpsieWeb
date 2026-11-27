import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/HeroPage.css';

function HeroPage() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const syncTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    window.addEventListener("storage", syncTheme);

    return () => {
      observer.disconnect();
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  return (
    <section className={`opsie-hero ${isDarkMode ? "opsie-hero--dark" : ""}`}>
      <div
        className="opsie-hero__image"
        style={{
          backgroundImage: `url(${isDarkMode ? "/figma/hero-desk-dark.png" : "/figma/hero-desk-light.png"})`,
        }}
        aria-hidden="true"
      />
      <div className="opsie-hero__scrim" aria-hidden="true" />

      <div className="opsie-hero__content">
        <p className="opsie-hero__eyebrow">Enterprise Operations Platform</p>
        <h1 className="opsie-hero__title">
          <span>Operate With</span>
          <span className="opsie-hero__title-accent">Opsie Way.</span>
        </h1>
        <p className="opsie-hero__subtitle">Make your day-to-day operations easier with Opsie.</p>

        <div className="opsie-hero__actions">
          <button type="button" className="opsie-hero__primary" onClick={() => navigate("/products")}>
            See how it works
          </button>
          <button type="button" className="opsie-hero__secondary" onClick={() => navigate("/contact-us")}>
            Talk to an expert <span aria-hidden="true">↗</span>
          </button>
        </div>

        <div className="opsie-hero__tagline">
          <p>The operating layer for modern enterprise.</p>
          <p>Secure / Connected / Intelligent</p>
        </div>
      </div>

      <div className="opsie-hero__status" aria-label="Platform status">
        <div>
          <p>Workflow orchestration</p>
          <strong>Workflows synchronized</strong>
        </div>
        <div>
          <p>Team alignment</p>
          <strong>Command layer active</strong>
        </div>
        <div>
          <p>Live command</p>
          <strong>Automation policy compliant</strong>
        </div>
      </div>
    </section>
  );
}

export default HeroPage;