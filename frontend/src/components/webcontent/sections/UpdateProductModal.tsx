import { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'; 
import { updateProduct } from '@/api/updateProduct';
import { useApiState } from '@/hooks/useApiState';
import { useToast } from '@/hooks/useToast';
import ToastContainer from '@/components/admin/common/ToastComponent';
import LoadingOverlay from '@/components/admin/common/LoadingOverlay';

interface Feature { title: string; description: string; }
interface Benefit { title: string; description: string; }
interface Analytics { title: string; value: string; description: string; }

interface ProductForm {
  _id: string;
  name: string;
  logo: string;
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
  themeColor: string;
}

type ProductModalType = {
  product: ProductForm;
  onClose: () => void;
  onUpdate: (updatedProduct: ProductForm) => void;
};

function UpdateProductModal({ product, onClose, onUpdate }: ProductModalType) {
  const [formData, setFormData] = useState<ProductForm>({
    ...product,
    themeColor: product.themeColor || "#3CBDE6",
    photos: product.photos || [],
    benefits: product.benefits || [],
    analytics: product.analytics || []
  });
  const apiState = useApiState();
  const { toasts, addToast } = useToast();

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        themeColor: product.themeColor || "#3CBDE6",
        photos: product.photos || [],
        benefits: product.benefits || [],
        analytics: product.analytics || []
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? (value === '' ? undefined : parseFloat(value)) : value,
    }));
  };

  const handleNestedChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      contents: {
        ...prev.contents,
        [name]: value,
      },
    }));
  };

  const handleArrayChange = (index: number, key: 'features' | 'benefits' | 'analytics', field: string, value: string) => {
    setFormData((prev) => {
      const updatedArray = [...prev[key]] as any[];
      updatedArray[index] = { ...updatedArray[index], [field]: value };
      return { ...prev, [key]: updatedArray };
    });
  };

  const handlePhotoUrlChange = (index: number, value: string) => {
    setFormData((prev) => {
      const updatedPhotos = [...prev.photos];
      updatedPhotos[index] = value;
      return { ...prev, photos: updatedPhotos };
    });
  };

  const addArrayItem = (key: 'features' | 'benefits' | 'analytics', emptyObj: any) => {
    setFormData((prev) => ({ ...prev, [key]: [...prev[key], emptyObj] as any }));
  };

  const addPhotoItem = () => {
    setFormData((prev) => ({ ...prev, photos: [...prev.photos, ''] }));
  };

  const removeArrayItem = (index: number, key: 'features' | 'benefits' | 'analytics') => {
    setFormData((prev) => ({
      ...prev,
      [key]: (prev[key] as any[]).filter((_, i) => i !== index),
    }));
  };

  const removePhotoItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const handleIndustriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map((tag) => tag.trim());
    setFormData((prev) => ({ ...prev, industries: tags }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    try {
      apiState.startLoading();
      const res = await updateProduct({
        id: formData._id,
        data: formData,
      });

      console.log(res.message);
      addToast(res.message, 'success');
      onClose();
    } catch (err: any) {
      console.error("Failed to update product:", err);
      addToast(err || "An error occurred", 'error');
    } finally {
      apiState.reset();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 shadow-2xl rounded-2xl flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-wide">
              Edit Product <span style={{ color: formData.themeColor }}>Information</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">ID: {formData._id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
          >
            <AiOutlineClose className="text-xl" />
          </button>
        </div>

        {/* Scrollable Form Box */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-8 text-left custom-scrollbar">
          
          {/* Section 1: Core Essentials */}
          <div className="space-y-4">
            <h3 style={{ color: formData.themeColor }} className="text-xs font-bold uppercase tracking-wider transition-colors">1. Core Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#3CBDE6] focus:ring-2 focus:ring-[#3CBDE6]/10 transition-all"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#3CBDE6] focus:ring-2 focus:ring-[#3CBDE6]/10 transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Tagline</label>
                <input
                  type="text"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#3CBDE6] focus:ring-2 focus:ring-[#3CBDE6]/10 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Price ($ USD)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price ?? ''}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#3CBDE6] focus:ring-2 focus:ring-[#3CBDE6]/10 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600">Main Description</label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#3CBDE6] focus:ring-2 focus:ring-[#3CBDE6]/10 transition-all resize-none"
              ></textarea>
            </div>
          </div>

          {/* Section 2: Media Assets & Scope */}
          <div className="space-y-4">
            <h3 style={{ color: formData.themeColor }} className="text-xs font-bold uppercase tracking-wider transition-colors">2. Asset URLs & Target</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Product Logo Asset URL</label>
                <input
                  type="text"
                  name="logo"
                  value={formData.logo}
                  onChange={handleChange}
                  placeholder="https://example.com/logo.png"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#3CBDE6] focus:ring-2 focus:ring-[#3CBDE6]/10 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Cover Image Asset URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#3CBDE6] focus:ring-2 focus:ring-[#3CBDE6]/10 transition-all"
                />
              </div>
              <div className="col-span-1 md:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Video Commercial / Ad Link</label>
                <input
                  type="text"
                  name="videoAd"
                  value={formData.videoAd}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#3CBDE6] focus:ring-2 focus:ring-[#3CBDE6]/10 transition-all"
                />
              </div>

              {/* Theme Color Form Integration Substation */}
              <div className="col-span-1 md:col-span-2 bg-slate-50 rounded-xl p-4 border border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                <div className="space-y-0.5">
                  <label className="text-xs font-bold text-slate-700 block">Theme Palette Tint</label>
                  <span className="text-[11px] text-slate-400 block">System custom interface accent coloring</span>
                </div>
                <div className="sm:col-span-2 flex gap-3 items-center">
                  <div className="relative w-12 h-11 rounded-xl overflow-hidden border border-slate-200 shadow-sm shrink-0 hover:scale-105 transition-transform">
                    <input 
                      type="color"
                      name="themeColor"
                      value={formData.themeColor}
                      onChange={handleChange}
                      className="absolute inset-[-10px] w-[200%] h-[200%] cursor-pointer p-0 border-none"
                    />
                  </div>
                  <input 
                    type="text"
                    name="themeColor"
                    value={formData.themeColor}
                    placeholder="#3CBDE6"
                    maxLength={7}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 font-mono text-xs uppercase text-slate-700 outline-none focus:border-slate-300"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600">Target Industries (Comma Separated)</label>
              <input
                type="text"
                value={formData.industries?.join(', ')}
                onChange={handleIndustriesChange}
                placeholder="SaaS, FinTech, E-commerce"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#3CBDE6] focus:ring-2 focus:ring-[#3CBDE6]/10 transition-all"
              />
            </div>
          </div>

          {/* Section 3: Deep Contents */}
          <div className="space-y-4">
            <h3 style={{ color: formData.themeColor }} className="text-xs font-bold uppercase tracking-wider transition-colors">3. Product Copywriting</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Overview Pitch</label>
                <textarea
                  name="overview"
                  rows={3}
                  value={formData.contents?.overview}
                  onChange={handleNestedChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#3CBDE6] focus:ring-2 focus:ring-[#3CBDE6]/10 transition-all resize-none"
                ></textarea>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Problem Solved Statement</label>
                <textarea
                  name="problemSolved"
                  rows={3}
                  value={formData.contents?.problemSolved}
                  onChange={handleNestedChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#3CBDE6] focus:ring-2 focus:ring-[#3CBDE6]/10 transition-all resize-none"
                ></textarea>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Implementation Details</label>
                <textarea
                  name="implementation"
                  rows={3}
                  value={formData.contents?.implementation}
                  onChange={handleNestedChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#3CBDE6] focus:ring-2 focus:ring-[#3CBDE6]/10 transition-all resize-none"
                ></textarea>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Support Overview</label>
                <textarea
                  name="support"
                  rows={3}
                  value={formData.contents?.support}
                  onChange={handleNestedChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#3CBDE6] focus:ring-2 focus:ring-[#3CBDE6]/10 transition-all resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Section 4: Features Breakdown */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 style={{ color: formData.themeColor }} className="text-xs font-bold uppercase tracking-wider transition-colors">4. Features Breakdown</h3>
              <button
                type="button"
                onClick={() => addArrayItem('features', { title: '', description: '' })}
                style={{ color: formData.themeColor }}
                className="text-xs font-bold flex items-center gap-1 opacity-90 hover:opacity-100 transition-opacity"
              >
                <AiOutlinePlus /> Add Feature
              </button>
            </div>
            
            <div className="space-y-3">
              {formData.features?.map((feat, index) => (
                <div key={index} className="flex gap-3 items-center bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Feature Title"
                      value={feat.title}
                      onChange={(e) => handleArrayChange(index, 'features', 'title', e.target.value)}
                      className="sm:col-span-1 bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-900 focus:outline-none focus:border-slate-300"
                    />
                    <input
                      type="text"
                      placeholder="Feature brief description..."
                      value={feat.description}
                      onChange={(e) => handleArrayChange(index, 'features', 'description', e.target.value)}
                      className="sm:col-span-2 bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-900 focus:outline-none focus:border-slate-300"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index, 'features')}
                    className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Benefits Breakdown (NEW INPUT FIELD) */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 style={{ color: formData.themeColor }} className="text-xs font-bold uppercase tracking-wider transition-colors">5. Key Benefits</h3>
              <button
                type="button"
                onClick={() => addArrayItem('benefits', { title: '', description: '' })}
                style={{ color: formData.themeColor }}
                className="text-xs font-bold flex items-center gap-1 opacity-90 hover:opacity-100 transition-opacity"
              >
                <AiOutlinePlus /> Add Benefit
              </button>
            </div>
            
            <div className="space-y-3">
              {formData.benefits?.map((benefit, index) => (
                <div key={index} className="flex gap-3 items-center bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Benefit Title"
                      value={benefit.title}
                      onChange={(e) => handleArrayChange(index, 'benefits', 'title', e.target.value)}
                      className="sm:col-span-1 bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-900 focus:outline-none focus:border-slate-300"
                    />
                    <input
                      type="text"
                      placeholder="Benefit description..."
                      value={benefit.description}
                      onChange={(e) => handleArrayChange(index, 'benefits', 'description', e.target.value)}
                      className="sm:col-span-2 bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-900 focus:outline-none focus:border-slate-300"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index, 'benefits')}
                    className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
\                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: Photo Album Assets */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 style={{ color: formData.themeColor }} className="text-xs font-bold uppercase tracking-wider transition-colors">6. Photo Album Showcase</h3>
              <button
                type="button"
                onClick={addPhotoItem}
                style={{ color: formData.themeColor }}
                className="text-xs font-bold flex items-center gap-1 opacity-90 hover:opacity-100 transition-opacity"
              >
                <AiOutlinePlus /> Add Photo URL
              </button>
            </div>
            
            {formData.photos.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No photos added yet. Click "Add Photo URL" to start building your album.</p>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {formData.photos.map((photoUrl, index) => (
                  <div key={index} className="flex gap-3 items-center bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <div className="flex-1 flex gap-3 items-center">
                      <span className="text-xs font-bold text-slate-400 w-6 text-center">#{index + 1}</span>
                      <input
                        type="text"
                        placeholder="https://example.com/album-image.png"
                        value={photoUrl}
                        onChange={(e) => handlePhotoUrlChange(index, e.target.value)}
                        className="flex-1 bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-900 focus:outline-none focus:border-slate-300"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removePhotoItem(index)}
                      className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
\                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 7: Analytics Parameters (NEW INPUT FIELD) */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 style={{ color: formData.themeColor }} className="text-xs font-bold uppercase tracking-wider transition-colors">7. Product Analytics Metrics</h3>
              <button
                type="button"
                onClick={() => addArrayItem('analytics', { title: '', value: '', description: '' })}
                style={{ color: formData.themeColor }}
                className="text-xs font-bold flex items-center gap-1 opacity-90 hover:opacity-100 transition-opacity"
              >
                <AiOutlinePlus /> Add Metric
              </button>
            </div>
            
            <div className="space-y-3">
              {formData.analytics?.map((metric, index) => (
                <div key={index} className="flex gap-3 items-center bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <input
                      type="text"
                      placeholder="Metric Title (e.g., Users)"
                      value={metric.title}
                      onChange={(e) => handleArrayChange(index, 'analytics', 'title', e.target.value)}
                      className="sm:col-span-1 bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-900 focus:outline-none focus:border-slate-300"
                    />
                    <input
                      type="text"
                      placeholder="Value (e.g., 1200+)"
                      value={metric.value}
                      onChange={(e) => handleArrayChange(index, 'analytics', 'value', e.target.value)}
                      className="sm:col-span-1 bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-900 focus:outline-none focus:border-slate-300"
                    />
                    <input
                      type="text"
                      placeholder="Short descriptor statement..."
                      value={metric.description}
                      onChange={(e) => handleArrayChange(index, 'analytics', 'description', e.target.value)}
                      className="sm:col-span-2 bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-900 focus:outline-none focus:border-slate-300"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index, 'analytics')}
                    className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                  </button>
                </div>
              ))}
            </div>
          </div>

        </form>

        {/* Footer Area */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            type="submit"
            style={{ backgroundColor: formData.themeColor }}
            className="px-6 py-2.5 text-white text-sm font-semibold rounded-xl opacity-90 hover:opacity-100 active:scale-[0.98] transition-all shadow-md"
          >
            Save Changes
          </button>
        </div>

      </div>

      {apiState.status === 'loading' && <LoadingOverlay />}
      <ToastContainer toasts={toasts}/>

    </div>
  );
}

export default UpdateProductModal;