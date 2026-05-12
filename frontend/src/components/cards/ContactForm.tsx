import { useState } from "react";
import { createTicket } from "@/api/createTicket";
import { useToast } from "@/hooks/useToast";
import ToastContainer from "../admin/common/ToastComponent";


function ContactForm() {
  const [transSucc, setTransSucc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ disabled, setDisabled ] = useState(false)
  const { toasts, addToast } = useToast()

  const initialUserInfo = {
    name: "",
    email: "",
    description: "",
    platform: "",
    category: "",
    phone: "",
    address: "",
    product: "",
  };

  const [userData, setUserData] = useState(initialUserInfo);

  const handleCreateInquiry = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await createTicket(userData);
      console.log("Inquiry Sent:", response);
      setTransSucc(true);
      setUserData(initialUserInfo);
    } catch (error: unknown) {
      console.error("Error creating ticket:", error);

      const message = error instanceof Error ? "Too many requests. Try again later." : ""



      addToast(message, "error")
      setDisabled(true)
      
    } finally {
      setLoading(false);
    }
  };

  const handleUserDataChange = (e: any) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center" data-aos="fade-up">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl md:p-10 p-6 flex flex-col items-center border border-gray-100">
        {!transSucc ? (
          <form onSubmit={handleCreateInquiry} className="w-full space-y-4">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 tracking-tight">
                  Not sure where to start? 

              </h3>
              <p className="text-gray-500 text-sm mt-2">
                Fill out the contact form and we’ll get back to you shortly.
              </p>
            </div>

            {/* Row 1: Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                onChange={handleUserDataChange}
                type="text"
                name="name"
                value={userData.name}
                placeholder="Full Name*"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3CBDE6] transition-all"
              />
              <input
                onChange={handleUserDataChange}
                type="email"
                name="email"
                value={userData.email}
                placeholder="Your Email*"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3CBDE6] transition-all"
              />
            </div>

            {/* Row 2: Phone & Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                onChange={handleUserDataChange}
                type="text"
                name="phone"
                value={userData.phone}
                placeholder="Phone (Optional)"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3CBDE6] transition-all"
              />
              <input
                onChange={handleUserDataChange}
                type="text"
                name="address"
                value={userData.address}
                placeholder="Address (Optional)"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3CBDE6] transition-all"
              />
            </div>

            {/* Row 3: Message (Full Width) */}
            <textarea
              onChange={handleUserDataChange}
              name="description"
              value={userData.description}
              placeholder="Tell us about your project or inquiry*"
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3CBDE6] transition-all resize-none h-32"
            ></textarea>

            {/* Row 4: Platform & Version */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                onChange={handleUserDataChange}
                name="platform"
                value={userData.platform}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3CBDE6] transition-all text-gray-500"
              >
                <option value="" disabled>- Platform -</option>
                <option value="Windows">Windows</option>
                <option value="macOS">macOS</option>
                <option value="Linux">Linux</option>
                <option value="Android">Android</option>
                <option value="IOS">IOS</option>
                <option value="Web">Web Application</option>
              </select>

              <select
              onChange={handleUserDataChange}
              name="product"
              value={userData.product}
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3CBDE6] transition-all text-gray-500"
            >
              <option value="" disabled>- Product -</option>
             {
              /**
               *  {
                products.map((item, index)=> (
                  <option key={index} value={item.name}>{item.name}</option>

                ))
              }
               */
             }
          
            </select>
            </div>

            

            {/* Row 5: Category (Full Width) */}
            <select
              onChange={handleUserDataChange}
              name="category"
              value={userData.category}
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3CBDE6] transition-all text-gray-500"
            >
              <option value="" disabled>- Category -</option>
              <option value="Inquire">Inquiry</option>
              <option value="Question">Question</option>
              <option value="Complaint">Complaint</option>
              <option value="Bug Report">Bug Report</option>
              <option value="Feature Request">Feature Request</option>
            </select>

            <button
              type="submit"
              disabled={disabled}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-500 shadow-lg ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#3CBDE6] hover:bg-[#242424] hover:-translate-y-1"
              }`}
            >
              {disabled ? "Sorry, please try again later" : ""}
              {loading && !disabled && "Sending..."}
              {!disabled && !loading && "Send Message"}
            </button>
          </form>
        ) : (
          <div className="py-12 text-center space-y-6" data-aos="zoom-in">
            <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-5xl mx-auto border-4 border-white shadow-xl">
              ✓
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Thank You!</h2>
              <p className="text-gray-500 mt-4 leading-relaxed max-w-xs mx-auto">
                Your message has been sent successfully. We'll get back to you within 24 hours.
              </p>
            </div>
            <button 
              onClick={() => setTransSucc(false)}
              className="text-[#3CBDE6] font-bold uppercase tracking-widest text-xs hover:text-black transition-colors"
            >
              Send Another Inquiry
            </button>
          </div>
        )}
      </div>

      <div className="absolute top-0 ">
        <ToastContainer toasts={toasts} />
      </div>
    </div>
  );
}

export default ContactForm;