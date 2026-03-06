import React from "react";
import TopSectionCard from "../../components/cards/TopSectionCard";
import ProductCard from "../../components/cards/ProductCard";
import LogoOnly from "../../assets/icons/opsie_logo_only.png";
import P1 from "../../assets/Products/Product1.png";
import ProductBG from '../../assets/background-images/ProductSection.png'

import hris from '../../assets/Products/HRIS.png'
import opsync from '../../assets/Products/Opsync.png'
import web from '../../assets/Products/WebOpsie.png'

const productsImage = [ hris, opsync, web]

const products = {
  hris: { name: 'Opsie HRIS', image: hris},
  opsync: { name: 'Opsync', image: opsync },
  web: { name: 'OpsieWeb', image: web}
}

function ProductSection() {
  return (
    <section className="w-full flex flex-col items-center py-16 px-4"
      style={{
        backgroundColor: '#242424d0',
        backgroundImage: `url(${ProductBG})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'darken'
      }}
    >

      {/* Wrapper */}
      <div className="w-full max-w-6xl flex flex-col gap-8">

        {/* Top Section Card */}
        <TopSectionCard secName="Products" />

        {/* Upper Section: Logo + Title + Button */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <img src={LogoOnly} alt="Opsie Logo" className="w-12 h-12" />

          {/* Title */}
          <div className="flex flex-col items-center md:items-start flex-1">
            <h1 className="text-white text-3xl md:text-4xl font-bold text-center md:text-left">
              Opsie's Products
            </h1>
          </div>

          {/* Button */}
          <div>
            <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-300"
              onClick={()=> window.location.href = '/products'}
            >
              View all Products
            </button>
          </div>
        </div>

        {/* Product Cards */}
        <div className="flex flex-col md:flex-row flex-wrap justify-center items-center">
          {
            Object.values(products).map((item, index)=> (
              <ProductCard itemName={item.name} image={item.image}/>
            ))
          }
        </div>

      </div>
    </section>
  );
}

export default ProductSection;