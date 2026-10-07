import CountUp from "../CountUp";

type AnalyticsCardsProps = {
  numbers: string;
  unit?: string
  desc: string;
};

function AnalyticsCards({ numbers, unit, desc }: AnalyticsCardsProps) {
  return (
    <div className="group relative bg-[#0a0a0a] rounded-md p-6 w-full h-44 flex flex-col items-center justify-center 
                    transition-all duration-500 ease-out
                    border border-cyan-500/20 card-side-glow
                    hover:-translate-y-2 hover:border-[#8B5CF6]/50">
      
      {/* Subtle Background Accent on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/0 to-[#8B5CF6]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="flex flex-row">
          <CountUp
          from={0}
          to={Number(numbers)}
          separator=","
          direction="up"
          duration={3}
          className="count-up-text text-5xl text-white font-extrabold tracking-tight 
                     transition-transform duration-500 group-hover:scale-110 group-hover:text-[#8B5CF6]"
        />
        <h1 className="text-white">{unit}</h1>
        </div>
        
        <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400   
                       mt-3 transition-colors duration-500 group-hover:text-[#A78BFA]">
          {desc}
        </h4>
      </div>

      {/* Modern Bottom Border Shine */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-[#8B5CF6] transition-all duration-500 group-hover:w-1/3 rounded-full" />
    </div>
  );
}

export default AnalyticsCards;