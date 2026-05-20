import logoOnly from '../assets/opsie/opsie_logo.png'
import EncourageCard from './cards/EncourageCard';
import { SiFacebook, SiInstagram, SiGmail } from 'react-icons/si';


const Footer = () => {


  return (
    <div className="relative w-full  flex justify-center py-6 md:px-4 px-2 overflow-hidden">

    {/* 🔵 BIG BACKGROUND TEXT */}
      <h1 className="
        absolute w-full left-1/2 -translate-x-1/2 text-center
        font-bold text-gray-300 opacity-40 whitespace-nowrap
        pointer-events-none select-none

        text-[120px] sm:text-[180px] md:text-[260px] lg:text-[380px] xl:text-[500px]
        bottom-[-40px] sm:bottom-[-80px] md:bottom-[-120px] lg:bottom-[-270px]
      ">
        Opsie
      </h1>

      {/* MAIN CARD */}
      <div className="relative w-full max-w-6xl rounded-3xl bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] md:p-10 py-10 px-3 md:mb-30 z-10">

        {/* HEADER */}
        <div className="text-center">
          {
            /**
             * <div className="inline-flex items-center gap-2 bg-[#E6F7FC] text-[#3CBDE6] px-4 py-1 rounded-full text-sm mb-4">
            ⚙️ Our Partnership
          </div>
             */
          }

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
            {
              /**
               * content?.footerSection.subHeader
               */
            }
          </p>
        </div>

        {/* LOGOS ROW */}
        {
          /**
           * <div className="flex justify-center items-center gap-10 opacity-60 mb-10 flex-wrap">
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
           */
        }

        {/* CTA CARD */}
        <div className="mb-10">
          <EncourageCard />
        </div>

        {/* MAIN FOOTER */}
        <div className="flex flex-col md:flex-row gap-12 items-start">

          {/* LEFT SIDE */}
          <div className="w-full flex justify-center align-center md:w-1/3 text-center md:text-left">
            <img src={logoOnly} className="w-70 mx-auto md:mx-0" />
        
          </div>

          {/* RIGHT LINKS */}
          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center w-full">

            <div>
              <h3 className="font-bold text-lg mb-3">Quick Links</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="hover:text-[#3CBDE6] cursor-pointer">
                  <a href="/who-we-are">About Us</a>
                </li>
                <li className="hover:text-[#3CBDE6] cursor-pointer">
                  <a href="/products">Our Products</a>
                </li>
                <li className="hover:text-[#3CBDE6] cursor-pointer">
                  <a href="/contact-us">Contact Us</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-3">Company</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className=" hover:text-[#3CBDE6] cursor-pointer">
                  <a href="/what-we-do">Why Opsie</a>
                </li>
                <li className="hover:text-[#3CBDE6] cursor-pointer">
                  <a href="">Our Team</a>
                </li>
                <li className="hover:text-[#3CBDE6] cursor-pointer">
                  <a href="">FAQ's</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-3">Who We Are</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="hover:text-[#3CBDE6] cursor-pointer">Our Story</li>
                <li className="hover:text-[#3CBDE6] cursor-pointer">Our Mission</li>
                <li className="hover:text-[#3CBDE6] cursor-pointer">Our Vision</li>
              </ul>
            </div>

          </div>
        </div>

        {/* DIVIDER */}
        <hr className="my-8 border-gray-200" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-sm text-gray-500 text-center md:text-left`">
            © {new Date().getFullYear()} <span><a href="/">Opsie Software Solutions. </a></span>All Rights Reserved
          </p>

          {/* SOCIALS */}
          <div className="flex gap-3">
            
            <div
              className="group w-10 h-10 p-2 flex items-center justify-center rounded-full bg-white hover:bg-[#3CBDE6] hover:text-white transition cursor-pointer shadow-[0_10px_40px_rgba(0,0,0,0.20)]">
                <SiFacebook className="group-hover:text-white text-gray-400 text-3xl object-cover  md:w-4 md:h-4 lg:w-8 lg:h-8 "/>
            </div>
            <div
              className="group w-10 h-10 p-2 flex items-center justify-center rounded-full bg-white hover:bg-[#3CBDE6] hover:text-white transition cursor-pointer shadow-[0_10px_40px_rgba(0,0,0,0.20)]">
                <SiInstagram className="group-hover:text-white text-gray-400 text-3xl object-cover  md:w-4 md:h-4 lg:w-8 lg:h-8 "/>
            </div>
            <div
              className="group w-10 h-10 p-2 flex items-center justify-center rounded-full bg-white hover:bg-[#3CBDE6] hover:text-white transition cursor-pointer shadow-[0_10px_40px_rgba(0,0,0,0.20)]">
                <SiGmail className="group-hover:text-white text-gray-400 text-3xl object-cover  md:w-4 md:h-4 lg:w-8 lg:h-8 "/>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Footer;