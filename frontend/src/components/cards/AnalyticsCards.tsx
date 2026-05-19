import CountUp from "../CountUp";

type AnalyticsCardsProps = {
  numbers: string;
  unit?: string
  desc: string;
};

function AnalyticsCards({ numbers, unit, desc }: AnalyticsCardsProps) {
  return (
    <div className="group relative bg-white rounded-md p-6 w-full h-44 flex flex-col items-center justify-center 
                    transition-all duration-500 ease-out
                    border border-slate-100 shadow-sm
                    hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-2 hover:border-indigo-100">
      
      {/* Subtle Background Accent on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="flex flex-row">
          <CountUp
          from={0}
          to={Number(numbers)}
          separator=","
          direction="up"
          duration={3}
          className="count-up-text text-5xl text-[#242424] font-extrabold tracking-tight 
                     transition-transform duration-500 group-hover:scale-110 group-hover:text-[#3CDBE6]"
        />
        <h1 className="text-black">{unit}</h1>
        </div>
        
        <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400   
                       mt-3 transition-colors duration-500 group-hover:text-[#010f4d]">
          {desc}
        </h4>
      </div>

      {/* Modern Bottom Border Shine */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-[#3CDBE6] transition-all duration-500 group-hover:w-1/3 rounded-full" />
    </div>
  );
}

export default AnalyticsCards;