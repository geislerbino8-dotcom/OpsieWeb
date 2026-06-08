import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import ProductItemCTA from '@/components/cards/ProductItemCTA';
import AnalyticsCards from '@/components/cards/AnalyticsCards';

import { getProduct } from '@/api/getProduct';


// --- TYPES & INTERFACES ---
interface FeatureItem {
  title: string;
  description: string;
}

interface FeaturesMap {
  [key: string]: FeatureItem;
}

interface Benefit {
  title: string;
  description: string;
}

interface Analytics {
  title: string;
  value: string;
  description: string;
  unit?: string;
}

interface ProductContentType {
  name: string;
  image: string;
  logo: string;
  tagline: string;
  description: string;
  category: string;
  features: FeaturesMap;
  benefits: Benefit[];
  contents: {
    overview: string;
    problemSolved: string;
    implementation: string;
    support: string;
  };
  videoAd: string;
  photos: string[];
  analytics: Analytics[];
  industries: string[];
  themeColor: string;
}

function ProductItemPage() {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<ProductContentType | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Carousel State
  const [activeSlide, setActiveSlide] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const searchProduct = async (name: string) => {
      try {
        setLoading(true);
        const response = await getProduct(name);
        setContent(response);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) searchProduct(id);
  }, [id]);

  // Carousel Auto-Play System
  useEffect(() => {
    if (!content?.photos || content.photos.length <= 1) return;

    timeoutRef.current = setTimeout(() => {
      setActiveSlide((prev) => (prev === content.photos.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [activeSlide, content?.photos]);

  const nextSlide = () => {
    if (!content?.photos) return;
    setActiveSlide((prev) => (prev === content.photos.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (!content?.photos) return;
    setActiveSlide((prev) => (prev === 0 ? content.photos.length - 1 : prev - 1));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-white text-xs font-bold tracking-widest uppercase animate-pulse">Syncing {id}...</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        <h1 className="text-xl font-bold tracking-tight opacity-60">Product parameters not found.</h1>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center bg-gray-950 text-white overflow-x-hidden selection:bg-cyan-500/30 font-sans antialiased">
      {/* Ambient Radial Lights */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-600/5 blur-[130px] rounded-full -z-10 pointer-events-none" />

      {/* --- HERO SECTION --- */}
      <section 
        className="w-full min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative border-b border-white/5 bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(3, 7, 18, 0.8), rgba(3, 7, 18, 0.95)), url(${content.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Hero Right Content */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left order-1 lg:order-2">
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest uppercase bg-white/5 border border-white/10 rounded-full text-cyan-400">
                {content.category}
              </span>

          <div data-aos="zoom-in" className="">
            {
              content.logo ? 
              <img
              src={content.logo}
              alt={content.name}
              className=""
            /> : <h1 className='font-bold text-[5rem]'>{content.name}</h1>
            }
          </div>    
          
              
            </div>

            <p data-aos="fade-up" data-aos-delay="100" className="text-gray-400 leading-relaxed text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0 font-light italic">
              "{content.tagline}"
            </p>

            <div data-aos="fade-up" data-aos-delay="200" className="pt-2 flex flex-wrap justify-center lg:justify-start gap-4">
              <button 
                onClick={() => window.location.href = "mailto:sales@example.com"}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-sm tracking-wide text-white shadow-lg shadow-cyan-500/15 hover:shadow-cyan-500/30 hover:-translate-y-0.5 transition-all duration-200"
              >
                Request Live Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- REFINED OVERVIEW SECTION --- */}
      <section className="w-full max-w-5xl px-6 py-20">
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 items-center backdrop-blur-md">
          <div className="w-full md:w-1/3 flex-shrink-0">
            <img className="w-full rounded-2xl border border-white/10 object-cover shadow-lg" src={content?.image} alt="Product breakdown" />
          </div>
          <div className="space-y-4">
            <h2 className="text-xs font-bold tracking-widest text-cyan-500 uppercase">Product Summary</h2>
            <p className="text-gray-300 leading-relaxed text-base font-normal">{content?.description}</p>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="w-full flex justify-center item-center max-w-6xl pb-16 px-6">
        <div className="flex justify-center items-center">
          {content.analytics.map((item, index) => (
            <div key={index}>
              <AnalyticsCards numbers={item.value} desc={item.title} unit={item.unit} />
            </div>
          ))}
        </div>
      </section>

      {/* --- PROBLEM & SOLUTION GRID --- */}
      <section className="w-full max-w-5xl py-20 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 border-y border-white/5 py-16">
          <div data-aos="fade-right" className="space-y-3">
            <div className="flex items-center gap-2 text-red-400">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
              <h3 className="font-bold uppercase text-xs tracking-widest">The Operational Challenge</h3>
            </div>
            <p className="text-xl font-medium text-slate-200 leading-relaxed">{content.contents.problemSolved}</p>
          </div>
          <div data-aos="fade-left" className="space-y-3">
            <div className="flex items-center gap-2 text-cyan-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <h3 className="font-bold uppercase text-xs tracking-widest">Architectural Solution</h3>
            </div>
            <p className="text-gray-400 leading-relaxed text-base">{content.contents.overview}</p>
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="w-full max-w-6xl py-20 px-6">
        <div className="text-center mb-16 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase">Enterprise Capabilities</h2>
          <div className="h-0.5 w-16 bg-cyan-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 px-2 md:px-6">
          {Object.entries(content.features).map(([key, feature], index) => (
            <div key={key} data-aos="fade-up" data-aos-delay={index * 50} className="flex gap-5 items-start p-6 bg-white/[0.01] hover:bg-white/[0.04] rounded-2xl transition-all duration-300 group border border-white/5 hover:border-white/10">
              <span className="text-xl text-cyan-500 mt-0.5 group-hover:rotate-45 transition-transform duration-300">✦</span>
              <div className="space-y-1">
                <h3 className="text-xl font-bold group-hover:text-cyan-400 transition-colors">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- STRATEGIC BENEFITS SECTION --- */}
      {content.benefits && content.benefits.length > 0 && (
        <section className="w-full max-w-6xl py-20 px-6 border-t border-white/5">
          <div className="text-center mb-16 space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase">Strategic Benefits</h2>
            <div className="h-0.5 w-16 bg-blue-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2 md:px-6">
            {content.benefits.map((benefit, index) => (
              <div 
                key={index} 
                data-aos="fade-up" 
                data-aos-delay={index * 100}
                className="relative p-8 bg-gradient-to-b from-white/[0.02] to-transparent border border-white/5 rounded-2xl flex flex-col gap-4 overflow-hidden group hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 text-sm font-bold">
                  0{index + 1}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-blue-400 transition-colors duration-200">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- INTERACTIVE CAROUSEL GALLERY --- */}
      {content.photos && content.photos.length > 0 && (
        <section className="w-full max-w-5xl px-6 pb-24">
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-xs font-bold tracking-widest text-gray-500 uppercase">Visual Interface</h2>
          </div>
          
          {/* Removed max-w-4xl, aspect-video, border and background box declarations */}
          <div className="relative group mx-auto overflow-hidden w-full flex justify-center items-center">
            {/* Sliding Track */}
            <div 
              className="w-full flex transition-transform duration-700 ease-out items-center"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {content.photos.map((url, index) => (
                <div key={index} className="w-full flex-shrink-0 flex justify-center items-center relative">
                  <img 
                    src={url} 
                    alt={`Interface Preview ${index + 1}`} 
                    className="w-auto h-auto max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/10"
                  />
                </div>
              ))}
            </div>

            {/* Carousel Arrow Controls */}
            {content.photos.length > 1 && (
              <>
                <button 
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm hover:bg-black/80 z-30"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm hover:bg-black/80 z-30"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Bottom Navigation Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                  {content.photos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSlide(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${activeSlide === index ? 'w-6 bg-cyan-400' : 'w-1.5 bg-white/40'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* --- IMPLEMENTATION & SUPPORT --- */}
      <section className="w-full max-w-5xl py-16 px-6 sm:px-10 bg-white/[0.01] rounded-3xl border border-white/5 backdrop-blur-md mb-24 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
        <div className="space-y-3">
          <h4 className="text-lg font-bold flex items-center gap-2.5 text-slate-100">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            Implementation Architecture
          </h4>
          <p className="text-gray-400 text-sm leading-relaxed">{content.contents.implementation}</p>
        </div>
        <div className="space-y-3">
          <h4 className="text-lg font-bold flex items-center gap-2.5 text-slate-100">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            SLA & Support Engineering
          </h4>
          <p className="text-gray-400 text-sm leading-relaxed">{content.contents.support}</p>
        </div>
      </section>

      <ProductItemCTA />
      <div className="h-12" />
    </div>
  );
}

export default ProductItemPage;