import React from 'react'
import HeroPage from '../components/HeroPage'
import MapCard from '../components/cards/MapCard'
import ContactUs from '../components/ContactUs'
import Contactbg from '../assets/visuals/Contact-bg.png'
import EncourageCard from '../components/cards/EncourageCard'
import FAQAccordion from "../components/FaqSection/Faq"
import Footer from '../components/Footer'
import SunPlazaCard from '../components/cards/SunPlazaCard'



function ContactUsPage() {
  return (
    <div>
      <HeroPage heroText='Contact Us' bgImage={Contactbg}/>
      <ContactUs/>
      <SunPlazaCard/>
      <MapCard/>
      <EncourageCard/>
      <FAQAccordion />
      <Footer/>
    </div>
  )
}

export default ContactUsPage
