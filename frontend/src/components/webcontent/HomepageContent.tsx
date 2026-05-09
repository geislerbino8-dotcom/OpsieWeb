import HeroPageCMS from './sections/HeroPageCMS'
import AboutPageCMS from './sections/AboutPageCMS'
import ServicesPageCMS from './sections/ServicesPageCMS'
import ProductSectionCMS from './sections/ProductSectionCMS'
import ClientSectionCMS from './sections/ClientSectionCMS'
import PartnerSectionCMS from './sections/PartnerSectionCMS'
import ContactUsSectionCMS from './sections/ContactUsSectionCMS'
import ProductItemCTACMS from './sections/ProductItemCTACMs'
import FaqSectionCMS from './sections/FaqSectionCMS'
import FooterCMS from './sections/FooterCMS'

function HomepageContent() {
  return (
    <div className='w-full flex flex-col'>
      <HeroPageCMS />
      <AboutPageCMS />
      <ServicesPageCMS />
      <ProductSectionCMS />
      <ClientSectionCMS />
      <PartnerSectionCMS />
      <ContactUsSectionCMS />
      <FaqSectionCMS />
      <ProductItemCTACMS/>
      <FooterCMS />
      

    </div>
  )
}

export default HomepageContent
