import React from 'react'
import HeroPage from '../components/HeroPage'
import ContactForm from '../components/cards/ContactForm'
import MapCard from '../components/cards/MapCard'
import ContactUs from '../components/ContactUs'
import Products2 from '../assets/visuals/Products2.jpg'


function ContactUsPage() {
  return (
    <div>
      <HeroPage heroText='Contact Us' bgImage={Products2}/>
      <ContactUs/>
      <MapCard/>
    </div>
  )
}

export default ContactUsPage
