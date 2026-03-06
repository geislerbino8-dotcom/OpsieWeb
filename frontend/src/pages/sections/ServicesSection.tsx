import React from "react";
import TopSectionCard from "../../components/cards/TopSectionCard";
import ServicesCards from "../../components/cards/ServicesCards";


const services = [
   {
      serviceName: "Web Development",
      desc: 'Lorem*2',
      image: './src/assets/card-bg/webdev.png'
   },

    {
      serviceName: "Mobile Development",
      desc: 'Lorem*2',
      image: './src/assets/card-bg/mobiledev.png'
   },

    {
      serviceName: "AI Modeling",
      desc: 'Lorem*2',
      image: './src/assets/card-bg/aidev.png'
   },

]


function ServicesSection() {
  return (
    <section className="w-full h-full flex flex-col items-center py-16 px-4">

      <div className="mb-8">
        <TopSectionCard secName="What We Do" />
      </div>

      <div className="text-center mb-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Opsie's <span className="text-indigo-600">Services</span> with Excellence
        </h1>
        <p className="text-g  ray-600 text-base md:text-lg">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, eveniet?
        </p>
      </div>

            <div className="w-full max-w-6xl h-full max-h-6xl overflow-x-auto overflow-y-visible">
        <div className="flex gap-6 pb-4">
          {
            services.map((item)=> (
              <ServicesCards serviceName={item.serviceName} desc={item.desc} image={item.image} />

            ))
          }

        </div>
      </div>
      <div className="flex flex-row w-100 justify-end">
        <h3 className="md:hidden text-gray-500 mt-2 text-right mr-4 italic text-sm md:text-base">swipe →</h3>
      </div>


    </section>
  );
}

export default ServicesSection;