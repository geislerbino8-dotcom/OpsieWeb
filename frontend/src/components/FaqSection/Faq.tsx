import { useState, useRef, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { faqs } from "@/data/faqData";

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-[1280px] mx-auto flex items-center justify-center md:items-start flex-col gap-4 md:px-10">
      <h1 className="font-poppins font-medium text-center md:text-start leading-[34px] tracking-[2px] text-[32px] md:text-[50px] md:leading-[50px] lg:text-[50px] lg:leading-[60px]">
        Got Questions? <br />
        <span className="text-[#3CBDE6] font-semibold">We've Got Answers</span>
      </h1>
      <p className="text-center text-[18px] md:text-[24px] leading-[20px] font-light">
        Quick, clear answers to help you get started with Opsie.
      </p>

      <div className="w-full max-w-[900px] md:mt-6 mx-auto p-6 grid gap-8 grid-cols-1">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const contentRef = useRef<HTMLDivElement>(null);
          const [height, setHeight] = useState(0);

          useEffect(() => {
            if (contentRef.current) {
              setHeight(isOpen ? contentRef.current.scrollHeight : 0);
            }
          }, [isOpen]);

          return (
            <div
              key={index}
              className="rounded-xl shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] overflow-hidden bg-[#ECEDF1]
                transition-all duration-1000 ease-out hover:bg-gradient-to-br hover:from-cyan-50 hover:to-blue-100
                hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] hover:scale-[1.02]"
            >
              <button
                onClick={() => toggle(index)}
                className="flex justify-between items-center w-full py-6 px-5 text-left text-black font-semibold text-base font-[Poppins]"
              >
                {faq.question}
                {isOpen ? (
                  <X className="h-6 w-6 flex-shrink-0" />
                ) : (
                  <Plus className="h-6 w-6 flex-shrink-0 text-[#3CBDE6]" />
                )}
              </button>

              <div
                style={{ maxHeight: height }}
                className="overflow-hidden transition-all duration-300 ease-in-out"
              >
                <div ref={contentRef} className="px-5 py-4 text-left text-black font-poppins text-sm">
                  {Array.isArray(faq.answer) ? (
                    <ul className="list-disc ml-6 space-y-1">
                      {faq.answer.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{faq.answer}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQAccordion;