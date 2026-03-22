import { useEffect } from "react";
import ProductCard from "../../components/cards/ProductCard";
import LogoOnly from "../../assets/icons/opsie_logo_only.png";
import '../../styles/ProductSection.css'
import hris from '../../assets/Products/HRIS.png';
import opsync from '../../assets/Products/Opsync.png';
import web from '../../assets/Products/WebOpsie.png';

import AOS from "aos";
import "aos/dist/aos.css";

const products = {
  hris: { name: 'Opsie HRIS', image: hris },
  opsync: { name: 'Opsync', image: opsync },
  opsync2: { name: 'Opsync', image: opsync },
  opsync3: { name: 'Opsync', image: opsync },
  opsync4: { name: 'Opsync', image: opsync },
  opsync5: { name: 'Opsync', image: opsync },
  web: { name: 'OpsieWeb', image: web }
};

function ProductSection() {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  return (
    <section
      className="w-full text-[#242424]font-poppins min-h-screen flex flex-col items-center py-24 px-4"
     
    >
      <div className="w-full max-w-6xl flex flex-col gap-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4" data-aos="zoom-in">
            <img src={LogoOnly} alt="Opsie Logo" className="spin-slow w-14 h-14" />
            <h1 className="text-3xl md:text-4xl ">
              <span className="text-[#]">Opsie's </span> Products
            </h1>
          </div>
        </div>

        {/* Product Cards */}
       <div className="">
        <div className="p-cards-container flex pb-10 w-[80vw]  mx-auto overflow-x-auto">
        <div className="h-100 flex gap-4 items-end pr-10
            
">
          {Object.values(products).map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 200}
              className="flex-shrink-0 transform transition duration-300 ease-in-out 
                        hover:-translate-y-2 hover:scale-105 hover:mx-5 hover:shadow-xl"
            >
              <ProductCard itemName={item.name} image={item.image} />
            </div>
          ))}
        </div>
          </div>

          <div>
            <p data-aos = "fade-left" className="text-[#242424]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, assumenda neque velit exercitationem provident recusandae commodi asperiores, nostrum cumque aperiam minima a enim labore maxime perspiciatis, rerum sapiente numquam voluptatum.</p>

            <button className="group py-3 px-6 my-5 text-[#242424] border border-[#242424] rounded-[0.5em] 
              font-medium tracking-wide
              transition-all duration-300 ease-out
              hover:text-white
               hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-500
            hover:shadow-lg hover:shadow-cyan-400/40 hover:border-0
              hover:-translate-y-0.5"
              
                onClick={()=> {
                  window.location.href = "/products"
                }}
              >
                View All Product
                <span className="hidden group-hover:inline ml-2  ">→</span>
              </button>
          </div>
       </div>

          
      </div>
    </section>
  );
}

export default ProductSection;