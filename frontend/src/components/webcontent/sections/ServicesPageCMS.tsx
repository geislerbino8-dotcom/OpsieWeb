import { updateContent } from "@/api/updateContent";
import { usePageContent } from "@/data/usePageContent";
import React, { useState } from "react";
import { Settings } from "lucide-react";

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
  const [formData, setFormData] = useState<ServicesSection>(usePageContent.data[0].servicesSection);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Handle Top Level Inputs (Header/Subheader)
  const handleTopLevelChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Nested Array Updates
  const handleServiceChange = (index: number, field: keyof Service, value: string) => {
    const updatedServices = [...formData.services];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    setFormData((prev) => ({ ...prev, services: updatedServices }));
  };

  const saveChanges = async () => {
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

  return (
    <div className="min-h-screen w-full bg-gray-50 p-6 flex flex-col items-center">
      <div className={`w-full max-w-4xl p-8 bg-white rounded-2xl shadow-xl transition-all border-2 ${isEditing ? 'border-purple-500' : 'border-transparent'}`}>
        
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
                  value={formData.header}
                  onChange={handleTopLevelChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Sub-header</label>
                <input
                  name="subHeader"
                  className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData.subHeader}
                  onChange={handleTopLevelChange}
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Service Cards</label>
              {formData.services.map((service, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-xl bg-gray-50 flex flex-col md:flex-row gap-4 items-end">
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
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              <button onClick={saveChanges} className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors">
                Save Services
              </button>
              <button onClick={() => setIsEditing(false)} className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg transition-colors">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* --- LIVE PREVIEW VIEW --- */
          <div className="text-center">
            <h2 className="text-blue-600 font-bold text-sm uppercase mb-2 tracking-widest">Our Expertise</h2>
            <h1 className="text-3xl font-black text-gray-900 mb-4">{formData.header}</h1>
            <p className="text-gray-500 max-w-2xl mx-auto mb-12">{formData.subHeader}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {formData.services.map((service, index) => (
                <div key={index} className="group p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all">
                  <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                     <img src={service.image} alt={service.serviceName} className="w-8 h-8 object-contain" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg">{service.serviceName}</h3>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setIsEditing(true)}
              className="mt-12 text-gray-400 hover:text-purple-600 text-sm flex items-center justify-center gap-2 w-full transition-colors"
            >
              <Settings size={16} /> Edit Services Section
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPageCMS;