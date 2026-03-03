import '../../styles/ProductSection.css'
import LogoOnly from '../../assets/icons/opsie_logo_only.png'
import ProductCard from '../cards/ProductCard'
import P1 from '../../assets/Products/Product1.png'
import TopSectionCard from '../cards/TopSectionCard'

function ProductSection() {
  return (
    <div className="product-section-container vw100  flex fd-c">
      
      <div className="product-section-wrapper flex fd-c">
        <TopSectionCard secName='Products' />
        <div className="product-content">

          <div className="upper-prod">
          <img width={50} src={LogoOnly} alt="" />
          <div className='flex-col-center'>
            <h1>Opsie's Products</h1>
          </div>
          <div>
            <button>View all Products

            </button>
          </div>
        </div>


        <div className="prod-items-wrapper flex fd-r">
          <ProductCard itemName='OPSIE HRIS' image={P1} bgColor='purple'/>
          <ProductCard itemName='OpSync' image={P1} bgColor='blue'/>
          <ProductCard itemName='OpCici' image={P1} bgColor='green'/>
          <ProductCard itemName='OpCici' image={P1} bgColor='green'/>
         


        </div>



        
        </div>

      </div>
      


      
     
    </div>
  )
}

export default ProductSection
