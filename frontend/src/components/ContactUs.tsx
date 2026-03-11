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

        <div className="goals-text mb-10 max-w-2xl">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                Let us work on your goals
            </h1>

            <p className="mb-2">
                Reach out to us and let’s discuss how we can help you with your goals.
            </p>

            <p>
                Experience an easy and simplified way of achieving your goals thru
                customized software solutions with our dedicated team.
            </p>
        </div>

        <div className=" flex flex-col lg:flex-row justify-between gap-12">

            <div className="contact-wrapper w-full lg:w-[40%] mt-10 lg:mt-20">
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