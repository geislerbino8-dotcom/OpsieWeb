import OpsieImage from "../../assets/opsie/logo-png.png";
import { useNavigate } from "react-router-dom";

function AboutUsSection() {
  const navigate = useNavigate();

  return (
    <section className="w-full py-24 md:py-32 px-6 overflow-hidden bg-white select-none">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 lg:gap-24">
        
        {/* Left Side: Visual/Logo */}
        <div
          className="relative md:w-1/2 flex justify-center"
          data-aos="fade-right"
        >
          {/* Decorative background element */}
          <div className="absolute inset-0 bg-[#3CBDE6]/5 rounded-full blur-3xl scale-150 -z-10" />
          
          <img 
            src={OpsieImage} 
            alt="Opsie Logo" 
            className="w-64 md:w-80 lg:w-[400px] object-contain drop-shadow-2xl" 
          />
        </div>

        {/* Right Side: Content */}
        <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          
          <div className="space-y-4 mb-8">
            
            <h2 
              className="text-4xl md:text-5xl font-poppins font-bold leading-[1.1] text-gray-900"
              data-aos="fade-up" 
              data-aos-delay="100"
            >
              Turn Your <span className="text-[#3CBDE6]">Business Vision</span> into Digital Reality
            </h2>
          </div>

          <div className="space-y-6 text-gray-600 text-lg font-light leading-relaxed">
            <p data-aos="fade-up" data-aos-delay="200">
              At <span className="font-semibold text-gray-900">Opsie</span>, we don't just build apps; we architect solutions. 
              We bridge the gap between complex business challenges and high-performance digital ecosystems.
            </p>

            <p data-aos="fade-up" data-aos-delay="300">
              Our team specializes in creating scalable, secure, and user-centric software that 
              drives measurable growth. Whether you're a startup or an established enterprise, 
              we bring the technical edge you need to stay ahead.
            </p>
          </div>

          <div data-aos="fade-up" data-aos-delay="400" className="pt-6">
            <button 
              onClick={() => navigate('/who-we-are')}
              className="group relative flex items-center gap-3 px-8 py-4 bg-white border-2 border-gray-100 rounded-2xl font-bold text-gray-900 transition-all duration-300 hover:border-[#3CBDE6] hover:bg-gray-50 hover:shadow-lg hover:shadow-[#3CBDE6]/10"
            >
              <span>Discover Our Story</span>
             
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutUsSection;