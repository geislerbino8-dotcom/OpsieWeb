import React from 'react'
import HeroPage from '../components/HeroPage'
import ContactForm from '../components/cards/ContactForm'
import MapCard from '../components/cards/MapCard'
import ContactUs from '../components/ContactUs'


function ContactUsPage() {
  return (
    <div>
      <HeroPage heroText='Contact Us'/>
      <ContactForm/>
      <ContactUs/>
      <MapCard/>
    </div>
  )
}

export default ContactUsPage
