import { updateContent } from "@/api/updateContent";
import React, { useEffect, useState, useContext } from "react";
import { WebContentContext } from "../WebContentFrom";

interface ProductSection {
  header: string;
  subHeader: string;
  buttonText: string;
  link: string;
}

const ProductSectionCMS: React.FC = () => {
  const content = useContext(WebContentContext);
  
  // Start with null to handle initial loading state properly
  const [formData, setFormData] = useState<ProductSection | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Sync state when context data loads
  useEffect(() => {
    if (content?.productsSection) {
      setFormData(content.productsSection);
    }
  }, [content]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const saveChanges = async () => {
    if (!formData) return;

    try {
      const update = await updateContent({
        id: "69ed83215f12c5a147e02160",
        path: "productsSection",
        value: formData
      });

      console.log("Update Success:", update);
      setIsEditing(false);
    } catch (error) {
      console.error("Update Failed:", error);
    }
  };

  const handleCancel = () => {
    // Revert form data to original context values
    setFormData(content?.productsSection || null);
    setIsEditing(false);
  };

  // Safe guard for loading state
  if (!formData) return <div className="p-6 text-center text-gray-500">Loading Product Data...</div>;

  return (
    <div className="w-full flex items-center justify-center bg-gray-50 p-6">
      <div className={`w-full max-w-2xl p-8 bg-white rounded-2xl shadow-xl transition-all border-2 ${isEditing ? 'border-blue-500' : 'border-transparent'}`}>
        
        {isEditing ? (
          /* --- CMS EDITOR VIEW --- */
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-800 text-center mb-2">Edit Product Section</h2>
            
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Header</label>
              <input
                name="header"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.header || ""}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Subheader</label>
              <textarea
                name="subHeader"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px]"
                value={formData.subHeader || ""}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Button Text</label>
              <input
                name="buttonText"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.buttonText || ""}
                onChange={handleChange}
              />
            </div>
        
            <div className="flex gap-2 pt-2">
              <button 
                onClick={saveChanges}
                className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
              >
                Save Changes
              </button>

              <button
                onClick={handleCancel}
                className="flex-1 py-3 bg-gray-400 hover:bg-gray-500 text-white font-bold rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* --- LIVE PREVIEW VIEW --- */
          <div 
            className="text-center cursor-pointer group relative" 
            onClick={() => setIsEditing(true)}
          >


             <div className="absolute inset-0 bg-blue-50/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
              <span className="text-blue-600 font-semibold">Click to Edit</span>
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-2">{formData.header}</h2>
            <p className="text-gray-600 mb-4">{formData.subHeader}</p>
            <button className="bg-[#3CBDE6] hover:bg-[#34a8cd] text-white px-8 py-2 rounded-lg font-medium transition-colors">
              {formData.buttonText}
            </button>

          
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductSectionCMS;