import { updateContent } from "@/api/updateContent";
import { usePageContent } from "@/data/usePageContent";
import React, { useState } from "react";

// Interface based on your uploaded image
interface AboutSection {
  header: string;
  description: string;
  buttonText: string;
}

const AboutPageCMS: React.FC = () => {
  // Initializing state from the data source (assuming index 0 based on your previous code)
  const [formData, setFormData] = useState<AboutSection>(usePageContent.data[0].aboutUsSection);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const saveChanges = async () => {
    try {
      const update = await updateContent({
        id: "69ed83215f12c5a147e02160",
        path: "aboutUsSection", // Path updated to target the about section
        value: formData
      });
      console.log("Update Success:", update);
      setIsEditing(false);
    } catch (error) {
      console.error("Update Failed:", error);
    }
  };

  return (
    <div className="w-full flex items-center justify-center bg-gray-50 p-6">
      <div className={`w-full p-8 bg-white rounded-2xl shadow-xl transition-all border-2 ${isEditing ? 'border-green-500' : 'border-transparent'}`}>
        
        {isEditing ? (
          /* --- CMS EDITOR VIEW --- */
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Edit About Us Section</h2>
            
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Main Header</label>
              <input
                name="header"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                value={formData.header}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Description (Supports HTML tags)</label>
              <textarea
                name="description"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none min-h-[150px] font-mono text-sm"
                value={formData.description}
                onChange={handleChange}
              />
              <p className="text-xs text-gray-400 italic">Example: Use &lt;span class="font-semibold text-gray-900"&gt;Text&lt;/span&gt; for highlighting.</p>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Button Label</label>
              <input
                name="buttonText"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                value={formData.buttonText}
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
                onClick={() => setIsEditing(false)}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* --- LIVE PREVIEW VIEW --- */
          <div className="flex flex-col items-start text-left">
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2">About Us</span>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6 leading-tight">
              {formData.header}
            </h1>
            
            {/* Using dangerouslySetInnerHTML to render the <span> tags from your image */}
            <div 
              className="text-gray-600 text-lg mb-8 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formData.description }} 
            />

            <button className="px-6 py-3 border-2 border-gray-900 text-gray-900 font-bold rounded-lg hover:bg-gray-900 hover:text-white transition-all">
              {formData.buttonText}
            </button>

            <div className="mt-10 pt-6 border-t border-gray-100 w-full">
              <button 
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-green-600 text-sm flex items-center gap-2 transition-colors"
              >
                <span>📝</span> Edit Content
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AboutPageCMS;