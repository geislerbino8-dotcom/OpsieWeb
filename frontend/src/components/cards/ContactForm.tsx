import { useState } from "react";
import BlackButton from "../buttons/BlackButton";

function ContactForm() {
  const [selValue, setSelValue] = useState("Where did you find us?");

  const selectValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelValue(e.target.value);
  }


  return (
    <div className="w-full flex justify-end px-4 py-8">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 flex flex-col items-center space-y-4">
        <h3 className="text-2xl font-bold text-gray-800 text-center">
          Let's Talk About Your Project
        </h3>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name*"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email*"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          name="mobile"
          placeholder="Your Mobile Number*"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          name="address"
          placeholder="Address*"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          onChange={selectValue}
          value={selValue}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="Where did you find us?">Where did you find us?</option>
          <option value="Facebook">Facebook</option>
          <option value="Instagram">Instagram</option>
          <option value="Tiktok">Tiktok</option>
          <option value="Linkdn">Linkdn</option>
          <option value="Friends">Friends</option>
          <option value="Other">Other</option>
        </select>

        <textarea
          placeholder="Message*"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none h-32"
        ></textarea>

        <button className="w-full py-2 bg-black text-white font-bold rounded-md hover:bg-gray-800 transition-colors">
          Send Message
        </button>
       
      </div>
    </div>
  );
}

export default ContactForm;