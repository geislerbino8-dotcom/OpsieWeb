import { Button } from "../components/Button/Button";
import ServicesSection from "../components/sections/ServicesSections";
import ClientCard from "../components/sections/ClientReviewsSection";
import LogoLoop from "../components/PartnersLogo/PartnersLogoLoop";
import FAQAccordion from "../components/FaqSection/Faq"
import WhyChooseUs from "../components/sections/WhyChooseUs";
import { useNavigate } from "react-router-dom";




// Alternative with image sources
const imageLogos = [
  { src: "/logo/Frame.svg", alt: "Company 1",  },
  { src: "/logo/Frame-1.svg", alt: "Company 2",  },
  { src: "/logo/Frame-2.svg", alt: "Company 3",  },
  { src: "/logo/Frame-4.svg", alt: "Company 4",  },
  { src: "/logo/Frame-3.svg", alt: "Company 5",  },
];

export default function WhatWeDo() {

  const Navigate = useNavigate()


    return (
      <div className="max-w-[1280px] mt-21 mx-auto overflow-hidden">

  {/* HERO SECTION */}
  <div className="w-full px-2">
    <div className="relative w-full  ">
    <div data-aos="fade-right" className="relative h-[90vh] lg:h-[85vh] md:min-h-[600px] rounded-4xl overflow-hidden mb-10">
  
    {/* Background Image */}
    <img
      src="/WhoWeAre-Hero.svg"
      alt="Hero Image"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="lg:w-[820px] md:via-black/70 absolute inset-0 bg-gradient-to-t from-black/100 via-black/20 sm:bg-gradient-to-t md:bg-gradient-to-r sm:from-black/100 sm:via-black/20 md:from-black/100  to-transparent"></div>
    {/* Overlay Content */}
    <div>
      
    </div>
    <div  className="hidden md:block absolute md:right-2 md:bottom-4 lg:bottom-4 lg:right-0 mx-auto z-50 ">
      <div data-aos="fade-down"  className="flex flex-col items-start md:flex-row-reverse lg:justify-center leading-4  gap-2 ml-2 ">
          <div className="flex flex-col justify-start items-start md:items-start md:justify-center lg:leading-5">
          
          {/* MD VERSION */}
          <div className="flex flex-col items-center justify-center lg:hidden mt-2 gap-2">
            <div className="text-[#3CBDE6] text-[20px] xl:text-[30px] lg:hidden mt-2  flex items-center justify-center gap-1">
              <span className="text-3xl leading-0 ml-2">★</span> 5/5
            </div>
          </div>

          {/* LG VERSION */}
          <h1 className="hidden lg:block font-poppins font-semibold text-[14px] xl:text-[20px]">
            10+ Satisfied Clients
          </h1>
          <div className="hidden lg:flex flex flex-row gap-2 items-center justify-center ">
            <div className=" text-[#3CBDE6] text-[22px] xl:text-[30px]">
              ★★★★★ 
            </div>
            <h1 className="font-poppins mt-2 xl:text-[20px]">
                5/5
            </h1>
          </div>
        </div>

        <div className="flex flex-row -space-x-3 lg:-space-x-2 xl:-space-x-4 mt-2 lg:mt-0 ">
          <img src="/profiles/Rectangle 780.svg" className="w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-10 lg:h-10 xl:w-14 xl:h-14  object-cover  " />
          <img src="/profiles/Rectangle 816.svg" className="w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-10 lg:h-10 xl:w-14 xl:h-14 rounded-full object-cover " />
          <img src="/profiles/Rectangle 818.svg" className="w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-10 lg:h-10 xl:w-14 xl:h-14 rounded-full object-cover " />
          <img src="/profiles/Rectangle 818-1.svg" className="w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-10 lg:h-10 xl:w-14 xl:h-14 rounded-full md:hidden lg:flex " />
        </div>
      </div>
    </div>
        

      {/* Header overlays the image */}
          {/* Content on top of image */}
          <div className="relative z-10 flex flex-col items-center justify-end md:justify-end  mt-20 md:mt-10 h-full px-4 text-white">
            <div className="mb-24 flex flex-col items-center justify-center md:items-start w-full">
              <h1 data-aos="fade-right" data-aos-once="false" data-aos-mirror="true" data-aos-offset="0"  className="w-full max-w-[605px] font-poppins text-[40px] leading-[38px] md:text-[60px] md:leading-[60px] text-center md:text-left font-light">
                Code with Purpose. Solutions with Impact.
              </h1>
              <p data-aos="fade-right" data-aos-offset="50"  data-aos-delay="300" className="font-poppins mt-4 text-[14px] leading-[14px] md:text-xl md:leading-[24px] font-light text-center md:text-left  max-w-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              </p>
              <div data-aos="fade-right" data-aos-offset="50" data-aos-delay="400">
              <Button
                label="Contact Us"
                variant="secondary"
                icon={<img src="/ICONS/contact-us.svg" className="w-3 h-3" />}
                iconPosition="right"
                className="font-poppins font-light my-4 px-4 text-md "
                weight="light"
                onClick={() => Navigate("/contact-us")} //navigate to contact page
              />
              </div>
              
            </div>
          </div>
          
      </div>
      <div className="flex flex-row justify-center items-center md:items-start md:justify-center md:hidden gap-4 mb-6 sm:mb-10">

          <div className="flex flex-row -space-x-2 mt-2 lg:mt-0">
              <img src="/profiles/Rectangle 780.svg" className="w-12 h-12   object-cover  " />
              <img src="/profiles/Rectangle 816.svg" className="w-12 h-12  rounded-full " />
              <img src="/profiles/Rectangle 818.svg" className="w-12 h-12  rounded-full " />
              <img src="/profiles/Rectangle 818-1.svg" className="w-12 h-12  rounded-full md:hidden lg:flex " />
            </div>

            <div className="flex flex-col leading-4 items-start mt-2">
                <h1 className="flex font-poppins font-semibold text-[16px] xl:text-[20px]">
                10+ Satisfied Clients
                </h1>
              <div className="flex flex-row items-center justify-center gap-2 ">
                  <div className=" text-[#3CBDE6] text-[24px]">
                    ★★★★★ 
                  </div>
                  <h1 className="font-poppins mt-2 text-[18px]">
                      5/5
                  </h1>
              </div>
            </div>

            
          </div>
      <div className="flex flex-col items-center md:items-start gap-6 md:px-[6%]">

        {/* Badge */}
       
        <div  className="flex flex-col md:flex-row lg:justify-between lg:items-start w-full gap-6">

          {/* LEFT SIDE */}
          <h1 data-aos="fade-up" className="lg:w-[48%] text-center md:text-start font-poppins leading-[38px] md:leading-[43px] lg:leading-[60px] text-[32px] md:text-[40px] lg:text-[50px]">
            Building <span className="text-[#3CBDE6] font-semibold"> Technology</span> That
            <span className="text-[#3CBDE6] font-semibold"> Works</span> for You
          </h1>

          {/* RIGHT SIDE */}
          <p data-aos="fade-left" className="lg:w-[45%] text-center md:text-start text-[16px] md:text-[18px] lg::text-[20px] leading-[24px] md:leading-[30px] font-light">
            We build end-to-end solutions — custom systems, smart integrations,
            and scalable automation — engineered to transform how businesses operate.
          </p>

        </div>
       
      
      </div>
      <div className="mt-2 md:px-[6%]">
        <ServicesSection />
        </div>
        <div className="mt-2 md:mt-0 md:px-[6%]">
        <WhyChooseUs/>
      </div>
      <div data-aos="fade-right" className="mt-20 md:mt-20 md:px-[6%]">
      <ClientCard/>
      </div>
      <div style={{ height: '200px', position: 'relative', overflow: 'hidden', marginTop: '40px' }}>
        {/* Basic horizontal loop */}
        <LogoLoop
          logos={imageLogos}
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
      <div className="">
        <FAQAccordion />
      </div>
      </div>
    </div>
</div>
      
    );
  }