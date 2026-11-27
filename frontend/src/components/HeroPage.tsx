import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ContentContext } from "@/ContentContext";
import { Moon, Sun } from "lucide-react";

type HeroPageProps = {
  bgImage?: string;
};

function HeroPage({ bgImage: _bgImage }: HeroPageProps) {
  const navigate = useNavigate();
  const content = useContext(ContentContext);
  const [isDark, setIsDark] = useState(false);

  const headerText = content?.heroSection?.header || "";
  const subHeaderText = content?.heroSection?.subHeader || "";
  const buttonText = content?.heroSection?.button || "";

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("opsie-banner-theme");
    if (savedTheme === "dark") setIsDark(true);
  }, []);

  const toggleTheme = (dark: boolean) => {
    setIsDark(dark);
    window.localStorage.setItem("opsie-banner-theme", dark ? "dark" : "light");
  };

  return (
    <section
      className="relative w-full min-h-[760px] overflow-hidden text-white"
      style={{
        backgroundColor: isDark ? "#070c10" : "#141b1d",
        backgroundImage: `url(${isDark ? "/background/opsie-banner-dark.png" : "/background/opsie-banner-light.png"})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      aria-label="Opsie enterprise operations platform"
    >
      <div
        className="absolute inset-x-0 top-[76px] h-[626px]"
        style={{ backgroundColor: isDark ? "rgba(7,16,20,0.56)" : "rgba(7,16,20,0.35)" }}
      />

      <div className="relative z-10 mx-auto flex min-h-[760px] max-w-[1200px] flex-col">
        <div className="relative h-[76px] shrink-0">
          <div className="absolute right-0 top-[25px] flex h-[26px] items-center rounded-full bg-[#263f4c] p-[2px]">
            <button
              type="button"
              aria-label="Use light banner"
              aria-pressed={!isDark}
              onClick={() => toggleTheme(false)}
              className={`grid h-[22px] w-[22px] place-items-center rounded-full transition-colors ${isDark ? "text-white/70" : "bg-white text-[#263f4c]"}`}
            >
              <Sun className="h-[13px] w-[13px]" />
            </button>
            <button
              type="button"
              aria-label="Use dark banner"
              aria-pressed={isDark}
              onClick={() => toggleTheme(true)}
              className={`grid h-[22px] w-[22px] place-items-center rounded-full transition-colors ${isDark ? "bg-[#263f4c] text-white" : "text-white/70"}`}
            >
              <Moon className="h-[13px] w-[13px]" />
            </button>
          </div>
        </div>

        <div className="relative h-[626px]">
          <p className="absolute left-0 top-[40px] text-[12px] font-medium leading-[1.2]">
            01 / CONNECTED BY DESIGN
          </p>
          <p className="absolute right-0 top-[40px] text-right text-[12px] font-medium leading-[1.2]">
            SECURE / CONNECTED / INTELLIGENT
          </p>

          <div className="absolute left-1/2 top-[171px] w-[min(1000px,calc(100%-32px))] -translate-x-1/2 text-center">
            <h1 className="hero-design-title text-[84px] leading-[1.1] tracking-[-3.36px] text-white">
              <span className="block">{headerText || "Operate With"}</span>
              <span className="block">{headerText ? "" : "Opsie Way."}</span>
            </h1>
            {subHeaderText && (
              <p className="mx-auto mt-[38px] max-w-[780px] text-[18px] leading-[1.2] text-white">
                {subHeaderText}
              </p>
            )}
            {!subHeaderText && (
              <p className="mx-auto mt-[38px] max-w-[780px] text-[18px] leading-[1.2] text-white">
                Make your day-to-day operations easier with Opsie.
              </p>
            )}
            <button
              type="button"
              onClick={() => navigate("/book-a-schedule")}
              className="mx-auto mt-[34px] flex h-[46px] w-[248px] items-center justify-center border border-[#3cbde7] bg-[rgba(6,46,59,0.94)] text-[14px] font-medium text-[#3cbde7] transition-colors hover:bg-[#3cbde7] hover:text-[#071014]"
            >
              {buttonText || "See how it works"} <span className="ml-2" aria-hidden="true">↗</span>
            </button>
          </div>

          <div
            className="absolute inset-x-[-50vw] bottom-0 h-[94px]"
            style={{ backgroundColor: isDark ? "rgba(7,16,20,0.9)" : "rgba(7,16,20,0.72)" }}
          />
          <div className="absolute bottom-0 left-0 right-0 grid h-[94px] grid-cols-3 items-start pt-[19px]">
            <div>
              <p className="text-[12px] font-medium leading-[1.2]">WORKFLOW ORCHESTRATION</p>
              <p className="mt-[10px] text-[14px] leading-[1.2] text-[#cfd7d9]">Workflows synchronized</p>
            </div>
            <div>
              <p className="text-[12px] font-medium leading-[1.2]">TEAM ALIGNMENT</p>
              <p className="mt-[10px] text-[14px] leading-[1.2] text-[#cfd7d9]">Command layer active</p>
            </div>
            <div>
              <p className="text-[12px] font-medium leading-[1.2]">LIVE COMMAND</p>
              <p className="mt-[10px] text-[14px] leading-[1.2] text-[#cfd7d9]">Automation policy compliant</p>
            </div>
          </div>
        </div>

        <div
          className="relative h-[58px] shrink-0"
          style={{ backgroundColor: isDark ? "rgba(7,16,20,0.96)" : "rgba(7,16,20,0.88)" }}
        >
          <p className="absolute left-0 top-[22px] text-[13px] leading-[1.2] text-[#d8e0e1]">
            The operating layer for modern enterprise.
          </p>
          <button
            type="button"
            onClick={() => navigate("/contact-us")}
            className="absolute right-0 top-[22px] text-[13px] font-medium leading-[1.2] text-white"
          >
            Talk to an expert <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroPage;