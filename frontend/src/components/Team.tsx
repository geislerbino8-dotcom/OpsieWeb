import React from "react";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  bio: string;
};

// Data updated to match the Untitled UI look
const executive: TeamMember[] = [
  {
    name: "Jane Doe",
    role: "Founder & CEO",
    image: "/staffs/p1.png",
    bio: "Visionary strategist dedicated to turning complex problems into elegant, scalable solutions.",
  },
  {
    name: "Marcus Aurelius",
    role: "Project Manager",
    image: "/staffs/p1.png",
    bio: "dsadsad"
  },
  {
    name: "Jane Doe",
    role: "Founder & CEO",
    image: "/staffs/p1.png",
    bio: "Visionary strategist dedicated to turning complex problems into elegant, scalable solutions.",
  },
  {
    name: "Marcus Aurelius",
    role: "Project Manager",
    image: "/staffs/p2.jpg",
    bio: "Expert in agile methodologies and bridging the gap between client needs and technical execution.",
  }
];

const teamMembers: TeamMember[] = [
  {
    name: "Sarah Chen",
    role: "Frontend Developer",
    image: "/staffs/p3.jpg",
    bio: "Crafting pixel-perfect, high-performance interfaces with React and Tailwind.",
  },
  {
    name: "John Smith",
    role: "Backend Architect",
    image: "/staffs/p4.jpg",
    bio: "Specialist in distributed systems and secure, scalable API design.",
  },
  {
    name: "Alex Cruz",
    role: "UI/UX Designer",
    image: "/staffs/p5.jpg",
    bio: "User-centric designer focused on accessibility and modern aesthetics.",
  },
  {
    name: "Owen Garcia",
    role: "Frontend Developer",
    image: "/staffs/p5.jpg",
    bio: "Former frontend dev for Linear, Coinbase, and Postscript.",
  },
];

const MemberCard = ({ member }: { member: TeamMember }) => (
  <div className="flex flex-col text-left group">
    {/* Image Container: Square with large rounding and subtle background */}
    <div className="aspect-square w-full overflow-hidden rounded-[2rem] bg-[#F4F5F4] mb-6 shadow-sm">
      <img
        src={member.image}
        alt={member.name}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>

    {/* Text Information */}
    <div className="space-y-1">
      <h3 className="text-2xl font-bold text-[#0A261F] tracking-tight">
        {member.name}
      </h3>
      <p className="text-lg font-semibold text-[#1A453A]">
        {member.role}
      </p>
      <p className="text-base text-[#4A5E57] leading-relaxed pt-1">
        {member.bio}
      </p>
    </div>
  </div>
);

const Team: React.FC = () => {
  return (
    <section className="pt-20 pb-30 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-20 space-y-6">
          
          <h2 className="text-5xl md:text-6xl tracking-tight text-[#0A261F] leading-tight">
            We are the <span className="text-[#3CBDE6] font-semibold">people</span> who<br className="hidden md:block" /> make up <span className="text-[#3CBDE6] font-semibold">Opsie</span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-[#4A5E57] leading-relaxed">
            Our philosophy is simple; hire great people and give them the resources and support to do their best work.
          </p>
        </div>

        {/* Combined Grid (Executives + Core Team) */}
        {/* We use a single grid to match the 4-column layout of the image */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {[...executive, ...teamMembers].map((member, index) => (
            <div 
              key={`${member.name}-${index}`}
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <MemberCard member={member} />
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Team;