import { useEffect, useRef } from "react";
import logo from '../assets/icons/opsie_logo_only.png';

const TIMEKIT_CSS = "https://cdn.timekit.io/booking-js/v3/booking.min.css";
const TIMEKIT_JS = "https://cdn.timekit.io/booking-js/v3/booking.min.js";
const TIMEKIT_PROJECT_SLUG = "opsie-schedule-a-meeting";

declare global {
  interface Window {
    TimekitBooking?: new () => { init: (config: Record<string, unknown>) => void };
  }
}

function loadTimekitScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.TimekitBooking) return resolve();

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${TIMEKIT_JS}"]`
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", reject);
      return;
    }

    const script = document.createElement("script");
    script.src = TIMEKIT_JS;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

function BookingPage() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    if (!document.getElementById("timekit-booking-css")) {
      const link = document.createElement("link");
      link.id = "timekit-booking-css";
      link.rel = "stylesheet";
      link.href = TIMEKIT_CSS;
      document.head.appendChild(link);
    }

    loadTimekitScript()
      .then(() => {
        if (cancelled || !widgetRef.current || !window.TimekitBooking) return;
        widgetRef.current.innerHTML = "";
        new window.TimekitBooking().init({
          el: "#timekit-booking",
          project_slug: TIMEKIT_PROJECT_SLUG,
        });
      })
      .catch((error) => {
        console.error("Failed to load Timekit booking widget:", error);
      });

    return () => {
      cancelled = true;
      if (widgetRef.current) widgetRef.current.innerHTML = "";
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#FAFBFF] relative overflow-hidden flex flex-col items-center">
      
      {/* --- BACKGROUND DECOR --- */}
      {/* Large faint logo watermark */}
      <img 
        src={logo} 
        alt="" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] opacity-[0.03] pointer-events-none select-none"
      />
      
      {/* Subtle Gradient Blobs for depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#8B5CF6]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-[#8B5CF6]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* --- CONTENT CONTAINER --- */}
      <div className="relative z-10 w-full max-w-[1280px] px-6 py-20 flex flex-col items-center">

        {/* --- TIMEKIT WRAPPER --- */}
        <div 
          className="w-full max-w-5xl overflow-hidden"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <div className="">
            <div className="text-center" data-aos="fade-down">
          
          <h1 className="font-fraktur text-5xl md:text-7xl leading-tight">
            Let's Discuss <span className="text-[#8B5CF6] font-semibold">Your Vision.</span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-light">
            Select a time that works best for you. Our experts are ready to help you 
            turn complex challenges into simple digital solutions.
          </p>
        </div>
             {/* Timekit booking widget mounts here */}
             <div id="timekit-booking" ref={widgetRef} className="w-full min-h-[700px]" />
          </div>
        </div>

        {/* --- ALTERNATIVE CTA --- */}
        <div className="text-center space-y-6" data-aos="fade-up" data-aos-delay="400">
          <div className="h-[1px] w-20 bg-green-300 mx-auto"></div>
          <p className="text-green-500 font-light">
            Prefer a different way to connect? 
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <a 
              href="mailto:support@example.com" 
              className="text-[#242424] font-semibold hover:text-[#8B5CF6] transition-colors flex items-center gap-2"
            >
              Email us directly →
            </a>
            <span className="hidden md:block text-gray-300">|</span>
            <button className="text-[#242424] font-semibold hover:text-[#8B5CF6] transition-colors">
              Chat on Messenger
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default BookingPage;
