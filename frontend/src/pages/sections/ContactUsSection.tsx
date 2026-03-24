
import MapCard from "@/components/cards/MapCard";
import ContactForm from "../../components/cards/ContactForm";




function ContactUsSection() {
  return (
    
    <section className="w-full flex flex-col items-center pt-16 pb-5  px-4">

      {/* Header */}
      <div className="text-center mb-12 max-w-3xl">
        <h1
          className="text-3xl md:text-4xl font-semibold mb-4"
          data-aos="fade-up"
        >
          Get in <span className="font-playfair italic text-[#3CBDE6] font-semibold"> Touch</span> with Our 
          <span className="text-[#3CBDE6] font-semibold"> Team</span> 
        </h1>

        <p
          className="text-gray-600 text-base md:text-lg"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio officia quaerat a eligendi ratione amet tempora repellendus quasi quod, aspernatur nobis dolor aperiam? Quaerat eveniet quisquam, rerum deleniti nesciunt dolores.
        </p>
      </div>

      {/* Contact Form & Map */}
      <div className="w-full max-w-6xl flex flex-col justify-center md:flex-row gap-8">

        <div
          className="flex justify-center flex-1"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          <ContactForm />
        </div>

        <div
          className="flex justify-center flex-1"
          data-aos="fade-left"
          data-aos-delay="300"
        >
          <MapCard />
      
        </div>

      </div>

    </section>
  );
}

export default ContactUsSection;