import { InlineWidget } from "react-calendly";
import logo from '../assets/icons/opsie_logo_only.png'

function BookingPage() {
  return (
    <div className="min-h-screen relative bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center px-6 py-16 overflow-hidden">
      
      {/* Background Logo */}
      <img 
        src={logo} 
        alt="Opsie Logo" 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] opacity-10 pointer-events-none"
      />

      {/* Header Section */}
      <div className="w-full max-w-3xl text-center m-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Let's Discuss That.
        </h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Schedule a quick meeting using the calendar below. Excited to connect with you!
        </p>
      </div>

      {/* Calendly Widget */}
      <div className="w-full max-w-4xl rounded-xl shadow-lg overflow-hidden">
        <InlineWidget
          url="https://calendly.com/tecsonprojects/30min"
          styles={{ height: "700px", width: '100%' }}
          className="relative"
          utm={{ utmSource: "facebook", utmCampaign: "spring_sale" }}
          prefill={{
            name: "Juan Dela Cruz",
            email: "juanD@example.com",
          }}
        />
      </div>

      {/* Footer / Optional Call-to-Action */}
      <div className="mt-12 text-center">
        <p className="text-gray-500">
          Can't find a time that works? <a href="mailto:support@example.com" className="text-blue-600 underline">Email us directly</a>.
        </p>
      </div>

    </div>
  );
}

export default BookingPage;