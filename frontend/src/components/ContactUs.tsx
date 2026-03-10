import '../styles/ContactUs.css'
import image1 from '../assets/opsie/fb.jpg'
import image2 from '../assets/visuals/github.jpg'
import image3 from '../assets/opsie/Instagram.jpg'
import image4 from '../assets/opsie/Linkdn.jpg'
import ContactForm from './cards/ContactForm'

function ContactUs(){
    return(
        <section className="contact-section">
        <div className="flex flex-row justify-between">
        <div className="contact-wrapper">
            <div className="contact-info">
                <h1 className='contact-title'> Contact Us</h1>
                <p>For Contact details, kindly reach:</p>



                <p>Mobile No. 12345678911</p>
                <p>Mobile No. 21314456272</p>
                <p>HR Department email: asdas@gmail.com</p>

                <button className="meeting-btn"
                    onClick={()=> {
                        window.location.href = "/book-a-schedule"
                    }}
                >
                    BOOK A MEETING SCHEDULE
                </button>

                <div className="social-icons">
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                    <img src={image1} alt="Facebook Logo" className="social-logo" />
                 </a>
                 <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                    <img src={image2} alt="Github logo" className="social-logo" />
                 </a>
                 <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer">
                    <img src={image3} alt="Linkdn logo" className="social-logo" />
                 </a>
                 <a href="https://www.instagram.com/?hl=en" target="_blank" rel="noopener noreferrer">
                    <img src={image4} alt="Instagram logo" className="social-logo" />
                 </a>
                    </div>
            </div>   
            
        </div>
        <ContactForm />
        </div>
    </section>

    )
}
export default ContactUs