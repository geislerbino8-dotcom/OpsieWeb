import { useState, useEffect } from "react";
import { InlineWidget } from "react-calendly";
import { Moon, Sun } from "lucide-react";
import logo from "../assets/icons/opsie_logo_only.png";

function BookingPage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen w-full relative overflow-hidden flex flex-col items-center transition-colors duration-500 ${
        darkMode ? "bg-[#0A0F1D]" : "bg-[#FAFBFF]"
      }`}
    >
      {/* --- BACKGROUND DECOR --- */}
      <img
        src={logo}
        alt=""
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] opacity-[0.03] pointer-events-none select-none"
      />

      {/* Subtle Gradient Blobs for depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#3CBDE6]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-[#3CBDE6]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* --- CONTENT CONTAINER --- */}
      <div className="relative z-10 w-full max-w-[1280px] px-6 py-20 flex flex-col items-center">
        {/* --- CALENDLY WRAPPER --- */}
        <div
          className="w-full max-w-5xl overflow-hidden"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <div className="">
            <div className="text-center" data-aos="fade-down">
              <h1
                className={`text-4xl md:text-6xl font-poppins leading-tight transition-colors duration-500 ${
                  darkMode ? "text-white" : "text-[#242424]"
                }`}
              >
                Let&apos;s Discuss{" "}
                <span className="text-[#3CBDE6] font-semibold">Your Vision.</span>
              </h1>
              <p
                className={`text-lg md:text-xl max-w-2xl mx-auto font-light transition-colors duration-500 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Select a time that works best for you. Our experts are ready to help
                you turn complex challenges into simple digital solutions.
              </p>
            </div>
            <InlineWidget
              url="https://calendly.com/inquiry-opsiesoftwaresolutions/30min"
              styles={{ height: "700px", width: "100%", margin: 0, padding: 0 }}
              pageSettings={{
                backgroundColor: darkMode ? "0A0F1D" : "ffffff",
                hideEventTypeDetails: false,
                hideLandingPageDetails: false,
                primaryColor: "3cbde6",
                textColor: darkMode ? "ffffff" : "242424",
              }}
              prefill={{
                name: "Juan Dela Cruz",
                email: "juanD@example.com",
              }}
            />
          </div>
        </div>

        {/* --- ALTERNATIVE CTA --- */}
        <div
          className="text-center space-y-6"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <div
            className={`h-[1px] w-20 mx-auto transition-colors duration-500 ${
              darkMode ? "bg-gray-700" : "bg-green-300"
            }`}
          ></div>
          <p
            className={`font-light transition-colors duration-500 ${
              darkMode ? "text-gray-400" : "text-green-500"
            }`}
          >
            Prefer a different way to connect?
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:support@example.com"
              className={`font-semibold transition-colors flex items-center gap-2 ${
                darkMode
                  ? "text-gray-300 hover:text-[#3CBDE6]"
                  : "text-[#242424] hover:text-[#3CBDE6]"
              }`}
            >
              Email us directly →
            </a>
            <span
              className={`hidden md:block transition-colors duration-500 ${
                darkMode ? "text-gray-700" : "text-gray-300"
              }`}
            >
              |
            </span>
            <button
              className={`font-semibold transition-colors ${
                darkMode
                  ? "text-gray-300 hover:text-[#3CBDE6]"
                  : "text-[#242424] hover:text-[#3CBDE6]"
              }`}
            >
              Chat on Messenger
            </button>
          </div>

          {/* --- DARK MODE TOGGLE --- */}
          <div className="pt-4">
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-semibold transition-all duration-300 ${
                darkMode
                  ? "bg-[#1E293B] border-gray-700 text-gray-300 hover:bg-[#334155] hover:text-white"
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-[#3CBDE6] hover:border-[#3CBDE6]/30"
              }`}
            >
              {darkMode ? (
                <>
                  <Sun className="w-4 h-4" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4" />
                  Dark Mode
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;