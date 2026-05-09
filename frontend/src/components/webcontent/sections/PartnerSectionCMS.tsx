import { updateContent } from "@/api/updateContent";
import React, { useEffect, useState, } from "react";
import { useContext } from "react";
import { WebContentContext } from "../WebContentFrom";

type PartnerType = {
  header: string;
  subHeader: string;
  paragraph1: string
  paragraph2: string
  buttonText: string;
}

const PartnerSectionCMS: React.FC = () => {

  const content = useContext(WebContentContext)
  const [formData, setFormData ] = useState<PartnerType | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(()=> {
    if(content?.partnersSection){
      setFormData(content.partnersSection)
    }
  }, [content])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
    };

  const saveChanges = async ()=> {
    
    try {
        const update = await updateContent({
          id: "69ed83215f12c5a147e02160",
          path: "partnersSection",
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
            <h2 className="text-xl font-bold text-gray-800 text-center mb-2">Edit Partner Section</h2>
            
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
              <label className="text-sm font-semibold text-gray-600">Paragraph 1</label>
              <input
                name="paragraph1"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData?.paragraph1}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Paragraph 2</label>
              <input
                name="paragraph2"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData?.paragraph2}
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
          <div className="text-center cursor-pointer group relative"
            onClick={() => setIsEditing(true)}

          >

             <div className="absolute inset-0 bg-blue-50/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
              <span className="text-blue-600 font-semibold">Click to Edit</span>
            </div>

            <h2 className="text-xl font-bold text-gray-800 text-center mb-2">{formData?.header}</h2>
            <h2 className="text-gray-800 text-center mb-2">{formData?.subHeader}</h2>


            <div className="flex flex-row justify-between ">
              <h2 className="text-gray-800 text-center mb-2">{formData?.paragraph1}</h2>

            <h2 className="text-gray-800 text-center mb-2">{formData?.paragraph2}</h2>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default PartnerSectionCMS;