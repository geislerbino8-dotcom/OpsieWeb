import { updateContent } from "@/api/updateContent";
import React, { useEffect, useState, useContext } from "react";
import { WebContentContext } from "../WebContentFrom";

interface AboutSection {
  header: string;
  description: string;
  buttonText: string;
}

const AboutPageCMS: React.FC = () => {
  const content = useContext(WebContentContext);
  
  // Initialize with null or empty structure to avoid "uncontrolled to controlled" errors
  const [formData, setFormData] = useState<AboutSection | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Sync state when context content loads or changes
  useEffect(() => {
    if (content?.aboutUsSection) {
      setFormData(content.aboutUsSection);
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
        path: "aboutUsSection",
        value: formData
      });
      console.log("Update Success:", update);
      setIsEditing(false);
    } catch (error) {
      console.error("Update Failed:", error);
    }
  };

  const handleCancel = () => {
    setFormData(content?.aboutUsSection || null);
    setIsEditing(false);
  };

  if (!formData) return <div className="p-6 text-center">Loading Content...</div>;

  return (
    <div className="w-full flex items-center justify-center bg-gray-50 p-6">
      <div className={`w-full max-w-2xl p-8 bg-white rounded-2xl shadow-xl transition-all border-2 ${isEditing ? 'border-green-500' : 'border-transparent'}`}>
        
        {isEditing ? (
          /* --- CMS EDITOR VIEW --- */
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Edit About Us Section</h2>
            
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Main Header</label>
              <input
                name="header"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                value={formData.header || ""}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Description (Supports HTML tags)</label>
              <textarea
                name="description"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none min-h-[150px] font-mono text-sm"
                value={formData.description || ""}
                onChange={handleChange}
              />
              <p className="text-xs text-gray-400 italic">Example: Use &lt;span class="font-bold"&gt;Text&lt;/span&gt; for highlighting.</p>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Button Label</label>
              <input
                name="buttonText"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                value={formData.buttonText || ""}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-3 mt-4">
              <button 
                onClick={saveChanges}
                className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* --- LIVE PREVIEW VIEW --- */
          <div 
            className="text-center cursor-pointer group relatives"
            onClick={() => setIsEditing(true)}
          >

           

            <h2 className="font-bold text-2xl text-gray-800">{formData.header}</h2>
            
            <div 
              className="p-3 text-gray-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formData.description || "" }}
            />
            
            <button className="mt-4 bg-[#3CBDE6] hover:bg-[#34a8cd] text-white px-6 py-2 rounded-lg font-medium transition-colors">
              {formData.buttonText}
            </button>
            
         
          </div>
        )}

      </div>
    </div>
  );
};

export default AboutPageCMS;