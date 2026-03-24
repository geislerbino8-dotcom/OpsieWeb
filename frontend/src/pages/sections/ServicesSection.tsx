import ServicesCards from "../../components/cards/ServicesCards";
import '../../styles/ServicesSection.css'
import img1 from '../../assets/card-bg/webdev.png'
import img2 from '../../assets/card-bg/mobiledev.png'
import img3 from '../../assets/card-bg/aidev.png'


const services = [
   {
      serviceName: "Web Development",
      desc: 'Lorem*2',
      image: img1
   },

    {
      serviceName: "Mobile Development",
      desc: 'Lorem*2',
      image: img2
   },

    {
      serviceName: "AI Modeling",
      desc: 'Lorem*2',
      image: img3
   },

]


function ServicesSection() {
  return (
    <section id="service-section" className="w-full h-full flex flex-col items-center py-16 px-4 bg-white">

      <div className="text-center max-w-3xl py-16">
        <h1 className="text-3xl md:text-4xl mb-4">
          Opsie's <span className="text-[#3CBDE6] font-semibold">Services</span> with 
          <span className="font-playfair italic text-[#3CBDE6] font-semibold"> Excellence</span>
        </h1>
        <p className="text-gray-600 text-base md:text-lg">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, eveniet?
        </p>
      </div>

      <div className="p-cards-container w-full max-w-6xl h-full max-h-6xl overflow-x-auto overflow-y-visible">
        <div className="w-full flex md:justify-center gap-6">
          {
            services.map((item, index)=> (
              <ServicesCards key={index} serviceName={item.serviceName} desc={item.desc} image={item.image} />

            ))
          }

        </div>
      </div>
      <div className="flex flex-row w-100 justify-end">
        <h3 className="md:hidden text-gray-500 mt-2 text-right mr-4 italic text-sm md:text-base">swipe →</h3>
      </div>


    </section>
  );
  
}

export default ServicesSection;