import { useState, useEffect } from "react";

function DateTimeBar() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const date = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-full font-bold">
      <div className="flex items-stretch">
        {/* Left: Date (dark red) */}
        <div className="bg-[#8B0000] text-white px-4 py-3 md:px-8 md:py-4 text-sm md:text-xl uppercase tracking-wider">
          📅 {date}
        </div>

        {/* Right: Time (yellow/gold) */}
        <div className="bg-[#FFD700] text-[#8B0000] px-4 py-3 md:px-8 md:py-4 text-sm md:text-xl uppercase tracking-wider">
          🕐 {time}
        </div>
      </div>
    </div>
  );
}

export default DateTimeBar;
