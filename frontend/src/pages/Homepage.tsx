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
import ProductItemCTA from '@/components/cards/ProductItemCTA'
import { usePageContent } from '@/data/usePageContent'
import Team from '@/components/Team'
import { useNavigate } from 'react-router-dom'

function Homepage() {

  const navigate = useNavigate()

  

  return (
    <div className="overflow-hidden">
         <div className=''>
        <Navigation />
      </div>

        <HeroPage heroText={usePageContent.data[0].heroSection.header}  bgImage={HomeHeroImage} />

      <ScrollAnimatedSection delay={100}>
        <AboutUsSection />
      </ScrollAnimatedSection>

      <ScrollAnimatedSection delay={150}>
        <WhyChooseUsSection />
      </ScrollAnimatedSection>

      <ScrollAnimatedSection delay={150}>
        <div className='w-full flex items-center justify-center'>
          <div className='w-[80%] flex flex-col items-center justify-center mb-20'>
          <Team />
          <p className='text-xl text-[#4A5E57] leading-relaxed'>We work closely with our clients to understand how their business runs 
          and where systems can be improved.
          </p>
           <button 
              onClick={() => navigate('/who-we-are')}
              className="my-5 flex items-center gap-3 px-8 py-4 bg-white border-1 border-gray-300  rounded-2xl font-bold text-gray-900 transition-all duration-700 hover:border-[#3CBDE6] hover:bg-[#3CBDE6] hover:text-white hover:shadow-lg hover:shadow-[#3CBDE6]/10"
            >
              <span>Meet our Team</span>
             
            </button>
        </div>
        </div>
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
          <ClientReview />
      </ScrollAnimatedSection>

      <ScrollAnimatedSection delay={600}>
        <PartnerSection />
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