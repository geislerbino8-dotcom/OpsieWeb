import ProductCard from "../../components/cards/ProductCard";
import LogoOnly from "../../assets/icons/opsie_logo_only.png";
import '../../styles/ProductSection.css';
import { useNavigate } from "react-router-dom";
import { products } from "@/data/productsData";
import "aos/dist/aos.css";

function ProductSection() {
  const navigate = useNavigate();

  return (
    <section
      className="w-full bg-[#FAFBFF] font-poppins min-h-screen flex flex-col items-center px-6 py-24 overflow-hidden"
    >
      <div className="w-full max-w-7xl flex flex-col gap-16">

        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-gray-100 ">
          <div className="flex items-center gap-5" data-aos="zoom-in">
            <div className="relative">
               <div className="absolute inset-0 bg-[#3CBDE6]/20 blur-xl rounded-full"></div>
               <img src={LogoOnly} alt="Opsie Logo" className="spin-slow w-16 h-16 relative z-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#242424] tracking-tight">
              <span className="text-[#3CBDE6]">Opsie's</span> Products
            </h1>
          </div>
          
          <p className="max-w-md text-gray-500 text-center md:text-right font-light leading-relaxed" data-aos="fade-left">
            Explore our ecosystem of digital tools designed to streamline your workflow and accelerate business growth.
          </p>
        </div>

        {/* --- PRODUCT GRID --- */}
        <div className="w-full">
          <div className="flex flex-wrap justify-center gap-10 lg:gap-12 py-10">
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
                Our product suite is built on a foundation of security, speed, and 
                user-centric design. Can't find exactly what you're looking for? 
                Check out our full catalog of specialized business solutions.
              </p>
            </div>

            <button
              onClick={() => navigate(`/products`)}
              data-aos="zoom-in"
              className="
                px-10 py-4
                rounded-2xl font-bold uppercase tracking-widest text-xs
                text-[#3CBDE6]
                border-2 border-[#3CBDE6]/30
                bg-white
                transition-all duration-500 ease-out
                hover:text-white
                hover:bg-[#3CBDE6]
                hover:border-[#3CBDE6]
                hover:shadow-[0_20px_40px_rgba(60,189,230,0.2)]
                hover:-translate-y-1
              "
            >
              View Full Catalog
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductSection;