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

// ================= TYPES =================
type Product = {
  name: string;
  logo: string
  category: string;
  image: string;
  description: string;
  themeColor: string
};

function ProductPage() {
  const content = useContext(ContentContext);
  const navigate = useNavigate();

  const [filter] = useState<string>('All');

  {
    /**
     * const categories: string[] = [
    'All',
    'Management',
    'Automation',
    'Analytics',
  ];
     */
  }

  // Type the imported products
  const typedProducts: Product[] = products;

  const filteredProducts =
    filter === 'All'
      ? typedProducts
      : typedProducts.filter(
          (prev: Product) => prev.category === filter
        );

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    /* Main wrapper with gradient and relative position to anchor background circles */
    <div className="relative w-full bg-gradient-to-tr from-slate-100 via-white to-zinc-50 text-gray-800 overflow-hidden text-center md:text-left">
      
      {/* ================= BACKGROUND BLURRED CIRCLES ================= */}
      {/* Top Left - Large Soft Dark Blur */}
      <div className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] rounded-full bg-slate-900/5 blur-[140px] pointer-events-none -z-10" />
      
      {/* Mid Right - Medium Soft Accent Blur */}
      <div className="absolute top-[35%] right-[-10%] w-[500px] h-[500px] rounded-full bg-zinc-800/5 blur-[120px] pointer-events-none -z-10" />
      
      {/* Bottom Left - Subtle Deep Accent Blur */}
      <div className="absolute bottom-[15%] left-[-15%] w-[550px] h-[550px] rounded-full bg-slate-900/5 blur-[130px] pointer-events-none -z-10" />
      {/* ============================================================= */}

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">

        {/* --- HERO SECTION --- */}
        <section className="min-h-[90vh] cflex items-center py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div className="flex flex-col gap-8">

              <SuperHeader
                text={content?.productsPage.header}
                type="hero"
                position='left'
              />

              <p
                className="text-gray-500 text-xl leading-relaxed max-w-lg"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                {content?.productsPage.subHeader}
              </p>

              <div
                className="flex md:justify-start justify-center flex-wrap gap-4"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <button
                  className="bg-[#3CBDE6] text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-cyan-500/30 hover:bg-[#2ca7cc] hover:-translate-y-1 transition-all"
                  onClick={() => navigate('/book-a-schedule')}
                >
                  {content?.productsPage.button1.text}
                </button>

                <a href="#all-products">
                  <button className="bg-white/80 backdrop-blur-md border border-gray-200 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 hover:-translate-y-1 transition-all shadow-sm">
                    {content?.productsPage.button2.text}
                  </button>
                </a>
              </div>
            </div>

            {/* Interactive Image Grid */}
            <div
              className="relative grid grid-cols-2 gap-4"
              data-aos="zoom-in-left"
            >
              {/* Cyan branding pulse behind images */}
              <div className="absolute -inset-4 bg-[#3CBDE6]/10 blur-3xl rounded-full -z-10" />

              {[Product1, hris, opsync, web].map((img, idx) => (
                <div
                  key={idx}
                  className={`overflow-hidden rounded-2xl shadow-xl border border-white bg-white/50 backdrop-blur-sm transition-all duration-500 hover:z-20 hover:scale-105 ${
                    idx % 2 !== 0 ? 'mt-8' : ''
                  }`}
                >
                  <img
                    src={img}
                    alt="Product Preview"
                    className="w-full h-48 md:h-64 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- STATS BAR --- */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 relative z-10"
          data-aos="fade-up"
        >
          <AnalyticsCards numbers="50" desc="Active Tools" />
          <AnalyticsCards numbers="10" desc="Partner Brands" />
          <AnalyticsCards numbers="99" desc="Customer Satisfaction" />
          <AnalyticsCards numbers="24" desc="Support Hours" />
        </div>

        {/* --- ALL PRODUCTS SECTION --- */}
        <section id="all-products" className="py-20 relative z-10">

          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">

            <div className="max-w-xl">
              <SuperHeader
                text={content?.productsPage.section2.header}
                position='left'
              />

              <p className="text-gray-500 mt-4">
                {content?.productsPage.section2.subHeader}
              </p>
            </div>

            {/* Category Filter */}
            <div className="w-full md:w-auto">
              {/* Filter components can sit here */}
            </div>
          </div>

          {/* Product Cards */}
          <div
            className="
              p-cards-container
              flex
              justify-center
              md:flex-row
              md:overflow-x-auto
              overflow-hidden
              gap-8
              flex-wrap
              p-10
              items-start
            "
          >
            {filteredProducts.map((item: Product, index: number) => (
              <div
                key={item.name}
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                <ProductCard
                  logo={item.image}
                  itemName={item.name}
                  image={item.logo}
                  desc={item.description}
                  bgColor={item.themeColor}
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Full Width Sections */}
      <div className="mt-10 relative z-10">
        <WhyChooseUsSection />

        <div className="bg-white/60 backdrop-blur-md py-10 border-y border-gray-200/80">
          <ClientReview />
        </div>

        <ServicesSection />

        <ProductItemCTA />
      </div>
    </div>
  );
}

export default ProductPage;