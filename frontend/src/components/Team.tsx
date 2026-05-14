import SuperHeader from "@/types/components/SuperHeader";
import React from "react";
import { useNavigate } from "react-router-dom";

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
    image: "/staffs/p1.jpg",
    bio: "Visionary strategist dedicated to turning complex problems into elegant, scalable solutions.",
  },
  {
    name: "Marcus Aurelius",
    role: "Project Manager",
    image: "/staffs/p2.jpg",
    bio: "Visionary strategist dedicated to turning complex problems into elegant, scalable solutions."
  },
 
  {
    name: "Marcus Aurelius",
    role: "Project Manager",
    image: "/staffs/p4.jpg",
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
    name: "Owen Garcia",
    role: "Frontend Developer",
    image: "/staffs/p5.jpg",
    bio: "Former frontend dev for Linear, Coinbase, and Postscript.",
  },
];

const MemberCard = ({ member }: { member: TeamMember }) => (
  <div className="flex flex-col text-left group">
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

  const navigate = useNavigate()

  return (
    <section className="pt-20 pb-20 md:px-6 md:px-12 lg:px-24">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-20 space-y-6">

          <SuperHeader text="A team that *understands* your business" />
      
          <p className="max-w-3xl mx-auto text-xl text-[#4A5E57] leading-relaxed">
            We work closely with our clients to understand how their business runs  and where systems can be improved. 


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
          <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-10 p-8 md:p-12 rounded-md bg-gradient-to-br from-white to-slate-50 border border-slate-100 shadow-sm">
            
            <div className="max-w-xl text-center md:text-left">
              <h4 className="text-2xl font-bold text-[#0A261F] mb-3">
                Built for Collaboration
              </h4>
              <p className="text-lg text-[#4A5E57] leading-relaxed">
                We don't just build tools; we integrate with your workflow. 
                We work closely with our clients to understand how their business runs 
                and where systems can be improved.
              </p>
            </div>

            <button 
              onClick={() => navigate('/who-we-are')}
              className="group relative flex items-center gap-4 px-10 py-5 bg-[#0A261F] overflow-hidden rounded-2xl font-bold text-white transition-all duration-500 hover:shadow-2xl hover:shadow-[#3CBDE6]/20 active:scale-95"
            >
              {/* Animated Background Highlight */}
              <div className="absolute inset-0 bg-[#3CBDE6] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              
              <span className="relative z-10">Meet the Team</span>
            </button>
            
          </div>
    </section>
  );
};

export default Team;