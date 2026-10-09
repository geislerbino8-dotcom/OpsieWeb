import { useContext, useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "@/data/faqData";
import { ContentContext } from "@/ContentContext";
import SuperHeader from "@/types/components/SuperHeader";


const FAQAccordion = () => {

  const content = useContext(ContentContext)
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-10 md:py-24 px-6 md:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
        
        {/* Left Side: Header Content */}
        <div className="lg:w-1/3 sticky top-10">
          <SuperHeader text={content?.faqSection.header} position="left"/>
        
          <p className="mt-6 text-lg text-gray-400 text-center md:text-left font-light max-w-sm">
            Everything you need to know about Opsie. Can't find what you're looking for? 
            <span className="text-[#8B5CF6] font-medium cursor-pointer hover:underline ml-1"><a href="/contact-us">Reach out to us.</a></span>
          </p>
        </div>

        {/* Right Side: Accordion List */}
        <div className="w-full lg:w-2/3 flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div
                key={index}
                className={`group rounded-2xl transition-all duration-500 ease-in-out border
                  ${isOpen 
                    ? "bg-[#0a0a0a] border-[#8B5CF6]/25 card-side-glow scale-[1.01]" 
                    : "bg-white/[0.04] border-transparent hover:border-white/20 shadow-sm hover:bg-[#4C1D95]/60"
                  }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="flex justify-between items-center w-full py-7 px-8 text-left group"
                >
                  <span className={`text-lg font-semibold transition-colors duration-300 
                    ${isOpen ? "text-[#8B5CF6]" : "text-gray-100"}`}>
                    {faq.question}
                  </span>
                  
                  {/* Animated Icon Container */}
                  <div className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-500
                    ${isOpen ? "bg-[#8B5CF6] rotate-45" : "bg-white/20"}`}>
                    <Plus className={`h-5 w-5 transition-colors ${isOpen ? "text-white" : "text-white/70"}`} />
                  </div>
                </button>

                {/* Smooth Height Transition */}
                <div 
                  className="grid transition-all duration-500 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="px-8 pb-8 text-gray-300 leading-relaxed text-[16px]">
                      <div className="pt-2 border-t border-white/10">
                        {Array.isArray(faq.answer) ? (
                          <ul className="list-disc ml-5 space-y-2 mt-4">
                            {faq.answer.map((item, i) => (
                              <li key={i} className="pl-2">{item}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-4">{faq.answer}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;