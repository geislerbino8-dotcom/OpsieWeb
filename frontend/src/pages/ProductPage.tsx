import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';

// Sections
import ServicesSection from './sections/ServicesSection';
import WhyChooseUsSection from './sections/WhyChooseUsSection';
import ClientReview from '../components/sections/ClientReviewsSection';

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
import { ContentContext } from '@/App';
import SuperHeader from '@/types/components/SuperHeader';

function ProductPage() {

  const content = useContext(ContentContext)
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
    <div className="w-full bg-[#ECEDF1] text-gray-800 overflow-hidden text-center md:text-left">
      <div className="max-w-[1280px] mx-auto px-6">
        
        {/* --- HERO SECTION --- */}
        <section className="min-h-[90vh] flex items-center py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-8">
              {
                /**
                 * <div className="inline-flex items-center w-fit px-4 py-1.5 rounded-full bg-[#3CBDE6]/10 border border-[#3CBDE6]/20 text-[#3CBDE6] text-sm font-bold tracking-wide uppercase">
                🚀 Innovation in every bit
              </div>
                 */
              }

              <SuperHeader text={content?.productsPage.header} type='hero' />

            
              <p className="text-gray-500 text-xl leading-relaxed max-w-lg" data-aos="fade-up" data-aos-delay="100">
                {
                  content?.productsPage.subHeader
                }
              </p>
              <div className="flex md:justify-start justify-center flex-wrap gap-4" data-aos="fade-up" data-aos-delay="200">
                <button 
                  className="bg-[#3CBDE6] text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-cyan-500/30 hover:bg-[#2ca7cc] hover:-translate-y-1 transition-all"
                  onClick={() => navigate("/book-a-schedule")}
                >
                  {content?.productsPage.button1.text}
                </button>
                <a href="#all-products">
                  <button className="bg-white border border-gray-200 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all">
                    {content?.productsPage.button2.text}
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
              <SuperHeader text={content?.productsPage.section2.header} />
              
              <p className="text-gray-500 mt-4">
                {content?.productsPage.section2.subHeader}
              </p>
            </div>

            {/* Category Filter */}
           {/* Category Filter */}
<div className="w-full md:w-auto">
  {/* Mobile Dropdown - Visible only on small screens */}
  <div className="md:hidden w-full">
    <select 
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="w-full p-4 bg-white border border-gray-200 rounded-xl font-bold text-gray-700 shadow-sm outline-none focus:ring-2 focus:ring-[#3CBDE6]"
    >
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  </div>

  {/* Desktop Tabs - Hidden on mobile, visible on md and up */}
  <div className="hidden md:flex bg-white p-1.5 rounded-xl shadow-sm border border-gray-100">
    {categories.map((cat) => (
      <button
        key={cat}
        onClick={() => setFilter(cat)}
        className={`px-5 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
          filter === cat 
            ? 'bg-[#3CBDE6] text-white shadow-md' 
            : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        {cat}
      </button>
    ))}
  </div>
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

        

      </div>

      {/* Full Width Sections */}
      <div className="mt-10">
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