
import MapCard from "@/components/cards/MapCard";
import ContactForm from "../../components/cards/ContactForm";




function ContactUsSection() {
  return (
    
    <section className="w-full flex flex-col items-center pt-16 pb-5  px-4"
      data-aos="fade-up"
    >

      {/* Header */}
      <div className="text-center mb-12 max-w-3xl">
        <h1
          className="text-3xl md:text-4xl font-semibold mb-4"
        >
          Get in <span className="font-playfair italic text-[#3CBDE6] font-semibold"> Touch</span> with Our 
          <span className="text-[#3CBDE6] font-semibold"> Team</span> 
        </h1>

        <p
          className="text-gray-600 text-base md:text-lg"
          
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio officia quaerat a eligendi ratione amet tempora repellendus quasi quod, aspernatur nobis dolor aperiam? Quaerat eveniet quisquam, rerum deleniti nesciunt dolores.
        </p>
      </div>

      {/* Contact Form & Map */}
      <div className="w-full max-w-6xl flex flex-col justify-center md:flex-row gap-8">

        <div
          className="flex justify-center flex-1"
        >
          <ContactForm />
        </div>

        <div
          className="flex justify-center flex-1"
        
        >
          <MapCard />
      
        </div>

      </div>

       <div 
        className="mt-16 w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-100 pt-12"
        data-aos="fade-up"
        data-aos-delay="500"
      >
        <div className="text-center">
          <h4 className="font-bold text-gray-900 mb-1">Email Us</h4>
          <p className="text-[#3CBDE6] font-medium">hello@opsie.solutions</p>
        </div>
        <div className="text-center">
          <h4 className="font-bold text-gray-900 mb-1">Visit Us</h4>
          <p className="text-gray-500 font-light text-sm">Main Tech Hub, Innovation Drive</p>
        </div>
        <div className="text-center">
          <h4 className="font-bold text-gray-900 mb-1">Call Us</h4>
          <p className="text-gray-500 font-light text-sm">+1 (555) 000-OPSI</p>
        </div>
      </div>

    </section>
  );
}

export default ContactUsSection;