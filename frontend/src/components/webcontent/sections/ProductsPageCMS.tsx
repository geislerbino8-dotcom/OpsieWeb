import React, { useContext, useEffect, useState } from "react";
import { WebContentContext } from "../WebContentFrom";
import { updateContent } from "@/api/updateContent";

interface ButtonLink {
  text: string;
  link: string;
}

interface ProductsPage {
  header: string;
  subHeader: string;
  button1: ButtonLink;
  button2: ButtonLink;
  section2: {
    header: string;
    subHeader: string;
  };
}

const ProductsPageCMS: React.FC = () => {
  const content = useContext(WebContentContext);
  const [formData, setFormData] = useState<ProductsPage | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (content?.draftContent.productsPage) {
      setFormData(content.draftContent.productsPage);
    }
  }, [content]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    setFormData((prev) => {
      if (!prev) return null;
      
      // If it's a top-level key (header, subHeader)
      if (keys.length === 1) {
        return { ...prev, [name]: value };
      }

      // If it's a nested key (button1.text, section2.header, etc.)
      const parentKey = keys[0] as keyof ProductsPage;
      return {
        ...prev,
        [parentKey]: {
          ...(prev[parentKey] as object),
          [keys[1]]: value,
        },
      };
    });
  };

  const saveChanges = async () => {
    if (!formData) return;
    try {
      await updateContent({
        id: "69ed83215f12c5a147e02160", // Your document ID
        path: "draftContent.productsPage",
        value: formData,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleCancel = () => {
    setFormData(content?.draftContent.productsPage || null);
    setIsEditing(false);
  };

  if (!formData) return <div className="p-10 text-center">Loading Content...</div>;

  return (
    <div className="w-full flex items-center justify-center bg-gray-50 p-6">
      <div className={`w-full max-w-2xl bg-white rounded-2xl shadow-xl transition-all border-2 ${isEditing ? "border-blue-500" : "border-transparent"}`}>
        
        {isEditing ? (
          /* --- CMS EDITOR VIEW --- */
          <div className="flex flex-col gap-6 p-8 max-h-[85vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 text-center uppercase tracking-tight">Edit Products Hero</h2>

            {/* Main Header & SubHeader */}
            <div className="space-y-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Main Title</label>
                <input name="header" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" value={formData.header} onChange={handleChange} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Hero Description</label>
                <textarea name="subHeader" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[80px]" value={formData.subHeader} onChange={handleChange} />
              </div>
            </div>

            {/* Buttons Configuration */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-xl space-y-3">
                <label className="text-[10px] font-bold text-blue-500 uppercase">Primary Button</label>
                <input name="button1.text" placeholder="Label" className="w-full p-2 border rounded bg-white text-sm" value={formData.button1.text} onChange={handleChange} />
                <input name="button1.link" placeholder="Link URL" className="w-full p-2 border rounded bg-white text-[10px] text-gray-400" value={formData.button1.link} onChange={handleChange} />
              </div>
              <div className="p-4 border rounded-xl space-y-3">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Secondary Button</label>
                <input name="button2.text" placeholder="Label" className="w-full p-2 border rounded bg-white text-sm" value={formData.button2.text} onChange={handleChange} />
                <input name="button2.link" placeholder="Link URL" className="w-full p-2 border rounded bg-white text-[10px] text-gray-400" value={formData.button2.link} onChange={handleChange} />
              </div>
            </div>

            {/* Digital Ecosystem Section */}
            <div className="space-y-3 p-4 bg-purple-50/50 border border-dashed border-purple-200 rounded-xl">
              <label className="text-[10px] font-bold text-purple-600 uppercase tracking-widest">Section 2: Ecosystem</label>
              <input name="section2.header" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500" value={formData.section2.header} onChange={handleChange} placeholder="Header" />
              <textarea name="section2.subHeader" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 min-h-[60px] text-sm" value={formData.section2.subHeader} onChange={handleChange} placeholder="Subheader" />
            </div>

            <div className="flex flex-col gap-2 pt-4">
              <button onClick={saveChanges} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-lg active:scale-[0.98]">
                Update Products Content
              </button>
              <button onClick={handleCancel} className="w-full py-3 text-gray-500 font-medium hover:text-gray-700 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* --- PREVIEW VIEW --- */
          <div className="p-12 cursor-pointer group relative text-center" onClick={() => setIsEditing(true)}>
            <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 rounded-2xl">
              <span className="text-blue-600 font-bold bg-white px-6 py-2 rounded-full shadow-xl border border-blue-100">Click to Edit Section</span>
            </div>

            <h1 className="text-4xl font-black text-gray-900 mb-4 leading-tight">
              {/* This replaces asterisks with bold spans if you use that formatting convention */}
              {formData.header.split('*').map((part, i) => i % 2 === 1 ? <span key={i} className="text-blue-600">{part}</span> : part)}
            </h1>
            <p className="text-gray-500 mb-10 max-w-md mx-auto leading-relaxed">{formData.subHeader}</p>

            <div className="flex justify-center gap-4 mb-16">
              <button className="bg-blue-600 text-white px-8 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-blue-200">
                {formData.button1.text}
              </button>
              <button className="border border-gray-200 px-8 py-2.5 rounded-full text-sm font-bold text-gray-700 hover:bg-gray-50">
                {formData.button2.text}
              </button>
            </div>

            <div className="pt-10 border-t border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">{formData.section2.header.replace(/\*/g, '')}</h3>
              <p className="text-xs text-gray-400 mt-2 italic">{formData.section2.subHeader}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPageCMS;