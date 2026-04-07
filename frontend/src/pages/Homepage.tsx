import HeroPage from '../components/HeroPage'
import AboutUsSection from './sections/AboutUsSection'
import ServicesSection from './sections/ServicesSection'
import ProductSection from './sections/ProductSection'
import Analytics from './sections/Analytics'
import PartnerSection from './sections/PartnerSection'
import ContactUsSection from './sections/ContactUsSection'
import ScrollAnimatedSection from '../ScrollAnimationSection'
import Faq from '../components/FaqSection/Faq'
import HomeHeroImage from '../assets/background-images/landing-hero.jpg'
import ClientReview from '../components/sections/ClientReviewsSection'
import Navigation from '../components/Navigation'
import WhyChooseUsSection from './sections/WhyChooseUsSection'

function Homepage() {
  return (
    <div className="overflow-hidden">
         <div className=''>
        <Navigation />
      </div>

        <HeroPage heroText="Bring your Ideas into Reality" bgImage={HomeHeroImage} />

      <ScrollAnimatedSection delay={100}>
        <AboutUsSection />
      </ScrollAnimatedSection>

      <ScrollAnimatedSection delay={150}>
        <WhyChooseUsSection />
      </ScrollAnimatedSection>

      <ScrollAnimatedSection delay={200}>
        <ServicesSection />
      </ScrollAnimatedSection>

      <ScrollAnimatedSection delay={300}>
        <ProductSection />
      </ScrollAnimatedSection>

      <ScrollAnimatedSection delay={400}>
        <Analytics />
      </ScrollAnimatedSection>

      <ScrollAnimatedSection delay={500}>
        <div className='p-20'>
          <ClientReview />
        </div>
      </ScrollAnimatedSection>

      <ScrollAnimatedSection delay={600}>
        <PartnerSection />
      </ScrollAnimatedSection>

      <ScrollAnimatedSection delay={650}>
        <Faq />
      </ScrollAnimatedSection>



      <ScrollAnimatedSection delay={700}>
        <ContactUsSection />
      </ScrollAnimatedSection>

  

    </div>
  )
}

export default Homepage