type PrimaryButtonProps = {
  text: string;
  color: string;           // background color (hex or Tailwind class)
  fontSize: string;        // in em
  borderRadius: string;    // in em
  margin: string;          // in em
  padding: string;         // optional override for padding
  image?: string;
};

function PrimaryButton({ text, color, fontSize, borderRadius, margin, padding, image }: PrimaryButtonProps) {
  return (
    <div className={`inline-block m-[${margin}em]`}>
      <button
        className={`
          flex items-center justify-center
          text-white
          font-semibold
          transition-all duration-200
          hover:brightness-90
        `}
        style={{
          fontSize: `${fontSize}em`,
          borderRadius: `${borderRadius}em`,
          padding: padding ? padding : '0.5em 1em',
          backgroundColor: color,
        }}
      >
        {text}
        {image && (
          <span className="ml-2">
            <img src={image} alt="" width={15} />
          </span>
        )}
      </button>
    </div>
  );
}

export default PrimaryButton;