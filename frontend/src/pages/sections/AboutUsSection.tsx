import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import '../../styles/AboutUsSection.css';
import OpsieImage from "../../assets/opsie/opsie_full.jpg";
import TopSectionCard from "../../components/cards/TopSectionCard";
import { Card } from "../../components/Card/ServicesCard";

function AboutUsSection() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <section className="w-full flex flex-col items-center py-16 px-4">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-12">
        
        {/* Image */}
        <div
          className="flex justify-center md:w-1/2"
          data-aos="fade-right"
        >
          <img width={300} src={OpsieImage} alt="Opsie" 
            className="hover:rounded-[50%]"

          />

          
        </div>

        {/* Text Content */}
        <div className="about-text-card flex flex-col gap-6 md:w-1/2 p-10 justify-start">

          <h2
            className="text-3xl md:text-4xl font-bold leading-tight"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Let your Business into Digitally Real
          </h2>

          <p
            className="text-gray-600 leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae sequi minus rerum fugit distinctio eos quis facere nihil fugiat non facilis voluptatibus, saepe, repudiandae natus quaerat modi dignissimos doloribus ducimus.
          </p>

          <p
            className="text-gray-600 leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Dolores tempore perspiciatis minima quis animi eos, odio deleniti cum et delectus id suscipit tempora, mollitia magnam eum ex sint fugiat dignissimos quaerat quibusdam, consequatur similique culpa voluptas.
          </p>

          <div
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <button className="btn-learn mt-4 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-300">
              Learn more
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutUsSection;