export type NavigationLink = {
  label: string;
  description: string;
  path: string;
  tone: "dark" | "teal";
};

export type NavigationMenu = {
  label: string;
  path: string;
  heading: string;
  description: string;
  links: NavigationLink[];
};

export const navigationMenus: NavigationMenu[] = [
  {
    label: "Why Opsie",
    path: "/what-we-do",
    heading: "A simpler way to work",
    description:
      "See how connected systems, practical technology, and thoughtful support help your business move forward.",
    links: [
      {
        label: "Overview",
        description: "A look at how Opsie helps your business work better.",
        path: "/what-we-do",
        tone: "teal",
      },
      {
        label: "Use cases",
        description: "Explore solutions built around everyday business needs.",
        path: "/what-we-do",
        tone: "dark",
      },
    ],
  },
  {
    label: "About Us",
    path: "/who-we-are",
    heading: "People behind the platform",
    description:
      "Get to know the team and the values behind Opsie Software Solutions.",
    links: [
      {
        label: "Our story",
        description: "Learn about our company and how we work.",
        path: "/who-we-are",
        tone: "dark",
      },
      {
        label: "Our team",
        description: "Meet the people building and supporting Opsie.",
        path: "/who-we-are",
        tone: "teal",
      },
    ],
  },
  {
    label: "Contact Us",
    path: "/contact-us",
    heading: "Let’s start a conversation",
    description:
      "Talk with our team about your questions, support needs, or next project.",
    links: [
      {
        label: "General enquiries",
        description: "Discuss a project or ask our team a question.",
        path: "/contact-us",
        tone: "teal",
      },
      {
        label: "Support",
        description: "Get in touch with the Opsie support team.",
        path: "/contact-us",
        tone: "dark",
      },
    ],
  },
];
