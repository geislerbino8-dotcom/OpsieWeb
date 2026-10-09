import { Link } from "react-router-dom";
import logoOnly from "../assets/opsie/opsie_logo.png";
import EncourageCard from "./cards/EncourageCard";
import { SiFacebook, SiInstagram, SiGmail } from "react-icons/si";


const Footer = () => {


  return (
    <footer className="relative w-full  flex justify-center py-6 md:px-4 px-2 overflow-hidden">

    {/* 🔵 BIG BACKGROUND TEXT */}
      <span aria-hidden="true" className="
        absolute w-full left-1/2 -translate-x-1/2 text-center
        font-bold text-gray-300 opacity-40 whitespace-nowrap
        pointer-events-none select-none

        text-[120px] sm:text-[180px] md:text-[260px] lg:text-[380px] xl:text-[500px]
        bottom-[-40px] sm:bottom-[-80px] md:bottom-[-120px] lg:bottom-[-270px]
      ">
        Opsie
      </span>

      {/* MAIN CARD */}
      <div className="relative w-full max-w-6xl rounded-3xl bg-[#0a0a0a] md:p-10 py-10 px-3 md:mb-30 z-10 border border-[#8B5CF6]/25 card-side-glow">

        {/* HEADER */}
        <div className="text-center">
          {
            /**
             * <div className="inline-flex items-center gap-2 bg-[#E6F7FC] text-[#8B5CF6] px-4 py-1 rounded-full text-sm mb-4">
            ⚙️ Our Partnership
          </div>
             */
          }

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
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
            <img src={logoOnly} alt="Opsie Software Solutions" className="w-70 mx-auto md:mx-0" />
        
          </div>

          {/* RIGHT LINKS */}
          <nav aria-label="Footer navigation" className="md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center w-full">

            <div>
              <h3 className="font-bold text-lg mb-3 text-white">Quick Links</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="hover:text-[#8B5CF6] cursor-pointer">
                  <Link to="/who-we-are">About Us</Link>
                </li>
                <li className="hover:text-[#8B5CF6] cursor-pointer">
                  <Link to="/products">Our Products</Link>
                </li>
                <li className="hover:text-[#8B5CF6] cursor-pointer">
                  <Link to="/contact-us">Contact Us</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-3 text-white">Company</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="hover:text-[#8B5CF6] cursor-pointer">
                  <Link to="/what-we-do">Why Opsie</Link>
                </li>
                <li className="hover:text-[#8B5CF6] cursor-pointer">
                  <Link to="/who-we-are">Our Team</Link>
                </li>
                <li className="hover:text-[#8B5CF6] cursor-pointer">
                  <Link to="/who-we-are">FAQ's</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-3 text-white">Who We Are</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="hover:text-[#8B5CF6] cursor-pointer"><Link to="/who-we-are">Our Story</Link></li>
                <li className="hover:text-[#8B5CF6] cursor-pointer"><Link to="/who-we-are">Our Mission</Link></li>
                <li className="hover:text-[#8B5CF6] cursor-pointer"><Link to="/who-we-are">Our Vision</Link></li>
              </ul>
            </div>

          </nav>
        </div>

        {/* DIVIDER */}
        <hr className="my-8 border-gray-700" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-sm text-gray-400 text-center md:text-left">
            &copy; {new Date().getFullYear()} <Link to="/">Opsie Software Solutions.</Link> All Rights Reserved
          </p>

          {/* SOCIALS */}
          <div className="flex gap-3">
            
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Facebook"
              className="group w-10 h-10 p-2 flex items-center justify-center rounded-full bg-[#1a1a1a] hover:bg-[#8B5CF6] hover:text-white transition shadow-[0_10px_40px_rgba(0,0,0,0.20)]">
                <SiFacebook aria-hidden="true" className="group-hover:text-white text-gray-400 w-5 h-5"/>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
              className="group w-10 h-10 p-2 flex items-center justify-center rounded-full bg-[#1a1a1a] hover:bg-[#8B5CF6] hover:text-white transition shadow-[0_10px_40px_rgba(0,0,0,0.20)]">
                <SiInstagram aria-hidden="true" className="group-hover:text-white text-gray-400 w-5 h-5"/>
            </a>
            <a
              href="mailto:hello@opsie.com"
              aria-label="Email us at hello@opsie.com"
              className="group w-10 h-10 p-2 flex items-center justify-center rounded-full bg-[#1a1a1a] hover:bg-[#8B5CF6] hover:text-white transition shadow-[0_10px_40px_rgba(0,0,0,0.20)]">
                <SiGmail aria-hidden="true" className="group-hover:text-white text-gray-400 w-5 h-5"/>
            </a>

          </div>

        </div>

      </div>
    </footer>
  )
}

export default Footer;