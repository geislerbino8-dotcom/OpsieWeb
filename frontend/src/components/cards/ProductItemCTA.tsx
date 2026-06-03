
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ContentContext } from "@/App";
import bg from '../../assets/background-images/invitation.jpg'

function ProductItemCTA() {

  const navigate = useNavigate()
  const content = useContext(ContentContext)

  return (
    <section className="group w-full flex justify-center md:py-10">
      <div className="w-full relative overflow-hidden md:w-[65%] smx-auto bg-gradient-to-r from-indigo-600 to-purple-600 md:rounded-2xl p-10 md:p-14 text-white text-center shadow-xl">
        <img src={bg} alt=""  className="group-hover:scale-120 transition-all duration-1000 opacity-20 absolute inset-0 w-full h-full object-cover z-0"/>
        <h2 className="text-3xl relative z-10 md:text-4xl font-bold mb-4">
          {
            content?.ctaSection.header
          }
        </h2>

        <p className="text-lg relative z-10 md:text-xl text-indigo-100 max-w-2xl mx-auto mb-8">
          {
            content?.ctaSection.subHeader
          }
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={()=> navigate("/book-a-schedule")}
           className="relative z-10 bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition ">
            Get a Demo
          </button>

          <button
          onClick={()=> {
            window.location.href = "mailto:nquiry@opsiesoftwaresolutions.com"
          }}
          className="relative z-10 border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition">
            Email Us
          </button>
        </div>

      </div>
    </section>
  );
}

export default ProductItemCTA;