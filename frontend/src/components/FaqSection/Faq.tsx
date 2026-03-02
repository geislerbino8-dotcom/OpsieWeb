// FAQAccordion.tsx
import { useState } from "react";
import { Plus, X } from "lucide-react";

interface FAQ {
  question: string;
  answer: string | string[];
}

const faqs: FAQ[] = [
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "Ut enim ad minim veniam, quis nostrud exercitation?",
    answer: [
      "Lorem ipsum dolor sit amet.",
      "Sed do eiusmod tempor incididunt.",
      "Ut enim ad minim veniam.",
    ],
  },
  {
    question: "Quis autem vel eum iure reprehenderit?",
    answer: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "Quis autem vel eum iure reprehenderit?",
    answer: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex items-center justify-center md:items-start flex-col gap-4">
        <div
          className="w-[160px] list-none py-2 flex items-center justify-center gap-2"
          style={{
            backgroundColor: "rgb(240, 242, 245)",
            borderRadius: "50px",
            boxShadow:
              "rgba(60, 189, 230, 0.25) 2px 3px 4px 0px inset , rgba(250, 251, 255, 1) -2px -2px 4px 0px inset",
          }}
            >
              <img src="" alt="" />
              <p className="font-poppins text-[#3CBDE6] text-[20px] font-medium ">FAQs</p>
        </div>

        <h1 className="font-poppins font-medium text-center md:text-start leading-[34px] tracking-[2px] text-[32px] md:text-[50px] md:leading-[50px]">Got Questions? <br /><span className="text-[#3CBDE6] font-semibold">We've Got Answers</span></h1>
        <p className="text-center text-[18px] md:text-[24px] leading-[20px] font-light">Quick, clear answers to help you get started with Opsie.</p>
        <div
      className={`w-full max-w-[900px] md:mt-6 mx-auto p-6 grid gap-8 
        ${
          faqs.length === 5
            ? "grid-cols-1 md:grid-cols-1 md:[&>*:nth-child(3)]:col-span-1"
            : "grid-cols-1 md:grid-cols-1"
        }`}
    >
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={` rounded-xl shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] overflow-hidden ${
              isOpen ? "bg-[#ECEDF1]" : "bg-[#ECEDF1]"
            }`}
          >
            <button
              onClick={() => toggle(index)}
              className="flex justify-between items-center w-full py-6 px-5 text-left text-black font-semibold text-base font-[Poppins]"
            >
              {faq.question}
              {isOpen ? (
                    <X className="h-6 w-6 flex-shrink-0 " />
                    ) : (
                    <Plus className="h-6 w-6 flex-shrink-0" />
                    )}
            </button>

            {isOpen && <div className="border-t border-black mx-4" />}

            {isOpen && (
              <div className="px-5 text-left p-4 text-black font-poppins text-sm">
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
            )}
          </div>
        );
      })}
    </div>

    </div>
    
  );
};

export default FAQAccordion;