import React from "react";
import TopSectionCard from "../../components/cards/TopSectionCard";
import AnalyticsCards from "../../components/cards/AnalyticsCards";
import OpsieLogo from "../../assets/icons/opsie_logo_only.png";
import LineImg from '../../assets/background-images/LineBG.png'

function Analytics() {
  return (
    <section className="w-full flex flex-col items-center py-16 px-4"
      style={{
        background: '#015c7dc8',
        backgroundImage: `url(${LineImg})`,
        backgroundBlendMode: 'darken'
      }}
    >


      {/* Top Section Title */}
      <div className="mb-8">
        <TopSectionCard secName="Client and Feedback" />
      </div>

      {/* Analytics Content */}
      <div className="flex flex-col items-center gap-12 w-full max-w-6xl">

        {/* Header Section */}
        <div className="flex flex-col items-center text-center gap-4">
          <div>
            <img src={OpsieLogo} alt="Opsie Logo" className="w-20 h-20" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Our <span className="text-[#9ef7ff]">Numbers</span> by Experience
          </h1>

          <p className="text-gray-600 max-w-xl text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam accusamus fugit quod alias consequatur non quisquam rerum voluptates laboriosam. Temporibus magni beatae, atque rem quae perferendis cumque cum odio vitae!
          </p>
        </div>

        {/* Numbers / Analytics Cards */}
        <div className="grid grid-cols-2 grid-rows-2 gap-6 mt-8 w-full max-w-3xl">
          <AnalyticsCards numbers="10+" desc="HAPPY CLIENTS" />
          <AnalyticsCards numbers="10+" desc="COMPANIES" />
          <AnalyticsCards numbers="10+" desc="PROJECTS DONE" />
          <AnalyticsCards numbers="10+" desc="CONSULTANTS" />
        </div>

      </div>

    </section>
  );
}

export default Analytics;