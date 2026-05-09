import { useContext, useEffect, useState } from "react";
import { WebContentContext } from "../WebContentFrom";
import { updateContent } from "@/api/updateContent";

interface Section {
  header: string;
  subHeader: string;
}

interface WhoWeAre {
  header: string;
  subHeader: string;
  section2: Section;
  section3: Section;
  section4: { vision: string };
  section5: { mission: string };
}

function WhoWeAreCMS() {
  const content = useContext(WebContentContext);
  const [formData, setFormData] = useState<WhoWeAre | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (content?.whoWeArePage) {
      setFormData(content.whoWeArePage);
    }
  }, [content]);

  // Handle both top-level and nested object updates
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (!prev) return prev;

      if (name.includes(".")) {
        const [section, field] = name.split(".");
        return {
          ...prev,
          [section]: {
            ...(prev[section as keyof WhoWeAre] as object),
            [field]: value,
          },
        };
      }

      return { ...prev, [name]: value };
    });
  };

  const saveChanges = async () => {
    try {
      await updateContent({
        id: "69ed83215f12c5a147e02160",
        path: "whoWeArePage",
        value: formData,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleCancel = () => {
    setFormData(content?.whoWeArePage || null);
    setIsEditing(false);
  };

  return (
    <div className="w-full flex items-center justify-center bg-gray-50 p-6">
      <div className={`w-full max-w-2xl bg-white rounded-2xl shadow-xl transition-all border-2 ${isEditing ? 'border-blue-500' : 'border-transparent'}`}>
        
        {isEditing ? (
          <div className="flex flex-col gap-4 p-6 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 text-center mb-2">Edit Who We Are Page</h2>

            {/* Main Header */}
            <div className="grid grid-cols-1 gap-4 border-b pb-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Main Header</label>
                <input name="header" className="p-2 border rounded-lg" value={formData?.header || ""} onChange={handleChange} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Main Subheader</label>
                <textarea name="subHeader" className="p-2 border rounded-lg" value={formData?.subHeader || ""} onChange={handleChange} />
              </div>
            </div>

            {/* Section 2 */}
            <div className="flex flex-col gap-2 p-3 bg-gray-50 rounded-lg">
              <span className="text-xs font-bold uppercase text-gray-400">Section 2 (Business Needs)</span>
              <input name="section2.header" placeholder="Header" className="p-2 border rounded-lg bg-white" value={formData?.section2?.header || ""} onChange={handleChange} />
              <textarea name="section2.subHeader" placeholder="Subheader" className="p-2 border rounded-lg bg-white" value={formData?.section2?.subHeader || ""} onChange={handleChange} />
            </div>

            <div className="flex flex-col gap-2 p-3 bg-gray-50 rounded-lg">
              <span className="text-xs font-bold uppercase text-gray-400">Section 3</span>
              <input name="section3.header" placeholder="Header" className="p-2 border rounded-lg bg-white" value={formData?.section3?.header || ""} onChange={handleChange} />
              <textarea name="section3.subHeader" placeholder="Subheader" className="p-2 border rounded-lg bg-white" value={formData?.section3?.subHeader || ""} onChange={handleChange} />
            </div>

            {/* Vision & Mission */}
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Vision (Section 4)</label>
                <textarea name="section4.vision" className="p-2 border rounded-lg" value={formData?.section4?.vision || ""} onChange={handleChange} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Mission (Section 5)</label>
                <textarea name="section5.mission" className="p-2 border rounded-lg" value={formData?.section5?.mission || ""} onChange={handleChange} />
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <button onClick={saveChanges} className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors">
                Save Changes
              </button>
              <button onClick={handleCancel} className="w-full py-3 bg-gray-400 hover:bg-gray-500 text-white font-bold rounded-lg transition-colors">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* --- LIVE PREVIEW VIEW --- */
          <div className="p-8 text-center cursor-pointer group relative" onClick={() => setIsEditing(true)}>
            <div className="absolute inset-0 bg-blue-50/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
              <span className="text-blue-600 font-semibold">Click to Edit Page Content</span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{formData?.header}</h1>
            <p className="text-gray-600 mb-8">{formData?.subHeader}</p>

             <h1 className="text-xl  font-bold text-gray-900 mb-2">{formData?.section2.header}</h1>
            <p className="text-gray-600 mb-8">{formData?.section2.subHeader}</p>

             <h1 className="text-xl font-bold text-gray-900 mb-2">{formData?.section3.header}</h1>
            <p className="text-gray-600 mb-8">{formData?.section3.subHeader}</p>
            
            
            <div className="grid grid-cols-2 gap-4 text-left border-t pt-6">
              <div>
                <h4 className="font-bold text-sm text-blue-500 uppercase">Our Vision</h4>
                <p className="text-sm text-gray-700 line-clamp-2">{formData?.section4?.vision}</p>
              </div>
              <div>
                <h4 className="font-bold text-sm text-green-500 uppercase">Our Mission</h4>
                <p className="text-sm text-gray-700 line-clamp-2">{formData?.section5?.mission}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WhoWeAreCMS;