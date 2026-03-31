import ServicesSection from './sections/ServicesSection';
import WhyChooseUsSection from './sections/WhyChooseUsSection';
import OpsieHRIS from '../components/PlanPricing/OpsieHRIS'
import ClientReview from '../components/sections/ClientReviewsSection';
import { useNavigate } from 'react-router-dom';
import ProductCard from '@/components/cards/ProductCard';

import Product1 from '../assets/Products/Product1.png';
import hris from '../assets/Products/HRIS.png';
import opsync from '../assets/Products/Opsync.png';
import web from '../assets/Products/WebOpsie.png';
import EncourageCard from '@/components/cards/EncourageCard';
import ProductCTA from './sections/ProductCTA';
import ProductItemCTA from '@/components/cards/ProductItemCTA';

const products = [
  { name: "Opsie HRIS", image: hris },
  { name: "Opsync", image: opsync },
  { name: "Opsync Pro", image: opsync },
  { name: "Opsync Cloud", image: opsync },
  { name: "Opsync Lite", image: opsync },
  { name: "Opsie Web", image: web },
];



function ProductPage() {

  const navigate = useNavigate()

  return (
    <div className="w-full bg-white text-gray-800 overflow-hidden bg-[#ECEDF1]">

      <div className="max-w-[1280px] mx-auto px-6">

        <section className="min-h-[80vh] flex items-center py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            <div className="flex flex-col gap-6">
              <h1 className="text-4xl md:text-6xl text-left lg:text-7xl leading-tight">
                Build <span className='font-playfair italic text-[#3CBDE6] '> Smarter</span> Products with
                <span className="text-[#3CBDE6] font-semibold"> Opsie</span>
              </h1>

              <p className="text-gray-600 text-lg max-w-lg">
                We design powerful digital tools that help businesses
                automate operations, scale faster, and work smarter.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="bg-[#3CBDE6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2ca7cc] transition"
                  onClick={()=> navigate("/book-a-schedule")}
                >
                  Get Started
                </button>
                <a href="#all-products">
                  <button 
                  className="border border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
                  View Products
                </button>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[Product1, hris, opsync, web].map((img, idx) => (
                <img
                
                  key={idx}
                  src={img}
                  alt={`Product ${idx + 1}`}
                  className="rounded-xl shadow-lg object-cover w-full h-48 md:h-56 lg:h-64 hover:scale-105 
                  transition-all duration-600"
                />
              ))}
            </div>

          </div>
        </section>

        <section id='all-products' className="py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-semibold">
              Our <span className="text-[#3CBDE6]">Products</span>
            </h2>
            <p className="text-gray-600 mt-3">
              Discover the solutions we built to empower businesses.
            </p>
          </div>

          <div className="p-cards-container flex justify-center md:flex-row md:overflow-x-auto overflow-hidden gap-8 flex-wrap p-10 items-start
          ">
            {products.map((item, index) => (
              <div
                key={item.name}
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                <ProductCard
                  bgColor="white"
                  itemName={item.name}
                  image={item.image}
                />
                
              </div>
            ))}
          </div>
        </section>

      </div>
            <OpsieHRIS />
            <WhyChooseUsSection /> 
            <div className='bg-[#ECEDF1]'>
              <ClientReview />
            </div>
            <ServicesSection />
            <ProductItemCTA />

    </div>
  );
}

export default ProductPage;