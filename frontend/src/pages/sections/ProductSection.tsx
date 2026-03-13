import React, { useEffect } from "react";
import ProductCard from "../../components/cards/ProductCard";
import LogoOnly from "../../assets/icons/opsie_logo_only.png";
import ProductBG from '../../assets/background-images/ProductSection.png';
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
      className="w-full font-poppins min-h-screen flex flex-col items-center py-24 px-4"
      style={{
        backgroundColor: '#0b0b0bec',
        backgroundImage: `url(${ProductBG})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'darken'
      }}
    >
      <div className="w-full max-w-6xl flex flex-col gap-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4" data-aos="zoom-in">
            <img src={LogoOnly} alt="Opsie Logo" className="spin-slow w-14 h-14" />
            <h1 className="text-white text-3xl md:text-4xl font-extrabold">
              Opsie's Products
            </h1>
          </div>
        </div>

        {/* Product Cards */}
       <div className="p-cards-container flex pt-10  pb-5 w-[80vw] h-full mx-auto overflow-x-auto">
        <div className=" flex gap-4 items-end">
          {Object.values(products).map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 200}
              className="flex-shrink-0"
            >
              <ProductCard itemName={item.name} image={item.image} />
            </div>
          ))}
        </div>
          </div>

          <div>
            <p data-aos = "fade-left" className="text-[#cacaca]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, assumenda neque velit exercitationem provident recusandae commodi asperiores, nostrum cumque aperiam minima a enim labore maxime perspiciatis, rerum sapiente numquam voluptatum.</p>

            <button className="py-3 px-6 my-5 text-white border border-white rounded-[0.5em] 
              font-medium tracking-wide
              transition-all duration-300 ease-out
              hover:bg-white hover:text-black
              hover:shadow-[0_0_20px_rgba(255,255,255,0.7)]
              hover:-translate-y-0.5"
                onClick={()=> {
                  window.location.href = "/products"
                }}
              >
                View All Product
              </button>
          </div>

          
      </div>
    </section>
  );
}

export default ProductSection;