import { useContext, useEffect, useState } from "react";
import { WebContentContext } from "../WebContentFrom";
import { updateContent } from "@/api/updateContent";

interface ContactUsPage {
  header: string;
  subHeader: string;
  blackBox: {
    header: string;
    subHeader: string;
    button: {
      text: string;
      link: string;
    };
  };
  mapBox: {
    header: string;
    subHeader: string;
  };
}

function ContactUsSectionCMS() {
  const content = useContext(WebContentContext);
  const [formData, setFormData] = useState<ContactUsPage | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (content?.contactUsPage) {
      setFormData(content.contactUsPage);
    }
  }, [content]);

  // Dynamic handler for nested objects (e.g., name="blackBox.header")
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const path = name.split(".");

    setFormData((prev) => {
      if (!prev) return null;
      
      if (path.length === 1) return { ...prev, [name]: value };

   

      if (path.length === 3) {
        const section = path[0] as keyof ContactUsPage;
        const subSection = path[1];
        return {
          ...prev,
          [section]: {
            ...(prev[section] as any),
            [subSection]: { ...(prev[section] as any)[subSection], [path[2]]: value },
          },
        };
      }
      return prev;
    });
  };

  const saveChanges = async () => {
    try {
      await updateContent({
        id: "69ed83215f12c5a147e02160", // Reusing ID from reference
        path: "contactUsPage",
        value: formData,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleCancel = () => {
    setFormData(content?.contactUsPage || null);
    setIsEditing(false);
  };

  if (!formData) return <p>Loading...</p>;

  return (
    <div className="w-full flex items-center justify-center bg-gray-50 p-6">
      <div className={`w-full max-w-2xl bg-white rounded-2xl shadow-xl transition-all border-2 ${isEditing ? 'border-blue-500' : 'border-transparent'}`}>
        
        {isEditing ? (
          /* --- CMS EDITOR VIEW --- */
          <div className="flex flex-col gap-4 p-6 max-h-[85vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 text-center mb-2">Edit Contact Us Page</h2>

            {/* MAIN HEADER */}
            <div className="space-y-2 border-b pb-4">
               <label className="text-xs font-bold text-blue-600 uppercase">Main Title</label>
               <input name="header" className="w-full p-2 border rounded-lg" value={formData.header} onChange={handleChange} />
               <textarea name="subHeader" className="w-full p-2 border rounded-lg text-sm" value={formData.subHeader} onChange={handleChange} />
            </div>

            {/* BLACK BOX SECTION */}
            <div className="p-4 bg-gray-900 rounded-xl text-white space-y-3">
              <label className="text-xs font-bold text-gray-400 uppercase">Black Box (Virtual Call)</label>
              <input name="blackBox.header" className="w-full p-2 bg-gray-800 border-gray-700 border rounded text-white" value={formData.blackBox.header} onChange={handleChange} />
              <textarea name="blackBox.subHeader" className="w-full p-2 bg-gray-800 border-gray-700 border rounded text-sm text-gray-300" value={formData.blackBox.subHeader} onChange={handleChange} />
              <div className="flex gap-2">
                <input name="blackBox.button.text" placeholder="Button Text" className="w-1/2 p-2 bg-gray-800 border-gray-700 border rounded text-xs" value={formData.blackBox.button.text} onChange={handleChange} />
                <input name="blackBox.button.link" placeholder="Button Link" className="w-1/2 p-2 bg-gray-800 border-gray-700 border rounded text-xs" value={formData.blackBox.button.link} onChange={handleChange} />
              </div>
            </div>

            {/* MAP BOX SECTION */}
            <div className="p-4 bg-blue-50 rounded-xl space-y-3">
              <label className="text-xs font-bold text-blue-400 uppercase">Map Box (Office Location)</label>
              <input name="mapBox.header" className="w-full p-2 border border-blue-200 rounded-lg" value={formData.mapBox.header} onChange={handleChange} />
              <textarea name="mapBox.subHeader" className="w-full p-2 border border-blue-200 rounded-lg text-sm" value={formData.mapBox.subHeader} onChange={handleChange} />
            </div>

            <div className="flex flex-col gap-2 pt-4">
              <button onClick={saveChanges} className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all">
                Save Changes
              </button>
              <button onClick={handleCancel} className="w-full py-3 bg-gray-400 hover:bg-gray-500 text-white font-bold rounded-lg transition-all">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* --- LIVE PREVIEW VIEW --- */
          <div className="p-8 cursor-pointer group relative" onClick={() => setIsEditing(true)}>
            <div className="absolute inset-0 bg-blue-50/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl z-10">
              <span className="bg-white px-4 py-2 rounded-full shadow-md text-blue-600 font-semibold">Click to Edit Content</span>
            </div>
            
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{formData.header}</h1>
                <p className="text-gray-500 text-sm">{formData.subHeader}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-900 text-white p-6 rounded-2xl">
                    <h3 className="font-bold text-lg mb-2">{formData.blackBox.header}</h3>
                    <p className="text-gray-400 text-xs mb-4">{formData.blackBox.subHeader}</p>
                    <span className="inline-block bg-[#3CBDE6] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase">
                        {formData.blackBox.button.text}
                    </span>
                </div>
                <div className="bg-gray-100 p-6 rounded-2xl border border-dashed border-gray-300">
                    <h3 className="font-bold text-gray-800 text-lg mb-2">{formData.mapBox.header}</h3>
                    <p className="text-gray-500 text-xs">{formData.mapBox.subHeader}</p>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactUsSectionCMS;