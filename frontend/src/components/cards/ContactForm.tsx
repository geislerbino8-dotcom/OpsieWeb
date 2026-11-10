import { useEffect, useRef, useState, type ReactNode } from "react";
import { isAxiosError } from "axios";
import { createTicket } from "@/api/createTicket";
import { products } from "@/data/productsData";

interface ProductItem {
  name: string;
}

type UserInfo = {
  name: string;
  email: string;
  description: string;
  platform: string;
  category: string;
  phone: string;
  address: string;
  product: string;
};

type FieldName = keyof UserInfo;

type FieldErrors = Partial<Record<FieldName, string>>;

const EMPTY_USER_INFO: UserInfo = {
  name: "",
  email: "",
  description: "",
  platform: "",
  category: "",
  phone: "",
  address: "",
  product: "",
};

const REQUIRED_FIELDS: FieldName[] = [
  "name",
  "email",
  "description",
  "platform",
  "product",
  "category",
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FIELD_BASE =
  "w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl placeholder:text-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] aria-invalid:border-[#EF4444]/70 aria-invalid:focus:ring-[#EF4444] group-hover:bg-[#7C3AED]/40 group-hover:border-neutral-700 group-hover:placeholder:text-neutral-300";

const INPUT_CLASS = `${FIELD_BASE} text-white group-hover:text-white`;

const SELECT_CLASS = `${FIELD_BASE} text-gray-300 group-hover:text-neutral-200`;

function getErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const status = error.response?.status;

    if (status === 429) {
      return "Too many requests. Please wait a moment and try again.";
    }

    if (status && status >= 500) {
      return "Something went wrong on our side. Please try again.";
    }

    if (status === 400 || status === 422) {
      return "Please check the form details and try again.";
    }

    return "We couldn't send your message. Please try again.";
  }

  return "We couldn't send your message. Please check your connection and try again.";
}

function validate(userData: UserInfo): FieldErrors {
  const errors: FieldErrors = {};

  if (!userData.name.trim()) {
    errors.name = "Please enter your full name.";
  }

  if (!userData.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(userData.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!userData.description.trim()) {
    errors.description = "Please tell us about your project or inquiry.";
  }

  if (!userData.platform) {
    errors.platform = "Please choose a platform.";
  }

  if (!userData.product) {
    errors.product = "Please choose a product.";
  }

  if (!userData.category) {
    errors.category = "Please choose an inquiry category.";
  }

  return errors;
}

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: ReactNode;
};

function Field({ id, label, required, optional, error, children }: FieldProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-[#9aa0aa] transition-colors duration-500 group-hover:text-white"
      >
        {label}
        {required && (
          <span aria-hidden="true" className="ml-0.5 text-[#EF4444] transition-colors duration-500 group-hover:text-red-200">
            *
          </span>
        )}
        {optional && (
          <span className="font-normal text-gray-400 transition-colors duration-500 group-hover:text-neutral-300">
            {" (optional)"}
          </span>
        )}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          className="text-sm font-medium text-[#EF4444] transition-colors duration-500 group-hover:text-red-200"
        >
          {error}
        </p>
      )}
    </div>
  );
}

