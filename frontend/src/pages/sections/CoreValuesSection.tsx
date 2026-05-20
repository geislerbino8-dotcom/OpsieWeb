import logo from '../../assets/icons/opsie_logo_only.png';

const CoreValuesSection = () => {
  const values = [
    {
      title: 'Simplicity',
      description: 'Making work simpler, smoother, and smarter.',
    },
    {
      title: 'Celiability', 
      description: 'Bringing people, processes, and systems together.',
    },
    {
      title: 'Reliability',
      description: 'Delivering systems you can trust with confidence.',
    },
    {
      title: 'Innovation',
      description: 'Creating intelligent solutions for continuous growth.',
    },
    {
      title: 'Empowerment',
      description: 'Empowering teams with technology that drives success.',
    },
  ];

  return (
    <section className="relative w-full py-10 md:py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-5 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Our <span className="text-[#3CBDE6]">Core Values</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Side: Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-100">
              <img 
                src="/corevalues.jpg" 
                alt="Opsie Core Values" 
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
              {/* Subtle Overlay Logo */}
              <img 
                src={logo} 
                className="absolute bottom-6 right-6 w-12 h-auto opacity-20" 
                alt="" 
              />
            </div>
          </div>

          {/* Right Side: Values List */}
          <div className="w-full lg:w-1/2 space-y-4">
            {values.map((v, i) => (
              <div 
                key={i}
                className="group flex flex-col p-6 rounded-2xl border border-transparent hover:border-[#3CBDE6]/20 hover:bg-slate-50 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  {/* Numbering or Bullet */}
                  <span className="text-[#3CBDE6] font-bold text-lg">0{i + 1}</span>
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-[#3CBDE6] transition-colors">
                    {v.title}
                  </h3>
                </div>
                <p className="mt-2 text-left text-slate-600 pl-9 leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Background Watermark */}
      <img 
        src={logo} 
        className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 opacity-[2%] w-[500px] pointer-events-none" 
        alt="" 
      />
    </section>
  );
};

export default CoreValuesSection;