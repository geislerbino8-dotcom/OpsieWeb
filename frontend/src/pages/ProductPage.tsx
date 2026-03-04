import '../styles/ProductPage.css'
import FeedbackSection from './sections/FeedbackSection'
import ProductCTA from './sections/ProductCTA'
import ProductSection from './sections/ProductSection'
import ServicesSection from './sections/ServicesSection'
import WhyChooseUsSection from './sections/WhyChooseUsSection'
import Product1 from '../assets/Products/Product1.png'

function ProductPage() {
  return (
    
    <div className='product-container flex fd-c jc-c ai-c'>
      <div className="product-wrapper vh100 flex fd-c jc-c">
        <div className="product-header-content flex">
          <div className="header flex">
            <div className="prod-header flex">
            <h1>Let’s build Products like Opsie</h1>
            <div className='flex fd-c jc-fe'>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit earum doloribus molestiae enim eveniet quisquam quis temporibus quae perferendis harum, ipsum culpa recusandae sunt, facilis voluptates. Sint, unde facere. Reiciendis.</p>
              <div className='button-wrapper flex'>
            <button>Get Started</button> 
          </div>
            </div>
          </div>
          
            <div className="prod-lower flex">
              <div><img  src={Product1} alt="" /></div>
              <div><img  src={Product1} alt="" /></div>
              <div><img  src={Product1} alt="" /></div>
              <div><img  src={Product1} alt="" /></div>
            </div>
          
        </div>
          </div>
      </div>
          <ServicesSection />
          <ProductSection />
          <FeedbackSection />
          <WhyChooseUsSection />
          <ProductCTA />

    </div>
  
  )
}

export default ProductPage
