import { useState } from "react";
import { Plus, X } from "lucide-react";

interface FAQ {
  question: string;
  answer: string | string[];
}

const faqs: FAQ[] = [
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
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
    answer:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "Quis autem vel eum iure reprehenderit?",
    answer:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <div className="max-w-[1280px] mx-auto flex items-center justify-center md:items-start flex-col gap-4 md:px-10">
      <div
        data-aos="fade-up"
        className="mt-6 flex items-center justify-center lg:items-start"
      >
      </div>

      <h1
        data-aos="fade-right"
        data-aos-delay="200"
        className="font-poppins font-medium text-center md:text-start leading-[34px] tracking-[2px] text-[32px] md:text-[50px] md:leading-[50px] lg:text-[50px] lg:leading-[60px]"
      >
        Got Questions? <br />
        <span className="text-[#3CBDE6] font-semibold">We've Got Answers</span>
      </h1>
      <p
        data-aos="fade-right"
        data-aos-delay="400"
        className="text-center text-[18px] md:text-[24px] leading-[20px] font-light"
      >
        Quick, clear answers to help you get started with Opsie.
      </p>

      <div
        className={`w-full max-w-[900px] md:mt-6 mx-auto p-6 grid gap-8 ${
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
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-delay={index * 200}
              className="rounded-xl shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] overflow-hidden bg-[#ECEDF1]"
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

              {isOpen && <div className="border-t border-black mx-4" />}

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-[500px] opacity-100 py-4" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-5 text-left text-black font-poppins text-sm">
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