import { Button } from "../components/Button/Button";
import ServicesSection from "../components/sections/ServicesSections";
import ClientCard from "../components/sections/ClientReviewsSection";
import LogoLoop from "../components/PartnersLogo/PartnersLogoLoop";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from "react-icons/si";
import FAQAccordion from "../components/FaqSection/Faq"
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SectionHeader from "../components/SectionHeader";
import WhyChooseUs from "../components/sections/WhyChooseUs";

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

// Alternative with image sources
const imageLogos = [
  { src: "/logos/company1.png", alt: "Company 1", href: "https://company1.com" },
  { src: "/logos/company2.png", alt: "Company 2", href: "https://company2.com" },
  { src: "/logos/company3.png", alt: "Company 3", href: "https://company3.com" },
];

export default function WhatWeDo() {

  const navigate = useNavigate();
    return (
      <div className="w-full">
  <Header />

  {/* HERO SECTION */}
  <div className="w-full px-2 h-[6000px] ">
    <div className="relative w-full  ">
      <div className="relative h-[85vh] md:min-h-[600px] rounded-4xl overflow-hidden mb-10 ">
        <img
          src="/WhatWeDo-Hero2.svg"
          alt="Hero Image"
          className="absolute inset-0 w-full h-full object-cover"
        />

      {/* Header overlays the image */}
          {/* Content on top of image */}
          <div className="relative z-10 flex flex-col items-center justify-end md:justify-end  mt-0 md:mt-10 h-full px-4 text-white">
            <div className="mb-24 flex flex-col items-center justify-center md:items-start w-full">
              <h1 className="w-full max-w-[605px] font-poppins text-[40px] leading-[40px] md:text-[60px] md:leading-[60px] text-center md:text-left font-light">
                Code with Purpose. Solutions with Impact.
              </h1>
              <p className="font-poppins mt-4 text-[16px] md:text-xl font-light text-center md:text-left  max-w-2xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              </p>
              <Button
                label="Contact Us"
                variant="secondary"
                icon={<img src="/ICONS/contact-us.svg" className="w-4 h-4" />}
                iconPosition="right"
                className="font-poppins font-light my-4 text-lg"
                weight="light"
                onClick={() => alert("Button Clicked")}
              />
            </div>
          </div>
      </div>
      <div className="flex items-center justify-center md:items-start flex-col gap-4">
          <div
            className="w-[160px] list-none py-2 flex items-center justify-center gap-2"
            style={{
              backgroundColor: "rgb(240, 242, 245)",
              borderRadius: "50px",
              boxShadow:
                "rgba(60, 189, 230, 0.25) 2px 3px 4px 0px inset , rgba(250, 251, 255, 1) -2px -2px 4px 0px inset",
            }}
              >
                <img src="" alt="" />
                <p className="text-[#3CBDE6] font-poppins font-medium">Our Services</p>
          </div>

          <div className="flex flex-col items-center justify-center md:flex-row gap-2 md:gap-16">
             <h1 className="w-full md:w-[532px] md:text-start font-poppins text-center leading-[35px] md:leading-[55px] text-[32px] md:text-[50px]">Building <span className="text-[#3CBDE6] font-semibold">Technology</span> That <span className="text-[#3CBDE6] font-semibold">Works</span> for You</h1>
             <p className="text-center md:text-start w-full md:w-[600px] text-[16px] md:text-[24px] leading-[15px] md:leading-[28px] font-light">We build end-to-end solutions — custom systems, smart integrations, and scalable automation — engineered to transform how businesses operate.</p>
         </div>
     </div>
     <div className="mt-2">
     <ServicesSection />
     </div>
     

     <div className="mt-2 md:mt-20">
        <WhyChooseUs/>
      </div>
      <div className="mt-20 md:mt-20">
      <ClientCard/>
      
      </div>
      
      <div style={{ height: '200px', position: 'relative', overflow: 'hidden', marginTop: '40px' }}>
        {/* Basic horizontal loop */}
        <LogoLoop
          logos={techLogos}
          speed={100}
          direction="left"
          logoHeight={60}
          gap={60}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#ffffff"
          ariaLabel="Technology partners"
        />
      </div>
      <div>
        <FAQAccordion />
      </div>
    </div>
  </div>
</div>
      
    );
  }