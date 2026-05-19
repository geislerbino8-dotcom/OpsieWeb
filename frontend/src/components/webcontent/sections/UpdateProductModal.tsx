import { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface Feature { title: string; description: string; }
interface Benefit { title: string; description: string; }
interface Analytics { title: string; value: string; description: string; }

interface ProductForm {
  name: string;
  image: string;
  tagline: string;
  description: string;
  category: string;
  price?: number; // Added to match your input field
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
  onClose: () => void; // Changed from boolean to function
  onUpdate: (updatedProduct: ProductForm) => void; // Changed from boolean to function
};

function UpdateProductModal({ product, onClose, onUpdate }: ProductModalType) {
  // Initialize with product to avoid undefined errors
  const [formData, setFormData] = useState<ProductForm>(product);

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onUpdate(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-[#111] border border-white/10 p-8 shadow-2xl rounded-2xl animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white tracking-tight italic">
            UPDATE <span className="text-[#3CBDE6]">PRODUCT</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <AiOutlineClose className="text-white text-xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#3CBDE6] transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Image/Logo</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#3CBDE6] transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Video Ad</label>
            <input
              type="text"
              name="video"
              value={formData.videoAd}
              onChange={handleChange}
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#3CBDE6] transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
           
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#3CBDE6] transition-all"
              />
            </div>
          </div>


        <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Tagline</label>
            <textarea
              name="tagline"
              rows={4}
              value={formData.tagline}
              onChange={handleChange}
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#3CBDE6] transition-all resize-none"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Description</label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#3CBDE6] transition-all resize-none"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Overview</label>
            <textarea
              name="overview"
              rows={4}
              value={formData.contents.overview}
              onChange={handleChange}
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#3CBDE6] transition-all resize-none"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Implementation</label>
            <textarea
              name="implementation"
              rows={4}
              value={formData.contents.implementation}
              onChange={handleChange}
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#3CBDE6] transition-all resize-none"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Problem Solved</label>
            <textarea
              name="problemSolved"
              rows={4}
              value={formData.contents.problemSolved}
              onChange={handleChange}
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#3CBDE6] transition-all resize-none"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Support</label>
            <textarea
              name="support"
              rows={4}
              value={formData.contents.support}
              onChange={handleChange}
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#3CBDE6] transition-all resize-none"
            ></textarea>
          </div>



          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-white/10 text-white font-bold uppercase tracking-widest hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#3CBDE6] text-white font-bold uppercase tracking-widest hover:bg-[#2fa8d1] shadow-lg shadow-[#3CBDE6]/20 transition-all active:scale-95"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProductModal;