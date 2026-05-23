import { createProduct } from "@/api/createProducts";
import { useState } from "react";
import { Trash2, Package, BarChart3, ListChecks, Globe, ImageIcon, Heart, FileText, Pipette } from "lucide-react";

interface Feature {
  title: string;
  description: string;
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

interface ProductForm {
  name: string;
  logo: string;
  image: string;
  tagline: string;
  description: string;
  category: string;
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

function AddProductCMS() {
  const [form, setForm] = useState<ProductForm>({
    name: "", image: "", tagline: "", description: "", category: "", videoAd: "",
    logo: "",
    features: [{ title: "", description: "" }],
    benefits: [{ title: "", description: "" }],
    analytics: [{ title: "", value: "", description: "" }],
    industries: [],
    photos: [],
    contents: { overview: "", problemSolved: "", implementation: "", support: "" },
    themeColor: "#3CBDE6" // Defaulted to your brand blue
  });

  const [industryInput, setIndustryInput] = useState("");
  const [photoInput, setPhotoInput] = useState("");

  const updateField = (field: keyof ProductForm, value: any) => setForm(prev => ({ ...prev, [field]: value }));
  
  const handleContentChange = (field: keyof ProductForm['contents'], value: string) => {
    setForm(prev => ({ ...prev, contents: { ...prev.contents, [field]: value } }));
  };

  const handleNestedChange = (index: number, collection: 'features' | 'benefits' | 'analytics', field: string, value: string) => {
    const updated = [...form[collection]] as any[];
    updated[index][field] = value;
    updateField(collection, updated);
  };

  const removeItem = (index: number, collection: 'features' | 'benefits' | 'analytics' | 'industries' | 'photos') => {
    const updated = (form[collection] as any[]).filter((_, i) => i !== index);
    updateField(collection, updated);
  };

  const save = async () => {
    try {
      const response = await createProduct(form);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] text-slate-900 pb-20">
      <header className="sticky top-0 z-50 backdrop-blur-md px-8 py-4 flex justify-between items-center border-b border-slate-200 bg-white/80">
        <h1 className="text-xl font-bold">Product Studio</h1>
        <div>
          <button onClick={() => window.location.href = "view-products"} className="mr-5 text-gray-500 px-8 py-2 rounded-full font-bold hover:bg-slate-100 transition-colors">
            Cancel
          </button>
          <button onClick={save} className="bg-[#3CBDE6] text-white px-8 py-2 rounded-full font-bold shadow-lg shadow-[#3CBDE6]/20 hover:scale-105 transition-transform">
            Publish to Database
          </button>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-8 mt-12 flex flex-col lg:flex-row gap-12">
        
        {/* LEFT: FORM COLUMN */}
        <div className="flex-1 space-y-10 lg:max-w-[55%]">
          
          {/* 1. Core Identity, Media & Theme Configuration */}
          <section className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <Package className="text-[#3CBDE6]"/>
              <h2 className="font-bold text-lg">Identity & Media</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="Product Name" className="col-span-2 bg-slate-50 rounded-xl p-4 border border-transparent focus:border-slate-200 focus:bg-white outline-none transition-all" onChange={e => updateField('name', e.target.value)} />
              
              {/* Added Logo URL Input field */}
              <input placeholder="Product Logo Image URL" className="col-span-2 bg-slate-50 rounded-xl p-4 border border-transparent focus:border-slate-200 focus:bg-white outline-none transition-all" onChange={e => updateField('logo', e.target.value)} />
              
              <input placeholder="Main Hero Image URL" className="bg-slate-50 rounded-xl p-4 border border-transparent focus:border-slate-200 focus:bg-white outline-none transition-all" onChange={e => updateField('image', e.target.value)} />
              <input placeholder="Category" className="bg-slate-50 rounded-xl p-4 border border-transparent focus:border-slate-200 focus:bg-white outline-none transition-all" onChange={e => updateField('category', e.target.value)} />
              <input placeholder="Video Ad URL (YouTube/Vimeo)" className="col-span-2 bg-slate-50 rounded-xl p-4 border border-transparent focus:border-slate-200 focus:bg-white outline-none transition-all" onChange={e => updateField('videoAd', e.target.value)} />
              
              {/* Theme Color Input Substation */}
              <div className="col-span-2 bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3">
                <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
                  <Pipette size={16} style={{ color: form.themeColor }} />
                  <span>Product Accent System Color</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-200 shadow-inner shrink-0 transition-transform hover:scale-105">
                    <input 
                      type="color" 
                      value={form.themeColor || "#3CBDE6"} 
                      className="absolute inset-[-10px] w-[200%] h-[200%] cursor-pointer p-0 border-none"
                      onChange={e => updateField('themeColor', e.target.value)} 
                    />
                  </div>
                  <input 
                    type="text"
                    value={form.themeColor}
                    placeholder="#3CBDE6"
                    maxLength={7}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 font-mono text-sm uppercase text-slate-700 outline-none focus:border-slate-300"
                    onChange={e => updateField('themeColor', e.target.value)} 
                  />
                </div>
              </div>

              <textarea placeholder="Tagline (The Hook) *50 characters" maxLength={50} className="col-span-2 bg-slate-50 rounded-xl p-4 font-medium border border-transparent focus:border-slate-200 focus:bg-white outline-none transition-all" rows={2} onChange={e => updateField('tagline', e.target.value)} />
              <textarea placeholder="Primary Description" className="col-span-2 bg-slate-50 rounded-xl p-4 border border-transparent focus:border-slate-200 focus:bg-white outline-none transition-all" rows={3} onChange={e => updateField('description', e.target.value)} />
            </div>
          </section>

          {/* 2. Deep Dive Content */}
          <section className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm space-y-4">
             <div className="flex items-center gap-3"><FileText className="text-[#3CBDE6]"/><h2 className="font-bold text-lg">Detailed Documentation</h2></div>
             <div className="grid grid-cols-1 gap-4">
               <textarea placeholder="Overview" className="w-full bg-slate-50 rounded-xl p-4 outline-none border border-transparent focus:border-slate-200" onChange={e => handleContentChange('overview', e.target.value)} />
               <textarea placeholder="Problem Solved" className="w-full bg-slate-50 rounded-xl p-4 outline-none border border-transparent focus:border-slate-200" onChange={e => handleContentChange('problemSolved', e.target.value)} />
               <textarea placeholder="Implementation Plan" className="w-full bg-slate-50 rounded-xl p-4 outline-none border border-transparent focus:border-slate-200" onChange={e => handleContentChange('implementation', e.target.value)} />
               <textarea placeholder="Support & Maintenance" className="w-full bg-slate-50 rounded-xl p-4 outline-none border border-transparent focus:border-slate-200" onChange={e => handleContentChange('support', e.target.value)} />
             </div>
          </section>

          {/* 3. Features Section */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg flex items-center gap-2"><ListChecks className="text-[#3CBDE6]" size={20}/> Product Features</h2>
              <button onClick={() => updateField('features', [...form.features, {title: "", description: ""}])} className="text-[#3CBDE6] text-xs font-bold hover:underline">+ ADD FEATURE</button>
            </div>
            <div className="space-y-4">
              {form.features.map((f, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 relative group shadow-sm">
                  <button onClick={() => removeItem(i, 'features')} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16}/></button>
                  <input value={f.title} placeholder="Feature Title" className="font-bold text-slate-800 w-full mb-2 focus:outline-none" onChange={e => handleNestedChange(i, 'features', 'title', e.target.value)} />
                  <textarea value={f.description} placeholder="What does this feature do?" className="text-sm text-slate-500 w-full focus:outline-none border-none p-0 resize-none" rows={2} onChange={e => handleNestedChange(i, 'features', 'description', e.target.value)} />
                </div>
              ))}
            </div>
          </section>

          {/* 4. Benefits & Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-md flex items-center gap-2"><Heart className="text-pink-500" size={18}/> Benefits</h2>
                <button onClick={() => updateField('benefits', [...form.benefits, {title: "", description: ""}])} className="text-[#3CBDE6] text-[10px] font-bold hover:underline">ADD</button>
              </div>
              <div className="space-y-3">
                {form.benefits.map((b, i) => (
                  <div key={i} className="bg-white rounded-xl p-3 border border-slate-200 space-y-1 relative group shadow-sm">
                    <button onClick={() => removeItem(i, 'benefits')} className="absolute top-2 right-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={12}/></button>
                    <input value={b.title} placeholder="Benefit Title" className="font-bold text-sm w-full outline-none" onChange={e => handleNestedChange(i, 'benefits', 'title', e.target.value)} />
                    <input value={b.description} placeholder="Short impact..." className="text-[11px] text-slate-400 w-full outline-none" onChange={e => handleNestedChange(i, 'benefits', 'description', e.target.value)} />
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-md flex items-center gap-2"><BarChart3 className="text-purple-500" size={18}/> Stats</h2>
                <button onClick={() => updateField('analytics', [...form.analytics, {title: "", value: "", description: ""}])} className="text-[#3CBDE6] text-[10px] font-bold hover:underline">ADD</button>
              </div>
              <div className="space-y-3">
                {form.analytics.map((a, i) => (
                  <div key={i} className="bg-white rounded-xl p-3 border border-slate-200 relative group shadow-sm">
                    <button onClick={() => removeItem(i, 'analytics')} className="absolute top-2 right-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={12}/></button>
                    <input value={a.value} style={{ color: form.themeColor || '#3CBDE6' }} placeholder="99.9%" className="text-xl font-black w-full outline-none transition-colors" onChange={e => handleNestedChange(i, 'analytics', 'value', e.target.value)} />
                    <input value={a.title} placeholder="Metric" className="text-[10px] font-bold uppercase w-full outline-none" onChange={e => handleNestedChange(i, 'analytics', 'title', e.target.value)} />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* 5. Photos & Industries */}
          <section className="bg-slate-900 rounded-xl p-8 text-white grid grid-cols-1 md:grid-cols-2 gap-8">
             <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2"><Globe size={14}/> Target Industries</h3>
                <input value={industryInput} placeholder="Add Industry & Press Enter..." className="w-full bg-white/10 rounded-xl p-3 mb-4 text-sm text-white outline-none focus:bg-white/15" onChange={e => setIndustryInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && industryInput.trim() && (updateField('industries', [...form.industries, industryInput.trim()]), setIndustryInput(""))} />
                <div className="flex flex-wrap gap-2">
                  {form.industries.map((ind, i) => <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold flex items-center gap-2">{ind} <Trash2 size={10} className="cursor-pointer text-slate-400 hover:text-red-400" onClick={() => removeItem(i, 'industries')}/></span>)}
                </div>
             </div>
             <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2"><ImageIcon size={14}/> Photo Gallery</h3>
                <input value={photoInput} placeholder="Image URL & Press Enter..." className="w-full bg-white/10 rounded-xl p-3 mb-4 text-sm text-white outline-none focus:bg-white/15" onChange={e => setPhotoInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && photoInput.trim() && (updateField('photos', [...form.photos, photoInput.trim()]), setPhotoInput(""))} />
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                  {form.photos.map((url, i) => <img key={i} src={url} alt="Gallery item" className="w-10 h-10 rounded-lg object-cover border border-white/20 cursor-pointer hover:border-red-500 transition-colors" onClick={() => removeItem(i, 'photos')}/>)}
                </div>
             </div>
          </section>
        </div>

        {/* RIGHT: LIVE PREVIEW COLUMN */}
        <div className="lg:w-[45%]">
           <div className="sticky top-32 space-y-4">
              <div className="bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[850px]">
                 
                 {/* Hero Preview */}
                 <div className="h-60 bg-slate-100 relative">
                    {form.image ? <img src={form.image} alt="Hero preview" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-300"><ImageIcon size={40}/></div>}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8 flex flex-col justify-end text-white">
                       <span style={{ color: form.themeColor || '#3CBDE6' }} className="text-[10px] font-black uppercase tracking-[0.2em] transition-colors">
                         {form.category || "CATEGORY"}
                       </span>
                       
                       {/* Identity Brand Row (Displays Brand Logo + Name) */}
                       <div className="flex items-center gap-3 mt-1.5">
                         {form.logo && (
                           <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm p-1.5 flex items-center justify-center border border-white/20 shrink-0">
                             <img src={form.logo} alt="Product logo blueprint" className="w-full h-full object-contain" />
                           </div>
                         )}
                         <h1 className="text-3xl font-black uppercase tracking-tight truncate">
                           {form.name || "UNNAMED PRODUCT"}
                         </h1>
                       </div>

                    </div>
                 </div>

                 <div className="p-8 space-y-8 overflow-y-auto no-scrollbar">
                    <p className="text-lg text-slate-500 font-medium leading-tight italic">"{form.tagline || "Tagline preview..."}"</p>
                    
                    {/* Features Preview */}
                    <div className="space-y-4">
                       <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Capabilities</h4>
                       {form.features.map((f, i) => f.title && (
                         <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 items-start animate-fade-in">
                            <div 
                              style={{ backgroundColor: form.themeColor || '#3CBDE6' }} 
                              className="w-7 h-7 rounded-full text-white flex items-center justify-center font-bold text-xs shrink-0 transition-colors shadow-sm"
                            >
                              {i+1}
                            </div>
                            <div>
                               <h5 className="text-sm font-bold text-slate-800">{f.title}</h5>
                               <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{f.description}</p>
                            </div>
                         </div>
                       ))}
                    </div>

                    {/* Stats Preview */}
                    <div className="grid grid-cols-2 gap-4">
                       {form.analytics.map((a, i) => a.value && (
                         <div key={i} className="p-4 rounded-2xl border border-slate-100 text-center bg-slate-50/50">
                            <div style={{ color: form.themeColor || '#3CBDE6' }} className="text-2xl font-black leading-none transition-colors">
                              {a.value}
                            </div>
                            <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{a.title || "Metric"}</div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
              <p className="text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest">Previewing Data Layer</p>
           </div>
        </div>

      </main>
    </div>
  );
}

export default AddProductCMS;