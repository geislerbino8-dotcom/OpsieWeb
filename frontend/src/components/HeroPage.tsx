import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import LogoOnly from '../assets/icons/opsie_logo_only.png';
import SplitText from './SplitText';
import SoftAurora from './SoftAurora';
import { ContentContext } from "@/App";

type HeroPageProps = {
  bgImage?: string;
};

function HeroPage({ bgImage }: HeroPageProps) {
  const navigate = useNavigate();
  const content = useContext(ContentContext);

  const headerText = content?.heroSection?.header || "";
  const subHeaderText = content?.heroSection?.subHeader || "";
  const buttonText = content?.heroSection?.button || "";

  return (
    <div
      className="w-full h-screen relative flex flex-col justify-end overflow-hidden"
      style={{
        backgroundColor: '#000000',
        backgroundImage: bgImage ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${bgImage})` : undefined,
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      {/* Centered Aurora Layer Wrapper */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div 
          className="relative w-[600px] h-[600px] md:w-[900px] md:h-[900px] aspect-square opacity-40 mix-blend-screen flex items-center justify-center"
          style={{
            WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%)',
            maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%)'
          }}
        >
          <SoftAurora
            speed={0.5}
            scale={1.0}
            brightness={3}
            color1="#025a7a"
            color2="#3CBDE6"
            noiseFrequency={2.5}
            noiseAmplitude={1}
            bandHeight={0.4}
            bandSpread={0.8}
            octaveDecay={0.1}
            layerOffset={0}
            colorSpeed={1}
            enableMouseInteraction
            mouseInfluence={0.25}
          />
        </div>
      </div>

      {/* Central Spinning Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <img 
          src={LogoOnly} 
          alt="Logo" 
          className="animate-[spin_20s_linear_infinite] w-72 md:w-[500px] opacity-[30%] select-none" 
        />
      </div>

      {/* Content Area */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-12 mb-24 space-y-8">
        
        <div className="max-w-5xl">
          <h1 className="text-white">
            {headerText && (
              <SplitText
                text={headerText}
                className="text-[48px] md:text-[80px] lg:text-[90px] font-bold leading-[1.1] tracking-tight"
                delay={50}
                duration={1}
                ease="back.out(1.7)"
                splitType="chars"
                from={{ opacity: 0, y: 80 }}
                to={{ opacity: 1, y: 0 }}
              />
            )}
          </h1>
        </div>

        {subHeaderText && (
          <p
            className="text-gray-300 text-lg md:text-xl max-w-2xl font-light leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="800"
            data-aos-duration="1000"
          >
            {subHeaderText}
          </p>
        )}

        <div 
          className="pt-4"
          data-aos="zoom-in"
          data-aos-delay="1200"
        >
          <button 
            onClick={() => navigate("/book-a-schedule")}
            className="group relative bg-[#3CBDE6] text-white px-14 py-5 font-bold uppercase tracking-[0.2em] text-xs transition-all duration-300 hover:bg-white hover:text-black shadow-2xl overflow-hidden"
          >
            <span className="relative z-10">{buttonText}</span>
          </button>
        </div>
      </div>

      {/* Bottom Gradient for smoother section transitions */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </div>
  );
}

export default HeroPage;