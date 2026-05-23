import OpsieImage from "../../assets/opsie/logo-png.png";
import { useNavigate } from "react-router-dom";
import HighlightedText from '../../types/components/SuperHeader'
import { useContext } from "react";
import { ContentContext } from "@/App";

//const features = [
  //{ title: "Cloud Solutions", desc: "Flexible systems that support remote work and scalability.", icon: "☁️" },
  //{ title: "Cybersecurity", desc: "Protection that keeps your systems and data secure.", icon: "🔐" },
  //{ title: "Systems Integration", desc: "Connected tools that improve efficiency and reduce manual work.", icon: "🔗" }
//];

function AboutUsSection() {


  const navigate = useNavigate();
  //const [ currentFeature, setCurrentFeature ] = useState(0)
  const content = useContext(ContentContext)

  {
    /**useEffect(()=> {

    const interval = setInterval(()=> {
      setCurrentFeature((prev)=> 
        prev === features.length - 1 ? 0 : prev + 1
      )
    }, 2000)

    return ()=>  clearInterval(interval)

  }, []) */
  }

  


  return (
    <section id="about-section" className="w-full py-24 md:py-32 px-6 overflow-hidden bg-white select-none">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 lg:gap-24">
        
        {/* Left Side: Visual/Logo */}
        <div
          className="relative md:w-1/2 flex justify-center"
          data-aos="fade-right"
        >
          {/* Decorative background element */}
          <div className="absolute inset-0 bg-[#3CBDE6]/5 rounded-full blur-3xl scale-150 -z-10" />
          
          <img 
            src={OpsieImage} 
            alt="Opsie Logo" 
            className="w-64 md:w-80 lg:w-[400px] object-contain drop-shadow-2xl" 
          />
        </div>

        {/* Right Side: Content */}
        <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-justify">
          
          <div className="space-y-4 mb-8 text-center">
            <HighlightedText text={content?.aboutUsSection?.header} />
            
            
          </div>

          <div className="space-y-6 text-gray-600 text-lg font-light leading-relaxed">
            <p data-aos="fade-up" data-aos-delay="200">
              {
                content?.aboutUsSection?.description
              }
             </p>

             {
              /**<div data-aos="fade-left" className="flex flex-col md:flex-row w-full bg-blue-100 p-3 text-white text-left rounded-sm">
                <div className="flex items-center justify-center p-2 mr-2 bg-blue-50">
                  <h1 className="text-3xl">{features[currentFeature].icon}</h1>
                </div>
                <div>
                  <h1 className="font-bold text-gray-600">{features[currentFeature].title}</h1>
                <p className="text-gray-600"> {features[currentFeature].desc}</p>
                </div>
             </div> */
             }

              
            <p data-aos="fade-up" data-aos-delay="300">
              Opsie Software Solutions brings your tools, processes, and platforms into one connected system.
            </p>

          </div>

          <div data-aos="fade-up" data-aos-delay="400" className="pt-6 w-full flex justify-center items-center">
            <button 
              onClick={() => navigate('/contact-us')}
              className="group w-[50%] relative flex items-center justify-center  gap-3 px-8 py-4 bg-white border-1 border-gray-300  rounded-2xl font-bold text-gray-900 transition-all duration-700 hover:border-[#3CBDE6] hover:bg-[#3CBDE6] hover:text-white hover:shadow-lg hover:shadow-[#3CBDE6]/10"
            >
              <span>{content?.aboutUsSection?.buttonText}</span>
             
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutUsSection;