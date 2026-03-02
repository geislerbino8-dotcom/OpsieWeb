import BlackButton from "../buttons/BlackButton"
import '../../styles/ContactForm.css'
import { useState } from "react"

function ContactForm() {

  const [ selValue, setSelValue ] = useState('Where did you find us?')

  const selectValue =(e: any)=> {
    console.log(e.target.value)
    setSelValue(e.target.value)
  }

  return (
    <div className="contact-form-container">
      
      <div className="contact-form-wrapper flex fd-c ai-c jc-c">
        <h3>Let's Talk About Your Project</h3>
        <input type="text" name="Full Name" placeholder="Full Name*"/>
        <input type="text" name="Full Name" placeholder="Your Email*"/>
        <input type="text" name="Full Name" placeholder="Your Mobile Number*"/>
        <input type="text" name="Full Name" placeholder="Address*"/>
        
        <select onChange={(e)=> selectValue(e)} name="find" id="find" value={selValue}>
            <option value="Inquire">Inquire</option>
            <option value="Bug Fixing">Bug Fixing</option>
        </select>

        <input type="text" placeholder="Message*"/>

        <button>Send Message</button>
      </div>
    </div>
  )
}

export default ContactForm
