import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SiFacebook, SiInstagram, SiGmail, SiIndeed } from 'react-icons/si';
import { OFFICE_LOCATIONS } from '@/data/siteLocationsData';

// Components
import ProductItemCTA from '@/components/cards/ProductItemCTA';
import ContactForm from '@/components/cards/ContactForm';
import ContactsCard from '@/components/cards/ContactsCard';
import MapBox from '@/components/MapBox';
import ContactBg from '../assets/background-images/ContactUsBg.png';

function ContactUsPage() {
  const navigate = useNavigate();
  const [dirAction, setDirAction] = useState(false);
  const [selectedLoc, setSelectedLoc] = useState(OFFICE_LOCATIONS.main);

  return (
    <div className="w-full overflow-x-hidden">
      {/* --- 1. FULL PAGE HERO SECTION --- */}
      <div className="relative w-screen h-[100vh] left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
        <img
          src={ContactBg}
          alt="Contact Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 md:bg-gradient-to-r md:from-black/90 md:via-black/20 to-transparent"></div>

        {/* Hero Content Container */}
        <div className="relative z-10 h-full w-full max-w-[1280px] mx-auto flex flex-col justify-end pb-24 px-6 md:px-12 text-white">
          <div className="flex flex-col items-center md:items-start w-full">
            <h1 data-aos="fade-right" className="max-w-[700px] font-poppins text-[42px] leading-[46px] md:text-[72px] md:leading-[78px] text-center md:text-left font-light">
              Let’s Talk About <br />
              <span className="font-semibold text-[#3CBDE6]">What’s on your Mind.</span>
            </h1>
            <p data-aos="fade-right" data-aos-delay="200" className="mt-6 text-lg md:text-xl font-light text-center md:text-left max-w-xl text-gray-300">
              Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.
            </p>
          </div>

          {/* Elegant Floating Stats Card (Desktop Only) */}
          <div data-aos="fade-up" className="hidden md:flex absolute right-12 bottom-12 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 items-center gap-4">
            <div className="flex -space-x-3">
              {["780", "816", "818"].map((id) => (
                <img key={id} src={`/profiles/Rectangle ${id}.svg`} className="w-12 h-12 rounded-full border-2 border-[#3CBDE6]" alt="user" />
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">10+ Satisfied Clients</p>
              <p className="text-[#3CBDE6] text-xl">★★★★★ <span className="text-white text-sm ml-1">5/5</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* --- 2. MAIN CONTENT AREA --- */}
      <div className="max-w-[1280px] mx-auto px-6 py-15">
        
        {/* Contact Form & Info Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-0">
          {/* Left: The Form */}
            <ContactForm />

          {/* Right: Contact Cards */}
          <div className="flex flex-col gap-6">
            <ContactsCard title="Give us a Call">
              <div className="space-y-2 text-gray-600">
                <p className="flex justify-between font-medium"><span>General Inquiries:</span> <span className="text-black">1-800-664-9073</span></p>
                <p className="flex justify-between font-medium"><span>Support:</span> <span className="text-black">1234 567 8911</span></p>
                <p className="flex justify-between font-medium"><span>HR:</span> <span className="text-black">hr@opsie.com</span></p>
              </div>
            </ContactsCard>

            <ContactsCard title="Chat with Us">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { Icon: SiFacebook, label: "Facebook", link: "#" },
                  { Icon: SiInstagram, label: "@opsiesoftware", link: "#" },
                  { Icon: SiGmail, label: "Email Us", link: "#" },
                  { Icon: SiIndeed, label: "Indeed", link: "#" }
                ].map((item, i) => (
                  <a key={i} href={item.link} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-[#3CBDE6] hover:bg-[#3CBDE6]/5 transition-all group">
                    <item.Icon className="text-gray-400 group-hover:text-[#3CBDE6] transition-colors" size={20} />
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  </a>
                ))}
              </div>
            </ContactsCard>

            <div className="bg-[#3CBDE6] p-8 rounded-3xl text-white">
              <h3 className="text-2xl font-semibold mb-4">Meet us Virtually</h3>
              <p className="mb-6 opacity-90 font-light">Schedule a virtual meeting with our team and let’s discuss how we can help you.</p>
              <button 
                onClick={() => navigate("/book-a-schedule")}
                className="w-full bg-white text-[#3CBDE6] py-4 rounded-xl font-bold hover:bg-black hover:text-white transition-all duration-300"
              >
                Book a Meeting
              </button>
            </div>
          </div>
        </div>

        {/* --- 3. LOCATION & MAP SECTION --- */}
        <div className="w-full pt-20 border-t border-gray-100">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Map Interaction */}
            <div className="space-y-8">
              <div className="overflow-hidden rounded-[2.5rem] shadow-xl border-4 border-white">
                <MapBox location={selectedLoc} getDirection={dirAction} setDirAction={setDirAction} />
              </div>
              <div className="p-6">
                <h3 className="text-3xl font-bold font-poppins">{selectedLoc.name}</h3>
                <p className="text-gray-500 mt-2 text-lg">{selectedLoc.address
                 || "Select a location to see details"}</p>
              </div>
            </div>

            {/* Locations List */}
            <div className="space-y-6">
              <div className="mb-10">
                <h2 className="text-4xl font-poppins">Our <span className="text-[#3CBDE6] font-semibold">Offices</span></h2>
                <p className="text-gray-500 mt-2">Explore our branches across the Philippines.</p>
              </div>

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
                    setDirAction(!dirAction);
                  }}
                  className={`p-6 rounded-2xl cursor-pointer transition-all border ${
                    selectedLoc === loc.key ? "bg-white border-[#3CBDE6] shadow-lg scale-[1.02]" : "bg-gray-50 border-transparent hover:bg-white hover:border-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-xl">{loc.name}</h4>
                      <p className="text-gray-500 text-sm">{loc.area}</p>
                    </div>
                    <span className="text-[#3CBDE6] font-semibold">Get Directions →</span>
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