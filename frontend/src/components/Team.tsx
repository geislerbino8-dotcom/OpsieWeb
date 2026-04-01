import React from "react";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  bio: string;
  github?: string;
  linkedin?: string;
};

const executive: TeamMember[] = [
  {
    name: "Jane Doe",
    role: "Chief Executive Officer",
    image: "/profiles/prof2.svg",
    bio: "Visionary strategist dedicated to turning complex problems into elegant, scalable solutions.",
  },
  {
    name: "Marcus Aurelius",
    role: "Project Manager",
    image: "/profiles/prof1.svg",
    bio: "Expert in agile methodologies and bridging the gap between client needs and technical execution.",
  }
];

const teamMembers: TeamMember[] = [
  {
    name: "Sarah Chen",
    role: "Frontend Developer",
    image: "/profiles/prof1.svg",
    bio: "Crafting pixel-perfect, high-performance interfaces with React and Tailwind.",
    github: "#",
    linkedin: "#",
  },
  {
    name: "John Smith",
    role: "Backend Architect",
    image: "/profiles/prof2.svg",
    bio: "Specialist in distributed systems and secure, scalable API design.",
    github: "#",
    linkedin: "#",
  },
  {
    name: "Alex Cruz",
    role: "UI/UX Designer",
    image: "/profiles/prof3.svg",
    bio: "User-centric designer focused on accessibility and modern aesthetics.",
    linkedin: "#",
  },
];

const MemberCard = ({ member, isFeatured = false }: { member: TeamMember; isFeatured?: boolean }) => (
  <div className={`group relative bg-white rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 ${
    isFeatured ? "border-2 border-blue-50 shadow-xl shadow-blue-100/50" : "border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50"
  }`}>
    {/* Subtle Background Accent */}
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
    
    <div className="relative">
      <div className="relative w-32 h-32 mx-auto">
        <div className="absolute inset-0 bg-blue-100 rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-transform duration-500" />
        <img
          src={member.image}
          alt={member.name}
          className="relative w-full h-full rounded-full object-cover border-4 border-white shadow-sm"
        />
      </div>

      <div className="mt-6 text-center">
        <h3 className="text-xl font-bold text-gray-900 tracking-tight">{member.name}</h3>
        <span className="inline-block px-3 py-1 mt-1 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
          {member.role}
        </span>
        <p className="mt-4 text-gray-600 text-sm leading-relaxed line-clamp-3">
          {member.bio}
        </p>
      </div>

      <div className="flex justify-center gap-5 mt-6 border-t border-gray-50 pt-6">
        {member.github && (
          <a href={member.github} className="text-gray-400 hover:text-black transition-colors" aria-label="GitHub">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
        )}
        {member.linkedin && (
          <a href={member.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors" aria-label="LinkedIn">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
        )}
      </div>
    </div>
  </div>
);

const Team: React.FC = () => {
  return (
    <section className="bg-white py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-20 space-y-4">
          <span className="text-[#3CBDE6] font-bold tracking-widest uppercase text-xs">Innovation Driven</span>
          <h2 className="text-3xl md:text-5xl font-semibold">
            Meet Our Creative Minds
          </h2>
          <div className="w-20 h-1 bg-[#3CBDE6] mx-auto rounded-full" />
          <p className="max-w-2xl mx-auto text-gray-500">
            We are a group of passionate technologists and designers dedicated to building software that empowers humans.
          </p>
        </div>

        {/* Featured Executives */}
        <div className="flex flex-wrap justify-center gap-10 mb-20">
          {executive.map((item, index) => (
            <div key={`exec-${index}`} className="w-full md:w-[420px]">
              <MemberCard member={item} isFeatured />
            </div>
          ))}
        </div>

        <hr className="border-gray-100 mb-20" />

        {/* Core Team Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <MemberCard key={`member-${index}`} member={member} />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Team;