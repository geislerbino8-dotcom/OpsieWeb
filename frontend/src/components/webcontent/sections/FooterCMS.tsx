import { updateContent } from "@/api/updateContent";
import { usePageContent } from "@/data/usePageContent";
import React, { useState, } from "react";
import EncourageCTACMS from "./EncourageCTACMS";

interface HeroSection {
  header: string;
  subHeader: string;
  buttonText: string;
}

const FooterCMS: React.FC = () => {
  const [formData] = useState<HeroSection>(usePageContent.data[0].footerSection);
  const [isEditing, setIsEditing] = useState<boolean>(false);


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
      <div className={`w-full max-w-2xl p-8 bg-white rounded-2xl shadow-xl transition-all border-2 ${isEditing ? 'border-blue-500' : 'border-transparent'}`}>
        
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
          <div className="text-center cursor-pointer group relative"
            onClick={()=> setIsEditing(true)}
          >

             <div className="absolute inset-0 bg-blue-50/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
              <span className="text-blue-600 font-semibold">Click to Edit</span>
            </div>

            

            <h2 className="text-xl font-bold text-gray-800 text-center mb-2">{formData.header}</h2>
            <p className="text-gray-800 text-center">{formData.subHeader}</p>

            <EncourageCTACMS />


            

       
          </div>
        )}

      </div>
    </div>
  );
};

export default FooterCMS;