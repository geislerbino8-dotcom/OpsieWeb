import { useState } from "react";
import MapCard from "@/components/cards/MapCard";
import ContactForm from "../../components/cards/ContactForm";
import contactbg from '../../assets/background-images/contactusbg.jpg';
import { Mail, MapPin, Phone } from "lucide-react";
import { usePageContent } from "@/data/usePageContent";
import { PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ContactUsSection: React.FC = () => {

  const [ content ] = useState(usePageContent.data[0].contactUsSection)
  const navigate = useNavigate()

  return (


    <section className="relative w-full flex flex-col items-center pt-24 pb-20 px-2 md:px-6 overflow-hidden">
      
      {/* 1. Base Mesh Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_#5CE1FF_0%,_transparent_50%),_radial-gradient(circle_at_bottom_left,_#29A6CC_0%,_transparent_50%)]" />

      {/* 2. The Background Image Overlay */}
      <div 
        className="fixed inset-0 z-0 mix-blend-overlay pointer-events-none bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${contactbg})`,
        }}
      />

      {/* 3. Decorative Background Blobs */}
      <div className="absolute -top-[10%] -right-[5%] w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
      <div className="absolute -bottom-[10%] -left-[5%] w-[500px] h-[500px] bg-black/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Header Area */}
        <div className="text-center mb-16 max-w-3xl" data-aos="fade-up">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
            {
              content.header
            }
          </h1>
          <p className="text-blue-50/90 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            {
              content.subHeader
            }
          </p>

           <div className="flex justify-center">
            <button 
              onClick={()=> navigate('/contact-us')}
              className="group relative my-10 flex items-center gap-3 bg-white text-[#29A6CC] px-8 py-4 rounded-full font-bold text-lg shadow-2xl transition-all duration-300 hover:bg-[#29A6CC] hover:text-white hover:-translate-y-1 active:scale-95">
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
            href="tel:+632 84634039 "
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
    className="group bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-xl flex flex-col items-center text-center transition-all duration-500 hover:bg-black hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] hover:-translate-y-3"
  >
    <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-[#3CBDE6] mb-6 shadow-xl group-hover:bg-[#3CBDE6] group-hover:text-white transition-all duration-500 group-hover:rotate-[360deg]">
      {icon}
    </div>
    <h4 className="text-white font-bold tracking-[0.2em] uppercase text-[10px] mb-3 transition-colors">
      {title}
    </h4>
    {/* break-all ensures long emails don't overflow the card on small screens */}
    <p className={`${paddingClass} text-white/90 group-hover:text-[#3CBDE6] font-semibold text-lg transition-colors break-all md:break-normal`}>
      {detail}
    </p>
  </a>
);

export default ContactUsSection;