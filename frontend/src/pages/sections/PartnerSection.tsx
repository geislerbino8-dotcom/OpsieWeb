import LogoLoop from "../../components/LogoLoop";

const imageLogos = [
  { src: "/logo/Frame.svg", alt: "Company 1" },
  { src: "/logo/Frame-1.svg", alt: "Company 2" },
  { src: "/logo/Frame-2.svg", alt: "Company 3" },
  { src: "/logo/Frame-4.svg", alt: "Company 4" },
  { src: "/logo/Frame-3.svg", alt: "Company 5" },
];

function PartnerSection() {
  return (
    <section className="w-full flex flex-col items-center py-24 px-6 bg-white overflow-hidden">
      
      {/* Header */}
      <div className="text-center mb-16 max-w-3xl space-y-4">
        <span 
          className="text-[#3CBDE6] font-bold tracking-[0.2em] uppercase text-xs"
          data-aos="fade-down"
        >
          Trusted Worldwide
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900" data-aos="fade-down" data-aos-delay="100">
          Our <span className="text-[#3CBDE6]">Partners</span> & <span className="text-[#3CBDE6]">Clients</span>
        </h1>
        <p className="text-gray-500 text-lg font-light leading-relaxed" data-aos="fade-down" data-aos-delay="200">
          We collaborate with forward-thinking organizations to build the digital infrastructure of tomorrow.
        </p>
      </div>

      {/* Partners Loop Container */}
      <div className="w-full max-w-7xl mb-16" data-aos="fade-up" data-aos-delay="300">
        <div className="bg-gray-50/50 py-12 rounded-[2rem] border border-gray-100/50">
          <LogoLoop
            logos={imageLogos}
            speed={40} // Slower speed is often more elegant for logo loops
            direction="left"
            logoHeight={50}
            gap={80}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#ffffff"
            ariaLabel="Technology partners"
          />
        </div>
      </div>

      {/* Description / Content Section */}
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-10 md:gap-16 text-gray-600 leading-relaxed text-lg font-light">
        <div data-aos="fade-right" data-aos-delay="400">
          <p>
            At <span className="font-semibold text-gray-900">Opsie</span>, we believe that innovation thrives through collaboration. 
            By partnering with industry leaders, we ensure our solutions are always at the cutting edge 
            of performance and security.
          </p>
        </div>
        <div data-aos="fade-left" data-aos-delay="500">
          <p>
            Our clients range from disruptive startups to established enterprises. Regardless of scale, 
            our goal remains the same: to provide the high-octane digital tools necessary to dominate 
            modern markets.
          </p>
        </div>
      </div>

    </section>
  );
}

export default PartnerSection;