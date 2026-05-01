import { usePageContent } from "@/data/usePageContent"
import { useState } from "react";
import { updateContent } from "@/api/updateContent";
interface ButtonContent {
  text: string;
  link: string;
}

interface HeroHeader {
  firstLine: string;
  secondLine: string;
}

interface WhatWeDoHero {
  header: HeroHeader;
  subHeader: string;
  button: ButtonContent;
}

const WhatWeDoHeroCMS: React.FC = () => {
  const [formData, setFormData] = useState<WhatWeDoHero>(
    usePageContent.data[0].whatWeDoPage.hero
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

  };
  const saveChanges = async () => {
    try {
      await updateContent({
        id: "69ed83215f12c5a147e02160",
        path: "whatWeDoPage.hero", // Ensure path is specific to the object you're sending
        value: formData,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update What We Do content:", error);
    }
  };

  return (
    <div className="w-full flex items-center justify-center bg-gray-50 p-6">
      <div className={`w-full max-w-2xl p-8 bg-white rounded-2xl shadow-xl border-2 transition-all ${isEditing ? 'border-blue-500' : 'border-transparent'}`}>
        
        {isEditing ? (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-800">Edit What We Do Hero</h2>
            
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Header Lines</label>
              {/* Changed name to match the keys in HeroHeader */}
              <input
                name="firstLine"
                value={formData.header.firstLine}
                onChange={handleChange}
                placeholder="First Line"
                className="w-full p-2 border rounded-md"
              />

              <input
                name="secondLine"
                value={formData.header.secondLine}
                onChange={handleChange}
                placeholder="Second Line"
                className="w-full p-2 border rounded-md"
              />

              <label className="block text-sm font-medium text-gray-700">Subheader</label>
              <textarea
                name="subHeader"
                value={formData.subHeader}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                rows={3}
              />

              <div className="grid grid-cols-2 gap-4 border-t pt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Button Text</label>
                  <input
                    name="buttonText"
                    value={formData.button.text}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Button Link</label>
                  <input
                    name="buttonLink"
                    value={formData.button.link}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4"> 
              <button onClick={saveChanges} className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-semibold">Save</button>
              <button onClick={() => setIsEditing(false)} className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold">Cancel</button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              {formData.header.firstLine}
            </h1>
            <p>
              {formData.subHeader}
            </p>
           
            <p className="mt-4 text-lg text-gray-600">
              {formData.subHeader}
            </p>
            <div className="mt-8">
              <a
                href={formData.button.text}
                className="inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded-full shadow-lg"
              >
                {formData.button.text}
              </a>
            </div>

            <button 
              onClick={() => setIsEditing(true)}
              className="mt-10 text-gray-400 hover:text-blue-500 text-sm flex items-center justify-center gap-2 w-full transition-colors"
            >
              <span>⚙️</span> Edit Hero Section
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatWeDoHeroCMS;