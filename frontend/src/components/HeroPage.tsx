import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { ContentContext } from "@/ContentContext";
import "./HeroBanner.css";

type HeroPageProps = {
  bgImage?: string;
};

function HeroPage({ bgImage }: HeroPageProps) {
  const navigate = useNavigate();
  const content = useContext(ContentContext);
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const subHeaderText =
    content?.heroSection?.subHeader ||
    "Make your day-to-day operations easier with Opsie.";

  const portrait = isDark
    ? "/background/opsie-banner-dark.png"
    : "/background/opsie-banner-light.png";

  return (
    <section className={`opsie-banner ${isDark ? "opsie-banner-dark" : ""}`}>
      <img
        className="opsie-banner-portrait"
        src={isDark ? "/background/opsie-banner-dark.png" : (bgImage || portrait)}
        alt=""
        aria-hidden="true"
      />
      <div className="opsie-banner-cinematic-scrim" />

      <header className="opsie-banner-nav">
        <nav className="opsie-banner-links" aria-label="Primary navigation">
          <Link to="/what-we-do">Why Opsie</Link>
          <Link to="/who-we-are">About Us</Link>
          <Link to="/contact-us">Contact Us</Link>
          <Link to="/products">Products</Link>
        </nav>

        <Link className="opsie-banner-logo" to="/" aria-label="Opsie Home">
          <img           src={isDark ? "/Opsie-banner-logo-dark.png" : "/Opsie-banner-logo.png"} alt="Opsie" />
        </Link>

        <div className="opsie-banner-actions">
          <button
            className="opsie-appearance-switch"
            type="button"
            role="switch"
            aria-checked={isDark}
            aria-label={isDark ? "Use light appearance" : "Use dark appearance"}
            onClick={() => setIsDark((current) => !current)}
          >
            <Sun className={!isDark ? "opsie-appearance-selected" : ""} />
            <Moon className={isDark ? "opsie-appearance-selected" : ""} />
            <span className={isDark ? "opsie-switch-knob dark" : "opsie-switch-knob"} />
          </button>
          <button
            className="opsie-banner-get-started"
            type="button"
            onClick={() => navigate("/book-a-schedule")}
          >
            Get started <span aria-hidden="true">↗</span>
          </button>
        </div>

        <button
          className="opsie-banner-menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        {menuOpen && (
          <nav className="opsie-banner-mobile-menu" aria-label="Mobile navigation">
            <Link to="/what-we-do" onClick={() => setMenuOpen(false)}>Why Opsie</Link>
            <Link to="/who-we-are" onClick={() => setMenuOpen(false)}>About Us</Link>
            <Link to="/contact-us" onClick={() => setMenuOpen(false)}>Contact Us</Link>
            <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
            <button type="button" onClick={() => navigate("/book-a-schedule")}>Get started ↗</button>
          </nav>
        )}
      </header>

      <div className="opsie-banner-hero">
        <p className="opsie-banner-eyebrow">Enterprise operations platform</p>
        <p className="opsie-banner-subtitle">{subHeaderText}</p>
        <h1 className="opsie-banner-title">
          <span>Operate With</span>
          <span>Opsie Way.</span>
        </h1>
        <button
          className="opsie-banner-demo"
          type="button"
          onClick={() => navigate("/what-we-do")}
        >
          See how it works <span aria-hidden="true">↗</span>
        </button>
        <p className="opsie-banner-operating-copy">
          The operating layer for modern enterprise.
        </p>
        <p className="opsie-banner-trust">Secure / Connected / Intelligent</p>
      </div>

      <footer className="opsie-banner-footer">
        <div>
          <strong>Workflow orchestration</strong>
          <span>Workflows synchronized</span>
        </div>
        <div>
          <strong>Team alignment</strong>
          <span>Command layer active</span>
        </div>
        <div>
          <strong>Live command</strong>
          <span>Automation policy compliant</span>
        </div>
        <button type="button" onClick={() => navigate("/contact-us")}>
          Talk to an expert <span aria-hidden="true">↗</span>
        </button>
      </footer>
    </section>
  );
}

export default HeroPage;