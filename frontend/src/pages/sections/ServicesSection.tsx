import React from "react";
import TopSectionCard from "../../components/cards/TopSectionCard";
import ServicesCards from "../../components/cards/ServicesCards";
import webdev from "../../assets/card-bg/webdev.png";

function ServicesSection() {
  return (
    <section className="w-full h-full flex flex-col items-center py-16 px-4">

      {/* Top Section Title */}
      <div className="mb-8">
        <TopSectionCard secName="What We Do" />
      </div>

      {/* Heading and Description */}
      <div className="text-center mb-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Opsie's <span className="text-indigo-600">Services</span> with Excellence
        </h1>
        <p className="text-gray-600 text-base md:text-lg">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, eveniet?
        </p>
      </div>

      

      {/* Services Cards */}
      <div className="w-full max-w-6xl h-full max-h-6xl overflow-x-auto overflow-y-visible">
        <div className="flex gap-6 pb-4">
          <ServicesCards serviceName="Web Development" desc="Lorem*2" image={webdev} />
          <ServicesCards serviceName="Web Development" desc="Lorem*2" image={webdev} />
          <ServicesCards serviceName="Web Development" desc="Lorem*2" image={webdev} />
        </div>
        <h3 className="text-gray-500 mt-2 text-right mr-4 italic text-sm md:text-base">swipe →</h3>
      </div>

    </section>
  );
}

export default ServicesSection;