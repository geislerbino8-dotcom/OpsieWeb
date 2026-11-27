import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ContentContext } from "@/ContentContext";
import '../styles/HeroPage.css';

type HeroPageProps = {
  bgImage?: string;
};

function HeroPage({ bgImage }: HeroPageProps) {
  const navigate = useNavigate();
  const content = useContext(ContentContext);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const headerText = content?.heroSection?.header || "Operate With Opsie Way.";
  const subHeaderText = content?.heroSection?.subHeader || "Make your day-to-day operations easier with Opsie.";
  const buttonText = content?.heroSection?.button || "See how it works";
  const titleParts = headerText.includes("Opsie")
    ? headerText.split(/(Opsie)/)
    : [headerText];

  return (
    <section className={`opsie-banner opsie-banner--${theme}`} aria-label="Opsie operations platform">
      <img
        className="opsie-banner__image"
        src={bgImage ? bgImage : "/figma-banner/campus-light.jpeg"}
        alt=""
        aria-hidden="true"
      />
      {theme === 'dark' && <div className="opsie-banner__night" aria-hidden="true" />}

      <div className="opsie-banner__theme" role="group" aria-label="Appearance">
        <button
          type="button"
          className={`opsie-banner__theme-button ${theme === 'light' ? 'is-selected' : ''}`}
          onClick={() => setTheme('light')}
          aria-label="Use light mode"
          aria-pressed={theme === 'light'}
        >
          <span className="opsie-banner__sun" aria-hidden="true" />
        </button>
        <button
          type="button"
          className={`opsie-banner__theme-button ${theme === 'dark' ? 'is-selected' : ''}`}
          onClick={() => setTheme('dark')}
          aria-label="Use dark mode"
          aria-pressed={theme === 'dark'}
        >
          <span className="opsie-banner__moon" aria-hidden="true" />
        </button>
      </div>

      <div className="opsie-banner__main">
        <div className="opsie-banner__welcome">
          <p className="opsie-banner__eyebrow">Enterprise operations platform</p>
          <h1 className="opsie-banner__title">
            {titleParts[0] && <span>{titleParts[0]}</span>}
            {titleParts[1] && <strong>{titleParts[1]}</strong>}
            {titleParts[2] && <span>{titleParts[2]}</span>}
          </h1>
          <p className="opsie-banner__subtitle">{subHeaderText}</p>
          <button
            type="button"
            className="opsie-banner__cta"
            onClick={() => navigate("/book-a-schedule")}
          >
            {buttonText} <span aria-hidden="true">↗</span>
          </button>
        </div>

        <p className="opsie-banner__statement">
          The operating layer<br />for modern enterprise.
        </p>

        <div className="opsie-banner__features">
          <article className="opsie-banner__feature">
            <p>Workflow orchestration</p>
            <strong>Workflows synchronized</strong>
          </article>
          <article className="opsie-banner__feature">
            <p>Team alignment</p>
            <strong>Command layer active</strong>
          </article>
          <article className="opsie-banner__feature">
            <p>Live command</p>
            <strong>Automation policy compliant</strong>
          </article>
        </div>
      </div>

      <div className="opsie-banner__footer">
        <p>Opsie / Built for organizations that keep the world moving.</p>
        <button type="button" onClick={() => navigate("/contact-us")}>Talk to an expert <span aria-hidden="true">↗</span></button>
      </div>
    </section>
  );
}

export default HeroPage;