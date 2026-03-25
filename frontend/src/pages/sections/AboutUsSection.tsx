import  { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import OpsieImage from "../../assets/opsie/logo-png.png";


function AboutUsSection() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <section className="font-montserrat w-full flex flex-col items-center py-16 md:px-4 text-center md:text-left">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-12">
        
        <div
          className="flex justify-center md:w-1/2"
          data-aos="fade-right"
        >
          <img width={300} src={OpsieImage} alt="Opsie" 

          />

          
        </div>

        <div className="flex flex-col gap-6 md:w-1/2 md:p-10 p-5 justify-start">

          <h2
            className="text-3xl md:text-4xl leading-tight"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Let your <span className="text-[#3CBDE6] font-semibold">Business </span>into Digitally 
            <span className="text-[#3CBDE6] font-semibold"> Real</span>
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
            <button className="border btn-learn mt-4 px-6 py-3 hover:bg-[#3CBDE6] text- hover:text-white rounded-lg hover:bg-gray-800 transition duration-300">
              Learn more
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutUsSection;