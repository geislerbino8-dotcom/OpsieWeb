import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';

// Sections
import ServicesSection from './sections/ServicesSection';
import WhyChooseUsSection from './sections/WhyChooseUsSection';
import ClientReview from '../components/sections/ClientReviewsSection';
import OpsieHRIS from '../components/PlanPricing/OpsieHRIS';

// Components
import ProductCard from '@/components/cards/ProductCard';
import ProductItemCTA from '@/components/cards/ProductItemCTA';
import AnalyticsCards from '@/components/cards/AnalyticsCards';

// Data & Assets
import { products } from '@/data/productsData';
import Product1 from '../assets/Products/Product1.png';
import hris from '../assets/Products/HRIS.png';
import opsync from '../assets/Products/Opsync.png';
import web from '../assets/Products/WebOpsie.png';

function ProductPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');

  // Categories could be derived from your productsData
  const categories = ['All', 'Management', 'Automation', 'Analytics'];

  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="w-full bg-[#ECEDF1] text-gray-800 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        
        {/* --- HERO SECTION --- */}
        <section className="min-h-[90vh] flex items-center py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-8">
              <div className="inline-flex items-center w-fit px-4 py-1.5 rounded-full bg-[#3CBDE6]/10 border border-[#3CBDE6]/20 text-[#3CBDE6] text-sm font-bold tracking-wide uppercase">
                🚀 Innovation in every bit
              </div>
              <h1 className="text-5xl md:text-7xl leading-[1.1] font-bold" data-aos="fade-up">
                Build <span className='font-playfair italic font-normal text-[#3CBDE6]'>Smarter</span> Products with
                <span className="text-[#3CBDE6]"> Opsie</span>
              </h1>
              <p className="text-gray-500 text-xl leading-relaxed max-w-lg" data-aos="fade-up" data-aos-delay="100">
                We design powerful digital tools that help businesses
                automate operations, scale faster, and work smarter.
              </p>
              <div className="flex flex-wrap gap-4" data-aos="fade-up" data-aos-delay="200">
                <button 
                  className="bg-[#3CBDE6] text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-cyan-500/30 hover:bg-[#2ca7cc] hover:-translate-y-1 transition-all"
                  onClick={() => navigate("/book-a-schedule")}
                >
                  Start Building
                </button>
                <a href="#all-products">
                  <button className="bg-white border border-gray-200 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all">
                    Explore Solutions
                  </button>
                </a>
              </div>
            </div>

            {/* Interactive Image Grid */}
            <div className="relative grid grid-cols-2 gap-4" data-aos="zoom-in-left">
              <div className="absolute -inset-4 bg-[#3CBDE6]/10 blur-3xl rounded-full -z-10" />
              {[Product1, hris, opsync, web].map((img, idx) => (
                <div key={idx} className={`overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:z-20 hover:scale-105 ${idx % 2 !== 0 ? 'mt-8' : ''}`}>
                   <img src={img} alt="Product Preview" className="w-full h-48 md:h-64 object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- STATS BAR --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20" data-aos="fade-up">
            <AnalyticsCards numbers="50" desc="Active Tools" />
            <AnalyticsCards numbers="10" desc="Partner Brands" />
            <AnalyticsCards numbers="99" desc="Customer Satisfaction" />
            <AnalyticsCards numbers="24" desc="Support Hours" />
        </div>

        {/* --- ALL PRODUCTS SECTION --- */}
        <section id="all-products" className="py-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold" data-aos="fade-right">
                Our <span className="text-[#3CBDE6]">Digital Ecosystem</span>
              </h2>
              <p className="text-gray-500 mt-4">
                Tailored solutions for modern teams. Filter by category to find the perfect fit for your workflow.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex bg-white p-1.5 rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                    filter === cat ? 'bg-[#3CBDE6] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="p-cards-container flex justify-center md:flex-row md:overflow-x-auto overflow-hidden gap-8 flex-wrap p-10 items-start
          ">
            {filteredProducts.map((item, index) => (
              <div
                key={item.name}
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                <ProductCard
                  bgColor="white"
                  itemName={item.name}
                  image={item.image}
                  desc={item.description}
                />
                
              </div>
            ))}
          </div>
        </section>

        {/* --- INTEGRATION CLOUD (New Section) --- */}
        <section className="py-20 text-center border-t border-gray-200">
           <h3 className="text-gray-400 uppercase tracking-[0.2em] text-sm font-black mb-10">Works with your favorite tools</h3>
           <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all">
              {/* Replace with your integration logos */}
              <span className="text-2xl font-bold">SLACK</span>
              <span className="text-2xl font-bold">NOTION</span>
              <span className="text-2xl font-bold">ZAPIER</span>
              <span className="text-2xl font-bold">GITHUB</span>
              <span className="text-2xl font-bold">TRELLO</span>
           </div>
        </section>

      </div>

      {/* Full Width Sections */}
      <div className="mt-10">
        <OpsieHRIS />
        <WhyChooseUsSection /> 
        <div className='bg-[#ECEDF1] py-10 border-y border-gray-200'>
          <ClientReview />
        </div>
        <ServicesSection />
        <ProductItemCTA />
      </div>
    </div>
  );
}

export default ProductPage;