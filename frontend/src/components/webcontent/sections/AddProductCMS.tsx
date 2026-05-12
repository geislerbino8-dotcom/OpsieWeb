import { createProduct } from "@/api/createProducts";
import { useState } from "react";
import { Trash2, Package, BarChart3, ListChecks, Globe, ImageIcon, Heart, FileText } from "lucide-react";

// (Interfaces Feature, Benefit, Analytics, and ProductForm remain the same as previous)
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
  image: string;
  tagline: string;
  description: string;
  category: string;
  features: Feature[]; // Stored as Object/Array in Mongo
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


function AddProductCMS() {
  const [form, setForm] = useState<ProductForm>({
    name: "", image: "", tagline: "", description: "", category: "", videoAd: "",
    features: [{ title: "", description: "" }],
    benefits: [{ title: "", description: "" }],
    analytics: [{ title: "", value: "", description: "" }],
    industries: [],
    photos: [],
    contents: { overview: "", problemSolved: "", implementation: "", support: "" }
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

  const save = async ()=> {
    try {
        const response = await createProduct(form)
        console.log(response)
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] text-slate-900 pb-20">
      <header className="sticky top-0 z-50 backdrop-blur-md  px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Product Studio</h1>
        <div>
          <button onClick={()=> window.location.href = "view-products"} className="mr-5 text-gray-400 px-8 py-2 rounded-full font-bold shadow-lg shadow-[#3CBDE6]/20 hover:scale-105 transition-transform">
          Cancel
        </button>

           <button onClick={save} className="mr-5 bg-[#3CBDE6] text-white px-8 py-2 rounded-full font-bold shadow-lg shadow-[#3CBDE6]/20 hover:scale-105 transition-transform">
          Publish to Database
        </button>

        
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-8 mt-12 flex flex-col lg:flex-row gap-12">
        
        {/* LEFT: FORM COLUMN */}
        <div className="flex-1 space-y-10 lg:max-w-[55%]">
          
          {/* 1. Core Identity & Media */}
          <section className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm space-y-6">
             <div className="flex items-center gap-3"><Package className="text-[#3CBDE6]"/><h2 className="font-bold text-lg">Identity & Media</h2></div>
             <div className="grid grid-cols-2 gap-4">
                <input placeholder="Product Name" className="col-span-2 bg-slate-50 rounded-xl p-4" onChange={e => updateField('name', e.target.value)} />
                <input placeholder="Main Hero Image URL" className="bg-slate-50 rounded-xl p-4" onChange={e => updateField('image', e.target.value)} />
                <input placeholder="Category" className="bg-slate-50 rounded-xl p-4" onChange={e => updateField('category', e.target.value)} />
                <input placeholder="Video Ad URL (YouTube/Vimeo)" className="col-span-2 bg-slate-50 rounded-xl p-4" onChange={e => updateField('videoAd', e.target.value)} />
                <textarea placeholder="Tagline (The Hook)" className="col-span-2 bg-slate-50 rounded-xl p-4 font-medium" rows={2} onChange={e => updateField('tagline', e.target.value)} />
                <textarea placeholder="Primary Description" maxLength={70} className="col-span-2 bg-slate-50 rounded-xl p-4" rows={3} onChange={e => updateField('description', e.target.value)} />
             </div>
          </section>

          {/* 2. Deep Dive Content (Mongoose: contents Object) */}
          <section className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm space-y-4">
             <div className="flex items-center gap-3"><FileText className="text-[#3CBDE6]"/><h2 className="font-bold text-lg">Detailed Documentation</h2></div>
             <div className="grid grid-cols-1 gap-4">
               <textarea placeholder="Overview" className="w-full bg-slate-50 rounded-xl p-4" onChange={e => handleContentChange('overview', e.target.value)} />
               <textarea placeholder="Problem Solved" className="w-full bg-slate-50 rounded-xl p-4" onChange={e => handleContentChange('problemSolved', e.target.value)} />
               <textarea placeholder="Implementation Plan" className="w-full bg-slate-50 rounded-xl p-4" onChange={e => handleContentChange('implementation', e.target.value)} />
               <textarea placeholder="Support & Maintenance" className="w-full bg-slate-50 rounded-xl p-4" onChange={e => handleContentChange('support', e.target.value)} />
             </div>
          </section>

          {/* 3. Features Section (Restored) */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg flex items-center gap-2"><ListChecks className="text-[#3CBDE6]" size={20}/> Product Features</h2>
              <button onClick={() => updateField('features', [...form.features, {title: "", description: ""}])} className="text-[#3CBDE6] text-xs font-bold">+ ADD FEATURE</button>
            </div>
            <div className="space-y-4">
              {form.features.map((f, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 relative group">
                  <button name={f.title} onClick={() => removeItem(i, 'features')} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16}/></button>
                  <input placeholder="Feature Title" className="font-bold text-slate-800 w-full mb-2 focus:outline-none" onChange={e => handleNestedChange(i, 'features', 'title', e.target.value)} />
                  <textarea placeholder="What does this feature do?" className="text-sm text-slate-500 w-full focus:outline-none border-none p-0" rows={2} onChange={e => handleNestedChange(i, 'features', 'description', e.target.value)} />
                </div>
              ))}
            </div>
          </section>

          {/* 4. Benefits & Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-md flex items-center gap-2"><Heart className="text-pink-500" size={18}/> Benefits</h2>
                <button onClick={() => updateField('benefits', [...form.benefits, {title: "", description: ""}])} className="text-[#3CBDE6] text-[10px] font-bold">ADD</button>
              </div>
              <div className="space-y-3">
                {form.benefits.map((b, i) => (
                  <div key={i} className="bg-white rounded-xl p-3 border border-slate-200 space-y-1">
                    <input name={b.title} placeholder="Benefit Title" className="font-bold text-sm w-full" onChange={e => handleNestedChange(i, 'benefits', 'title', e.target.value)} />
                    <input placeholder="Short impact..." className="text-[11px] text-slate-400 w-full" onChange={e => handleNestedChange(i, 'benefits', 'description', e.target.value)} />
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-md flex items-center gap-2"><BarChart3 className="text-purple-500" size={18}/> Stats</h2>
                <button onClick={() => updateField('analytics', [...form.analytics, {title: "", value: "", description: ""}])} className="text-[#3CBDE6] text-[10px] font-bold">ADD</button>
              </div>
              <div className="space-y-3">
                {form.analytics.map((a, i) => (
                  <div key={i} className="bg-white rounded-xl p-3 border border-slate-200">
                    <input name={a.title}  placeholder="99.9%" className="text-xl font-black text-[#3CBDE6] w-full" onChange={e => handleNestedChange(i, 'analytics', 'value', e.target.value)} />
                    <input name={a.title} placeholder="Metric" className="text-[10px] font-bold uppercase w-full" onChange={e => handleNestedChange(i, 'analytics', 'title', e.target.value)} />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* 5. Photos & Industries */}
          <section className="bg-slate-900 rounded-xl p-8 text-white grid grid-cols-1 md:grid-cols-2 gap-8">
             <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2"><Globe size={14}/> Target Industries</h3>
                <input value={industryInput} placeholder="Add Industry..." className="w-full bg-white/10 rounded-xl p-3 mb-4 text-sm" onChange={e => setIndustryInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (updateField('industries', [...form.industries, industryInput]), setIndustryInput(""))} />
                <div className="flex flex-wrap gap-2">
                  {form.industries.map((ind, i) => <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold flex items-center gap-2">{ind} <Trash2 size={10} className="cursor-pointer" onClick={() => removeItem(i, 'industries')}/></span>)}
                </div>
             </div>
             <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2"><ImageIcon size={14}/> Photo Gallery</h3>
                <input value={photoInput} placeholder="Image URL..." className="w-full bg-white/10 rounded-xl p-3 mb-4 text-sm" onChange={e => setPhotoInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (updateField('photos', [...form.photos, photoInput]), setPhotoInput(""))} />
                <div className="flex gap-2 overflow-x-auto">
                  {form.photos.map((url, i) => <img key={i} src={url} className="w-10 h-10 rounded-lg object-cover border border-white/20" onClick={() => removeItem(i, 'photos')}/>)}
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
                    {form.image ? <img src={form.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-300"><ImageIcon size={40}/></div>}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-8 flex flex-col justify-end text-white">
                       <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3CBDE6]">{form.category || "CATEGORY"}</span>
                       <h1 className="text-3xl font-black">{form.name || "UNNAMED PRODUCT"}</h1>
                    </div>
                 </div>

                 <div className="p-8 space-y-8 overflow-y-auto">
                    <p className="text-lg text-slate-500 font-medium leading-tight">"{form.tagline || "Tagline preview..."}"</p>
                    
                    {/* Features Preview */}
                    <div className="space-y-4">
                       <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Capabilities</h4>
                       {form.features.map((f, i) => f.title && (
                         <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="w-8 h-8 rounded-full bg-[#3CBDE6] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">{i+1}</div>
                            <div>
                               <h5 className="text-sm font-bold text-slate-800">{f.title}</h5>
                               <p className="text-[11px] text-slate-400">{f.description}</p>
                            </div>
                         </div>
                       ))}
                    </div>

                    {/* Stats Preview */}
                    <div className="grid grid-cols-2 gap-4">
                       {form.analytics.map((a, i) => a.value && (
                         <div key={i} className="p-4 rounded-2xl border border-slate-100 text-center">
                            <div className="text-2xl font-black text-[#3CBDE6] leading-none">{a.value}</div>
                            <div className="text-[10px] font-bold text-slate-400 mt-1">{a.title}</div>
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