
import AboutPageCMS from './sections/AboutPageCMS'
import ClientSectionCMS from './sections/ClientSectionCMS'
import FaqSectionCMS from './sections/FaqSectionCMS'
import FooterCMS from './sections/FooterCMS'
import HeroPageCMS from './sections/HeroPageCMS'
import PartnerSectionCMS from './sections/PartnerSectionCMS'
import ProductItemCTACMS from './sections/ProductItemCTACMs'
import ProductSectionCMS from './sections/ProductSectionCMS'
import ServicesPageCMS from './sections/ServicesPageCMS'



function HomepageContent() {
  return (
    <div className='w-full flex flex-col'>
      <HeroPageCMS />
      <AboutPageCMS />
      <ServicesPageCMS />
      <ProductSectionCMS />
      <ClientSectionCMS />
      <PartnerSectionCMS />
      <FaqSectionCMS />
      <ProductItemCTACMS />
      <FooterCMS />
      
    </div>
  )
}

export default HomepageContent
