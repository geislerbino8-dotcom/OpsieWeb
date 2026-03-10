import LogoOnly from '../assets/icons/opsie_logo_only.png';

type HeroPageProps = {
  heroText?: string;
  bgImage?: string;
};

function HeroPage({ heroText, bgImage }: HeroPageProps) {
  return (
    <div
      className="w-full h-screen  relative flex flex-col justify-end"
      style={{
        backgroundColor: '#000000aa',
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'darken'
          
      }}
    >
      {/* Logo Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img src={LogoOnly} alt="Logo" className="w-72 md:w-96 opacity-70" />
      </div>

      {/* Hero Text & Button */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 md:px-8 mb-16 space-y-6">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white leading-tight">
          {heroText ? (
            heroText
          ) : (
            <>
              Turning Ideas into{' '}
              <span className="font-playfair italic text-blue-400">Reality</span>✨
            </>
          )}
        </h1>

        <p className="text-white text-base md:text-lg max-w-2xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga temporibus
          ipsa dolore laboriosam ea harum iure quo consequuntur dolorem rem nobis
          sint magni esse quam, hic laudantium dolorum aliquam suscipit?
        </p>

        <button className="bg-[#3CBDE6] text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-500 transition-colors">
          GET STARTED
        </button>
      </div>

    </div>
  );
}

export default HeroPage;