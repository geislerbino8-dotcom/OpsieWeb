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
      {/* Top ticker bar */}
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

      {/* Bottom: Scrolling ticker text */}
      <div className="bg-white border-b border-gray-200 overflow-hidden py-2 md:py-3">
        <div className="animate-marquee whitespace-nowrap text-gray-700 text-sm md:text-lg font-semibold">
          🚀 Innovating the future — one system at a time.&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          ✨ Delivering scalable, reliable software solutions.&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          🌐 Serving businesses across the Philippines.&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          📞 Contact us today for a free consultation.&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          🚀 Innovating the future — one system at a time.&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          ✨ Delivering scalable, reliable software solutions.&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        </div>
      </div>
    </div>
  );
}

export default DateTimeBar;