function ContactForm() {
  const [transSucc, setTransSucc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [userData, setUserData] = useState<UserInfo>(EMPTY_USER_INFO);
  const successRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (transSucc) {
      successRef.current?.focus();
    }
  }, [transSucc]);

  const handleCreateInquiry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // The submit uses aria-disabled (DS-2) so it stays focusable; guard the
    // handler so an in-flight request cannot be duplicated.
    if (loading) {
      return;
    }

    setSubmitError(null);

    const nextErrors = validate(userData);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstInvalid = REQUIRED_FIELDS.find((field) => nextErrors[field]);
      formRef.current
        ?.querySelector<HTMLElement>(`#inquiry-${firstInvalid}`)
        ?.focus();
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const response = await createTicket(userData);
      console.log("Inquiry Sent:", response);
      setTransSucc(true);
      setUserData(EMPTY_USER_INFO);
    } catch (error: unknown) {
      console.error("Error creating ticket:", error);
      setSubmitError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const field = name as FieldName;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => {
      if (!prev[field]) {
        return prev;
      }

      const next = { ...prev };
      delete next[field];
      return next;
    });

    setSubmitError(null);
  };

  const handleSendAnother = () => {
    setTransSucc(false);
    setSubmitError(null);
    setErrors({});
    setTimeout(() => nameInputRef.current?.focus(), 0);
  };

  const describedBy = (field: FieldName) =>
    errors[field] ? `inquiry-${field}-error` : undefined;

  const hasFieldErrors = Object.keys(errors).length > 0;

  return (
    <div className="flex justify-center relative" data-aos="fade-up">
      {/*
        Main Card: Kept physically uniform.
        Uses group-hover properties to turn child elements white/light gray when open.
      */}
      <div className="group relative w-full max-w-lg bg-[#0a0a0a] rounded-xl card-side-glow md:p-10 p-6 flex flex-col items-center border border-[#8B5CF6]/25 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-[#8B5CF6]/60">

        {/* Smooth Gradient Layer overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-[#6D28D9] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out pointer-events-none z-0" />

        {!transSucc ? (
          <form
            ref={formRef}
            noValidate
            onSubmit={handleCreateInquiry}
            aria-labelledby="contact-form-title"
            aria-busy={loading}
            className="w-full space-y-4 relative z-10"
          >
            <div className="text-center mb-8">
              <h3 id="contact-form-title" className="text-3xl font-bold text-white tracking-tight transition-colors duration-500 group-hover:text-white">
                Not sure where to start?
              </h3>
              <p className="text-gray-400 text-sm mt-2 transition-colors duration-500 group-hover:text-neutral-200">
                Fill out the contact form and we’ll get back to you shortly.
              </p>
            </div>

            {hasFieldErrors && (
              <p role="alert" className="sr-only">
                Please correct the highlighted fields and try again.
              </p>
            )}

            {/* Row 1: Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field id="inquiry-name" label="Full name" required error={errors.name}>
                <input
                  ref={nameInputRef}
                  id="inquiry-name"
                  onChange={handleUserDataChange}
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={userData.name}
                  placeholder="e.g. Juan Dela Cruz"
                  required
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={describedBy("name")}
                  className={INPUT_CLASS}
                />
              </Field>
              <Field id="inquiry-email" label="Email address" required error={errors.email}>
                <input
                  id="inquiry-email"
                  onChange={handleUserDataChange}
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={userData.email}
                  placeholder="you@company.com"
                  required
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={describedBy("email")}
                  className={INPUT_CLASS}
                />
              </Field>
            </div>

            {/* Row 2: Phone & Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field id="inquiry-phone" label="Phone number" optional>
                <input
                  id="inquiry-phone"
                  onChange={handleUserDataChange}
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  value={userData.phone}
                  placeholder="+63 917 000 0000"
                  className={INPUT_CLASS}
                />
              </Field>
              <Field id="inquiry-address" label="Address" optional>
                <input
                  id="inquiry-address"
                  onChange={handleUserDataChange}
                  type="text"
                  name="address"
                  autoComplete="street-address"
                  value={userData.address}
                  placeholder="Street, city, province"
                  className={INPUT_CLASS}
                />
              </Field>
            </div>

            {/* Row 3: Message */}
            <Field id="inquiry-description" label="Project or inquiry details" required error={errors.description}>
              <textarea
                id="inquiry-description"
                onChange={handleUserDataChange}
                name="description"
                value={userData.description}
                placeholder="Tell us about your project or inquiry"
                required
                aria-invalid={errors.description ? true : undefined}
                aria-describedby={describedBy("description")}
                className={`${INPUT_CLASS} resize-none h-32`}
              ></textarea>
            </Field>

            {/* Row 4: Platform & Product */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field id="inquiry-platform" label="Platform" required error={errors.platform}>
                <select
                  id="inquiry-platform"
                  onChange={handleUserDataChange}
                  name="platform"
                  value={userData.platform}
                  required
                  aria-invalid={errors.platform ? true : undefined}
                  aria-describedby={describedBy("platform")}
                  className={SELECT_CLASS}
                >
                  <option value="" disabled>- Platform -</option>
                  <option value="Windows">Windows</option>
                  <option value="macOS">macOS</option>
                  <option value="Linux">Linux</option>
                  <option value="Android">Android</option>
                  <option value="IOS">IOS</option>
                  <option value="Web">Web Application</option>
                </select>
              </Field>

              <Field id="inquiry-product" label="Product" required error={errors.product}>
                <select
                  id="inquiry-product"
                  onChange={handleUserDataChange}
                  name="product"
                  value={userData.product}
                  required
                  aria-invalid={errors.product ? true : undefined}
                  aria-describedby={describedBy("product")}
                  className={SELECT_CLASS}
                >
                  <option value="" disabled>- Product -</option>
                  {products.map((item: ProductItem, index: number) => (
                    <option key={index} value={item.name}>{item.name}</option>
                  ))}
                </select>
              </Field>
            </div>

            {/* Row 5: Category */}
            <Field id="inquiry-category" label="Inquiry category" required error={errors.category}>
              <select
                id="inquiry-category"
                onChange={handleUserDataChange}
                name="category"
                value={userData.category}
                required
                aria-invalid={errors.category ? true : undefined}
                aria-describedby={describedBy("category")}
                className={SELECT_CLASS}
              >
                <option value="" disabled>- Category -</option>
                <option value="Inquiry">Inquiry</option>
                <option value="Question">Question</option>
                <option value="Complaint">Complaint</option>
                <option value="Bug Report">Bug Report</option>
                <option value="Feature Request">Feature Request</option>
              </select>
            </Field>

            <button
              type="submit"
              aria-disabled={loading}
              aria-busy={loading}
              aria-describedby={submitError ? "contact-form-error" : undefined}
              className={`w-full py-4 rounded-full font-bold text-white shadow-[0_0_24px_-6px_rgba(139,92,246,0.7)] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                loading
                  ? "bg-[#7C3AED] opacity-50 cursor-not-allowed"
                  : "bg-[#7C3AED] hover:bg-[#6D28D9] group-hover:hover:bg-white group-hover:hover:text-black hover:-translate-y-0.5 active:translate-y-0 active:bg-[#5B21B6]"
              }`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {submitError && (
              <p
                id="contact-form-error"
                role="alert"
                className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300"
              >
                {submitError}
              </p>
            )}
          </form>
        ) : (
          <div
            ref={successRef}
            tabIndex={-1}
            className="py-12 text-center space-y-6 relative z-10 focus:outline-none"
            data-aos="zoom-in"
            role="status"
            aria-live="polite"
          >
            <div className="w-24 h-24 bg-green-500/15 text-green-400 rounded-full flex items-center justify-center text-5xl mx-auto border-4 border-white/20 shadow-xl">
              ✓
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white transition-colors duration-500 group-hover:text-white">Thank You!</h2>
              <p className="text-gray-400 mt-4 leading-relaxed max-w-xs mx-auto transition-colors duration-500 group-hover:text-neutral-200">
                Your message has been sent successfully. We'll get back to you within 24 hours.
              </p>
            </div>
            <button
              type="button"
              onClick={handleSendAnother}
              className="inline-flex min-h-11 items-center justify-center rounded-full px-4 text-[#8B5CF6] font-bold uppercase tracking-widest text-xs hover:text-[#A78BFA] transition-colors group-hover:text-white group-hover:hover:text-neutral-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
            >
              Send Another Inquiry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactForm;
