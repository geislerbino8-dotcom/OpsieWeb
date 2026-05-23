import React, { useContext, useEffect, useState } from "react";
import { updateContent } from "@/api/updateContent";
import { WebContentContext } from "./WebContentFrom";

interface WhatWeDoContent {
  hero: {
    header: {
      firstLine: string;
      secondLine: string;
    };
    subHeader: string;
    button: {
      text: string;
      link: string;
    };
  };
  secondSection: {
    header: string;
    subHeader: string;
  };
  secondSectionCTA: {
    subHeader: string;
    button: {
      text: string;
      link: string;
    };
  };
  thirdSection: {
    videoLink: string;
    header: string;
    subHeader: string;
    cards: Array<{
      header: string;
      subHeader: string;
    }>;
  };
}

const WhatWeDoCMS: React.FC = () => {
  const content = useContext(WebContentContext);
  const [formData, setFormData] = useState<WhatWeDoContent | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (content?.draftContent.whatWeDoPage) {
      setFormData(content.draftContent.whatWeDoPage);
    }
  }, [content]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, cardIndex?: number) => {
    const { name, value } = e.target;
    const path = name.split(".");

    setFormData((prev) => {
      if (!prev) return null;
      const newPrev = { ...prev };

      // Handle Third Section Cards specifically
      if (cardIndex !== undefined && path[0] === "cards") {
        const field = path[1] as "header" | "subHeader";
        newPrev.thirdSection.cards[cardIndex][field] = value;
        return { ...newPrev };
      }

      // Handle 3-level nesting (hero.header.firstLine)
      if (path.length === 3) {
        (newPrev as any)[path[0]][path[1]][path[2]] = value;
      } 
      // Handle 2-level nesting (hero.subHeader)
      else if (path.length === 2) {
        (newPrev as any)[path[0]][path[1]] = value;
      }

      return { ...newPrev };
    });
  };

  const saveChanges = async () => {
    if (!formData) return;
    try {
      await updateContent({
        path: "draftContent.whatWeDoPage",
        value: formData,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleCancel = () => {
    setFormData(content?.draftContent.whatWeDoPage || null);
    setIsEditing(false);
  };

  if (!formData) return <div className="p-10 text-center">Loading Content...</div>;

  return (
    <div className="w-full flex items-center justify-center bg-gray-50 p-6">
      <div className={`w-full max-w-4xl bg-white rounded-2xl shadow-xl transition-all border-2 ${isEditing ? "border-blue-500" : "border-transparent"}`}>
        
        {isEditing ? (
          <div className="flex flex-col gap-6 p-8 max-h-[85vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 text-center uppercase tracking-widest">Edit "What We Do" Section</h2>

            {/* HERO SETTINGS */}
            <div className="p-4 bg-slate-900 text-white rounded-xl space-y-4">
              <label className="text-xs font-bold text-blue-400 uppercase">Hero Section</label>
              <div className="grid grid-cols-2 gap-4">
                <input name="hero.header.firstLine" className="p-2 bg-slate-800 border-slate-700 rounded border text-sm" value={formData.hero.header.firstLine} onChange={handleChange} placeholder="First Line" />
                <input name="hero.header.secondLine" className="p-2 bg-slate-800 border-slate-700 rounded border text-sm text-[#3CBDE6]" value={formData.hero.header.secondLine} onChange={handleChange} placeholder="Second Line (Blue)" />
              </div>
              <textarea name="hero.subHeader" className="w-full p-2 bg-slate-800 border-slate-700 rounded border text-xs" value={formData.hero.subHeader} onChange={handleChange} />
            </div>

            {/* INTRO SECTION */}
            <div className="p-4 bg-blue-50 rounded-xl space-y-3">
               <label className="text-xs font-bold text-blue-600 uppercase">Second Section (Intro)</label>
               <input name="secondSection.header" className="w-full p-2 border rounded border-blue-200" value={formData.secondSection.header} onChange={handleChange} />
               <textarea name="secondSection.subHeader" className="w-full p-2 border rounded border-blue-200 text-sm" value={formData.secondSection.subHeader} onChange={handleChange} />
            </div>

            {/* VIDEO & WHY US SECTION */}
            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
              <label className="text-xs font-bold text-gray-400 uppercase">Third Section (Video & Cards)</label>
              <input name="thirdSection.videoLink" className="w-full p-2 border rounded text-xs" value={formData.thirdSection.videoLink} onChange={handleChange} placeholder="YouTube Video URL" />
            

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {formData.thirdSection.cards.map((card, idx) => (
                  <div key={idx} className="p-3 bg-white border rounded-lg shadow-sm">
                    <p className="text-[10px] font-bold text-gray-400 mb-2">Benefit Card #{idx + 1}</p>
                    <input name="cards.header" className="w-full p-1 text-sm font-bold border-b mb-1" value={card.header} onChange={(e) => handleChange(e, idx)} />
                    <textarea name="cards.subHeader" className="w-full p-1 text-xs text-gray-500" value={card.subHeader} onChange={(e) => handleChange(e, idx)} />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <button onClick={saveChanges} className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">Save Section</button>
              <button onClick={handleCancel} className="px-6 py-3 bg-gray-200 text-gray-600 font-bold rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
            </div>
          </div>
        ) : (
          /* --- PREVIEW VIEW --- */
          <div className="p-10 cursor-pointer group relative" onClick={() => setIsEditing(true)}>
             <div className="absolute inset-0 bg-blue-50/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-2xl z-10">
                <span className="bg-white px-6 py-2 rounded-full shadow-lg text-blue-600 font-bold">Edit What We Do Content</span>
             </div>

             <div className="space-y-8">
                <div className="bg-[#0F4C5C] p-8 rounded-xl text-white">
                    <h1 className="text-2xl font-light">{formData.hero.header.firstLine} <span className="text-[#3CBDE6] font-bold">{formData.hero.header.secondLine}</span></h1>
                    <p className="text-xs text-gray-300 mt-2">{formData.hero.subHeader}</p>
                </div>

                <div className="flex justify-between border-b pb-6">
                    <h2 className="text-lg font-bold text-gray-800 w-1/2">{formData.secondSection.header}</h2>
                    <p className="text-xs text-gray-500 w-1/3 text-right">{formData.secondSection.subHeader}</p>
                </div>

                <div className="flex justify-between border-b pb-6">
                    <h2 className="text-lg font-bold text-gray-800 w-1/2">{formData.thirdSection.header}</h2>
                    <p className="text-xs text-gray-500 w-1/3 text-right">{formData.thirdSection.subHeader}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {formData.thirdSection.cards.map((card, i) => (
                        <div key={i} className="p-4 border rounded-xl bg-gray-50">
                            <h4 className="font-bold text-sm">{card.header}</h4>
                            <p className="text-[10px] text-gray-500">{card.subHeader}</p>
                        </div>
                    ))}
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatWeDoCMS;