/**
 * LayoutPractice.tsx
 *
 * Practice component for Flexbox + Grid layout exercises.
 * Routed at `/layout-practice` so it can be inspected at different viewport widths.
 *
 * Exercises covered:
 *  1. Flex fundamentals — direction, wrap, gap, justify, align
 *  2. Flex sizing — grow / shrink / basis on uneven content
 *  3. Intrinsic sizing — letting content drive width instead of fixed px
 *  4. Grid fundamentals — responsive column counts without breakpoints soup
 *  5. Grid + Flex combined — sidebar / content / aside with min-w-0 overflow guard
 *  6. Alignment audit — baseline vs center vs stretch on the same row
 */

type ExerciseProps = {
  title: string;
  note: string;
  children: React.ReactNode;
};

function Exercise({ title, note, children }: ExerciseProps) {
  return (
    <section className="w-full border border-white/10 rounded-2xl bg-white/[0.03] overflow-hidden">
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-5 py-4 border-b border-white/10">
        <h2 className="text-white font-semibold text-base">{title}</h2>
        <p className="text-gray-400 text-xs sm:text-sm">{note}</p>
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}

const BOX = "rounded-lg bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#A78BFA] text-xs font-medium flex items-center justify-center";

/* 1. Flex fundamentals: direction, wrap, gap, justify, align */
function ExerciseFlexBasics() {
  return (
    <Exercise
      title="1 · Flex fundamentals"
      note="flex-col → sm:flex-row, flex-wrap, gap, justify-between, items-center"
    >
      <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        {["Alpha", "Bravo", "Charlie", "Delta"].map((label) => (
          <div key={label} className={`${BOX} px-4 py-3 sm:py-4 sm:flex-1 min-w-[120px]`}>
            {label}
          </div>
        ))}
      </div>
    </Exercise>
  );
}

/* 2. Flex sizing: grow / shrink / basis on uneven content */
function ExerciseFlexSizing() {
  return (
    <Exercise
      title="2 · Flex grow / shrink / basis"
      note="basis-0 grow keeps equal widths even with long content"
    >
      <div className="flex flex-col sm:flex-row gap-3">
        <div className={`${BOX} p-4 basis-0 grow-0 shrink`}>
          Short
        </div>
        <div className={`${BOX} p-4 basis-0 grow`}>
          Much longer label that would otherwise push siblings off the row
        </div>
        <div className={`${BOX} p-4 basis-0 grow-0 shrink-0`}>
          Fixed
        </div>
      </div>
    </Exercise>
  );
}

/* 3. Intrinsic sizing — no fixed pixel widths */
function ExerciseIntrinsic() {
  return (
    <Exercise
      title="3 · Intrinsic sizing"
      note="grid + auto-fit replaces fixed px columns"
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={`${BOX} px-3 py-6`}>
            Card {i + 1}
          </div>
        ))}
      </div>
    </Exercise>
  );
}

/* 4. Grid fundamentals — responsive columns, one breakpoint chain */
function ExerciseGridBasics() {
  return (
    <Exercise
      title="4 · Grid columns"
      note="1 → 2 → 3 → 4 columns with a single gap token"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={`${BOX} p-4 h-full`}>
            {i + 1}
          </div>
        ))}
      </div>
    </Exercise>
  );
}

/* 5. Sidebar / content / aside — min-w-0 guards horizontal overflow */
function ExerciseSidebarLayout() {
  return (
    <Exercise
      title="5 · Sidebar + content + aside"
      note="min-w-0 on the middle column stops long words from overflowing"
    >
      <div className="flex flex-col lg:flex-row gap-4">
        <aside className="lg:w-48 shrink-0 rounded-lg border border-white/10 bg-white/5 p-4">
          <p className="text-white text-sm font-medium mb-2">Sidebar</p>
          <p className="text-gray-400 text-xs leading-relaxed">
            shrink-0 keeps this column at its natural width.
          </p>
        </aside>

        <main className="flex-1 min-w-0 rounded-lg border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 p-4">
          <p className="text-white text-sm font-medium mb-2">Content</p>
          <p className="text-gray-300 text-xs leading-relaxed break-words">
            This middle column carries <span className="font-mono">min-w-0</span> so its
            children can actually shrink. Without it, an unbroken string like
            <span className="font-mono"> supercalifragilisticexpialidocious</span> would
            force the row wider than the viewport and create a horizontal scrollbar.
          </p>
        </main>

        <aside className="lg:w-56 shrink-0 rounded-lg border border-white/10 bg-white/5 p-4">
          <p className="text-white text-sm font-medium mb-2">Aside</p>
          <p className="text-gray-400 text-xs leading-relaxed">
            Third column, stacked on mobile via flex-col.
          </p>
        </aside>
      </div>
    </Exercise>
  );
}

/* 6. Alignment audit — same row, three different align values */
function ExerciseAlignment() {
  return (
    <Exercise
      title="6 · Alignment audit"
      note="items-start / items-center / items-stretch compared side by side"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <p className="text-[#A78BFA] text-xs font-semibold mb-3">items-start</p>
          <div className="flex items-start gap-2 h-24">
            <div className={`${BOX} h-6 px-2`}>A</div>
            <div className={`${BOX} h-14 px-2`}>B</div>
            <div className={`${BOX} h-9 px-2`}>C</div>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <p className="text-[#A78BFA] text-xs font-semibold mb-3">items-center</p>
          <div className="flex items-center gap-2 h-24">
            <div className={`${BOX} h-6 px-2`}>A</div>
            <div className={`${BOX} h-14 px-2`}>B</div>
            <div className={`${BOX} h-9 px-2`}>C</div>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <p className="text-[#A78BFA] text-xs font-semibold mb-3">items-stretch</p>
          <div className="flex items-stretch gap-2 h-24">
            <div className={`${BOX} px-2`}>A</div>
            <div className={`${BOX} px-2`}>B</div>
            <div className={`${BOX} px-2`}>C</div>
          </div>
        </div>
      </div>
    </Exercise>
  );
}

function LayoutPractice() {
  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] px-4 sm:px-6 lg:px-8 py-10">
      <div className="mx-auto w-full max-w-6xl flex flex-col gap-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Layout <span className="text-[#8B5CF6]">Practice</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Flexbox and Grid exercises. Resize the viewport to check alignment and
            spacing at each breakpoint.
          </p>
        </header>

        <ExerciseFlexBasics />
        <ExerciseFlexSizing />
        <ExerciseIntrinsic />
        <ExerciseGridBasics />
        <ExerciseSidebarLayout />
        <ExerciseAlignment />
      </div>
    </div>
  );
}

export default LayoutPractice;
