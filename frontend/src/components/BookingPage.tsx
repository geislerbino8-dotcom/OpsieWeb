import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import "../styles/BookingCal.css";

const CONTACT_EMAIL = "inquiry@opsiesoftwaresolutions.com";

/**
 * The Cal.com event this page embeds — the path after `cal.com/`.
 * Swap this one line when the real event type exists
 * (`your-handle/30min`, or `org/team/event-type` for a team event).
 * TODO: placeholder — no Cal.com event type has been created yet, so the
 * widget currently renders Cal.com's "not found" page until it's replaced.
 */
const CAL_LINK = "opsie/30min";

function BookingPage() {
  // Brand the embed with the site's violet. `Cal` inits the namespace in its
  // own effect, which React runs before this parent effect.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const cal = await getCalApi({ namespace: "booking" });
        if (cancelled) return;
        cal("ui", {
          cssVarsPerTheme: {
            light: {
              "cal-brand": "#8B5CF6",
              "cal-brand-emphasis": "#7C3AED",
            },
            dark: {
              "cal-brand": "#8B5CF6",
              "cal-brand-emphasis": "#7C3AED",
            },
          },
          styles: { branding: { brandColor: "#8B5CF6" } },
        });
      } catch (error) {
        console.error("Failed to theme the Cal.com embed:", error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a]">
      {/* --- BACKGROUND DECOR --- */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-56 right-[-14%] h-[70vh] w-[70vh] rounded-full bg-[#8B5CF6]/30 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-30%] left-[-18%] h-[65vh] w-[65vh] rounded-full bg-cyan-500/15 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_100%_0%,rgba(124,58,237,0.22),transparent_60%)]"
      />

      {/* --- CONTENT --- */}
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 pb-24 pt-28 md:px-10 lg:pt-32">
        {/* Two columns only once the calendar has room to show a month grid
            alongside the intro; below that it collapses to a stacked picker.
            Flex (not a grid) so the booking column's minimum width is
            absorbed by the intro column instead of leaving dead space. */}
        <div className="flex flex-col items-start gap-10 min-[1000px]:flex-row min-[1000px]:gap-12">
          {/* ---------- INTRO COLUMN ---------- */}
          <div
            className="booking-intro w-full max-w-[540px] min-[1000px]:basis-[46%] min-[1000px]:shrink"
            data-aos="fade-right"
          >
            <p className="inline-flex items-center rounded-full border border-[#8B5CF6]/40 bg-[#8B5CF6]/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C4B5FD]">
              30 Min Consultation
            </p>

            <h1 className="mt-7">
              <span className="booking-title-poiret font-poiret block text-white">
                Let’s Discuss
              </span>
              <span className="booking-title-display mt-1 block bg-gradient-to-r from-[#A78BFA] via-[#8B5CF6] to-[#7C3AED] bg-clip-text font-black tracking-tight text-transparent">
                Your Vision.
              </span>
            </h1>

            <p className="mt-7 max-w-[440px] text-[15px] leading-[1.95] text-[#9aa0aa]">
              Select a time that works best for you. Our experts are ready to
              help you turn complex challenges into simple digital solutions.
            </p>

            <div className="mt-10 h-px w-16 bg-[#8B5CF6]" />

            <p className="mt-6 text-[13px] text-[#6b7280]">
              Prefer a different way to connect?
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-1.5 inline-flex items-center gap-2 text-[15px] font-semibold text-white transition-colors hover:text-[#A78BFA]"
            >
              Email us directly <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* ---------- BOOKING COLUMN ---------- */}
          <div
            className="w-full min-[1000px]:min-w-[500px] min-[1000px]:flex-1"
            data-aos="fade-left"
            data-aos-delay="120"
          >
            <div className="relative">
              {/* glow halos behind the card */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-8 rounded-[32px] bg-[#8B5CF6]/25 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-8 translate-y-16 rounded-[32px] bg-cyan-500/15 blur-3xl"
              />

              <div className="booking-card relative overflow-hidden rounded-2xl border border-white/10 bg-[#0e0e14] shadow-[0_0_60px_-20px_rgba(139,92,246,0.7)]">
                {/* Cal.com embed mounts here */}
                <Cal
                  calLink={CAL_LINK}
                  namespace="booking"
                  config={{ theme: "dark", layout: "month_view" }}
                  style={{ width: "100%", minHeight: 640 }}
                />
              </div>
            </div>

            {/* trust note */}
            <div className="mt-6 inline-flex flex-col rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5">
              <span className="text-[12px] leading-5 text-[#6b7280]">
                Free. No credit card required
              </span>
              <span className="text-[13px] font-semibold leading-5 text-white">
                Instant confirmation
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
