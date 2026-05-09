import { updateContent } from "@/api/updateContent";
import { usePageContent } from "@/data/usePageContent";
import React, { useState } from "react";

// --- Interfaces based on image_0eabdb.png ---
interface ContactDetails {
  email: string;
  address: string;
  phone: string;
}

interface ContactUsSection {
  header: string;
  subHeader: string;
  contactDetails: ContactDetails;
}

const ContactUsSectionCMS: React.FC = () => {
  // Initialize state with the structure from image_0eabdb.png
  const [formData, setFormData] = useState<ContactUsSection>(usePageContent.data[0].contactUsSection);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Unified change handler for both top-level and nested fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (["email", "address", "phone"].includes(name)) {
      // Update nested contactDetails object
      setFormData((prev) => ({
        ...prev,
        contactDetails: {
          ...prev.contactDetails,
          [name]: value,
        },
      }));
    } else {
      // Update top-level header or subHeader
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const saveChanges = async () => {
    try {
      const update = await updateContent({
        id: "69ed83215f12c5a147e02160",
        path: "contactUsSection", // Path matches the object key in image_0eabdb.png
        value: formData,
      });
      console.log("Update successful:", update);
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
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
            <h2 className="text-xl font-bold text-gray-800 text-center mb-2">Edit Contact Us Section</h2>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Header</label>
              <input
                name="header"
                value={formData.header}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Sub Header</label>
              <textarea
                name="subHeader"
                value={formData.subHeader}
                onChange={handleChange}
                rows={3}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 border-t pt-4">
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-xs font-semibold text-gray-500 uppercase">Email Address</label>
                <input
                  name="email"
                  value={formData.contactDetails.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-xs font-semibold text-gray-500 uppercase">Physical Address</label>
                <input
                  name="address"
                  value={formData.contactDetails.address}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Phone Number</label>
                <input
                  name="phone"
                  value={formData.contactDetails.phone}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={saveChanges}
                className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* --- LIVE PREVIEW VIEW --- */
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{formData.header}</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">{formData.subHeader}</p>

            <div className="grid grid-cols-1 gap-6 text-left border-t border-gray-100 pt-8">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600 text-xl">📧</div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-tight">Email</p>
                  <p className="text-gray-800 font-medium">{formData.contactDetails.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full text-green-600 text-xl">📍</div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-tight">Address</p>
                  <p className="text-gray-800 font-medium">{formData.contactDetails.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-full text-purple-600 text-xl">📞</div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-tight">Phone</p>
                  <p className="text-gray-800 font-medium">{formData.contactDetails.phone}</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-100">
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-blue-500 text-sm flex items-center justify-center gap-2 w-full transition-colors font-medium"
              >
                <span>⚙️</span> Edit Content
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactUsSectionCMS;