interface FAQ {
  question: string;
  answer: string | string[];
}

export const faqs: FAQ[] =[
  {
    question: "What services does your software solutions company offer?",
    answer:
      "We provide end-to-end software development services including web and mobile app development, cloud solutions, system integration, UI/UX design, and ongoing maintenance and support.",
  },
  {
    question: "How do you ensure the quality of your software products?",
    answer: [
      "We follow industry best practices and agile development methodologies.",
      "Our team conducts thorough testing, including unit, integration, and QA testing.",
      "We implement continuous integration and deployment (CI/CD) pipelines.",
    ],
  },
  {
    question: "Can you customize software based on our business needs?",
    answer:
      "Yes, we specialize in building fully customized solutions tailored to your business requirements, ensuring scalability, flexibility, and seamless integration with your existing systems.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "We work with a wide range of industries including healthcare, finance, e-commerce, education, logistics, and more, delivering solutions that meet specific industry challenges.",
  },
  {
    question: "Do you provide post-launch support and maintenance?",
    answer:
      "Absolutely. We offer ongoing support, updates, performance monitoring, and maintenance services to ensure your software remains secure, up-to-date, and efficient.",
  },
];