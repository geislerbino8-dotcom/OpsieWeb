import React from 'react';
import SuperHeader from '@/types/components/SuperHeader';

const SolutionSection: React.FC = () => {
  return (
    <section className="max-w-5xl mx-auto py-16 px-4 font-sans text-slate-800">
      {/* Header Section */}
      <div className="text-center mb-12">
 
        <SuperHeader text='A *simpler way* to run your business'/>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed m-2">
          Our products are built to simplify workflows, improve visibility, and support 
          your team as you grow.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="grid md:grid-cols-2 border border-slate-300 rounded-sm overflow-hidden">
        
        {/* Traditional Setup */}
        <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-slate-300">
          <h3 className="text-xl font-bold mb-6">Traditional Setup</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-800 shrink-0" />
              <span className="text-lg">Disconnected tools</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-800 shrink-0" />
              <span className="text-lg">Manual processes</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-800 shrink-0" />
              <span className="text-lg">Limited scalability</span>
            </li>
          </ul>
        </div>

        {/* Opsie Software Solutions */}
        <div className="p-8 md:p-12 bg-white">
          <h3 className="text-xl font-bold mb-6">With Opsie Software Solutions</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-800 shrink-0" />
              <span className="text-lg">Connected systems</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-800 shrink-0" />
              <span className="text-lg">Streamlined workflows</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-800 shrink-0" />
              <span className="text-lg">Built for growth</span>
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
};

export default SolutionSection;