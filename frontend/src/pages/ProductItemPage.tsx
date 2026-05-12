import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Components
import ProductItemCTA from '@/components/cards/ProductItemCTA';
import AnalyticsCards from '@/components/cards/AnalyticsCards';

// API
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
}

interface ProductContentType {
  name: string;
  image: string;
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
}

function ProductItemPage() {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<ProductContentType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize Animations
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

  // Loading State UI
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-white font-black tracking-widest uppercase animate-pulse">Syncing {id}...</p>
        </div>
      </div>
    );
  }

  // Error/404 State UI
  if (!content) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        <h1 className="text-2xl font-bold">Product not found.</h1>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center bg-gray-950 text-white overflow-x-hidden selection:bg-cyan-500/30 font-sans">
      {/* Background Ambient Glows */}
      <div className="hidden md:flex absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full -z-10" />
      <div className="hidden md:flex absolute top-1/2 right-1/4 w-80 h-80 bg-cyan-600/10 blur-[100px] rounded-full -z-10" />

      {/* --- HERO SECTION --- */}
      <section 
        className="w-full min-h-screen flex items-center justify-center px-6 py-20 relative border-b border-white/5 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url(${content.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div data-aos="zoom-in" className="flex justify-center relative order-2 lg:order-1">
             <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full scale-75 animate-pulse" />
             <img
              src={content.image}
              alt={content.name}
              className="relative z-10 w-full max-w-lg rounded-3xl shadow-2xl border border-white/10 hover:scale-[1.02] transition-transform duration-700"
            />
          </div>

          <div className="flex flex-col gap-8 text-center lg:text-left order-1 lg:order-2">
            <div className="space-y-2">
                <span className="text-cyan-500 font-bold uppercase tracking-[0.3em] text-sm">{content.category}</span>
                <h1 data-aos="fade-up" className="text-5xl md:text-7xl font-black tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500 uppercase">
                  {content.name}
                </h1>
            </div>

            <p data-aos="fade-up" data-aos-delay="100" className="text-gray-400 leading-relaxed text-xl max-w-xl mx-auto lg:mx-0 font-light italic">
              "{content.tagline}"
            </p>

            <div data-aos="fade-up" data-aos-delay="200" className="flex flex-wrap justify-center lg:justify-start gap-4">
              <button 
                onClick={() => window.location.href = "mailto:sales@example.com"}
                className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-bold text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-1 transition-all duration-300"
              >
                Request Live Demo
              </button>
            
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="w-full max-w-6xl py-24 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.analytics.map((item, index) => (
            <AnalyticsCards key={index} numbers={item.value} desc={item.title} />
          ))}
        </div>
      </section>

      {/* --- PROBLEM & OVERVIEW --- */}
      <section className="w-full max-w-5xl py-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-16 border-y border-white/5">
          <div data-aos="fade-right">
            <h3 className="text-cyan-500 font-bold uppercase text-xs tracking-widest mb-4">The Challenge</h3>
            <p className="text-2xl font-medium text-gray-300">{content.contents.problemSolved}</p>
          </div>
          <div data-aos="fade-left">
            <h3 className="text-cyan-500 font-bold uppercase text-xs tracking-widest mb-4">Our Solution</h3>
            <p className="text-gray-400 leading-relaxed">{content.contents.overview}</p>
          </div>
      </section>

      {/* --- FEATURES GRID (Object Mapping Fix) --- */}
      <section className="w-full max-w-6xl py-32 px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 italic uppercase tracking-tighter">🚀 Enterprise Capabilities</h2>
          <div className="h-1 w-24 bg-cyan-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-4 md:px-10">
          {Object.entries(content.features).map(([key, feature], index) => (
            <div key={key} data-aos="fade-up" data-aos-delay={index * 50} className="flex gap-6 items-start p-6 hover:bg-white/5 rounded-3xl transition-all group border border-transparent hover:border-white/10">
              <span className="text-2xl text-cyan-500 mt-1 group-hover:scale-125 transition-transform duration-300">✦</span>
              <div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- PHOTO GALLERY --- */}
      <section className="w-full max-w-7xl px-6 pb-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {content.photos.map((url, index) => (
            <div key={index} data-aos="zoom-in" data-aos-delay={index * 100} className="group relative overflow-hidden rounded-2xl border border-white/10 aspect-video">
              <img 
                src={url} 
                alt={`Gallery ${index}`} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>
      </section>

      {/* --- IMPLEMENTATION & SUPPORT --- */}
      <section className="w-full max-w-6xl py-24 px-8 bg-white/5 rounded-[3rem] border border-white/10 mb-32 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h4 className="text-xl font-bold flex items-center gap-3">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
                Implementation
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed">{content.contents.implementation}</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-bold flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                Support
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed">{content.contents.support}</p>
          </div>
          
      </section>

        <div className="flex gap-2 items-center px-6 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-white">
                Industries: {content.industries.join(", ")}
              </div>

      <ProductItemCTA />
      <div className="h-20" />
    </div>
  );
}

export default ProductItemPage;