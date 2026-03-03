import HeroPage from '../HeroPage'
import AboutUsSection from '../sections/AboutUsSection'
import ServicesSection from '../sections/ServicesSection'
import ProductSection from '../sections/ProductSection'
import Analytics from '../sections/Analytics'
import FeedbackSection from '../sections/FeedbackSection'
import PartnerSection from '../sections/PartnerSection'
import ContactUsSection from '../sections/ContactUsSection'
import EncourageSection from '../sections/EncourageSection'

import HomeHeroImage from '../../assets/background-images/LH1.jpg'

function Homepage() {
  return (
    <div>
        <HeroPage bgImage={HomeHeroImage} />
        <AboutUsSection />
        <ServicesSection />
        <ProductSection />
        <Analytics />
        <FeedbackSection />
        <PartnerSection />

        <ContactUsSection />
        <EncourageSection />
    </div>
  )
}

export default Homepage
