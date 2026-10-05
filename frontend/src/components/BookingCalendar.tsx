import { useLayoutEffect, useRef, useState } from "react";

const weekdays = [
  { full: "Monday", short: "Mon" },
  { full: "Tuesday", short: "Tue" },
  { full: "Wednesday", short: "Wed" },
  { full: "Thursday", short: "Thu" },
  { full: "Friday", short: "Fri" },
  { full: "Saturday", short: "Sat" },
  { full: "Sunday", short: "Sun" },
];

/** Navigation runs forward up to this month, then Next goes disabled. */
const LAST_MONTH = { year: 2026, month: 11 }; // December

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM",
  "3:00 PM", "4:00 PM", "5:00 PM",
];

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const now = new Date(); // today — drives the marker and the past-day shading
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);
  // Hovering a date previews it: the bubble always follows
  // anchorDay = hoveredDay ?? selectedDay.
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const [bubbleX, setBubbleX] = useState(0); // slide the bubble to its column
  const [arrowX, setArrowX] = useState(32); // aim the arrow at the cell
  const gridRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();

  const days = [...Array(daysInMonth).keys()].map(i => i + 1);

  // Blank cells so day 1 lands on its real weekday. Week starts Monday, but
  // Date.getDay() counts Sunday = 0, so shift by 6 and wrap: Thursday
  // (getDay 4) → (4 + 6) % 7 = 3 blanks before the 1st.
  const firstOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  );
  const leadingBlanks = [...Array((firstOfMonth.getDay() + 6) % 7).keys()];

  const goNextMonth = () => {
    setSelectedDay(null); // a day picked in the old month no longer applies
    setHoveredDay(null);
    setSelectedDate(prev => {
      const next = new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
      const horizon = new Date(LAST_MONTH.year, LAST_MONTH.month, 1);
      // Clamp inside the updater so stale closures or rapid clicks can
      // never step past the horizon.
      return next > horizon ? prev : next;
    });
  };

  const reachedLastMonth =
    selectedDate >= new Date(LAST_MONTH.year, LAST_MONTH.month, 1);

  const goBackMonth = () => {
    setSelectedDay(null); // a day picked in the old month no longer applies
    setHoveredDay(null);
    setSelectedDate(prev => {
      const firstOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const target = new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
      // Never browse before the month we're in — past days are shaded anyway.
      return target < firstOfThisMonth ? prev : target;
    });
  };

  const reachedFirstMonth =
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1) <=
    new Date(now.getFullYear(), now.getMonth(), 1);

  const isCurrentMonth =
    selectedDate.getFullYear() === now.getFullYear() &&
    selectedDate.getMonth() === now.getMonth();

  // The bubble previews the hovered date, otherwise the picked one.
  const anchorDay = hoveredDay ?? selectedDay;

  const appointmentDate =
    anchorDay !== null
      ? new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          anchorDay
        ).toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "";

  // Park the bubble directly under its date: measure the cell against the
  // grid, slide the bubble to that column (clamped so it never leaves the
  // calendar), and aim the arrow at the cell. useLayoutEffect runs before
  // paint, so an opening bubble never flashes at the wrong spot.
  useLayoutEffect(() => {
    if (anchorDay === null) return;
    const grid = gridRef.current;
    const bubble = bubbleRef.current;
    if (!grid || !bubble) return;

    const cell = Array.from(grid.children).find(
      (el) =>
        el instanceof HTMLButtonElement &&
        el.textContent?.trim() === String(anchorDay)
    );
    if (!cell) return;

    const gridRect = grid.getBoundingClientRect();
    const cellRect = cell.getBoundingClientRect();
    const center = cellRect.left - gridRect.left + cellRect.width / 2;
    const half = bubble.offsetWidth / 2;
    // Bubble span allowed: [half, gridWidth - half] (never overhangs).
    const clamped = Math.min(
      Math.max(center, half),
      Math.max(grid.offsetWidth - half, half)
    );
    const left = clamped - half;

    setBubbleX(left);
    // Arrow stays on the bubble but keeps pointing at the cell.
    setArrowX(Math.min(Math.max(center - left, 16), bubble.offsetWidth - 16));
  }, [anchorDay, selectedDate]);

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="min-w-0 truncate text-xl font-bold text-white">
          {selectedDate.toLocaleString("default", { month: "long" })}{" "}
          {selectedDate.getFullYear()}
        </h2>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={goBackMonth}
            disabled={reachedFirstMonth}
            aria-label="Previous month"
            className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12px] font-semibold text-white transition-colors enabled:hover:bg-[#8B5CF6]/25 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ←<span className="hidden sm:inline"> Back</span>
          </button>
          <button
            type="button"
            onClick={goNextMonth}
            disabled={reachedLastMonth}
            aria-label="Next month"
            className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12px] font-semibold text-white transition-colors enabled:hover:bg-[#8B5CF6]/25 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next<span className="hidden sm:inline"> →</span>
          </button>
        </div>
      </div>
      <div className="mb-3 grid grid-cols-7 gap-2 text-center text-[11px] font-semibold text-[#9aa0aa]">
        {weekdays.map((day) => (
          <div key={day.full}>
            <span className="hidden sm:inline">{day.full}</span>
            <span className="sm:hidden">{day.short}</span>
          </div>
        ))}
      </div>
      <div ref={gridRef} className="grid grid-cols-7 gap-2">
        {leadingBlanks.map((i) => (
          <div key={`blank-${i}`} aria-hidden="true" />
        ))}
        {days.map(day => {
          const isPast = isCurrentMonth && day < now.getDate();
          const isToday = isCurrentMonth && day === now.getDate();
          const isSelected = selectedDay === day;
          return (
            <button
              key={day}
              type="button"
              disabled={isPast}
              aria-pressed={isSelected}
              aria-current={isToday ? "date" : undefined}
              onMouseEnter={() => {
                if (!isPast && !booked) setHoveredDay(day);
              }}
              onClick={() => {
                setSelectedDay(day);
                setHoveredDay(null); // the click locks the previewed date
                setBooked(false);
              }}
              className={`border rounded p-2 text-center transition-colors disabled:cursor-default ${
                isPast
                  ? "border-white/5 bg-white/[0.04] text-[#4b5563] cursor-default"
                  : isToday
                    ? "border-[#8B5CF6] bg-[#8B5CF6] text-white font-bold cursor-pointer"
                    : isSelected
                      ? "border-[#8B5CF6] bg-[#8B5CF6]/25 text-white cursor-pointer"
                      : "border-white/10 text-white hover:bg-[#8B5CF6]/25 cursor-pointer"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* ---------- APPOINTMENT BUBBLE ---------- */}
      {selectedDay !== null && (
        <div
          ref={bubbleRef}
          role="region"
          aria-label="Appointment for selected date"
          style={{ transform: `translateX(${bubbleX}px)` }}
          className="relative mt-5 max-w-[440px] rounded-2xl border border-[#8B5CF6]/40 bg-[#0e0e14] p-4 shadow-[0_0_40px_-15px_rgba(139,92,246,0.7)] transition-transform duration-150"
        >
          <span
            aria-hidden="true"
            style={{ left: arrowX }}
            className="absolute -top-2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-[#8B5CF6]/40 bg-[#0e0e14] transition-[left] duration-150"
          />
          {booked ? (
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#8B5CF6] text-[15px] font-bold text-white">
                  ✓
                </span>
                <div>
                  <p className="text-[14px] font-semibold text-white">
                    Appointment requested
                  </p>
                  <p className="text-[12px] text-[#9aa0aa]">
                    {appointmentDate} · {selectedTime}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedDay(null);
                  setSelectedTime(null);
                  setBooked(false);
                }}
                className="mt-4 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#8B5CF6]/25"
              >
                Done
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C4B5FD]">
                    Book an appointment
                  </p>
                  <p className="mt-1.5 text-[15px] font-semibold text-white">
                    {appointmentDate}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Close appointment bubble"
                  onClick={() => {
                    setSelectedDay(null);
                    setSelectedTime(null);
                    setBooked(false);
                  }}
                  className="shrink-0 rounded-md p-1 text-[16px] leading-none text-[#9aa0aa] transition-colors hover:text-white"
                >
                  ×
                </button>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2">
                {timeSlots.map(time => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    aria-pressed={selectedTime === time}
                    className={`rounded-lg border px-2 py-2 text-[12px] font-semibold transition-colors ${
                      selectedTime === time
                        ? "border-[#8B5CF6] bg-[#8B5CF6] text-white"
                        : "border-white/10 bg-white/[0.04] text-white hover:bg-[#8B5CF6]/25"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>

              <button
                type="button"
                disabled={!selectedTime}
                onClick={() => setBooked(true)}
                className="mt-3 w-full rounded-lg bg-[#8B5CF6] px-3 py-2.5 text-[13px] font-bold text-white transition-colors enabled:hover:bg-[#7C3AED] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Make Appointment
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Calendar;
