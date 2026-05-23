import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, MapPin, Phone, PlayCircle } from "lucide-react";
import MapCard from "@/components/cards/MapCard";
import ContactForm from "../../components/cards/ContactForm";
import ShapeGrid from "@/components/ShapeGrid";
import { ContentContext } from "@/App";
import "aos/dist/aos.css";

const ContactUsSection: React.FC = () => {
  const content = useContext(ContentContext);
  const navigate = useNavigate();

  return (
    // Changed base background to a premium deep dark tint
    <section className="relative w-full flex flex-col items-center pt-24 pb-20 px-2 md:px-6 overflow-hidden bg-[#0A0F1D]">
      
      {/* 1. Muted Dark Mesh Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_#1E3A8A_0%,_transparent_60%),_radial-gradient(circle_at_bottom_left,_#0F172A_0%,_transparent_60%)]" />

      {/* 2. Interactive Shape Grid Overlay (Tuned border and opacity for dark look) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-20">
        <ShapeGrid 
          speed={0.3}
          squareSize={40}
          direction="diagonal"
          borderColor="#ffffff"
          hoverFillColor="#0a64f4"
          shape="square"
          hoverTrailAmount={0}
        />
      </div>

      {/* 3. Decorative Dark Background Blobs */}
      <div className="absolute -top-[10%] -right-[5%] w-[500px] h-[500px] bg-[#29A6CC]/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute -bottom-[10%] -left-[5%] w-[500px] h-[500px] bg-black/40 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Header Area */}
        <div className="text-center mb-16 max-w-3xl" data-aos="fade-up">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
            {content?.contactUsSection?.header}
          </h1>
          <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            {content?.contactUsSection?.subHeader}
          </p>

          <div className="flex justify-center">
            <button 
              onClick={() => navigate('/contact-us')}
              className="group relative my-10 flex items-center gap-3 bg-white text-[#29A6CC] px-8 py-4 rounded-full font-bold text-lg shadow-2xl transition-all duration-300 hover:bg-[#29A6CC] hover:text-white hover:-translate-y-1 active:scale-95"
            >
              <PlayCircle className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
              Request a Demo
            </button>
          </div>
        </div>

        {/* Form & Map Section */}
        <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-5 md:gap-2 items-stretch">
          <div className="flex-1" data-aos="fade-right">
            <ContactForm />
          </div>
          
          <div className="flex-1 min-h-[450px]" data-aos="fade-left">
            <MapCard />
          </div>
        </div>

        {/* Quick Connect Grid */}
        <div 
          className="mt-16 w-full max-w-6xl grid grid-cols-1 sm:grid-cols-3 gap-8"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <ContactDetail 
            icon={<Mail className="w-6 h-6" />}
            title="Email Us"
            detail="inquiry@opsiesoftwaresolutions.com"
            href="mailto:inquiry@opsiesoftwaresolutions.com"
            paddingClass="px-4" 
          />
          <ContactDetail 
            icon={<MapPin className="w-6 h-6" />}
            title="Visit Us"
            detail="Sunplaza Bldg. Princeton St. Shaw Blvd., Mandaluyong City"
            href="#" 
          />
          <ContactDetail 
            icon={<Phone className="w-6 h-6" />}
            title="Call Us"
            detail="+632 84634039"
            href="tel:+63284634039"
          />
        </div>
      </div>
    </section>
  );
};

interface ContactDetailProps {
  icon: React.ReactNode;
  title: string;
  detail: string;
  href: string;
  paddingClass?: string;
}

const ContactDetail = ({ icon, title, detail, href, paddingClass = "px-0" }: ContactDetailProps) => (
  <a 
    href={href}
    className="group bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-xl flex flex-col items-center text-center transition-all duration-500 hover:bg-slate-900/50 hover:border-white/20 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] hover:-translate-y-3"
  >
    {/* Cleaned up the inner icon wrapper to blend with a dark design style */}
    <div className="w-16 h-16 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-6 shadow-xl group-hover:bg-[#3CBDE6] group-hover:text-white transition-all duration-500 group-hover:rotate-[360deg]">
      {icon}
    </div>
    <h4 className="text-slate-400 font-bold tracking-[0.2em] uppercase text-[10px] mb-3 transition-colors group-hover:text-white">
      {title}
    </h4>
    <p className={`${paddingClass} text-slate-200 group-hover:text-[#3CBDE6] font-semibold text-lg transition-colors break-all md:break-normal`}>
      {detail}
    </p>
  </a>
);

export default ContactUsSection;