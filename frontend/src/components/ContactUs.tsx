import '../styles/ContactUs.css'
import image from '../assets/github.jpg'
import image1 from '../assets/opsie/fb.jpg'
import image2 from '../assets/opsie/Instagram.jpg'
import image3 from '../assets/opsie/Linkdn.jpg'


function ContactUs(){
    return(
        <section className="contact-section">
        <div className="contact-wrapper">
            <div className="contact-info">
                <h1>Contact Us</h1>
                <p>For Contact details, kindly reach:</p>

                <p >Mobile No. 12345678911</p>
                <p>Mobile No. 21314456272</p>
                <p>HR Department email: asdas@gmail.com</p>

                <div className="social-icons">
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                    <img src={image} alt="GitHub Logo" className="social-logo" />
                 </a>
                 <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                    <img src={image1} alt="Facebook logo" className="social-logo" />
                 </a>
                 <a href="https://www.instagram.com/?hl=en" target="_blank" rel="noopener noreferrer">
                    <img src={image2} alt="Instagram logo" className="social-logo" />
                 </a>
                 <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer">
                    <img src={image3} alt="Linkdnlogo" className="social-logo" />
                 </a>
                    </div>

                <button className="meeting-btn">
                    BOOK A MEETING SCHEDULE
                </button>
            </div>
             
             
        </div>
    </section>

    )
}
export default ContactUs