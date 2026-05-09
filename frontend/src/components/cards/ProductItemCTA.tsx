
import { useNavigate } from "react-router-dom";
import { usePageContent } from "@/data/usePageContent";
import { useState } from "react";

function ProductItemCTA() {

  const navigate = useNavigate()
  const [ content ] = useState(usePageContent.data[0].ctaSection)

  return (
    <section className="w-full flex justify-center mt-5 md:py-10">
      <div className="w-full md:w-[75%] smx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-10 md:p-14 text-white text-center shadow-xl">
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {
            content.header
          }
        </h2>

        <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto mb-8">
          {
            content.subHeader
          }
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={()=> navigate("/book-a-schedule")}
           className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
            Get a Demo
          </button>

          <button
          onClick={()=> {
            window.location.href = "mailto:support@example.com"
          }}
          className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition">
            Email Us
          </button>
        </div>

      </div>
    </section>
  );
}

export default ProductItemCTA;