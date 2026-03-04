import '../styles/ProductItemPage.css'
import Product1 from '../assets/Products/Product1.png'


function ProductItemPage() {
  return (
    <div className="product-item-page-container flex fd-c ai-c jc-c vw100">
      <div className="product-item-page-wrapper flex vh100 fd-c ai-c jc-c ">
        <div className="product-item-page-content flex">
          <div className="left-content">
            <img width={250} src={Product1} alt="" />
          </div>
          <div className="right-content flex fd-c">
            <div>
              <h1>Opsie Human Resource Information Management (HRIS)</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis impedit accusantium nesciunt cupiditate repudiandae quas quidem quos, suscipit pariatur aut, quod eaque amet. Hic commodi consequuntur, officia deleniti illum obcaecati.</p>
            
            </div>
            <div className='flex ai-c jc-fe'>
              <button>Get a Demo</button>
            </div>
          </div>
        </div> 
      </div>
      <div className="product-info-wrapper">
          <div className="product-gallery flex jc-c ai-c fd-r">
              <img width={100} src={Product1} alt="" />
              <img width={100} src={Product1} alt="" />
              <img width={100} src={Product1} alt="" />
              <img width={100} src={Product1} alt="" />
              <img width={100} src={Product1} alt="" />
          </div>
          <div><h2>Opsie Human Resource Information Management (HRIS)</h2></div>
          <div><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam doloremque enim, maiores reiciendis architecto at, nobis veniam ipsam consequatur quaerat quos, dignissimos est magnam sint iusto modi magni praesentium eos.
        Ratione porro id facilis sequi sint expedita odio corporis, mollitia cum delectus non rem, aperiam deleniti debitis nemo cumque quasi eligendi soluta doloremque at velit rerum ea eveniet culpa. Voluptatem!</p></div>



        <div className="key-features">
          <h2>Key Features</h2>
          <div className="features-items-wrapper flex">
            <div className="features-item">
              <img width={50} src={Product1} alt="" />
              <h4>Lorem Ipsum</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nihil et, amet, necessitatibus odio animi, perferendis cumque fuga explicabo accusantium corporis molestias. Illo aspernatur voluptatum architecto hic quisquam ratione asperiores?</p>
            </div>
            <div className="features-item">
              <img width={50} src={Product1} alt="" />
              <h4>Lorem Ipsum</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nihil et, amet, necessitatibus odio animi, perferendis cumque fuga explicabo accusantium corporis molestias. Illo aspernatur voluptatum architecto hic quisquam ratione asperiores?</p>
            </div>
            <div className="features-item">
              <img width={50} src={Product1} alt="" />
              <h4>Lorem Ipsum</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nihil et, amet, necessitatibus odio animi, perferendis cumque fuga explicabo accusantium corporis molestias. Illo aspernatur voluptatum architecto hic quisquam ratione asperiores?</p>
            </div>
          </div>
        </div>


      </div>
    
        


    </div>
  )
}

export default ProductItemPage
