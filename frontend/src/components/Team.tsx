import React from "react";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  bio: string;
  github?: string;
  linkedin?: string;
};

const executive: TeamMember[] =[
    {
        name: "Jane Doe",
        role: "CEO",
        image: "/profiles/prof2.svg",
        bio: "Bring your ideas into reality.",
        
    },

    {
        name: "Jane Doe",
        role: "Project Manager",
        image: "/profiles/prof1.svg",
        bio: "Bring your ideas into reality.",
        
    }
]

const teamMembers: TeamMember[] = [
  {
    name: "Jane Doe",
    role: "Frontend Developer",
    image: "/profiles/prof1.svg",
    bio: "Builds responsive and beautiful interfaces.",
    github: "#",
    linkedin: "#",
  },
  {
    name: "John Smith",
    role: "Backend Developer",
    image: "/profiles/prof2.svg",
    bio: "Designs scalable APIs and systems.",
    github: "#",
    linkedin: "#",
  },
  {
    name: "Alex Cruz",
    role: "UI/UX Designer",
    image: "/profiles/prof3.svg",
    bio: "Creates intuitive user experiences.",
    linkedin: "#",
  },
];

const Team: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-800">
          Who We Are
        </h2>

        <div className="flex flex-col items-center justify-center py-10">
  {executive.map((item, index) => (
    <div
      key={index}
      className="bg-white w-full max-w-[400px] m-4 rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300"
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-28 h-28 mx-auto rounded-full object-cover"
      />

      <h3 className="mt-4 text-lg font-semibold text-gray-800 text-center">
        {item.name}
      </h3>
      <p className="text-blue-500 text-sm text-center">{item.role}</p>

      <p className="text-gray-500 text-sm mt-3 text-center">
        {item.bio}
      </p>

      <div className="flex justify-center gap-4 mt-4">
        {item.github && (
          <a
            href={item.github}
            className="text-gray-600 hover:text-black text-sm"
          >
            GitHub
          </a>
        )}
        {item.linkedin && (
          <a
            href={item.linkedin}
            className="text-gray-600 hover:text-blue-600 text-sm"
          >
            LinkedIn
          </a>
        )}
      </div>
    </div>
  ))}
</div>
        
        <p className="text-gray-500 mt-2 mb-10">
          Meet the team behind the product
        </p>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-28 h-28 mx-auto rounded-full object-cover"
              />

              <h3 className="mt-4 text-lg font-semibold text-gray-800">
                {member.name}
              </h3>
              <p className="text-blue-500 text-sm">{member.role}</p>

              <p className="text-gray-500 text-sm mt-3">
                {member.bio}
              </p>

              {/* Links */}
              <div className="flex justify-center gap-4 mt-4">
                {member.github && (
                  <a
                    href={member.github}
                    className="text-gray-600 hover:text-black text-sm"
                  >
                    GitHub
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;