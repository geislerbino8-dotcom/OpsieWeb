import FeedbackSection from './sections/FeedbackSection';
import ProductCTA from './sections/ProductCTA';
import ProductSection from './sections/ProductSection';
import ServicesSection from './sections/ServicesSection';
import WhyChooseUsSection from './sections/WhyChooseUsSection';
import Product1 from '../assets/Products/Product1.png';
import ClientReview from '../components/sections/ClientReviewsSection';

function ProductPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full">

      {/* Product Header */}
      <div className="w-full min-h-screen flex flex-col justify-center px-4 md:px-16 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">

          {/* Header Text */}
          <div className="flex flex-col space-y-6 md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-snug md:leading-tight">
              Let’s build Products like Opsie
            </h1>
            <p className="text-gray-700 text-base md:text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit earum doloribus
              molestiae enim eveniet quisquam quis temporibus quae perferendis harum, ipsum culpa
              recusandae sunt, facilis voluptates. Sint, unde facere. Reiciendis.
            </p>
            <div className="flex justify-center md:justify-start">
              <button className="bg-blue-400 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors">
                Get Started
              </button>
            </div>
          </div>

          {/* Product Images */}
          <div className="flex flex-wrap gap-4 sm:w-1/2 justify-center md:justify-end">
            {[1, 2, 3,].map((_, idx) => (
              <img
                key={idx}
                src={Product1}
                alt={`Product ${idx + 1}`}
                className="w-30 md:w-48 lg:w-52 rounded-lg shadow-md"
              />
            ))}
          </div>

        </div>
      </div>

      {/* Sections */}
      <ServicesSection />
      <ProductSection />
      <ClientReview />
      <WhyChooseUsSection />
      <ProductCTA />

    </div>
  );
}

export default ProductPage;