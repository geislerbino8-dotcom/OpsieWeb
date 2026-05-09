import HeroPage from '../components/HeroPage'
import AboutUsSection from './sections/AboutUsSection'
import ServicesSection from './sections/ServicesSection'
import ProductSection from './sections/ProductSection'
import ContactUsSection from './sections/ContactUsSection'
import ScrollAnimatedSection from '../ScrollAnimationSection'
import Faq from '../components/FaqSection/Faq'
import HomeHeroImage from '../assets/background-images/landing-hero.jpg'
import ClientReview from '../components/sections/ClientReviewsSection'
import WhyChooseUsSection from './sections/WhyChooseUsSection'
import ProductItemCTA from '@/components/cards/ProductItemCTA'
import Team from '@/components/Team'
import { useContext } from 'react'
import { ContentContext } from '@/App'
import ContactProcessSection from './sections/ContactProcessSection'

function Homepage() {

  const content = useContext(ContentContext)


  return (
    <div className="overflow-hidden">


        <HeroPage heroText={content?.heroSection?.header}  bgImage={HomeHeroImage} />

      <ScrollAnimatedSection delay={100}>
        <AboutUsSection />
      </ScrollAnimatedSection>

      <ScrollAnimatedSection delay={150}>
        <WhyChooseUsSection />
      </ScrollAnimatedSection>

      {/**<SolutionSection /> */}

      

      <ScrollAnimatedSection delay={200}>
        <ServicesSection />
      </ScrollAnimatedSection>

      <ScrollAnimatedSection delay={300}>
        <ProductSection />
      </ScrollAnimatedSection>

      {
        /**
         * <ScrollAnimatedSection delay={400}>
        <Analytics />
      </ScrollAnimatedSection>
         */
      }

      <ScrollAnimatedSection delay={150}>
      <section className="w-full bg-[#FCFDFF] py-0">
        <div className="max-w-7xl mx-auto px-6">
            <Team />

          {/* Footer Context & CTA */}
          
        </div>
      </section>
    </ScrollAnimatedSection>

      <ScrollAnimatedSection delay={500}>
          <ClientReview />
      </ScrollAnimatedSection>

      <ScrollAnimatedSection delay={600}>
        {/**<PartnerSection /> */}
        <ContactProcessSection />
      </ScrollAnimatedSection>

      <ScrollAnimatedSection delay={700}>
        <ContactUsSection />
      </ScrollAnimatedSection>

      <ScrollAnimatedSection delay={650}>
        <Faq />
      </ScrollAnimatedSection>

      <ProductItemCTA />



      

  

    </div>
  )
}

export default Homepage