import React from "react";
import TopSectionCard from "../../components/cards/TopSectionCard";
import ProductCard from "../../components/cards/ProductCard";
import LogoOnly from "../../assets/icons/opsie_logo_only.png";
import P1 from "../../assets/Products/Product1.png";

function ProductSection() {
  return (
    <section className="bg-black w-full flex flex-col items-center py-16 px-4">

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
            <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-300">
              View all Products
            </button>
          </div>
        </div>

        {/* Product Cards */}
        <div className="flex flex-col md:flex-row flex-wrap justify-center items-center">
          <ProductCard itemName="OPSIE HRIS" image={P1} bgColor="#8B5CF6" />
          <ProductCard itemName="OpSync" image={P1} bgColor="#3CBDE6" />
          <ProductCard itemName="OpCici" image={P1} bgColor="#22C55E" />
          <ProductCard itemName="OpCici" image={P1} bgColor="#22C55E" />
        </div>

      </div>
    </section>
  );
}

export default ProductSection;