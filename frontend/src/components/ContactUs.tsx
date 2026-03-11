import '../styles/ContactUs.css'
import image1 from '../assets/opsie/fb.jpg'
import image2 from '../assets/visuals/github.jpg'
import image3 from '../assets/opsie/Instagram.jpg'
import image4 from '../assets/opsie/Linkdn.jpg'
import OpsieLogo from './OpsieLogo'
import ContactForm from './cards/ContactForm'



function ContactUs(){
    return(
        <section className=" contact-section px-6 lg:px-16 py-12">
        <div className="flex flex-col lg:flex-row justify-between gap-20 mt-10">

            <div className=" contact-wrapper w-full lg:w-[40%] ">
                <div className="contact-info">
                    <h1 className='contact-title'>Contact Us</h1>
                    <p>For Contact details, kindly reach:</p>

                    <p>Mobile No. 12345678911</p>
                    <p>Mobile No. 21314456272</p>
                    <p>HR Department email: asdas@gmail.com</p>

                    <button
                        className="meeting-btn"
                        onClick={()=> {
                            window.location.href = "/book-a-schedule"
                        }}
                    >
                        BOOK A MEETING SCHEDULE
                    </button>

                    <div className="social-icons flex gap-4 mt-4 ">
                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                            <img src={image1} alt="Facebook Logo" className="social-logo w-8"/>
                        </a>

                        <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                            <img src={image2} alt="Github logo" className="social-logo w-8"/>
                        </a>

                        <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer">
                            <img src={image3} alt="Linkdn logo" className="social-logo w-8"/>
                        </a>

                        <a href="https://www.instagram.com/?hl=en" target="_blank" rel="noopener noreferrer">
                            <img src={image4} alt="Instagram logo" className="social-logo w-8"/>
                        </a>
                    </div>

                </div>            
            </div>
            <div className="w-full lg:w-[55%]">
                <ContactForm/>
            </div>
          
        </div>

    </section>
    )
}
export default ContactUs