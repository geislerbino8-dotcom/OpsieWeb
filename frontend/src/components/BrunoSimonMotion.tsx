import { useEffect } from "react";

const revealSelector =
  "main section, main article, main h1, main h2, main h3";

const cardSelector =
  "main [class*='card'], main [class*='Card']";

const magneticSelector =
  "main button, main a[href]";

const isMotionAllowed = () =>
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
  window.matchMedia("(pointer: fine)").matches;

const BrunoSimonMotion = () => {
  useEffect(() => {
    if (!isMotionAllowed()) return;

    let frame = 0;
    const cleanup = new Array<() => void>();

    const applyMotion = () => {
      document.querySelectorAll<HTMLElement>(revealSelector).forEach((element) => {
        if (!element.classList.contains("bs-reveal")) {
          element.classList.add("bs-reveal");
        }
      });

      document.querySelectorAll<HTMLElement>(cardSelector).forEach((card) => {
        if (card.dataset.bsTilt === "ready") return;
        card.dataset.bsTilt = "ready";

        const handlePointerMove = (event: PointerEvent) => {
          const rect = card.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;

          card.style.setProperty("--bs-rotate-x", `${(-y * 3).toFixed(2)}deg`);
          card.style.setProperty("--bs-rotate-y", `${(x * 4).toFixed(2)}deg`);
          card.style.setProperty("--bs-lift-x", `${(x * 5).toFixed(2)}px`);
          card.style.setProperty("--bs-lift-y", `${(y * 5).toFixed(2)}px`);
          card.classList.add("bs-tilting");
        };

        const reset = () => {
          card.classList.remove("bs-tilting");
          card.style.setProperty("--bs-rotate-x", "0deg");
          card.style.setProperty("--bs-rotate-y", "0deg");
          card.style.setProperty("--bs-lift-x", "0px");
          card.style.setProperty("--bs-lift-y", "0px");
        };

        card.addEventListener("pointermove", handlePointerMove);
        card.addEventListener("pointerleave", reset);
        cleanup.push(() => {
          card.removeEventListener("pointermove", handlePointerMove);
          card.removeEventListener("pointerleave", reset);
        });
      });

      document.querySelectorAll<HTMLElement>(magneticSelector).forEach((element) => {
        if (element.dataset.bsMagnetic === "ready") return;
        element.dataset.bsMagnetic = "ready";

        const handlePointerMove = (event: PointerEvent) => {
          const rect = element.getBoundingClientRect();
          const x = event.clientX - (rect.left + rect.width / 2);
          const y = event.clientY - (rect.top + rect.height / 2);
          const strength = element.tagName === "BUTTON" ? 0.14 : 0.08;

          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(() => {
            element.style.setProperty("--bs-magnet-x", `${x * strength}px`);
            element.style.setProperty("--bs-magnet-y", `${y * strength}px`);
          });
        };

        const reset = () => {
          element.style.setProperty("--bs-magnet-x", "0px");
          element.style.setProperty("--bs-magnet-y", "0px");
        };

        element.addEventListener("pointermove", handlePointerMove);
        element.addEventListener("pointerleave", reset);
        cleanup.push(() => {
          element.removeEventListener("pointermove", handlePointerMove);
          element.removeEventListener("pointerleave", reset);
        });
      });
    };

    applyMotion();
    const observer = new MutationObserver(applyMotion);
    observer.observe(document.getElementById("root") ?? document.body, {
      childList: true,
      subtree: true,
    });

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("bs-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );

    const observeRevealElements = () => {
      document
        .querySelectorAll<HTMLElement>(".bs-reveal:not(.bs-visible)")
        .forEach((element) => revealObserver.observe(element));
    };

    observeRevealElements();
    const revealMutationObserver = new MutationObserver(observeRevealElements);
    revealMutationObserver.observe(document.getElementById("root") ?? document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      revealMutationObserver.disconnect();
      revealObserver.disconnect();
      cleanup.forEach((remove) => remove());
    };
  }, []);

  return null;
};

export default BrunoSimonMotion;
