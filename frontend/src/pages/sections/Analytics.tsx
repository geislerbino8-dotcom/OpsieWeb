import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import AnalyticsCards from "../../components/cards/AnalyticsCards";
import OpsieLogo from "../../assets/icons/opsie_logo_only.png";
import LineImg from "../../assets/background-images/LineBG.png";

function Analytics() {

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <section className="relative w-full flex flex-col items-center py-16 px-4 overflow-hidden"
      style={{
        backgroundColor: '#015c7dc8',
        backgroundImage: `url(${LineImg})`,
          backgroundSize: "200% 200%",
          backgroundBlendMode: 'darken'
      }}
    >

      {/* Animated Background */}
 
      {/* Analytics Content */}
      <div className="relative z-10 flex flex-col items-center gap-12 w-full max-w-6xl">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4">

          <div data-aos="zoom-in">
            <img src={OpsieLogo} alt="Opsie Logo" className="w-20 h-20" />
          </div>

          <h1
            className="text-3xl md:text-4xl font-bold text-white"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Our <span className="text-[#9ef7ff]">Numbers</span> by Experience
          </h1>

          <p
            className="text-gray-200 max-w-xl"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quibusdam accusamus fugit quod alias consequatur non quisquam.
          </p>

        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-2 grid-rows-2 gap-6 w-full max-w-3xl">

          <div data-aos="flip-up" data-aos-delay="100">
            <AnalyticsCards numbers="2456" desc="HAPPY CLIENTS" />
          </div>

          <div data-aos="flip-up" data-aos-delay="200">
            <AnalyticsCards numbers="300" desc="COMPANIES" />
          </div>

          <div data-aos="flip-up" data-aos-delay="300">
            <AnalyticsCards numbers="1432" desc="PROJECTS DONE" />
          </div>

          <div data-aos="flip-up" data-aos-delay="400">
            <AnalyticsCards numbers="100" desc="CONSULTANTS" />
          </div>

        </div>

      </div>

    </section>
  );
}

export default Analytics;