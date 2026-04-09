import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SiFacebook, SiInstagram, SiGmail, SiIndeed } from 'react-icons/si';
import { OFFICE_LOCATIONS } from '@/data/siteLocationsData';

// Components
import ProductItemCTA from '@/components/cards/ProductItemCTA';
import ContactForm from '@/components/cards/ContactForm';
import ContactsCard from '@/components/cards/ContactsCard';
import MapBox from '@/components/MapBox';
import ContactBg from '../assets/visuals/Contact-bg.png';

function ContactUsPage() {
  const navigate = useNavigate();
  const [dirAction, setDirAction] = useState(false);
  const [selectedLoc, setSelectedLoc] = useState(OFFICE_LOCATIONS.main);

  return (
    <div className="w-full overflow-x-hidden bg-[#FAFBFF]">
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
            <h1 className="max-w-[750px] font-poppins text-[42px] leading-[46px] md:text-[72px] md:leading-[82px] font-bold">
              Let’s Talk About <br />
              <span className="text-[#3CBDE6]">What’s on your Mind.</span>
            </h1>
            <p className="mt-8 text-lg md:text-2xl font-light max-w-xl text-gray-200">
              Whether you have a question about features, pricing, or a custom solution, our team is ready to help.
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
      <div className="bg-white max-w-[1280px] mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Contact Form */}
          <div data-aos="fade-right">
            <ContactForm />
          </div>

          {/* Right: Info Cards */}
          <div className="flex flex-col gap-8" data-aos="fade-left">
            <ContactsCard title="Give us a Call">
              <div className="space-y-4 text-gray-600">
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="font-medium">General Inquiries:</span> 
                  <span className="text-black font-bold">1-800-664-9073</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="font-medium">Support:</span> 
                  <span className="text-black font-bold">1234 567 8911</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Careers:</span> 
                  <span className="text-[#3CBDE6] font-bold">hr@opsie.com</span>
                </div>
              </div>
            </ContactsCard>

            <ContactsCard title="Digital Socials">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { Icon: SiFacebook, label: "Facebook", link: "#" },
                  { Icon: SiInstagram, label: "@opsiesoftware", link: "#" },
                  { Icon: SiGmail, label: "Email Us", link: "#" },
                  { Icon: SiIndeed, label: "Indeed", link: "#" }
                ].map((item, i) => (
                  <a key={i} href={item.link} className="flex items-center gap-3 p-4 rounded-2xl border border-gray-100 hover:border-[#3CBDE6] hover:shadow-md transition-all group bg-white">
                    <item.Icon className="text-gray-400 group-hover:text-[#3CBDE6] group-hover:scale-110 transition-all" size={20} />
                    <span className="text-sm font-semibold text-gray-700">{item.label}</span>
                  </a>
                ))}
              </div>
            </ContactsCard>

            <div className="bg-[#242424] p-10 rounded-xl text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#3CBDE6] opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              <h3 className="text-3xl font-bold mb-4">Meet us Virtually</h3>
              <p className="mb-8 text-gray-400 font-light leading-relaxed">Prefer a face-to-face chat? Let’s hop on a call to dive deeper into your project goals.</p>
              <button 
                onClick={() => navigate("/book-a-schedule")}
                className="w-full bg-[#3CBDE6] text-white py-4 rounded-xl font-bold hover:bg-white hover:text-black transition-all duration-300 shadow-lg"
              >
                Book a Discovery Call
              </button>
            </div>
          </div>
        </div>

        {/* --- 3. OFFICES & MAP --- */}
        <div className="bg-white w-full pt-20 border-t border-gray-100">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-[40px] md:text-[56px] font-bold">Our <span className="text-[#3CBDE6]">Offices</span></h2>
            <p className="text-gray-500 text-lg mt-4">Visit us at any of our branches across the Philippines.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Interactive Map Box */}
            <div className="space-y-6" data-aos="zoom-in">
              <div className="overflow-hidden rounded-[3rem] shadow-2xl border-[12px] border-white">
                <MapBox location={selectedLoc} getDirection={dirAction} setDirAction={setDirAction} />
              </div>
              <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-3xl font-bold text-gray-900">{selectedLoc.name}</h3>
                <p className="text-gray-500 mt-4 text-lg leading-relaxed">{selectedLoc.address || "Select a location for details"}</p>
              </div>
            </div>

            {/* Selection List */}
            <div className="space-y-4" data-aos="fade-left">
              {[
                { name: "Main Office", area: "Mandaluyong City", key: OFFICE_LOCATIONS.main },
                { name: "Quezon City (HQ)", area: "Diliman, QC", key: OFFICE_LOCATIONS.qc },
                { name: "Makati Office", area: "Ayala Avenue", key: OFFICE_LOCATIONS.makati },
                { name: "Cebu Branch", area: "IT Park, Cebu", key: OFFICE_LOCATIONS.cebu }
              ].map((loc, i) => (
                <div 
                  key={i}
                  onClick={() => {
                    setSelectedLoc(loc.key);
                    setDirAction(true); // Always trigger direction view on selection
                  }}
                  className={`p-8 rounded-[2rem] cursor-pointer transition-all border ${
                    selectedLoc === loc.key 
                      ? "bg-white border-[#3CBDE6] shadow-xl translate-x-4" 
                      : "bg-transparent border-transparent hover:bg-white hover:border-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className={`font-bold text-2xl transition-colors ${selectedLoc === loc.key ? "text-[#3CBDE6]" : "text-gray-800"}`}>
                        {loc.name}
                      </h4>
                      <p className="text-gray-400 font-medium uppercase tracking-widest text-xs mt-1">{loc.area}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${selectedLoc === loc.key ? "bg-[#3CBDE6] text-white rotate-45" : "bg-gray-100 text-gray-400"}`}>
                      <span className="text-xl">↑</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ProductItemCTA />
    </div>
  );
}

export default ContactUsPage;