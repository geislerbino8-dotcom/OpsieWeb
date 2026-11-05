import ProductCard from "../../components/cards/ProductCard";
import LogoOnly from "../../assets/icons/opsie_logo_only.png";
import { useNavigate } from "react-router-dom";
import { products } from "@/data/productsData";
import "aos/dist/aos.css";
import { useContext } from "react";
import LineWaves from "@/components/LineWaves";
import { ContentContext } from "@/App";

type Product = {
  image: string;
  name: string;
  logo: string;
  description: string;
  themeColor: string;
};

function ProductSection() {
  const navigate = useNavigate();
  const content = useContext(ContentContext);

  return (
    <section
      className="relative w-full bg-gradient-to-tr from-[#F4F7F9] via-[#FCFCFC] to-[#E6F7FC] font-poppins min-h-screen flex flex-col items-center px-4 sm:px-6 py-16 sm:py-24 overflow-hidden"
    >

      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40">
        <LineWaves
          speed={0.3}
          innerLineCount={10}
          outerLineCount={10}
          warpIntensity={1}
          rotation={-45}
          edgeFadeWidth={0}
          colorCycleSpeed={1}
          brightness={0.020}
          color1="#D4AF37"
          color2="#D4AF37"
          color3="#D4AF37"
          enableMouseInteraction
          mouseInfluence={2}
        />
      </div>
   
      <div className="w-full max-w-7xl flex flex-col gap-12 sm:gap-16 relative z-10">

        {/* --- HEADER --- */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 ">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-5" data-aos="zoom-in">
            <div className="relative">
               <div className="absolute inset-0 bg-[#3CBDE6]/20 blur-xl rounded-full"></div>
               <img src={LogoOnly} alt="Opsie Logo" className="spin-slow w-12 h-12 sm:w-16 sm:h-16 relative z-10" />
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left px-2">
              {/* Responsive heading: small on mobile, large on desktop */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#BF953F] via-[#828181] to-[#B38728] bg-clip-text text-transparent">
                Solutions designed for real business operations
              </h1>
            </div>
          </div>
        </div>

        {/* --- PRODUCT GRID --- */}
        <div className="w-full">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 lg:gap-12 pb-10">
            {(products as Product[]).slice(0, 6).map((item, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="flex justify-center w-full sm:w-auto"
              >
                <ProductCard
                  logo={item.image}
                  itemName={item.name}
                  image={item.logo}
                  desc={item.description}
                  bgColor={item.themeColor}
                />
              </div>
            ))}
          </div>

          {/* --- FOOTER CTA --- */}
          <div className="mt-12 sm:mt-16 flex flex-col items-center text-center space-y-6 sm:space-y-8">
            <div className="max-w-3xl px-4">
               <p data-aos="fade-up" className="text-gray-500 text-base sm:text-lg leading-relaxed">
                {content?.productsSection.subHeader}
              </p>
            </div>

            <div data-aos="zoom-in">
              <button
                onClick={() => navigate('/products')}
                className="
                  px-8 sm:px-10 py-3 sm:py-4
                  rounded-2xl font-bold uppercase tracking-widest text-xs
                  text-[#3CBDE6]
                  bg-white
                  border-2 border-[#3CBDE6] border-opacity-30
                  transition-all duration-700 ease-out
                  hover:text-white
                  hover:bg-[#3CBDE6]
                  hover:border-opacity-100
                  hover:shadow-[0_20px_40px_rgba(60,189,230,0.2)]
                  hover:-translate-y-1
                "
              >
                {content?.productsSection.buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductSection;
