const SuperHeader = ({ text, type, defColor }: { text: string, type?: string, defColor?: string }) => {

  const parts = text?.split(/(\*.*?\*)/g);

  return (
    <h2 
      data-aos="fade-right" 
      data-aos-delay="200" 
      style={{
        color: defColor && defColor
      }}
      className={
      
      type === 'hero' ? `text-center max-w-[850px] text-[42px] leading-[46px] md:text-[72px] md:leading-[82px] text-center md:text-left` : `text-4xl text-center  font-montserrat md:text-5xl font-semibold leading-[1.1] text-gray-900`}>
      {parts?.map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <span key={i} className="text-[#3CBDE6] font-bold">
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