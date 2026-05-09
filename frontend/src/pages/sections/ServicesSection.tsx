import HighlightedText from "@/types/components/SuperHeader";
import ServicesCards from "../../components/cards/ServicesCards";
import '../../styles/ServicesSection.css'
import { usePageContent } from "@/data/usePageContent";
import { useState } from "react";

type Services = {
  item: any,
  index: number
  map: any
}


function ServicesSection() {

  const [ contents  ] = useState(usePageContent.data[0].servicesSection)
  const [ services  ] = useState<Services>(usePageContent.data[0].servicesSection.services)


  return (
    <section 
      id="service-section" 
      className="w-full py-24 px-6 bg-white flex flex-col items-center overflow-hidden"
    >
      {/* Header Section */}
      <div className="text-center max-w-4xl mb-16 space-y-4">
        <HighlightedText text={contents.header} />
      
        <p 
          className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-light"
          data-aos="fade-down"
          data-aos-delay="200"
        >
          {
            contents.subHeader  
          }
        </p>
      </div>

      {/* Cards Container */}
      <div 
        className="w-full md:w-[70%] max-w-7xl overflow-x-auto no-scrollbar pb-8"
      >
        <div className="
  flex 
  justify-start
  md:justify-center 
  items-center 
  md:grid 
  md:grid-cols-3 
  md:justify-items-center 
  gap-8 
  min-w-full 
  md:min-w-0 
  px-4
">
  {services.map((item: any, index: number) => (
    <div 
      key={index} 
      className="w-[300px] md:w-full max-w-[350px] flex justify-center"
      data-aos="fade-up"
      data-aos-delay={index * 150}
    >
      <ServicesCards 
        serviceName={item.serviceName} 
        desc={item.desc} 
        image={item.image} 
      />
    </div>
  ))}
</div>
      </div>

      {/* Mobile Swipe Indicator */}
      <div className="md:hidden flex items-center gap-2 text-gray-400 animate-pulse mt-4">
        <span className="text-xs font-medium uppercase tracking-widest">Swipe to explore</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>

    </section>
  );
}

export default ServicesSection;