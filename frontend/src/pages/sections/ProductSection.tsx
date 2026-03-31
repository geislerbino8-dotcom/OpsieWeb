import ProductCard from "../../components/cards/ProductCard";
import LogoOnly from "../../assets/icons/opsie_logo_only.png";
import '../../styles/ProductSection.css'
import hris from '../../assets/Products/HRIS.png';
import opsync from '../../assets/Products/Opsync.png';
import web from '../../assets/Products/WebOpsie.png';
import { useNavigate } from "react-router-dom";

import "aos/dist/aos.css";

const products = {
  hris: { name: 'Opsie HRIS', image: hris },
  opsync: { name: 'Opsync', image: opsync },
  opsync2: { name: 'Opsync', image: opsync },
  opsync3: { name: 'Opsync', image: opsync },
  opsync4: { name: 'Opsync', image: opsync },
  opsync5: { name: 'Opsync', image: opsync },
  web: { name: 'OpsieWeb', image: web }
};

function ProductSection() {

  const navigate = useNavigate()

  return (
    <section
      data-aos="fade-left"
      className="w-full text-[#242424]font-poppins min-h-screen flex flex-col items-center px-4 py-20"
     
    >
      <div className="w-full max-w-6xl flex flex-col gap-12">

        {/* Header */}
        <div className=" flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4" data-aos="zoom-in">
            <img src={LogoOnly} alt="Opsie Logo" className="spin-slow w-14 h-14" />
            <h1 className="text-3xl md:text-4xl ">
              <span className="text-[#]">Opsie's </span> Products
            </h1>
          </div>
        </div>

        {/* Product Cards */}
       <div className="">

        <div className="p-cards-container flex justify-center md:flex-row md:overflow-x-auto overflow-hidden gap-8 flex-wrap p-10 items-start
          ">
            {Object.values(products).splice(0,6).map((item, index) => (
              <div
                key={index}
            
              >
                <ProductCard
                  itemName={item.name}
                  image={item.image}
                />
                
              </div>
            ))}
          </div>



          <div className="text-center">
            <p data-aos = "fade-left" className="text-[#242424] text-center md:text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, assumenda neque velit exercitationem provident recusandae commodi asperiores, nostrum cumque aperiam minima a enim labore maxime perspiciatis, rerum sapiente numquam voluptatum.</p>

            <button
              onClick={() => navigate(`/products`)}
              className="
                mt-6 px-5 py-2
                rounded-lg font-semibold text-cyan-600
                border border-cyan-400/40

       

                transition-all duration-300 ease-out

                hover:text-white
                hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-500
                hover:shadow-lg hover:shadow-cyan-400/40
              "
            >
              View All Products
            </button>
          </div>
       </div>

       

          
      </div>
    </section>
  );
}

export default ProductSection;