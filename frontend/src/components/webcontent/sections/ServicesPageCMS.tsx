import { updateContent } from "@/api/updateContent";
import React, { useState, useEffect, useContext } from "react";
import { WebContentContext } from "../WebContentFrom";

interface Service {
  serviceName: string;
  image: string;
}

interface ServicesSection {
  header: string;
  subHeader: string;
  services: Service[];
}

const ServicesPageCMS: React.FC = () => {
  const content = useContext(WebContentContext);
  
  const [formData, setFormData] = useState<ServicesSection | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (content?.servicesSection) {
      setFormData(content.servicesSection);
    }
  }, [content]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleServiceChange = (index: number, field: keyof Service, value: string) => {
    if (!formData) return;
    
    const updatedServices = [...formData.services];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    setFormData((prev) => (prev ? { ...prev, services: updatedServices } : null));
  };

  const saveChanges = async () => {
    if (!formData) return;
    
    try {
      await updateContent({
        id: "69ed83215f12c5a147e02160",
        path: "servicesSection",
        value: formData
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating services:", error);
    }
  };

  const handleCancel = () => {
    setFormData(content?.servicesSection || null);
    setIsEditing(false);
  };

  if (!formData) return <div className="p-10 text-center">Loading Services Data...</div>;

  return (
    <div className="w-full bg-gray-50 p-6 flex flex-col items-center">
      <div className={`w-full max-w-2xl p-8 bg-white rounded-2xl shadow-xl transition-all border-2 ${isEditing ? 'border-purple-500' : 'border-transparent'}`}>
        
        {isEditing ? (
          /* --- CMS EDITOR VIEW --- */
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Edit Services Section</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Section Header</label>
                <input
                  name="header"
                  className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData.header || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Sub-header</label>
                <input
                  name="subHeader"
                  className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData.subHeader || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Service Cards</label>
              {formData.services.map((service, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-xl bg-gray-50 flex flex-col gap-3">
                   <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full space-y-2">
                      <label className="text-xs font-bold text-gray-500">Service Name</label>
                      <input
                        className="w-full p-2 border rounded-md bg-white"
                        value={service.serviceName}
                        onChange={(e) => handleServiceChange(index, 'serviceName', e.target.value)}
                      />
                    </div>
                    <div className="flex-1 w-full space-y-2">
                      <label className="text-xs font-bold text-gray-500">Image Path</label>
                      <input
                        className="w-full p-2 border rounded-md bg-white"
                        value={service.image}
                        onChange={(e) => handleServiceChange(index, 'image', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              <button onClick={saveChanges} className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors">
                Save Services
              </button>
              <button onClick={handleCancel} className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg transition-colors">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* --- LIVE PREVIEW VIEW --- */
          <div className="text-center cursor-pointer group relative" onClick={() => setIsEditing(true)}>   

            <div className="absolute inset-0 bg-blue-50/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
              <span className="text-blue-600 font-semibold">Click to Edit</span>
            </div>

            <h2 className="font-bold text-2xl text-gray-800">{formData.header}</h2>
            <p className="p-3 text-gray-600">{formData.subHeader}</p>  

            <div className="grid grid-cols-2 gap-4 mt-4">
              {formData.services.map((item: Service, index: number) => (
                <div key={index} className="p-4 border rounded-xl bg-gray-50">
                  <span className="block text-sm font-bold text-purple-600">{item.serviceName}</span>
                  <span className="text-[10px] text-gray-400 truncate block">{item.image}</span>
                </div>
              ))}
            </div>     

          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPageCMS;