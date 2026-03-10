import { InlineWidget } from "react-calendly";
import logo from '../assets/icons/opsie_logo_only.png'

function BookingPage() {
  return (
    <div className="min-h-screen relative bg-gray-50 flex flex-col items-center px-4 py-30 overflow-hidden">
      
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Let's start communicating. Excited meeting you!
        </h1>
        <p className="text-gray-600">
          Book a quick meeting using the calendar below.
        </p>
      </div>

     <img src={logo} alt=""  className="absolute w-screen -z-0 opacity-20"/>
     <div className="w-full">
           <InlineWidget
          url="https://calendly.com/tecsonprojects/30min"
          styles={{ height: "700px", width: '100%',  }}
          className="relative lg:top-[-40px]"
          utm={{ utmSource: "facebook", utmCampaign: "spring_sale" }}
          prefill={{
            name: "Juan Dela Cruz",
            email: "juanD@example.com",
          }}
        />
     </div>
 

    </div>
  );
}

export default BookingPage;