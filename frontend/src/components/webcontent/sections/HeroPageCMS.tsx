import { updateContent } from "@/api/updateContent";
import React, { useEffect, useState, useContext } from "react";
import { WebContentContext } from "../WebContentFrom";

interface HeroSection {
  header: string;
  subHeader: string;
  button: string;
  link: string;
}

const HeroPageCMS: React.FC = () => {
  const content = useContext(WebContentContext);
  const [formData, setFormData] = useState<HeroSection | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Sync state with context when content loads
  useEffect(() => {
    if (content?.draftContent) {
      setFormData(content.draftContent.heroSection);
    }
  }, [content]); // Added dependency array


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const saveChanges = async () => {

    if (!formData) return;

    try {
      const update = await updateContent({
        path: "draftContent.heroSection",
        value: formData,
      });

      console.log("Update success:", update);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating content:", error);
    }
  };

  const handleCancel = () => {
    // Reset form data to the original context values
    setFormData(content?.draftContent.heroSection || null);
    setIsEditing(false);
  };


  return (
    <div className="w-full flex items-center justify-center bg-gray-50 p-6">
      <div
        className={`w-full max-w-2xl p-8 bg-white rounded-2xl shadow-xl transition-all border-2 ${
          isEditing ? "border-blue-500" : "border-transparent"
        }`}
      >
        {isEditing ? (
          /* --- CMS EDITOR VIEW --- */
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
              Edit Hero Section
            </h2>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Header</label>
              <input
                name="header"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData?.header || ""}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Subheader</label>
              <textarea
                name="subHeader"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px]"
                value={formData?.subHeader || ""}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Button Text</label>
              <input
                name="button"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData?.button || ""}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={saveChanges}
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
              >
                Save Changes
              </button>

              <button
                onClick={handleCancel}
                className="w-full py-3 bg-gray-400 hover:bg-gray-500 text-white font-bold rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* --- LIVE PREVIEW VIEW --- */
          <div
            className="text-center cursor-pointer group overflow-hidden relative"
            onClick={() => setIsEditing(true)}
          >
            <div className="bg-blue-50/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
              <span className="text-blue-600 font-semibold">Click to Edit</span>
            </div>

            <h2 className="font-bold text-3xl text-gray-900">
              {formData?.header}
            </h2>
            <p className="p-4 text-gray-600 leading-relaxed">
              {formData?.subHeader}
            </p>
            <button className="bg-[#3CBDE6] hover:bg-[#2faacc] text-white px-8 py-3 rounded-full font-medium transition-colors">
              {formData?.button}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroPageCMS;