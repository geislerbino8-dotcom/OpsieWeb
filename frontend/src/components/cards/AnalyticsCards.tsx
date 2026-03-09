import CountUp from "../CountUp";

type AnalyticsCardsProps = {
  numbers: string;
  desc: string;
};

function AnalyticsCards({ numbers, desc }: AnalyticsCardsProps) {
  return (
    <div className="bg-white rounded-lg p-4 w-full h-36 flex flex-col items-center justify-center card-shadow">
      <CountUp
        from={0}
        to={Number(numbers)}
        separator=","
        direction="up"
        duration={3}
        className="count-up-text text-4xl text-[#242424] font-bold"
      />
      <h4 className="text-xl text-[#010f4d] font-bold text-center mt-1">{desc}</h4>
    </div>
  );
}

export default AnalyticsCards;