import ProductCTA from './sections/ProductCTA';
import ServicesSection from './sections/ServicesSection';
import WhyChooseUsSection from './sections/WhyChooseUsSection';
import OpsieHRIS from '../components/PlanPricing/OpsieHRIS'
import ClientReview from '../components/sections/ClientReviewsSection';

import ProductCard from '@/components/cards/ProductCard';

import Product1 from '../assets/Products/Product1.png';
import hris from '../assets/Products/HRIS.png';
import opsync from '../assets/Products/Opsync.png';
import web from '../assets/Products/WebOpsie.png';

const products = [
  { name: "Opsie HRIS", image: hris },
  { name: "Opsync", image: opsync },
  { name: "Opsync Pro", image: opsync },
  { name: "Opsync Cloud", image: opsync },
  { name: "Opsync Lite", image: opsync },
  { name: "Opsie Web", image: web },
];

function ProductPage() {
  return (
    <div className="w-full bg-white text-gray-800">

      <div className="max-w-[1280px] mx-auto px-6">

        <section className="min-h-[80vh] flex items-center py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            <div className="flex flex-col gap-6">
              <h1 className="text-4xl md:text-6xl text-left lg:text-7xl font-bold leading-tight">
                Build Smarter Products
                <span className="text-[#3CBDE6]"> with Opsie</span>
              </h1>

              <p className="text-gray-600 text-lg max-w-lg">
                We design powerful digital tools that help businesses
                automate operations, scale faster, and work smarter.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="bg-[#3CBDE6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2ca7cc] transition">
                  Get Started
                </button>
                <button className="border border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
                  View Products
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[Product1, hris, opsync, web].map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Product ${idx + 1}`}
                  className="rounded-xl shadow-lg object-cover w-full h-48 md:h-56 lg:h-64"
                />
              ))}
            </div>

          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold">
              Our <span className="text-[#3CBDE6]">Products</span>
            </h2>
            <p className="text-gray-600 mt-3">
              Discover the solutions we built to empower businesses.
            </p>
          </div>

          <div className="p-cards-container flex md:flex-row overflow-x-auto gap-8 flex-wrap p-10 items-start
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
                  textColor='black'
                />
                
              </div>
            ))}
          </div>
        </section>

      </div>
            <OpsieHRIS/> 
            <WhyChooseUsSection /> 
            <ClientReview />
            <ServicesSection />
            <ProductCTA />

    </div>
  );
}

export default ProductPage;