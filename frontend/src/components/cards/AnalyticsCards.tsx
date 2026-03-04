type AnalyticsCardsProps = {
  numbers: string;
  desc: string;
};

function AnalyticsCards({ numbers, desc }: AnalyticsCardsProps) {
  return (
    <div className="bg-white rounded-lg p-4 w-full h-36 flex flex-col items-center justify-center shadow-md">
      <h1 className="text-2xl text-gray-900 font-bold">{numbers}</h1>
      <h4 className="text-gray-500 text-center mt-1">{desc}</h4>
    </div>
  );
}

export default AnalyticsCards;