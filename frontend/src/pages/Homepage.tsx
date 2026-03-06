import HeroPage from '../components/HeroPage'
import AboutUsSection from './sections/AboutUsSection'
import ServicesSection from './sections/ServicesSection'
import ProductSection from './sections/ProductSection'
import Analytics from './sections/Analytics'
import FeedbackSection from './sections/FeedbackSection'
import PartnerSection from './sections/PartnerSection'
import ContactUsSection from './sections/ContactUsSection'
import EncourageSection from './sections/EncourageSection'
import ScrollAnimatedSection from '../ScrollAnimationSection'

import HomeHeroImage from '../assets/background-images/landing-hero.jpg'

function Homepage() {
  return (
    <div className="overflow-hidden">

      <ScrollAnimatedSection>
        <HeroPage heroText="Bring your Ideas into Reality ✨" bgImage={HomeHeroImage} />
      </ScrollAnimatedSection>

      <ScrollAnimatedSection delay={100}>
        <AboutUsSection />
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
        <FeedbackSection />
      </ScrollAnimatedSection>

      <ScrollAnimatedSection delay={600}>
        <PartnerSection />
      </ScrollAnimatedSection>

      <ScrollAnimatedSection delay={700}>
        <ContactUsSection />
      </ScrollAnimatedSection>

      <ScrollAnimatedSection delay={800}>
        <EncourageSection />
      </ScrollAnimatedSection>

    </div>
  )
}

export default Homepage