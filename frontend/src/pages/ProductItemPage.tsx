import Product1 from '../assets/Products/Product1.png'
import '../styles/ProductItemPage.css'
import { useParams } from 'react-router-dom'
import OpsiePlanPricing from '../components/PlanPricing/OpsiePlanPricing'
import Footer from "../components/Footer"

function ProductItemPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="w-full flex flex-col items-center"
    >
      {/* Top Section */}
      <div className="product-item-page-wrapper w-full min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left - Image */}
          <div className="flex justify-center">
            <img
              src={Product1}
              alt=""
              className="w-64 md:w-65 rounded-3xl object-contain"
            />
          </div>

          {/* Right - Content */}
          <div className="flex flex-col gap-6 text-center md:text-left">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {id}
              </h1>

              <p className="text-white-600 leading-relaxed">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis impedit accusantium nesciunt cupiditate repudiandae quas quidem quos, suscipit pariatur aut.
              </p>
            </div>

            <div className="flex justify-center md:justify-end">
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">
                Get a Demo
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Product Info Section */}
      <div className="bg-white relative -top-7 card-shadow w-full max-w-4xl rounded-3xl px-10 py-12 space-y-12">

        {/* Gallery */}
        <div className="flex flex-wrap justify-center gap-4">
          {[1,2,3,4,5].map((_, index) => (
            <img
              key={index}
              src={Product1}
              alt=""
              className="w-20 md:w-24 rounded-lg border hover:scale-105 transition"
            />
          ))}
        </div>

        {/* Product Title */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            {id}
          </h2>
        </div>

        {/* Description */}
        <div className="text-gray-600 leading-relaxed text-center md:text-left max-w-4xl mx-auto">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam doloremque enim, maiores reiciendis architecto at, nobis veniam ipsam consequatur quaerat quos.
          </p>
        </div>

        {/* Key Features */}
        <div className="space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            Key Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1,2,3].map((_, index) => (
              <div
                key={index}
                className="p-6 rounded-xl shadow-md border hover:shadow-lg transition text-center"
              >
                <div className="flex justify-center mb-4">
                  <img src={Product1} alt="" className="w-12" />
                </div>
                <h4 className="font-semibold text-lg mb-2">
                  Lorem Ipsum
                </h4>
                <p className="text-gray-600 text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nihil et, amet, necessitatibus odio animi.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
            <OpsiePlanPricing/>
            <Footer/>
    </div>
  )
}

export default ProductItemPage