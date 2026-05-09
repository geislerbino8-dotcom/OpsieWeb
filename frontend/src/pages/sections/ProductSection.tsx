import ProductCard from "../../components/cards/ProductCard";
import LogoOnly from "../../assets/icons/opsie_logo_only.png";
import '../../styles/ProductSection.css';
import { useNavigate } from "react-router-dom";
import { products } from "@/data/productsData";
import "aos/dist/aos.css";
import { usePageContent } from "@/data/usePageContent";
import { useState } from "react";
import SuperHeader from "@/types/components/SuperHeader";

function ProductSection() {

  const navigate = useNavigate();
  const [ contents ] = useState(usePageContent.data[0].productsSection)


  return (
    <section
      className="w-full bg-[#F5F5F5] font-poppins min-h-screen flex flex-col items-center px-6 py-24 overflow-hidden"
    >
      <div className="w-full max-w-7xl flex flex-col gap-16">

        {/* --- HEADER --- */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 border-b border-gray-100 ">
          <div className="flex justify-center items-center gap-5" data-aos="zoom-in">
            <div className="relative">
               <div className="absolute inset-0 bg-[#3CBDE6]/20 blur-xl rounded-full"></div>
               <img src={LogoOnly} alt="Opsie Logo" className="spin-slow w-16 h-16 relative z-10" />
            </div>
            <div className="w-1/2">
              <SuperHeader text={contents.header} />
            </div>
       
          </div>
          
          
        </div>

        {/* --- PRODUCT GRID --- */}
        <div className="w-full">
          <div className="flex flex-wrap justify-center gap-10 lg:gap-12 pb-10">
            {Object.values(products).slice(0, 6).map((item, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="flex justify-center"
              >
                <ProductCard
                  itemName={item.name}
                  image={item.image}
                  desc={item.description}
                />
              </div>
            ))}
          </div>

          {/* --- FOOTER CTA --- */}
          <div className="mt-16 flex flex-col items-center text-center space-y-8">
            <div className="max-w-3xl">
               <p data-aos="fade-up" className="text-gray-500 text-lg leading-relaxed">
                {
                  contents.subHeader
                }
              </p>
            </div>

          <div data-aos="zoom-in">
            <button
              onClick={() => navigate(contents.link)}
              className="
                px-10 py-4
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
              {
                contents.buttonText
              }
            </button>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductSection;