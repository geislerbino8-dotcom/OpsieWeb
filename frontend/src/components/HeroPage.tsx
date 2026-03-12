import LogoOnly from '../assets/icons/opsie_logo_only.png';
import SplitText from './SplitText'

type HeroPageProps = {
  heroText?: string;
  bgImage?: string;
};

function HeroPage({ heroText, bgImage }: HeroPageProps) {
  return (
    <div
      className="w-full h-screen font-poppins relative flex flex-col justify-end"
      style={{
        backgroundColor: '#000000aa',
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        backgroundAttachment: 'fixed',
        backgroundClip: 'content-box',
        backgroundSize: 'cover',
        backgroundBlendMode: 'darken'
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img src={LogoOnly} alt="Logo" className="spin-slow w-72 md:w-96 opacity-70" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 md:px-8 mb-16 space-y-6">

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          <SplitText
            text="Bring your Ideas into Reality"
            className="text-10xl font-bold text-center"
            delay={50}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
        </h1>

        <p
          className="text-white text-base md:text-lg max-w-2xl"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga temporibus
          ipsa dolore laboriosam ea harum iure quo consequuntur dolorem rem nobis
          sint magni esse quam, hic laudantium dolorum aliquam suscipit?
        </p>

        <button
          className="bg-[#3CBDE6] text-black font-semibold cursor-pointer px-8 py-4 rounded-xl transition- all duration-300 ease-in-out hover:text-white hover:bg-cyan-600 transition-colors hover:-translate-y-[2px]"
          data-aos="fade-up"
          onClick={()=> {
            window.location.href = "/book-a-schedule"
          }}
        >
          BOOK A MEETING SCHEDULE
        </button>

      </div>
      
    </div>
  );
}

export default HeroPage;