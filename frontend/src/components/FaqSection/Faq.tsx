import { useContext, useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "@/data/faqData";
import { ContentContext } from "@/App";
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
          <SuperHeader text={content?.faqSection.header} />
        
          <p className="mt-6 text-lg text-gray-500 font-light max-w-sm">
            Everything you need to know about Opsie. Can't find what you're looking for? 
            <span className="text-[#3CBDE6] font-medium cursor-pointer hover:underline ml-1"><a href="/contact-us">Reach out to us.</a></span>
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
                    ? "bg-white border-[#3CBDE6]/30 shadow-[0_20px_40px_rgba(60,189,230,0.1)] scale-[1.01]" 
                    : "bg-[#ECEDF1]/50 border-transparent hover:border-gray-300 shadow-sm"
                  }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="flex justify-between items-center w-full py-7 px-8 text-left group"
                >
                  <span className={`text-lg font-semibold transition-colors duration-300 
                    ${isOpen ? "text-[#3CBDE6]" : "text-gray-800"}`}>
                    {faq.question}
                  </span>
                  
                  {/* Animated Icon Container */}
                  <div className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-500
                    ${isOpen ? "bg-[#3CBDE6] rotate-45" : "bg-gray-200"}`}>
                    <Plus className={`h-5 w-5 transition-colors ${isOpen ? "text-white" : "text-gray-600"}`} />
                  </div>
                </button>

                {/* Smooth Height Transition */}
                <div 
                  className="grid transition-all duration-500 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="px-8 pb-8 text-gray-600 leading-relaxed text-[16px]">
                      <div className="pt-2 border-t border-gray-100">
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