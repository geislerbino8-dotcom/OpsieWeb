import { updateContent } from "@/api/updateContent";
import React, { useContext, useState, useEffect } from "react";
import { WebContentContext } from "../WebContentFrom";

interface HeroSection {
  header: string;
  subHeader: string;
  button: { text: string };
}

const EncourageCTACMS: React.FC = () => {
  const content = useContext(WebContentContext);
  const [formData, setFormData] = useState<HeroSection | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (content?.draftContent.encouragecard) {
      setFormData(content.draftContent.encouragecard);
    }
  }, [content]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (!prev) return null;

      // Handle nested updates safely for the button text structure
      if (name === "buttonText") {
        return {
          ...prev,
          button: {
            ...prev.button,
            text: value,
          },
        };
      }

      // Standard top-level string properties updates (header, subHeader)
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const saveChanges = async () => {
    if (!formData) return;
    try {
      const update = await updateContent({
        id: "69ed83215f12c5a147e02160",
        path: "encouragecard",
        value: formData,
      });
      console.log("Saved successfully:", update);
    } catch (error) {
      console.error("Error updating content:", error);
    }
  };

  return (
    <div className="w-full flex items-center justify-center bg-gray-50 p-6">
      <div
        className={`w-full p-8 bg-white rounded-2xl shadow-xl transition-all border-2 ${
          isEditing ? "border-blue-500" : "border-transparent"
        }`}
      >
        {isEditing ? (
          /* --- CMS EDITOR VIEW --- */
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
              Edit Section
            </h2>

            {/* Header Input */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Header</label>
              <input
                name="header"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData?.header || ""}
                onChange={handleChange}
              />
            </div>

            {/* Sub-Header Input (Fixed Name Property) */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Sub Header</label>
              <input
                name="subHeader"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData?.subHeader || ""}
                onChange={handleChange}
              />
            </div>

            {/* Button Text Input (Fixed State Interception) */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Button Text</label>
              <input
                name="buttonText"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData?.button?.text || ""}
                onChange={handleChange}
              />
            </div>

            <button
              onClick={() => {
                saveChanges();
                setIsEditing(false);
              }}
              className="w-full py-3 mt-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
            >
              Save Changes
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="w-full py-3 mt-2 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          /* --- LIVE PREVIEW VIEW --- */
          <div
            className="text-center bg-[#3CBDE6] p-6 rounded-xl cursor-pointer hover:opacity-95 transition-opacity"
            onClick={() => setIsEditing(true)}
          >
            <h2 className="text-2xl font-bold text-white mb-2">
              {formData?.header || "Click to add a header"}
            </h2>
            <p className="text-white/90 mb-4">
              {formData?.subHeader || "Click to add a subheader"}
            </p>
            <button className="bg-white text-[#3CBDE6] font-semibold px-6 py-2 rounded-lg shadow-sm">
              {formData?.button?.text || "Action"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EncourageCTACMS;