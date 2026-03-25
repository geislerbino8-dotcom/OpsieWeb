import React, { useRef, useState, useEffect } from "react";

interface ScrollAnimatedSectionProps {
  children: React.ReactNode;
  className?: string; // extra Tailwind classes if needed
  delay?: number; // optional stagger delay
}

const ScrollAnimatedSection: React.FC<ScrollAnimatedSectionProps> = ({
  children,
  className = "",
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect(); // only animate once
        }
      },
      {
        threshold: 0.1, // 10% visible triggers animation
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-700 ease-out transform
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default ScrollAnimatedSection;