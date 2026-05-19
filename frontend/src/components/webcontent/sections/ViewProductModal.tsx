import { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineDollar, AiOutlineTag, AiOutlineVideoCamera, AiOutlineFundProjectionScreen } from 'react-icons/ai';

interface Feature { title: string; description: string; }
interface Benefit { title: string; description: string; }
interface Analytics { title: string; value: string; description: string; }

interface ProductForm {
  _id: string;
  name: string;
  image: string;
  tagline: string;
  description: string;
  category: string;
  price?: number;
  features: Feature[];
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

type ProductModalType = {
  product: ProductForm;
  onClose: () => void;
  onUpdate?: (updatedProduct: ProductForm) => void;
};

function ViewProductModal({ product, onClose }: ProductModalType) {
  const [data, setData] = useState<ProductForm>(product);

  useEffect(() => {
    if (product) {
      setData(product);
    }
  }, [product]);

  console.log(product)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400 mb-2">
              <AiOutlineTag className="w-3 h-3" /> {data.category}
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{data.name}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 italic">"{data.tagline}"</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <AiOutlineClose className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left / Main Column (2/3 width on desktop) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Image */}
            {data.image && (
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
                <img src={data.image} alt={data.name} className="w-full h-full object-cover" />
              </div>
            )}

            {/* Description & Overview */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white border-b pb-2 border-slate-100 dark:border-slate-800">About the Product</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">{data.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Problem Solved</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{data.contents?.problemSolved}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Implementation</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{data.contents?.implementation}</p>
                </div>
              </div>
            </div>

            {/* Features & Benefits Toggle or Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-md font-semibold text-slate-900 dark:text-white mb-3">Key Features</h3>
                <ul className="space-y-3">
                  {data.features && data.features?.map((item, idx) => (
                    <li key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-100 dark:border-slate-800">
                      <h4 className="text-sm font-medium text-slate-800 dark:text-slate-200">{item.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-md font-semibold text-slate-900 dark:text-white mb-3">Core Benefits</h3>
                <ul className="space-y-3">
                  {data.benefits?.map((item, idx) => (
                    <li key={idx} className="p-3 bg-emerald-50/40 dark:bg-emerald-950/10 rounded-lg border border-emerald-100/50 dark:border-emerald-900/30">
                      <h4 className="text-sm font-medium text-emerald-900 dark:text-emerald-400">{item.title}</h4>
                      <p className="text-xs text-emerald-700/80 dark:text-emerald-500/80 mt-0.5">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Photo Gallery Grid */}
            {data.photos && data.photos.length > 0 && (
              <div>
                <h3 className="text-md font-semibold text-slate-900 dark:text-white mb-3">Product Gallery</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {data.photos.map((photo, idx) => (
                    <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
                      <img src={photo} alt={`${data.name} gallery ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-200" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column / Sidebar (1/3 width on desktop) */}
          <div className="space-y-6 lg:border-l lg:border-slate-100 lg:dark:border-slate-800 lg:pl-6">
            
            {/* Price Card */}
            {data.price !== undefined && (
              <div className="p-4 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-slate-800/60 rounded-xl border border-indigo-100 dark:border-slate-700">
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 flex items-center gap-1 mb-1">
                  <AiOutlineDollar /> Investment / Price
                </span>
                <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  ${data.price.toLocaleString()}
                </p>
              </div>
            )}

            {/* Analytics Section */}
            {data.analytics && data.analytics.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-1.5">
                  <AiOutlineFundProjectionScreen className="text-base" /> Performance Analytics
                </h3>
                <div className="space-y-3">
                  {data.analytics.map((metric, idx) => (
                    <div key={idx} className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{metric.title}</p>
                      <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400 my-0.5">{metric.value}</p>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500">{metric.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Target Industries */}
            {data.industries && data.industries.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Target Industries</h3>
                <div className="flex flex-wrap gap-1.5">
                  {data.industries.map((ind, idx) => (
                    <span key={idx} className="text-xs px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md font-medium">
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Video Ad CTA link if exists */}
            {data.videoAd && (
              <a 
                href={data.videoAd} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-medium text-sm rounded-xl transition-colors shadow-sm"
              >
                <AiOutlineVideoCamera className="text-lg" /> Watch Video Commercial
              </a>
            )}

            {/* Support Meta */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block mb-1">Support Channel</span>
              <p className="text-xs text-slate-600 dark:text-slate-400">{data.contents?.support || 'Standard support included'}</p>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>  
  );
}

export default ViewProductModal;