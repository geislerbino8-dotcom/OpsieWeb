import { createInquiry } from "../../api/createInquiry";
import { useState, version } from "react";
import BlackButton from "../buttons/BlackButton";
import { createTicket } from "@/api/createTicket";
function ContactForm() {



  const [selValue, setSelValue] = useState("Where did you find us?");
  const [ transSucc, setTransSucc ] = useState(Boolean)

  const selectValue = (e: any) => {
    setSelValue(e.target.value);
  };

   const userInfo = {
    name: "",
    email: "",
    description: "",
    platform: "",
    category: "",
    phone: "",
    address: "",
    version: "",
    
  
  }

  const [ userData, setUserData ] = useState(userInfo)

  const handleCreateInquiry = async (e: any, userData : any)=> {

      e.preventDefault()

      
      try {
        
          const send = await createTicket(userData)

          console.log(send)

          setTransSucc(true)
          setUserData(userInfo)

      } catch (error) {
        console.log(error)
      }


  }

  const handleUserDataChange = (e: any)=> {

    const { name, value } = e.target

    

     setUserData(prev => ({
    ...prev,
    [name]: value  
  }));

  }


  return (
    <div className="w-full flex justify-end ">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 flex flex-col items-center space-y-4">
        {
          !transSucc ?
          <form onSubmit={(e)=> handleCreateInquiry(e, userData)}>
              <h3 className="text-2xl font-bold text-gray-800 text-center">
          Let's Talk About Your Project
        </h3>

        <input
          onChange={handleUserDataChange}
          type="text"
          name="name"
          placeholder="Full Name*"
          required
          className="w-full px-4 py-2 my-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          onChange={handleUserDataChange}
          type="email"
          name="email"
          placeholder="Your Email*"
          required
          className="w-full px-4 py-2 my-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          onChange={handleUserDataChange}
          type="text"
          name="phone"
          placeholder="Your Mobile Number (Optional)"
          className="w-full px-4 py-2 my-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          onChange={handleUserDataChange}
          type="text"
          name="address"
          placeholder="Address (Optional)"
          className="w-full px-4 py-2 my-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          onChange={handleUserDataChange}
          name="description"
          placeholder="Message*"
          className="w-full px-4 py-2 my-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none h-32"
        ></textarea>

        <select
          onChange={handleUserDataChange}
          name="platform"
          required
          className="w-full px-4 py-2 my-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="Platform">- Platform -</option>
          <option value="Windows">Windows</option>
          <option value="macOS">macOS</option>
          <option value="Linux">Linux</option>
          <option value="Android">Android</option>
          <option value="IOS">IOS</option>
        </select>

         <input
          onChange={handleUserDataChange}
          type="text"
          name="version"
          placeholder="Version (OS)"
          required
          className="w-full px-4 py-2 my-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        

        <select
          onChange={handleUserDataChange}
          name="category"
          required
          className="w-full px-4 py-2 my-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="select">- Category -</option>
          <option value="Inquire">Inquire</option>
          <option value="Question">Question</option>
          <option value="Complaint">Complaint</option>
          <option value="Bug Report">Bug Report</option>
          <option value="Feature Request">Feature Request</option>
        </select>
        <button type="submit" className="w-full py-2 bg-black text-white font-bold my-2 rounded-md hover:bg-gray-800 transition-colors"
         
          style={{
            backgroundColor: transSucc ? 'green' : ''
          }}
          disabled={transSucc}
        >
          {
            !transSucc ? 'Send Message' : 'Message Sent. Thank you!'
          }
        </button>
          </form> : 
          <>
            <h1 className="text-2xl text-center">Thanks for your feedback. We will contact you later.</h1>
          </>
        }

        
      </div>
  
    </div>
  );
}

export default ContactForm;
