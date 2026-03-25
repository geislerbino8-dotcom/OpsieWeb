type BookProps = {
  text: string;
  color?: string;
  fontSize?: string;
  borderRadius?: string;
  margin?: string;
  padding?: string;
  image?: string;
};

function Book({
  text,
  color = '#3CBDE6',
  fontSize = '1',      // in em
  borderRadius = '0.25', // in em
  margin = '0.5',       // in em
  padding = '0.5 1',    // in em
  image,
}: BookProps) {
  return (
    <div>
      <button
        style={{
          fontSize: `${fontSize}em`,
          borderRadius: `${borderRadius}em`,
          margin: `${margin}em`,
          padding: `${padding}em`,
          backgroundColor: color,
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'center',
        }}
        className="meeting-btn" // optional if you still want hover effect
      >
        {text}
        {image && (
          <span>
            <img
              style={{ marginLeft: '0.5em' }}
              width={15}
              src={image}
              alt=""
            />
          </span>
        )}
      </button>
    </div>
  );
}

export default Book;