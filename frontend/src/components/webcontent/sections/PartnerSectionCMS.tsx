import { updateContent } from "@/api/updateContent";
import { usePageContent } from "@/data/usePageContent";
import React, { useState, } from "react";

interface HeroSection {
  header: string;
  subHeader: string;
  paragraph1: string
  paragraph2: string
  buttonText: string;
}

const PartnerSectionCMS: React.FC = () => {
  // Initialize state from your data source
  const [formData] = useState<HeroSection>(usePageContent.data[0].partnersSection);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  console.log(formData)

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

            <h2 className="text-xl font-bold text-gray-800 text-center mb-2">{formData.header}</h2>
            <h2 className="text-xl font-bold text-gray-800 text-center mb-2">{formData.paragraph1}</h2>

            <h2 className="text-xl font-bold text-gray-800 text-center mb-2">{formData.paragraph2}</h2>




            

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

export default PartnerSectionCMS;