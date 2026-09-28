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
        {/* Left: Date (dark) */}
        <div className="bg-[#1a1a1a] text-white px-8 py-6 md:px-16 md:py-10 text-2xl md:text-5xl uppercase tracking-wider">
          📅 {date}
        </div>

        {/* Right: Time (yellow) */}
        <div className="bg-[#FFD700] text-[#1a1a1a] px-8 py-6 md:px-16 md:py-10 text-2xl md:text-5xl uppercase tracking-wider">
          🕐 {time}
        </div>
      </div>
    </div>
  );
}

export default DateTimeBar;
