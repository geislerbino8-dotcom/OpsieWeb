import Product1 from '../assets/Products/Product1.png'
import '../styles/ProductItemPage.css'
import { useParams } from 'react-router-dom'
import ProductSection from './sections/ProductSection'
import ProductItemCTA from '@/components/cards/ProductItemCTA'

function ProductItemPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="w-full flex flex-col items-center bg-gray-900 text-white">

      {/* Top Section */}
      <div className="w-full min-h-screen flex items-center justify-center px-4 py-16 bg-gradient-to-b from-gray-900 via-gray-900/90 to-gray-800 relative">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left - Image */}
          <div className="flex justify-center">
            <img
              src={Product1}
              alt={id}
              className="w-64 md:w-80 lg:w-96 rounded-3xl object-contain shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Right - Content */}
          <div className="flex flex-col gap-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold">
              {id}
            </h1>

            <p className="text-gray-300 leading-relaxed text-lg">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis impedit accusantium nesciunt cupiditate repudiandae quas quidem quos, suscipit pariatur aut.
            </p>

            <div className="flex justify-center md:justify-start">
              <button className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl font-bold text-white shadow-lg hover:scale-105 hover:shadow-cyan-400/50 transition-all duration-300">
                Get a Demo
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Product Info Section */}
      <div className="w-full max-w-5xl bg-white/5 backdrop-blur-xl rounded-3xl m-16 p-12 space-y-12 shadow-2xl">

        {/* Gallery */}
        <div className="flex flex-wrap justify-center gap-4">
          {[1,2,3,4,5].map((_, index) => (
            <img
              key={index}
              src={Product1}
              alt={`Gallery ${index + 1}`}
              className="w-20 md:w-24 rounded-xl border border-white/20 shadow-md hover:scale-110 transition-transform duration-300"
            />
          ))}
        </div>

        {/* Product Title */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            {id}
          </h2>
        </div>

        {/* Description */}
        <div className="max-w-4xl mx-auto text-center md:text-left text-gray-300 leading-relaxed text-lg">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam doloremque enim, maiores reiciendis architecto at, nobis veniam ipsam consequatur quaerat quos.
          </p>
        </div>

        {/* Key Features */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-white">
            Key Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1,2,3].map((_, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 text-center"
              >
                <div className="flex justify-center mb-4">
                  <img src={Product1} alt={`Feature ${index + 1}`} className="w-12" />
                </div>
                <h4 className="font-semibold text-xl mb-2">
                  Feature {index + 1}
                </h4>
                <p className="text-gray-300 text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nihil et, amet, necessitatibus odio animi.
                </p>
              </div>
            ))}
          </div>
          <div>
            <ProductItemCTA />
          </div>
            <div className='overflow-x-hidden'>
               <ProductSection />
            </div>
        </div>

      </div>
    </div>
  )
}

export default ProductItemPage