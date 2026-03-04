import ContactForm from "../../components/cards/ContactForm"
import '../../styles/ContactUs.css'
import MapCard from "../../components/cards/MapCard"
import TopSectionCard from "../../components/cards/TopSectionCard"

function ContactUsSection() {
  return (
    <div className='contact-us-container flex fd-c jc-c vw100'>
      <div>
        <TopSectionCard secName="Contact" />
      </div>
      <div className="contact-header">
        <h1>Get in Touch with Our Team</h1>
      <div>
        <div>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio officia quaerat a eligendi ratione amet tempora repellendus quasi quod, aspernatur nobis dolor aperiam? Quaerat eveniet quisquam, rerum deleniti nesciunt dolores.</p>
        </div>
      </div>
        <div className="contact-wrapper flex fd-c">
          <ContactForm />
          <MapCard />
        </div>
      </div>
    </div>
  )
}

export default ContactUsSection
