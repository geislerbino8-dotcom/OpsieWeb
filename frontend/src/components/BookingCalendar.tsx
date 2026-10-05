import { useState } from "react";

const Calendar = () => {
  const [selectedDate] = useState(new Date());

  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();

  const days = [...Array(daysInMonth).keys()].map(i => i + 1);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-white">
        {selectedDate.toLocaleString("default", { month: "long" })}{" "}
        {selectedDate.getFullYear()}
      </h2>
      <div className="grid grid-cols-7 gap-2">
        {days.map(day => (
          <div
            key={day}
            className="border border-white/10 rounded p-2 text-center text-white hover:bg-[#8B5CF6]/25 cursor-pointer transition-colors"
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
