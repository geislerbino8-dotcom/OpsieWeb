
function OperationalStructure() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8 bg-white text-slate-900 font-sans antialiased selection:bg-cyan-500/10 selection:text-cyan-600">
      
      {/* Top Section: Elegant Minimalist Header */}
      <div className="max-w-3xl mb-16 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-slate-100 text-slate-600 border border-slate-200/60">
          Corporate Architecture
        </div>
        <h1 data-aos="fade-left" className="text-4xl sm:text-5xl font-black text-[#0F4C5C] tracking-tight sm:leading-none">
          Operational Structure
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-sky-600 rounded-full" />
        
        <p className="text-lg text-slate-600 font-normal leading-relaxed">
          Opsie Software Solutions Inc. operates through a <span className="font-semibold text-slate-800">lean and agile</span> organizational structure. We fuse a core leadership team with an elite network of technical consultants, developers, project-based specialists, and collaborative partners.
        </p>
        <p className="text-base text-slate-500 leading-relaxed">
          This agile operational model enables the company to efficiently scale resources and premium expertise precisely to project requirements and evolving client needs.
        </p>
      </div>

      {/* Grid Section: Premium Cards Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Core Functions - Sophisticated Dark Slate */}
        <div className="relative group overflow-hidden bg-[#3CDBE6] text-white p-8 lg:p-10 rounded-3xl border border-slate-800 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          {/* Subtle Background Accent Gradient */}
          <div className="absolute -right-16 -top-16 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-500" />
          
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white border border-cyan-500/20 text-cyan-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Core Functions</h2>
            </div>
            
            <ul className="space-y-4">
              {[
                "Executive & Client Management",
                "Software Development & System Support",
                "HRIS & Payroll Solutions",
                "Project Management & Implementation",
                "Technical Support & Client Coordination",
                "Partner Specialists & Project-Based Resources"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 group/item">
                  <span className="h-1.5 w-1.5 rounded-full bg-white group-hover/item:scale-125 transition-transform duration-200" />
                  <span className="text-white font-medium text-[15px] group-hover/item:text-white transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Delivery Approach - Ultra-Clean Bordered Design */}
        <div className="relative group overflow-hidden bg-slate-50 text-slate-800 p-8 lg:p-10 rounded-3xl border border-slate-200/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          {/* Subtle Background Accent Gradient */}
          <div className="absolute -right-16 -top-16 w-40 h-40 bg-sky-500/5 rounded-full blur-3xl group-hover:bg-sky-500/10 transition-all duration-500" />
          
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Delivery Approach</h2>
            </div>

            <p className="text-sm font-semibold tracking-wide text-sky-600 uppercase">
              Our collaborative operational model allows us to:
            </p>
            
            <ul className="space-y-4">
              {[
                "Deliver flexible and scalable technology solutions",
                "Align technical resources based on project requirements",
                "Maintain efficient and responsive client support",
                "Ensure quality system implementation and delivery",
                "Adapt quickly to evolving business and operational needs"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 group/item">
                  <span className="flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-slate-600 font-medium text-[15px] group-hover/item:text-slate-900 transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

export default OperationalStructure;