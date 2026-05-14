import React from 'react';
import { MessageCircle, LayoutGrid, Activity, ArrowRight } from 'lucide-react';

const ContactProcessSection: React.FC = () => {
  const steps = [
    {
      id: "01",
      title: "Contact us",
      description: "Tell us more about your business",
      icon: <MessageCircle className="w-6 h-6" />,
    },
    {
      id: "02",
      title: "Choose your plan",
      description: "We help you find the right option",
      icon: <LayoutGrid className="w-6 h-6" />,
    },
    {
      id: "03",
      title: "Optimize",
      description: "Start running your operations smoothly",
      icon: <Activity className="w-6 h-6" />,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 px-6 font-sans selection:bg-indigo-500/30">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-600/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-20">
          {/* Eyebrow Text */}
          <span className="inline-block px-4 py-1.5 rounded-full border border-slate-800 bg-slate-900/50 text-indigo-400 text-xs font-bold uppercase tracking-[0.2em] mb-6">
            How to Contact Us?
          </span>
          
          {/* H1 Header */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Get Started With <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-300 to-slate-500">
              Opsie Software Solutions
            </span>
          </h1>

          {/* Paragraph */}
          <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
            Here’s how to set up your account and start running smoothly.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="group relative p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.05] hover:border-white/10"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-8">
                  <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform duration-500">
                    {step.icon}
                  </div>
                  <span className="text-4xl font-black text-slate-800/50 group-hover:text-indigo-500/20 transition-colors duration-500">
                    {step.id}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-20 text-center">
          <button
            onClick={()=> window.location.href = "/contact-us"}
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-950 font-bold rounded-full overflow-hidden transition-all hover:pr-10 active:scale-95">
            <span>Start Your Journey</span>
            <ArrowRight className="w-5 h-5 absolute right-4 opacity-0 group-hover:opacity-100 transition-all duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactProcessSection;