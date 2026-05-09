import { updateContent } from "@/api/updateContent";
import { usePageContent } from "@/data/usePageContent";
import React, { useState, } from "react";

interface HeroSection {
  header: string;
  subHeader: string;
  button: string
  link: string
}

const HeroPageCMS: React.FC = () => {
  const [formData, setFormData] = useState<HeroSection>(usePageContent.data[0].heroSection);
  const [isEditing, setIsEditing] = useState<boolean>(false);


  const handleChange =async (e: any) => {
    const { name, value } = e.target;

    console.log(name)


    setFormData((prev) => ({ ...prev, [name]: value }));

  
  };

  const saveChanges = async ()=> {
    
    try {
        const update = await updateContent({
          id: "69ed83215f12c5a147e02160",
          path: "heroSection",
          value: formData
        })

        console.log(update)
    } catch (error) {
        console.log(error)
    }
  }


  return (
    <div className="w-full flex items-center justify-center bg-gray-50 p-6">
      <div className={`w-full p-8 bg-white rounded-2xl shadow-xl transition-all border-2 ${isEditing ? 'border-blue-500' : 'border-transparent'}`}>
        
        {isEditing ? (
          /* --- CMS EDITOR VIEW --- */
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-800 text-center mb-2">Edit Hero Section</h2>
            
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Header</label>
              <input
                name="header"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.header}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Subheader</label>
              <textarea
                name="subHeader"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px]"
                value={formData.subHeader}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Button Text</label>
              <input
                name="button"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.button}
                onChange={handleChange}
              />
            </div>

            <button 
              onClick={() => {
                saveChanges()
                setIsEditing(false)
              }}
              className="w-full py-3 mt-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
            >
              Save Changes
            </button>

            <button
                onClick={()=> setIsEditing(false)}
                className="w-full py-3 mt-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
            >
                Cancel
            </button>
          </div>
        ) : (
          /* --- LIVE PREVIEW VIEW --- */
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              {formData.header}
            </h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {formData.subHeader}
            </p>
            <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all">
              {formData.button}
            </button>

            <div className="mt-10 pt-6 border-t border-gray-100">
              <button 
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-blue-500 text-sm flex items-center justify-center gap-2 w-full transition-colors"
              >
                <span>⚙️</span> Edit Content
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default HeroPageCMS;