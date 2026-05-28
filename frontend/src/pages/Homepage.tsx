import HeroPage from '../components/HeroPage'
import AboutUsSection from './sections/AboutUsSection'
import ServicesSection from './sections/ServicesSection'
import ProductSection from './sections/ProductSection'
import ContactUsSection from './sections/ContactUsSection'
import ScrollAnimatedSection from '../ScrollAnimationSection'
import Faq from '../components/FaqSection/Faq'
import ClientReview from '../components/sections/ClientReviewsSection'
import WhyChooseUsSection from './sections/WhyChooseUsSection'
import ProductItemCTA from '@/components/cards/ProductItemCTA'
import ContactProcessSection from './sections/ContactProcessSection'
import OperationalStructure from '@/components/sections/OperationalStructure'

function Homepage() {


  return (
    <div className="overflow-hidden">


        <HeroPage bgImage={'/background/landing-hero1.jpg'} />

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
            {/**<Team /> */}
            <OperationalStructure />

          {/* Footer Context & CTA */}
          
        </div>
      </section>
    </ScrollAnimatedSection>

      <ScrollAnimatedSection delay={500}>
          <div className='py-10'>
            <ClientReview />
          </div>
      </ScrollAnimatedSection>

      <ScrollAnimatedSection delay={600}>
        {/**<PartnerSection /> */}
        <ContactProcessSection />
      </ScrollAnimatedSection>

      <ScrollAnimatedSection delay={700}>
        <ContactUsSection />
      </ScrollAnimatedSection>

            <ProductItemCTA />


      <ScrollAnimatedSection delay={650}>
        <Faq />
      </ScrollAnimatedSection>



      

  

    </div>
  )
}

export default Homepage