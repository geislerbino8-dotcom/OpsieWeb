import '../../styles/ServicesSection.css'
import ServicesCards from '../cards/ServicesCards'
import webdev from '../../assets/card-bg/webdev.png'
import TopSectionCard from '../cards/TopSectionCard'

function ServicesSection() {
  return (
    <div className="services-container vw100 flex fd-c jc-c">
      <TopSectionCard secName='What We Do' />

      <div>
         <h1 className='services-header'>Opsie's <span className='hl-txt'>Services</span> with  Excellence</h1>
      <p className='txt-desc'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, eveniet?</p>
      
      </div>
     

        <div>
             <div className="service-item-wrapper">
        <ServicesCards serviceName='Web Development' desc='Lorem*2' image={webdev}/>
        <ServicesCards serviceName='Web Development' desc='Lorem*2' image={webdev}/>
        <ServicesCards serviceName='Web Development' desc='Lorem*2' image={webdev}/>
       
        
      </div>

      <h3 className='txt-swipe'>swipe →</h3>
        </div>
    </div>
  )
}

export default ServicesSection
