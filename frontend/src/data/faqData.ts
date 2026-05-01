interface FAQ {
  question: string;
  answer: string | string[];
}

export const faqs: FAQ[] =[
  {
    question: "What services do you offer",
    answer:
      "We provide end-to-end solutions including web and mobile development, cloud systems, integrations, UI/UX design, and ongoing support to keep everything running smoothly.",
  },
  {
    question: "How do you ensure quality?",
    answer: [
      "We follow proven processes, thorough testing, and continuous improvements to make sure everything works reliably and performs as expected. ",
      
    ],
  },
  {
    question: "Can you customize solutions for my business? ",
    answer:
      "Yes, everything we build is tailored to how your business operates, so it fits naturally into your workflow and scales as you grow. ",
  },
  {
    question: "Who do you work with? ",
    answer:
      "We work with a range of industries including healthcare, finance, e-commerce, education, logistics, and more, adapting our solutions to fit each business.",
  },
  {
    question: "Do you provide ongoing support? ",
    answer:
      "Yes, we continue to support, monitor, and improve your systems after launch so everything stays secure, up to date, and running smoothly.",
  },
];