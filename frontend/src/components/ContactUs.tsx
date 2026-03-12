import image1 from '../assets/opsie/fb.jpg'
import image2 from '../assets/visuals/github.jpg'
import image3 from '../assets/opsie/Instagram.jpg'
import image4 from '../assets/opsie/Linkdn.jpg'
import ContactForm from './cards/ContactForm'

function ContactUs() {
  return (
    <section className="w-full py-12 px-4">
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16">

        {/* LEFT SIDE */}
        <div className="flex flex-col gap-6 lg:w-1/2 text-center lg:text-left">

          <h1 className="text-3xl md:text-4xl font-semibold">
            Contact Us
          </h1>

          <p className="text-gray-600">
            For contact details, kindly reach:
          </p>

          <div className="space-y-2 text-gray-700">
            <p>Mobile No. 12345678911</p>
            <p>Mobile No. 21314456272</p>
            <p>HR Department email: asdas@gmail.com</p>
          </div>

          {/* BUTTON */}
          <button
            onClick={() => {
              window.location.href = "/book-a-schedule"
            }}
            className="bg-[#3CBDE6] text-white px-6 py-3 rounded-full w-fit mx-auto lg:mx-0 hover:bg-[#2ca7cc] transition"
          >
            BOOK A MEETING SCHEDULE
          </button>

          {/* SOCIAL ICONS */}
          <div className="flex justify-center lg:justify-start gap-4 mt-4">

            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <img src={image1} alt="Facebook" className="w-10 h-10 object-cover rounded-full" />
            </a>

            <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
              <img src={image2} alt="Github" className="w-10 h-10 object-cover rounded-full" />
            </a>

            <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer">
              <img src={image3} alt="LinkedIn" className="w-10 h-10 object-cover rounded-full" />
            </a>

            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <img src={image4} alt="Instagram" className="w-10 h-10 object-cover rounded-full" />
            </a>

          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="lg:w-1/2">
          <ContactForm />
        </div>

      </div>
    </section>
  )
}

export default ContactUs