import { updateContent } from "@/api/updateContent";
import React, { useContext, useEffect, useState, } from "react";
import { WebContentContext } from "../WebContentFrom";

interface T {
    buttonText: string
    link: string
}

 type CTAType =  {
  header: string;
  subHeader: string;
  buttons: Array<T>
}

const ProductItemCTACMS: React.FC = () => {

  const content = useContext(WebContentContext)
  const [formData, setFormData ] = useState<CTAType | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(()=> {
    if(content?.ctaSection){
      setFormData(content.ctaSection)
    }
  }, [content])

  const handleChange =async (e: any) => {
    const { name, value } = e.target;

    console.log(name)


    setFormData((prev) => {
      if(!prev) return prev
      return ({ ...prev, [name]: value })
    });

  
  };

  const saveChanges = async ()=> {
    
    try {
        const update = await updateContent({
          id: "69ed83215f12c5a147e02160",
          path: "ctaSection",
          value: formData
        })

        console.log(update)
    } catch (error) {
        console.log(error)
    }
  }


  return (
    <div className="w-full flex items-center justify-center bg-gray-50 p-6">
      <div className={`w-full max-w-2xl bg-white rounded-2xl shadow-xl transition-all border-2 ${isEditing ? 'border-blue-500' : 'border-transparent'}`}>
        
        {isEditing ? (
          /* --- CMS EDITOR VIEW --- */
          <div className="flex flex-col gap-4 p-6">
            <h2 className="text-xl font-bold text-gray-800 text-center mb-2">Edit Hero Section</h2>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Header</label>
              <input
                name="header"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData?.header}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Sub Header</label>
              <input
                name="subHeader"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData?.subHeader}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Button 1</label>
              <input
                name="buttons[0].buttonText"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData?.buttons[0].buttonText}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Button 2</label>
              <input
                name="buttons[1].buttonText"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData?.buttons[1].buttonText}
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
          <div className="text-center cursor-pointer group relative" onClick={()=> setIsEditing(true)}>
            
              <div className="absolute inset-0 bg-blue-50/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
              <span className="text-blue-600 font-semibold">Click to Edit</span>
            </div>
            
            <h2 className="text-xl font-bold text-gray-800 text-center mb-2">{content?.ctaSection?.header}</h2>
            <h2 className="text-gray-800 text-center mb-2">{content?.ctaSection?.subHeader}</h2>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductItemCTACMS;