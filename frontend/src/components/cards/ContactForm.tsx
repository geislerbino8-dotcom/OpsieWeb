import { useEffect, useState } from "react";
import { createTicket } from "@/api/createTicket";
import { useToast } from "@/hooks/useToast";
import ToastContainer from "../admin/common/ToastComponent";
import { products } from "@/data/productsData";

interface ProductItem {
  name: string;
}

function ContactForm() {
  const [transSucc, setTransSucc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { toasts, addToast } = useToast();
  const [, setProductList] = useState<string[]>([]); 
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

  useEffect(() => {
    const lists = products.map((prev: ProductItem) => prev.name);
    setProductList(lists);
  }, []);

  const handleCreateInquiry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await createTicket(userData);
      console.log("Inquiry Sent:", response);
      setTransSucc(true);
      setUserData(initialUserInfo);
    } catch (error: unknown) {
      console.error("Error creating ticket:", error);
      const message = error instanceof Error ? "Too many requests. Try again later." : "An error occurred.";
      addToast(message, "error");
      setDisabled(true);
    } finally {
      setLoading(false);
    }
  };

  const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center relative" data-aos="fade-up">
      {/* 
        Main Card: Kept physically uniform. 
        Uses group-hover properties to turn child elements white/light gray when open.
      */}
      <div className="group relative w-full max-w-lg bg-white rounded-xl shadow-2xl md:p-10 p-6 flex flex-col items-center border border-gray-100 overflow-hidden transition-all duration-500">
        
        {/* Smooth Gradient Layer overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-[#3CBDE6] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out pointer-events-none z-0" />

        {!transSucc ? (
          <form
            onSubmit={handleCreateInquiry}
            aria-labelledby="contact-form-title"
            aria-busy={loading}
            className="w-full space-y-4 relative z-10"
          >
            <div className="text-center mb-8">
              <h3 id="contact-form-title" className="text-3xl font-bold text-gray-900 tracking-tight transition-colors duration-500 group-hover:text-white">
                Not sure where to start?
              </h3>
              <p className="text-gray-500 text-sm mt-2 transition-colors duration-500 group-hover:text-neutral-200">
                Fill out the contact form and we’ll get back to you shortly.
              </p>
            </div>

            {/* Row 1: Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                id="inquiry-name"
                onChange={handleUserDataChange}
                type="text"
                name="name"
                value={userData.name}
                placeholder="Full Name*"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3CBDE6] transition-all duration-300 group-hover:bg-neutral-900/40 group-hover:border-neutral-700 group-hover:text-white placeholder-gray-400 group-hover:placeholder-neutral-400"
              />
              <label htmlFor="inquiry-name" className="sr-only">Full name</label>
              <input
                id="inquiry-email"
                onChange={handleUserDataChange}
                type="email"
                name="email"
                value={userData.email}
                placeholder="Your Email*"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3CBDE6] transition-all duration-300 group-hover:bg-neutral-900/40 group-hover:border-neutral-700 group-hover:text-white placeholder-gray-400 group-hover:placeholder-neutral-400"
              />
              <label htmlFor="inquiry-email" className="sr-only">Email address</label>
            </div>

            {/* Row 2: Phone & Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                id="inquiry-phone"
                onChange={handleUserDataChange}
                type="tel"
                name="phone"
                value={userData.phone}
                placeholder="Phone (Optional)"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3CBDE6] transition-all duration-300 group-hover:bg-neutral-900/40 group-hover:border-neutral-700 group-hover:text-white placeholder-gray-400 group-hover:placeholder-neutral-400"
              />
              <label htmlFor="inquiry-phone" className="sr-only">Phone number (optional)</label>
              <input
                id="inquiry-address"
                onChange={handleUserDataChange}
                type="text"
                name="address"
                value={userData.address}
                placeholder="Address (Optional)"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3CBDE6] transition-all duration-300 group-hover:bg-neutral-900/40 group-hover:border-neutral-700 group-hover:text-white placeholder-gray-400 group-hover:placeholder-neutral-400"
              />
              <label htmlFor="inquiry-address" className="sr-only">Address (optional)</label>
            </div>

            {/* Row 3: Message */}
            <textarea
              id="inquiry-description"
              onChange={handleUserDataChange}
              name="description"
              value={userData.description}
              placeholder="Tell us about your project or inquiry*"
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3CBDE6] transition-all duration-300 resize-none h-32 group-hover:bg-neutral-900/40 group-hover:border-neutral-700 group-hover:text-white placeholder-gray-400 group-hover:placeholder-neutral-400"
            ></textarea>
            <label htmlFor="inquiry-description" className="sr-only">Project or inquiry details</label>

            {/* Row 4: Platform & Product */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                id="inquiry-platform"
                onChange={handleUserDataChange}
                name="platform"
                value={userData.platform}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3CBDE6] transition-all duration-300 text-gray-500 group-hover:bg-neutral-900 group-hover:border-neutral-700 group-hover:text-neutral-200"
              >
                <option value="" disabled>- Platform -</option>
                <option value="Windows">Windows</option>
                <option value="macOS">macOS</option>
                <option value="Linux">Linux</option>
                <option value="Android">Android</option>
                <option value="IOS">IOS</option>
                <option value="Web">Web Application</option>
              </select>
              <label htmlFor="inquiry-platform" className="sr-only">Platform</label>

              <select
                id="inquiry-product"
                onChange={handleUserDataChange}
                name="product"
                value={userData.product}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3CBDE6] transition-all duration-300 text-gray-500 group-hover:bg-neutral-900 group-hover:border-neutral-700 group-hover:text-neutral-200"
              >
                <option value="" disabled>- Product -</option>
                {products.map((item: ProductItem, index: number) => (
                  <option key={index} value={item.name}>{item.name}</option>
                ))}
              </select>
              <label htmlFor="inquiry-product" className="sr-only">Product</label>
            </div>

            {/* Row 5: Category */}
            <select
              id="inquiry-category"
              onChange={handleUserDataChange}
              name="category"
              value={userData.category}
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3CBDE6] transition-all duration-300 text-gray-500 group-hover:bg-neutral-900 group-hover:border-neutral-700 group-hover:text-neutral-200"
            >
              <option value="" disabled>- Category -</option>
              <option value="Inquiry">Inquiry</option>
              <option value="Question">Question</option>
              <option value="Complaint">Complaint</option>
              <option value="Bug Report">Bug Report</option>
              <option value="Feature Request">Feature Request</option>
            </select>
            <label htmlFor="inquiry-category" className="sr-only">Inquiry category</label>

            <button
              type="submit"
              disabled={disabled || loading}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 shadow-lg ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#3CBDE6] hover:bg-neutral-900 group-hover:hover:bg-white group-hover:hover:text-black hover:-translate-y-0.5"
              }`}
            >
              {disabled ? "Sorry, please try again later" : ""}
              {loading && !disabled && "Sending..."}
              {!disabled && !loading && "Send Message"}
            </button>
          </form>
        ) : (
          <div className="py-12 text-center space-y-6 relative z-10" data-aos="zoom-in" role="status" aria-live="polite">
            <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-5xl mx-auto border-4 border-white shadow-xl">
              ✓
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 transition-colors duration-500 group-hover:text-white">Thank You!</h2>
              <p className="text-gray-500 mt-4 leading-relaxed max-w-xs mx-auto transition-colors duration-500 group-hover:text-neutral-200">
                Your message has been sent successfully. We'll get back to you within 24 hours.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setTransSucc(false)}
              className="text-[#3CBDE6] font-bold uppercase tracking-widest text-xs hover:text-black transition-colors group-hover:text-white group-hover:hover:text-neutral-300"
            >
              Send Another Inquiry
            </button>
          </div>
        )}
      </div>

      <div className="absolute top-0 left-0 right-0 pointer-events-none">
        <ToastContainer toasts={toasts} />
      </div>
    </div>
  );
}

export default ContactForm;
