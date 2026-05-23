import HighlightedText from "@/types/components/SuperHeader";
import ServicesCards from "../../components/cards/ServicesCards";
import '../../styles/ServicesSection.css'
import { useContext  } from "react";
import { ContentContext } from "@/App";

function ServicesSection() {

  const  content  = useContext(ContentContext)
  


  return (
    <section 
      id="service-section" 
      className="w-full py-24 px-6 bg-white flex flex-col items-center overflow-hidden"
    >
      {/* Header Section */}
      <div className="text-center max-w-4xl mb-16 space-y-4">
        <HighlightedText text={content?.servicesSection.header} />
      
        <p 
          className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-light"
          data-aos="fade-down"
          data-aos-delay="200"
        >
          {
            content?.servicesSection.subHeader 
          }
        </p>
      </div>

      {/* Cards Container */}
      <div className="w-full max-w-7xl mx-auto p-0 md:px-4 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-0 auto-rows-fr justify-items-center">
    {content?.servicesSection?.services.map((item: any, index: number) => (
      <div 
        key={index} 
        className="w-full max-w-[360px] md:max-w-full flex h-full transition-all duration-300 hover:-translate-y-1"
        data-aos="fade-up"
        data-aos-delay={index * 100}
      >
        {/* Card Component Wrapper */}
        <div className="w-full h-full bg-white rounded-2xl p-1 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
          <ServicesCards 
            serviceName={item.serviceName} 
            desc={item.desc} 
            image={item.image} 
          />
        </div>
      </div>
    ))}
  </div>
</div>


    </section>
  );
}

export default ServicesSection;