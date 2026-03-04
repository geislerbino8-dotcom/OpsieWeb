import React from "react";
import TopSectionCard from "../../components/cards/TopSectionCard";
import AnalyticsCards from "../../components/cards/AnalyticsCards";
import OpsieLogo from "../../assets/icons/opsie_logo_only.png";

function Analytics() {
  return (
    <section className="w-full flex flex-col items-center py-16 px-4">

      {/* Top Section Title */}
      <div className="mb-8">
        <TopSectionCard secName="Client and Feedback" />
      </div>

      {/* Analytics Content */}
      <div className="flex flex-col items-center gap-12 w-full max-w-6xl">

        {/* Header Section */}
        <div className="flex flex-col items-center text-center gap-4">
          {/* Logo */}
          <div>
            <img src={OpsieLogo} alt="Opsie Logo" className="w-20 h-20" />
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold">
            Our <span className="text-indigo-600">Numbers</span> by Experience
          </h1>

          {/* Description */}
          <p className="text-gray-600 max-w-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, blanditiis.
          </p>
        </div>

        {/* Numbers / Analytics Cards */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 w-full">
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