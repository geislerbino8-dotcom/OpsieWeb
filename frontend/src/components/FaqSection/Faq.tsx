import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { faqs } from "@/data/faqData";
import { ContentContext } from "@/App";
import SuperHeader from "@/types/components/SuperHeader";


const FAQAccordion = () => {

  const content = useContext(ContentContext)
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // The CMS header arrives asynchronously (and may be absent); fall back so the
  // section never renders an empty <h2> or throws on a missing faqSection.
  const heading = content?.faqSection?.header || "Frequently asked questions";

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-10 md:py-24 px-4 sm:px-6 md:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-20 items-start">
        
        {/* Left Side: Header Content — sticks 96px down so the 80px fixed
            header never covers the kicker or heading. */}
        <div className="lg:w-1/3 lg:sticky lg:top-24">
          {/* Kicker and count, mirroring the form's mono micro-labels. */}
          <div className="mb-5 flex items-center justify-between gap-3">
            <p className="font-mono-label flex items-center gap-2 text-[9px] uppercase tracking-[0.14em] text-[#0E7490] sm:text-[10px]">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#3CBDE6]" />
              Opsie Support // FAQ
            </p>
            <span aria-hidden="true" className="font-mono-label hidden text-[10px] uppercase tracking-[0.14em] text-[#475569] sm:inline">
              Answers / {String(faqs.length).padStart(2, "0")}
            </span>
          </div>

          <SuperHeader text={heading} position="left"/>
        
          <p className="mt-6 text-lg text-[#475569] text-center md:text-left font-light max-w-sm">
            Everything you need to know about Opsie. Can't find what you're looking for?{" "}
            <Link
              to="/contact-us"
              className="ml-1 font-medium text-[#0E7490] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E7490]"
            >
              Reach out to us.
            </Link>
          </p>
        </div>

        {/* Right Side: Accordion List */}
        <div className="w-full lg:w-2/3 flex flex-col gap-4">
          {/* DS-4 empty state: a text fallback, never a blank column. */}
          {faqs.length === 0 && (
            <p className="rounded-2xl border border-[#0B1622]/10 bg-white px-5 py-8 text-[15px] leading-relaxed text-[#475569] shadow-sm sm:px-8">
              Our FAQ is being updated. If you need an answer now,{" "}
              <Link
                to="/contact-us"
                className="font-medium text-[#0E7490] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E7490]"
              >
                contact the team
              </Link>{" "}
              and we will reply directly.
            </p>
          )}
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;
            const triggerId = `faq-trigger-${index}`;

            return (
              <div
                key={faq.question}
                className={`rounded-2xl border bg-white transition-all duration-500 ease-in-out
                  ${isOpen
                    ? "border-[#3CBDE6]/60 shadow-[0_20px_40px_rgba(60,189,230,0.14)]"
                    : "border-[#0B1622]/10 shadow-sm hover:border-[#3CBDE6]/60 hover:bg-[#F8FAFC]"
                  }`}
              >
                {/* Heading wraps the trigger so screen readers can jump by heading. */}
                <h3 className="m-0">
                  <button
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => toggle(index)}
                    className="flex justify-between items-center gap-4 w-full py-5 sm:py-7 px-5 sm:px-8 text-left rounded-2xl transition-colors duration-300 active:bg-[#F1F5F9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E7490]"
                  >
                    <span className="flex min-w-0 items-baseline gap-3">
                      <span
                        aria-hidden="true"
                        className={`font-mono-label hidden shrink-0 text-[11px] tabular-nums transition-colors duration-300 sm:inline
                          ${isOpen ? "text-[#0E7490]" : "text-[#64748B]"}`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={`min-w-0 break-words [overflow-wrap:anywhere] text-base sm:text-lg font-semibold transition-colors duration-300
                        ${isOpen ? "text-[#0E7490]" : "text-[#0B1622]"}`}>
                        {faq.question}
                      </span>
                    </span>

                    {/* Animated Icon Container */}
                    <span
                      aria-hidden="true"
                      className={`relative flex shrink-0 items-center justify-center w-8 h-8 rounded-full transition-all duration-500
                        ${isOpen
                          ? "bg-[#3CBDE6] text-[#06212E] rotate-45"
                          : "bg-[#ECEDF1] text-[#0B1622] ring-1 ring-inset ring-[#0B1622]/5"}`}
                    >
                      <Plus className="h-5 w-5" />
                    </span>
                  </button>
                </h3>

                {/* Smooth Height Transition */}
                <div 
                  id={answerId}
                  role="region"
                  aria-labelledby={triggerId}
                  aria-hidden={!isOpen}
                  className="grid transition-all duration-500 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 sm:px-8 pb-6 sm:pb-8 text-[#475569] leading-relaxed text-[15px] sm:text-[16px]">
                      <div className="pt-2 border-t border-[#0B1622]/10">
                        {/* Align the answer with the question text, past the index number. */}
                        <div className="sm:pl-[26px]">
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
