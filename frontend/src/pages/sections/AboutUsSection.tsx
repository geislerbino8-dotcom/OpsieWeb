import React from "react";
import OpsieImage from "../../assets/opsie/opsie_full.jpg";
import TopSectionCard from "../../components/cards/TopSectionCard";

function AboutUsSection() {
  return (
    <section className="w-full flex flex-col items-center py-16 px-4">

      {/* Top Section Title */}
      <div className="mb-12">
        <TopSectionCard secName="About Us" />
      </div>

      {/* Main Content */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-12">

        {/* Image */}
        <div className="flex justify-center md:w-1/2">
          <img
            src={OpsieImage}
            alt="Opsie"
            className="w-72 md:w-80 rounded-xl shadow-lg object-cover"
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col gap-6 md:w-1/2">

          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Let your Business into Digitally Real
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae sequi minus rerum fugit distinctio eos quis facere nihil fugiat non facilis voluptatibus, saepe, repudiandae natus quaerat modi dignissimos doloribus ducimus.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Dolores tempore perspiciatis minima quis animi eos, odio deleniti cum et delectus id suscipit tempora, mollitia magnam eum ex sint fugiat dignissimos quaerat quibusdam, consequatur similique culpa voluptas.
          </p>

          <div>
            <button className="mt-4 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-300">
              Learn more
            </button>
          </div>

        </div>

      </div>

    </section>
  );
}

export default AboutUsSection;