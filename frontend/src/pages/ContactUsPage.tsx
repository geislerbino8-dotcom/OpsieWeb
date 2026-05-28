import { useNavigate } from 'react-router-dom';
import { SiFacebook, SiInstagram, SiGmail, SiIndeed } from 'react-icons/si';
import Sunplazaimg from '../assets/background-images/Sunplaza.jpg';

import ContactForm from '@/components/cards/ContactForm';
import ContactsCard from '@/components/cards/ContactsCard';
import ContactBg from '../assets/visuals/Contact-bg.png';
import MapCard from '@/components/cards/MapCard';
import { useContext } from 'react';
import { ContentContext } from '@/App';
import SuperHeader from '@/types/components/SuperHeader';

function ContactUsPage() {

  const content = useContext(ContentContext)
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-x-hidden bg-[#FAFBFF] bg-[#ECEDF1] ">
      {/* --- 1. HERO SECTION --- */}
      <div className="relative w-screen h-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
        <img
          src={ContactBg}
          alt="Contact Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 md:bg-gradient-to-r md:from-black/95 md:via-black/60 to-transparent"></div>

        <div className="relative z-10 h-full w-full max-w-[1280px] mx-auto flex flex-col justify-end pb-24 px-6 md:px-12 text-white text-left">
          <div data-aos="fade-right">
            <SuperHeader text={content?.contactUsPage.header} type='hero' position='left'/>
        
            <p className="text-center md:text-left mt-8 text-lg md:text-2xl font-light max-w-xl text-gray-200">
              {content?.contactUsPage.subHeader} 
            </p>
          </div>

          {/* Floating Stats Card */}
          <div data-aos="fade-up" className="hidden md:flex absolute right-12 bottom-12 bg-white/10 backdrop-blur-xl p-8 rounded-[2rem] border border-white/20 items-center gap-6 shadow-2xl">
            <div className="flex -space-x-3">
              {[780, 816, 818].map((id) => (
                <img key={id} src={`/profiles/Rectangle ${id}.svg`} className="w-14 h-14 rounded-full border-2 border-[#3CBDE6] object-cover" alt="client" />
              ))}
            </div>
            <div>
              <p className="text-sm font-bold tracking-widest uppercase opacity-80">Trusted by Teams</p>
              <p className="text-[#3CBDE6] text-2xl font-bold">★★★★★ <span className="text-white text-base ml-2">5/5</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* --- 2. CONTACT FORM & CARDS --- */}
      <div className="max-w-[1280px] mx-auto px-2 md:px-6 py-24 ">

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Contact Form */}
          <div data-aos="fade-right">

            <ContactForm />
          </div>

          {/* Right: Info Cards */}
          <div className="flex flex-col gap-8" data-aos="fade-left">
            <ContactsCard title="Give us a Call">
              <div className="space-y-4 text-gray-600">
                <div className="flex flex-col sm:flex-row justify-between border-b border-gray-50 pb-2 gap-1">
                  <span className="font-medium text-sm">General Inquiries:</span> 
                  <span className="text-black font-bold"><a href="tel:+63284634039">+632 84634039</a></span>
                </div>
               
                <div className="flex flex-col sm:flex-row justify-between gap-1">
                  <span className="font-medium text-sm">Official Email</span> 
                  <span className="text-[#3CBDE6] font-bold break-all text-right"><a href="mailto:inquiry@opsiesoftwaresolutions.com">inquiry@opsiesoftwaresolutions.com</a></span>
                </div>
              </div>
            </ContactsCard>

            <ContactsCard title="Follow us on Social Media">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { Icon: SiFacebook, label: "Facebook", link: "#" },
                  { Icon: SiInstagram, label: "@opsiesoftware", link: "#" },
                  { Icon: SiGmail, label: "Email Us", link: "mailto:inquiry@opsiesoftwaresolutions.com" },
                  { Icon: SiIndeed, label: "Indeed", link: "#" }
                ].map((item, i) => (
                  <a key={i} href={item.link} className="flex items-center gap-3 p-4 rounded-2xl border border-gray-100 hover:border-[#3CBDE6] hover:shadow-md transition-all group bg-white">
                    <item.Icon className="text-gray-400 group-hover:text-[#3CBDE6] group-hover:scale-110 transition-all" size={20} />
                    <span className="text-sm font-semibold text-gray-700">{item.label}</span>
                  </a>
                ))}
              </div>
            </ContactsCard>

            <div className="bg-[#242424] p-8 md:p-10 rounded-3xl text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#3CBDE6] opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              <h3 className="text-3xl font-bold mb-4">Meet With Us Online</h3>
              <p className="mb-8 text-gray-400 font-light leading-relaxed">Rather meet online than in person? We’re just a call away.</p>
              <button 
                onClick={() => navigate("/book-a-schedule")}
                className="w-full bg-[#3CBDE6] text-white py-4 rounded-xl font-bold hover:bg-white hover:text-black transition-all duration-300 shadow-lg relative z-10"
              >
                Book a Discovery Call
              </button>
            </div>
          </div>
        </div>

        {/* --- 3. OFFICES & MAP --- */}
        <div className="pt-24">
          <div 
            className="flex flex-col md:flex-row justify-between items-center p-2 gap-10 md:p-16 rounded-[2.5rem] overflow-hidden"
            style={{
              backgroundColor: '#242424',
              backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${Sunplazaimg})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          >
            {/* Text Side */}
            <div className="w-full md:w-1/2 text-white p-5" data-aos="fade-up">
              
              <h2 className="text-4xl text-center md:text-left md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Visit our office <br /> at
                <span className="text-[#3CBDE6]"> Sun Plaza.</span>
              </h2>
              <p className="text-gray-300 text-lg max-w-md font-light leading-relaxed text-center md:text-left">
                Experience our workspace and meet the brilliant minds behind our software solutions. 
              </p>
            </div>

            {/* Map Side - Stacks below on mobile */}
            <div className="w-full md:w-auto flex justify-center" data-aos="zoom-in">
              <MapCard /> 
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ContactUsPage;