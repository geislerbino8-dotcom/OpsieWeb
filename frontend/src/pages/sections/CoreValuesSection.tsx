import React from 'react';
import logo from '../../assets/icons/opsie_logo_only.png'

const CoreValuesSection = () => {
  const values = [
    {
      title: 'Simplicity',
      description: 'Making work simpler, smoother, and smarter.',
      className: 'md:col-span-2 md:row-span-1',
    },
    {
      title: 'Celiability',
      description: 'Bringing people, processes, and systems together.',
      className: 'md:col-span-1 md:row-span-2',
    },
    {
      title: 'Reliability',
      description: 'Delivering systems you can trust with confidence.',
      className: 'md:col-span-1 md:row-span-1',
    },
    {
      title: 'Innovation',
      description: 'Creating intelligent solutions for continuous growth.',
      className: 'md:col-span-1 md:row-span-1',
    },
    {
      title: 'Empowerment',
      description: 'Empowering teams with technology that drives success.',
      className: 'md:col-span-3 md:row-span-1',
    },
  ];

  return (
    <section className="relative w-full min-h-screen p-2 md:p-6 md:p-12 overflow-hidden flex flex-col items-center justify-center mt-10">
      <div className="relative z-10 w-full max-w-5xl">

         <img className='hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[7%] w-200 h-auto max-w-full' src={logo} alt="" />

        <h2 className="text-4xl md:text-5xl font-bold mb-10 tracking-tight text-center">
          Our <span className='text-[#3CBDE6]'> Core Values</span>
        </h2>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[160px]">
          {values.map((value, index) => (
            <div
              key={index}
              className={`
                group
                relative p-8 overflow-hidden
                shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)]
                rounded-2xl 
                transition-all duration-800 hover:scale-[1.01]
                hover:bg-[#3CBDE6]
                flex flex-col items-center justify-center text-center
                ${value.className}
              `}
            >
              <div className="relative z-10">
                <h3 className="font-light text-black text-2xl font-bold mb-2 group-hover:text-white group-hover:font-bold">
                  {value.title}
                </h3>
                <p className="font-light text-gray-700 text-sm leading-relaxed group-hover:text-white ">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValuesSection;