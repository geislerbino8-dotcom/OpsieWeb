import { Button } from "../components/Button/Button";
import { Card }  from "../components/Card/ServicesCard/Card";
import FAQAccordion from "../components/FaqSection/Faq";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { SiFacebook, SiInstagram, SiLinkedin, SiGmail } from "react-icons/si";
import Header from "../components/Header";
import SectionHeader from "../components/SectionHeader";



export default function WhatWeDo() {

  const navigate = useNavigate();
    return (
      <div className="w-full">
  <Header />

  {/* HERO SECTION */}
  <div className="w-full px-2">
  <div className="relative w-full  ">
    <div className="relative h-[85vh] md:min-h-[600px] rounded-4xl overflow-hidden mb-10 ">
      <img
        src="/WhatWeDo-Hero2.svg"
        alt="Hero Image"
        className="absolute inset-0 w-full h-full object-cover"
      />
          {/* Content on top of image */}
          <div className="relative z-10 flex flex-col items-center justify-end min-h-screen px-4 text-white">
            <div className="mb-40 flex flex-col items-center justify-center">
              <h1 className="font-poppins text-[40px] md:text-6xl leading-[40px] font-light text-center">
              Code with Purpose. Solutions with Impact.
              </h1>
              <p className="font-poppins mt-4 text-[16px] md:text-xl font-light text-center max-w-2xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              </p>
              <Button
                label="Learn More"
                variant="secondary"
                icon={<img src="/ICONS/contact-us.svg" className="w-10 h-10 p-3 bg-[#3CBDE6] rounded-full" />}
                iconPosition="right"
                className="font-poppins font-light my-4 text-xl w-[200px] gap-4"
                weight="light"
                onClick={() => navigate("/whatWeDo")}
              />
            </div>
            
          </div>
          <div className="absolute inline-block right-1/5 bottom-[-20px] md:right-16 md:bottom-0 ">
            <div className="hidden md:flex flex-row gap-4">
            <div className="w-14 h-14 md:w-18 md:h-18 border-1 border-[#3CBDE6] rounded-full object p-1 flex items-center justify-center">
                 <SiFacebook className="text-[#3CBDE6] text-3xl object-cover "/>
                </div>
                <div className="w-14 h-14  md:w-18 md:h-18 border-1 border-[#3CBDE6] rounded-full object p-1 flex items-center justify-center">
                    <SiInstagram className="text-[#3CBDE6] text-3xl object-cover " />
                </div>
                <div className="w-14 h-14  md:w-18 md:h-18 border-1 border-[#3CBDE6] rounded-full object p-1 flex items-center justify-center">
                    <SiLinkedin className="text-[#3CBDE6] text-3xl object-cover " />
                </div>
                <div className="w-14 h-14  md:w-18 md:h-18 border-1 border-[#3CBDE6] rounded-full object p-1 flex items-center justify-center">
                 <SiGmail className="text-[#3CBDE6] text-3xl object-cover " />
            </div>
            </div>
  </div>
  <div className="flex md:hidden flex-row gap-4">
        <div className="w-14 h-14 md:w-18 md:h-18 border-1 border-[#3CBDE6] rounded-full object p-1 flex items-center justify-center">
                 <SiFacebook className="text-[#3CBDE6] text-3xl object-cover "/>
                </div>
                <div className="w-14 h-14  md:w-18 md:h-18 border-1 border-[#3CBDE6] rounded-full object p-1 flex items-center justify-center">
                    <SiInstagram className="text-[#3CBDE6] text-3xl object-cover " />
                </div>
                <div className="w-14 h-14  md:w-18 md:h-18 border-1 border-[#3CBDE6] rounded-full object p-1 flex items-center justify-center">
                    <SiLinkedin className="text-[#3CBDE6] text-3xl object-cover " />
                </div>
                <div className="w-14 h-14  md:w-18 md:h-18 border-1 border-[#3CBDE6] rounded-full object p-1 flex items-center justify-center">
                 <SiGmail className="text-[#3CBDE6] text-3xl object-cover " />
        </div>
    </div>
          
        </div>
        
        <div className="flex flex-col items-center justify-center md:flex-row gap-2 md:gap-16">
        <div className="flex flex-col md:flex-row items-center justify-center w-full gap-0 md:gap-0  lg:mt-10">
        <div className="flex flex-col items-center md:items-start justify-center md:w-1/2 gap-6 md:gap-10 px-2 md:mt-8">
            <h1 className="w-full md:w-[410px] lg:w-[600px] font-poppins text-center md:text-left leading-[34px] text-[36px] md:text-[42px] lg:text-[60px] md:leading-[50px] lg:leading-[65px]">
                We Believe in <span className="text-[#3CBDE6] font-semibold">Result </span>
                Driven by <br />
                <span className="font-playfair italic text-[#3CBDE6] font-semibold">Smart Technology</span>
            </h1>
            <p className="w-full md:w-[350px] lg:w-[450px] font-poppins text-center md:text-left text-[16px] sm:text-[18px] md:text-[20px] leading-[18px] font-light">
                At <span className="text-[#3CBDE6] font-semibold">Opsie</span>, we believe that real business growth is rooted in strategy, insight, and execution.
            </p>
            <Button
                label="Get Started"
                icon={<img src="/ICONS/get-started-arrow.svg" className="w-6 h-6" />}
                iconPosition="right"
                className="bg-[#3CBDE6] flex items-center justify-center text-white gap-2 text-lg px-3 w-[200px]"
                onClick={() => alert("Button clicked!")}
            />
            </div>
            <div className="flex justify-center md:justify-end md:w-1/2 mt-4 md:mt-0 relative">
                <div className="w-full max-w-[500px] sm:max-w-[550px] md:max-w-[570px] lg:max-w-[700px] xl:max-w-[950px] relative  lg:ml-50">
                    <img
                    src="/Results-bg.png"
                    alt="Results Background"
                    className="w-full h-[350px] sm:h-[500px] md:h-[500px] object-contain"
                    />
                    {/* Floating Card */}
                    <div className="absolute top-1/2 -translate-y-1/2 -left-10 sm:-left-20 md:-left-6 z-50">
                    <div className="skew-x-[-16deg] w-[180px] sm:w-[180px] md:w-[250px] bg-white h-[130px] sm:h-[150px] shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] rounded-2xl">
                        <div className="flex flex-col items-center justify-center pt-2 sm:pt-4">
                        <div className="text-[#3CBDE6] text-3xl">★★★★★</div>
                        <div className="flex flex-row -space-x-2 ml-4">
                            <img src="/profiles/prof1.svg" className="w-8 h-8 sm:w-10 sm:h-10" />
                            <img src="/profiles/prof4.svg" className="w-8 h-8 sm:w-10 sm:h-10" />
                            <img src="/profiles/prof3.svg" className="w-8 h-8 sm:w-10 sm:h-10" />
                            <img src="/profiles/prof2.svg" className="w-8 h-8 sm:w-10 sm:h-10" />
                        </div>
                        <h1 className="font-poppins text-2xl font-semibold">
                            <span className="text-gray-400 text-3xl">★</span> 4.8
                            <span className="text-sm font-light"> [Rating]</span>
                        </h1>
                        </div>
                    </div>
                    </div>

</div>

          </div>
          </div>
          
            </div>
            <div className="flex items-center justify-center flex-col justify-between mt-4">
                    <div className="w-full min-w-[400px] px-2 h-[1px] bg-[#B3B3B3] ">
                    </div>
                    <div className="flex flex-row  gap-2 mt-4 lg:mt-10  m-2">
                        <div className="flex flex-row  items-center ">
                            <div className="flex flex-col  mx-4 sm:mx-6 md:mx-8 lg:mx-10 ">
                            <h1 className="font-poppins text-[45px] sm:text-[70px] md:text-[80px] lg:text-[90px] font-bold  lg:leading-16">20+</h1>
                            <p className="font-poppins text-[12px] sm:text[16px] md:text-[18px] lg:text-[20px]">Satisfied Clients</p>
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-center">
                            <div className="h-[85px] bg-[#B3B3B3] w-[2px]"></div>
                            <div className="flex flex-col  mx-4 sm:mx-6 md:mx-8 lg:mx-10 ">
                                <h1  className="font-poppins text-[45px] sm:text-[70px] md:text-[80px] font-bold lg:text-[90px]  lg:leading-16" >100%</h1>
                                <p  className="font-poppins text-[12px] sm:text[16px] md:text-[18px] lg:text-[20px]">Commitment to Quality</p>
                            </div>
                            
                        </div>
                        <div className="flex flex-row  items-center justify-center">
                            <div className="h-[85px] bg-[#B3B3B3] w-[2px] "></div>
                            <div className="flex flex-col mx-4 sm:mx-6  md:mx-8 lg:mx-10 ">
                                <h1  className="font-poppins text-[45px] sm:text-[70px] md:text-[80px] font-bold lg:text-[90px]  lg:leading-16" >10+</h1>
                                <p className="font-poppins text-[12px] sm:text[16px] md:text-[18px] lg:text-[20px]">Projects Delivered</p>
                            </div>
                        </div>
                    </div>
                </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6 px-2 flex items-center justify-center font-poppins">
                
            <div 
            className="mt-6"
                >
                <SectionHeader
                    badgeText="Our Story"
                    icon="/ICONS/text-white-icon.svg"
                    />
                </div>
                
            </div>
            <div className="flex flex-col lg:flex-row ">
            <div className="flex flex-col items-center gap-6 md:gap-10 px-2">
                <h1 className="w-full md:w-[410px] lg:w-[600px] font-poppins text-center lg:text-left leading-[34px] text-[36px] md:text-[42px] lg:text-[60px] md:leading-[50px] lg:leading-[65px]">Every Line of  <span className="text-[#3CBDE6] font-semibold">Code</span> Tells <span className="font-playfair italic text-[#3CBDE6] font-semibold">Our Story.</span></h1>
                <p className="w-full lg:w-[600px] font-poppins text-center lg:text-left text-[14px] sm:text-[18px]  leading-[16px] font-light">Founded with a vision to make technology meaningful, our journey began with a single idea. Today, every project we create reflects our commitment to innovation, collaboration, and creating solutions that truly make a difference. This is our story—and it’s just getting started.</p>
            </div>
            <div className="flex flex-col gap-6 items-center mr-34 sm:mr-20 md:mr-30 mt-6 sm:mt-8 md:mt-8 lg:mt-0">
            <div className="relative w-full max-w-[230px] sm:max-w-[330px] md:w-[330px] lg:w-[500px] overflow-visible">

                <img
                    src="/Results-bg.png"
                    alt=""
                    className="w-full h-auto"
                />

                {/* Floating Card */}
                <div className="absolute top-1/2 -translate-y-1/2 -right-[140px] sm:-right-[180px] md:-right-[180px] z-50 ">
                <div className="flex flex-col gap-1 ml-16 sm:ml-24 md:ml-24">
                        {["Humble Beginnings", "Proven Progress", "Dreamed It. Built It."].map((item) => (
                        <div key={item} className="flex items-center gap-1">
                            <img src="/ICONS/check.svg" className="w-4 h-4 shrink-0" />
                            <span className="font-poppins text-[12px] sm:text-[16px]  font-light">{item}</span>
                        </div>
                        ))}
                    </div>

                    {/* Overlapping image */}
                    <div className="my-2 bg-[#ECEDF1] w-[200px] sm:w-[270px] h-[140px] sm:h-[160px] shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] flex items-center justify-center rounded-2xl">
                        <img src="/Results-bg.png" alt="" className="w-[180px] sm:w-[250px] h-[120px] sm:h-[140px] object-cover rounded-2xl" />
                    </div>

                    {/* Bottom Checkmarks */}
                    <div className="flex flex-col gap-1 ml-16    sm:ml-24">
                        {["Proven Progress", "Driven by Code", "Powered by Vision"].map((item) => (
                        <div key={item} className="flex items-center gap-1">
                            <img src="/ICONS/check.svg" className="w-4 h-4 shrink-0" />
                            <span className="font-poppins text-[12px] sm:text-[16px] font-light">{item}</span>
                        </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
            
  
          
       </div>
       <div className="flex flex-col gap-8 mt-8">
                <div className="flex flex-col gap-2 px-2 flex items-center justify-center font-poppins">
                    <div
                        className="w-[160px] list-none py-2 flex items-center justify-center gap-2"
                        style={{
                            backgroundColor: "rgb(240, 242, 245)",
                            borderRadius: "50px",
                            boxShadow:
                            "rgba(60, 189, 230, 0.25) 2px 3px 4px 0px inset , rgba(250, 251, 255, 1) -2px -2px 4px 0px inset",
                        }}
                            >
                            <img src="/ICONS/our-story-icon.svg" alt="" />
                            <p className="text-md">Our Vision</p>
                        </div>
                            <h1 className="font-poppins text-center leading-[34px] text-[36px]">The <span className="text-[#3CBDE6] font-semibold">Vision</span></h1>
                            <p className="font-poppins text-center text-[16px] leading-[15px] font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                        </div>
                </div>
                <div className="flex items-center justify-center">
                <div className="grid grid-cols-[180px_180px] gap-6">

                    {/* Left Tall Card */}
                    <div className="row-span-2">
                    <Card className="bg-[#ECEDF1] w-[180px] h-[365px]" />
                    </div>

                    {/* Right Top Small */}
                    <Card className="bg-[#ECEDF1] w-[180px] h-[170px]" />

                    {/* Right Bottom Small */}
                    <Card className="bg-[#ECEDF1] w-[180px] h-[170px]" />

                    {/* Full Width Card 1 */}
                    <div className="col-span-2">
                    <Card className="bg-[#ECEDF1] w-[380px] h-[180px]" />
                    </div>

                    {/* Full Width Card 2 */}
                    <div className="col-span-2">
                    <Card className="bg-[#ECEDF1] w-[380px] h-[180px]" />
                    </div>

                </div>
                </div>
                <div className="flex flex-col gap-8 mt-8">
                <div className="flex flex-col gap-2 px-2 flex items-center justify-center font-poppins">
                    <div
                        className="w-[160px] list-none py-2 flex items-center justify-center gap-2"
                        style={{
                            backgroundColor: "rgb(240, 242, 245)",
                            borderRadius: "50px",
                            boxShadow:
                            "rgba(60, 189, 230, 0.25) 2px 3px 4px 0px inset , rgba(250, 251, 255, 1) -2px -2px 4px 0px inset",
                        }}
                            >
                            <img src="/ICONS/our-story-icon.svg" alt="" />
                            <p className="text-md">Our Vision</p>
                        </div>
                            <h1 className="font-poppins text-center leading-[34px] text-[36px]">The <span className="text-[#3CBDE6] font-semibold">Mission</span></h1>
                            <p className="font-poppins text-center text-[16px] leading-[15px] font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                        </div>
                </div>
                <div className="flex items-center justify-center">
                <div className="grid grid-cols-[180px_180px] gap-6">

                    {/* Left Tall Card */}
                    

                    {/* Right Top Small */}
                    <Card className="bg-[#ECEDF1] w-[180px] h-[170px]" />
                    <div className="row-span-2">
                    <Card className="bg-[#ECEDF1] w-[180px] h-[365px]" />
                    </div>

                    {/* Right Bottom Small */}
                    <Card className="bg-[#ECEDF1] w-[180px] h-[170px]" />

                    {/* Full Width Card 1 */}
                    <div className="col-span-2">
                    <Card className="bg-[#ECEDF1] w-[380px] h-[180px]" />
                    </div>

                    {/* Full Width Card 2 */}
                    <div className="col-span-2">
                    <Card className="bg-[#ECEDF1] w-[380px] h-[180px]" />
                    </div>

                </div>
                </div>
                <div className="flex flex-col gap-8 mt-8">
                <div className="flex flex-col gap-2 px-2 flex items-center justify-center font-poppins">
                    <div
                        className="w-[160px] list-none py-2 flex items-center justify-center gap-2"
                        style={{
                            backgroundColor: "rgb(240, 242, 245)",
                            borderRadius: "50px",
                            boxShadow:
                            "rgba(60, 189, 230, 0.25) 2px 3px 4px 0px inset , rgba(250, 251, 255, 1) -2px -2px 4px 0px inset",
                        }}
                            >
                            <img src="/ICONS/our-story-icon.svg" alt="" />
                            <p className="text-md">Our Location</p>
                        </div>
                            <h1 className="font-poppins text-center leading-[34px] text-[36px]">Visit <span className="text-[#3CBDE6] font-semibold">Us</span> <br />Let’s Talk <span className="text-[#3CBDE6] font-semibold">Innovation</span></h1>
                            <p className="font-poppins text-center text-[16px] leading-[15px] font-light">Our doors are open for clients and partners who are ready to innovate. Drop by our location and start the conversation that turns ideas into real solutions. </p>
                        </div>
                        <div className="flex items-center justify-center mx-2">
                            <Card 
                            title="Map"
                            className="w-[375px] h-[340px]"/>
                        </div>
                        
                </div>
            </div>
            <div className="flex items-center justify-center mt-8">
                <FAQAccordion />
            </div>
       </div>
    </div>
</div>
        
      );

}