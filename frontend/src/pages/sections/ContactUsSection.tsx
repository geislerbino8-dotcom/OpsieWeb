import React from "react";
import TopSectionCard from "../../components/cards/TopSectionCard";
import ContactForm from "../../components/cards/ContactForm";
import MapCard from "../../components/cards/MapCard";

function ContactUsSection() {
  return (
    <section className="w-full flex flex-col items-center py-16 px-4">

      {/* Header */}
      <div className="text-center mb-12 max-w-3xl">
        <h1
          className="text-3xl md:text-4xl font-bold mb-4"
          data-aos="fade-up"
        >
          Get in Touch with Our Team
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
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">

        <div
          className="flex-1"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          <ContactForm />
        </div>

        <div
          className="flex-1"
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