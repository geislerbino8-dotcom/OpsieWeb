import SuperHeader from "@/types/components/SuperHeader";
import React from "react";
import { useNavigate } from "react-router-dom";
import LiquidEther from "./LiquidEther";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  bio: string;
};

// Cleaned up dataset with standard descriptions 
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
    bio: "Expert in agile methodologies and bridging the gap between client needs and technical execution.",
  },
  {
    name: "Cassandra Vance",
    role: "Operations Director",
    image: "/staffs/p4.jpg",
    bio: "Streamlining complex operational pipelines to keep multi-platform projects running on schedule.",
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

    {/* Text Information Layout */}
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
  const navigate = useNavigate();

  return (
    <section className="pt-20 pb-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-20 space-y-6">
          <SuperHeader text="A team that *understands* your business" />
          <p className="max-w-3xl mx-auto text-xl text-[#4A5E57] leading-relaxed">
            We work closely with our clients to understand how their business runs and where systems can be improved.
          </p>
        </div>

        {/* Combined Grid (Executives + Core Team) */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {[...executive, ...teamMembers].map((member, index) => (
            <div 
              key={`${member.name}-${index}`}
              data-aos="fade-up"
              data-aos-delay={index * 50}
              className="p-2 hover:bg-[#3CBDE6]/10 transition-all duration-500 rounded-2xl"
            >
              <MemberCard member={member} />
            </div>
          ))}
        </div>

        {/* Bottom Call-To-Action Box Container */}
        <div className="relative overflow-hidden mt-24 flex flex-col md:flex-row items-center justify-between gap-10 p-8 md:p-12 rounded-md bg-gradient-to-br from-white to-slate-50 border border-slate-100 shadow-sm">
          
          {/* Faded Circle Background Accent */}
          <div className="absolute -top-24 -left-20 w-80 h-80 bg-[radial-gradient(circle,rgba(60,189,230,0.12)_0%,transparent_70%)] pointer-events-none z-0 mix-blend-multiply" />
          
          {/* Secondary Balance Glow in opposite corner */}
          <div className="absolute -bottom-32 -right-20 w-96 h-96 bg-[radial-gradient(circle,rgba(10,38,31,0.03)_0%,transparent_70%)] pointer-events-none z-0" />

          {/* LiquidEther Canvas Layer container sandbox */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40">
            <LiquidEther
              colors={[ '#5227FF', '#3CBDE6', '#768bd7' ]}
              mouseForce={20}
              cursorSize={100}
              isViscous
              viscous={30}
              iterationsViscous={32}
              iterationsPoisson={32}
              resolution={0.5}
              isBounce={false}
              autoDemo
              autoSpeed={0.5}
              autoIntensity={2.2}
              takeoverDuration={0.25}
              autoResumeDelay={3000}
              autoRampDuration={0.6}
            />
          </div>

          {/* CTA Content Block */}
          <div className="max-w-xl text-center md:text-left relative z-10">
            <h4 className="text-2xl font-bold text-[#0A261F] mb-3">
              Built for Collaboration
            </h4>
            <p className="text-lg text-[#4A5E57] leading-relaxed">
              We don't just build tools; we integrate with your workflow. 
              We work closely with our clients to understand how their business runs 
              and where systems can be improved.
            </p>
          </div>

          {/* Button Interactive Layer */}
          <button 
            onClick={() => navigate('/who-we-are')}
            className="group hover:bg-[#3CBDE6] relative flex items-center gap-4 px-10 py-5 bg-[#0A261F] overflow-hidden rounded-2xl font-bold text-white transition-all duration-500 hover:shadow-2xl hover:shadow-[#3CBDE6]/20 active:scale-95 z-10 shrink-0"
          >
            {/* Animated Background Highlight inside button */}
            <div className="absolute -inset-10 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(60,189,230,0.4)_0%,transparent_65%)] transition-all duration-700 ease-out pointer-events-none scale-50 group-hover:scale-100 z-0" />
            
            <span className="relative z-10">Meet the Team</span>
          </button>
          
        </div>
      </div>
    </section>
  );
};

export default Team;