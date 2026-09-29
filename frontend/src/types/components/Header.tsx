const Header = ({ text }: { text: string }) => {

  const parts = text.split(/(\*.*?\*)/g);

  return (
    <h2 className="text-3xl font-montserrat md:text-4xl font-semibold leading-[1.1] text-gray-900">
      {parts.map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <span key={i} className="text-[#8B5CF6]">
            {part.replaceAll("*", "")}
          </span>
        ) : (
          part
        )
      )}
    </h2>
  );
};

export default Header