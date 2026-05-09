import { updateContent } from "@/api/updateContent";
import React, { useEffect, useState, useContext } from "react";
import { WebContentContext } from "../WebContentFrom";

interface HeroSection {
  header: string;
  subHeader: string;
  buttonText: string;
}

const FaqSectionCMS: React.FC = () => {
  const content = useContext(WebContentContext);
  const [formData, setFormData] = useState<HeroSection | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Sync internal state when context data loads
  useEffect(() => {
    if (content?.faqSection) {
      setFormData(content.faqSection);
    }
  }, [content]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (!prev) return prev;
      return { ...prev, [name]: value };
    });
  };

  const saveChanges = async () => {
    try {
      const update = await updateContent({
        id: "69ed83215f12c5a147e02160",
        path: "faqSection",
        value: formData
      });
      console.log("Update successful:", update);
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="w-full flex items-center justify-center bg-gray-50 p-6">
      <div className={`w-full max-w-2xl p-8 bg-white rounded-2xl shadow-xl transition-all border-2 ${isEditing ? 'border-blue-500' : 'border-transparent'}`}>
        
        {isEditing ? (
          /* --- CMS EDITOR VIEW --- */
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-800 text-center mb-2">Edit FAQ Section</h2>
            
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Header</label>
              <input
                name="header" // Match the HeroSection key
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData?.header || ""}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Sub Header</label>
              <input
                name="subHeader" // Match the HeroSection key
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData?.subHeader || ""}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Button Text</label>
              <input
                name="buttonText" // Match the HeroSection key
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData?.buttonText || ""}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-2 mt-2">
              <button 
                onClick={saveChanges}
                className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
              >
                Save Changes
              </button>

              <button
                onClick={() => {
                  setFormData(content?.faqSection || null); // Revert changes
                  setIsEditing(false);
                }}
                className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* --- LIVE PREVIEW VIEW --- */
          <div className="text-center cursor-pointer group relative"
            onClick={()=> setIsEditing(true)}
          >

             <div className="absolute inset-0 bg-blue-50/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
              <span className="text-blue-600 font-semibold">Click to Edit</span>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">

              {content?.faqSection?.header || "No Header Set"}
            </h2>
            <p className="text-gray-600 mb-4">
              {content?.faqSection?.subHeader || "No Subheader Set"}
            </p>
            {content?.faqSection?.buttonText && (
               <button className="px-6 py-2 bg-blue-600 text-white rounded-full">
                 {content?.faqSection.buttonText}
               </button>
            )}

       
          </div>
        )}

      </div>
    </div>
  );
};

export default FaqSectionCMS;