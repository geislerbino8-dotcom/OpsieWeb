import OpsieImage from "../../assets/opsie/logo-png.png";
import { useNavigate } from "react-router-dom";

function AboutUsSection() {
  
  const navigate = useNavigate()

  return (
    <section 
    data-aos="fade-left"
       
    className="select-none font-montserrat w-full flex flex-col items-center py-16 md:px-4 text-center md:text-justify">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-12">
        
        {/* Image */}
        <div
          className="flex justify-center md:w-1/2"
        >
          <img width={300} src={OpsieImage} alt="Opsie" />
        </div>

        {/* Text */}
        <div
          className="flex flex-col gap-6 md:w-1/2 md:p-10 p-5 justify-start"
        >
          <h2 className="font-semibold text-3xl md:text-4xl leading-tight">
            Let your <span className="text-[#3CBDE6] font-semibold">Business </span>into Digitally 
            <span className="text-[#3CBDE6] font-semibold"> Real</span>
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae sequi minus rerum fugit distinctio eos quis facere nihil fugiat non facilis voluptatibus, saepe, repudiandae natus quaerat modi dignissimos doloribus ducimus.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Dolores tempore perspiciatis minima quis animi eos, odio deleniti cum et delectus id suscipit tempora, mollitia magnam eum ex sint fugiat dignissimos quaerat quibusdam, consequatur similique culpa voluptas.
          </p>

          <div>
            <button 
              onClick={()=> navigate('/who-we-are')}
              className="border border-gray-300 btn-learn mt-4 px-6 py-3 hover:bg-[#3CBDE6] hover:text-white rounded-lg transition duration-300">
              Learn more
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutUsSection;