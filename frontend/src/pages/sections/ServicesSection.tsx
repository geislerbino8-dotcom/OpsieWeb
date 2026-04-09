import ServicesCards from "../../components/cards/ServicesCards";
import '../../styles/ServicesSection.css'
import img1 from '../../assets/card-bg/webdev.png'
import img2 from '../../assets/card-bg/mobiledev.png'
import img3 from '../../assets/card-bg/aidev.jpg'

const services = [
  {
    serviceName: "Web Development",
    desc: "Custom, high-performance web applications built with modern frameworks for seamless scalability.",
    image: img1
  },
  {
    serviceName: "Mobile Development",
    desc: "Native and cross-platform mobile solutions designed for intuitive user experiences and speed.",
    image: img2
  },  
  {
    serviceName: "AI Modeling",
    desc: "Implementing intelligent automation and predictive analytics to drive data-driven decision making.",
    image: img3
  },
]

function ServicesSection() {
  return (
    <section 
      id="service-section" 
      className="w-full py-24 px-6 bg-white flex flex-col items-center overflow-hidden"
    >
      {/* Header Section */}
      <div className="text-center max-w-4xl mb-16 space-y-4">
        
        <h1 
          className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
          data-aos="fade-down"
          data-aos-delay="100"
        >
          Opsie's <span className="text-[#3CBDE6]">Services</span> with 
          <span className="font-playfair italic text-[#3CBDE6]"> Excellence</span>
        </h1>
        <p 
          className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-light"
          data-aos="fade-down"
          data-aos-delay="200"
        >
          We provide end-to-end digital transformation through expert engineering and human-centric design.
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
  {services.map((item, index) => (
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