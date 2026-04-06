export type Product = {
  name: string;
  image: string;
  description: string;
  category: 'Management' | 'Automation' | 'Cloud' | 'Web'; // Added for filtering
};

export const products: Product[] = [
  {
    name: "Opsie HRIS",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800",
    description: "A complete human resource information system for managing employees, attendance, payroll, and performance.",
    category: "Management"
  },
  {
    name: "Opsync",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
    description: "A centralized platform that streamlines and synchronizes daily business operations across teams.",
    category: "Automation"
  },
  {
    name: "Opsync Pro",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    description: "An advanced operations suite with automation, analytics, and enhanced workflow management tools.",
    category: "Automation"
  },
  {
    name: "Opsync Cloud",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800",
    description: "A cloud-based solution that enables remote access, real-time syncing, and scalable infrastructure.",
    category: "Cloud"
  },
  {
    name: "Opsync Lite",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=800",
    description: "A lightweight and easy-to-use version designed for small teams and startups with basic operational needs.",
    category: "Automation"
  },
  {
    name: "Opsie Web",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    description: "A web-based interface that provides access to all Opsie tools through a unified dashboard.",
    category: "Web"
  },
];