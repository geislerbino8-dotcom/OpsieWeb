const SuperHeader = ({ text, type, defColor, position }: { text: string, type?: string, defColor?: string, position?: string }) => {

  const parts = text?.split(/(\*.*?\*)/g);

  // Tailwind cannot see dynamically composed class names (`md:text-${position}`),
  // so map the allowed values explicitly. An omitted position simply keeps the
  // base `text-center` instead of emitting an invalid `md:text-undefined`.
  const positionClass =
    position === "left" ? "md:text-left" :
    position === "right" ? "md:text-right" :
    position === "center" ? "md:text-center" : "";

  return (
    <h2 
      data-aos="fade-right" 
      data-aos-delay="200" 
      style={{
        color: defColor && defColor
      }}
      className={
      
      type === 'hero' ? ` text-center ${positionClass} max-w-[850px] text-[42px] leading-[46px] md:text-[72px] md:leading-[82px] heading-glow text-white` : `text-4xl text-center ${positionClass} font-montserrat md:text-5xl font-semibold leading-[1.1] heading-glow text-white`}>
      {parts?.map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <span key={i} className="text-[#8B5CF6] font-bold">
            {part.replaceAll("*", "")}
          </span>
        ) : (
          part
        )
      )}
    </h2>
  );
};

export default SuperHeader