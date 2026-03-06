import { useEffect } from "react";

const useScrollAnimate = (selector: string, className: string = "scroll-animate") => {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(selector);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // add class every time element enters view
            entry.target.classList.add(className);
          } else {
            // remove class so it can animate again
            entry.target.classList.remove(className);
          }
        });
      },
      { threshold: 0.1 } // triggers when 10% of element visible
    );

    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, [selector, className]);
};

export default useScrollAnimate;