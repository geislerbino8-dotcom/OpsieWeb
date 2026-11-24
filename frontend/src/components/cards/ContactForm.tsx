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

// Figma redesign: light "control panel" surface, navy ink, teal accent.
// Field fill #F4F7F9 with #5B6B7A placeholder = 5.09:1; the teal focus ring
// #0E7490 is 5.36:1 on white, well above the 3:1 non-text bar.
const FIELD_BASE =
  "w-full rounded-xl border border-[#C9D5DE] bg-[#F4F7F9] px-4 py-3 text-[#0B1622] placeholder:text-[#5B6B7A] transition-all duration-300 focus:border-[#0E7490] focus:outline-none focus:ring-2 focus:ring-[#0E7490] aria-invalid:border-[#B91C1C] aria-invalid:focus:ring-[#B91C1C]";

const INPUT_CLASS = FIELD_BASE;

const SELECT_CLASS = FIELD_BASE;

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
    <div className="min-w-0 space-y-2">
      <label
        htmlFor={id}
        className="font-mono-label block text-[11px] font-medium uppercase tracking-[0.14em] text-[#475569]"
      >
        {label}
        {required && (
          <span aria-hidden="true" className="ml-0.5 text-[#B91C1C]">
            *
          </span>
        )}
        {optional && (
          <span className="font-normal text-[#5B6B7A]">
            {" (optional)"}
          </span>
        )}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          className="text-sm font-medium text-[#B91C1C]"
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
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
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
      setHasAttemptedSubmit(true);
      const firstInvalid = REQUIRED_FIELDS.find((field) => nextErrors[field]);
      formRef.current
        ?.querySelector<HTMLElement>(`#inquiry-${firstInvalid}`)
        ?.focus();
      return;
    }

    setErrors({});
    setHasAttemptedSubmit(false);
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

  // After a failed submit, re-check a field when the user leaves it so the
  // error clears (or updates) without waiting for another submit.
  const handleFieldBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!hasAttemptedSubmit) {
      return;
    }

    const field = e.target.name as FieldName;
    const nextErrors = validate(userData);

    setErrors((prev) => {
      const next = { ...prev };

      if (nextErrors[field]) {
        next[field] = nextErrors[field];
      } else {
        delete next[field];
      }

      return next;
    });
  };

  const handleSendAnother = () => {
    setTransSucc(false);
    setSubmitError(null);
    setErrors({});
    setHasAttemptedSubmit(false);
    setTimeout(() => nameInputRef.current?.focus(), 0);
  };

  const describedBy = (field: FieldName) =>
    errors[field] ? `inquiry-${field}-error` : undefined;

  const hasFieldErrors = Object.keys(errors).length > 0;

  return (
    <div className="flex justify-center relative" data-aos="fade-up">
      {/*
        Main card: light "mission control" panel from the Figma redesign —
        white surface, blueprint grid, teal corner brackets, navy ink.
      */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[#0B1622]/10 bg-white p-6 shadow-[0_24px_60px_-28px_rgba(11,22,34,0.35)] transition-all duration-500 hover:-translate-y-1 hover:border-[#3CBDE6]/60 hover:shadow-[0_32px_70px_-28px_rgba(60,189,230,0.45)] md:p-10">

        {/* Blueprint grid, faded out toward the middle of the card */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(11, 22, 34, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(11, 22, 34, 0.05) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse at top, black 0%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at top, black 0%, transparent 80%)",
          }}
        />

        {/* Corner brackets */}
        <span aria-hidden="true" className="pointer-events-none absolute left-3 top-3 z-10 h-4 w-4 border-l-2 border-t-2 border-[#3CBDE6]" />
        <span aria-hidden="true" className="pointer-events-none absolute right-3 top-3 z-10 h-4 w-4 border-r-2 border-t-2 border-[#3CBDE6]" />
        <span aria-hidden="true" className="pointer-events-none absolute bottom-3 left-3 z-10 h-4 w-4 border-b-2 border-l-2 border-[#3CBDE6]" />
        <span aria-hidden="true" className="pointer-events-none absolute bottom-3 right-3 z-10 h-4 w-4 border-b-2 border-r-2 border-[#3CBDE6]" />

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
              <div className="mb-5 flex items-center justify-between gap-3">
                <p className="font-mono-label flex items-center gap-2 text-[9px] uppercase tracking-[0.14em] text-[#0E7490] sm:text-[10px]">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#3CBDE6]" />
                  Opsie Control // Inquiry
                </p>
                <span aria-hidden="true" className="font-mono-label hidden text-[10px] uppercase tracking-[0.14em] text-[#64748B] sm:inline">
                  Form / 01
                </span>
              </div>
              {/* h2 matches the section-level headings used by the FAQ
                  (SuperHeader), so the page outline stays h1 -> h2 and the
                  card title never skips a level on either host page. */}
              <h2 id="contact-form-title" className="text-3xl font-bold text-[#0B1622] tracking-tight">
                Not sure where to start?
              </h2>
              <p className="text-sm text-[#475569] mt-2">
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
                  onBlur={handleFieldBlur}
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={userData.name}
                  placeholder="e.g. Juan Dela Cruz"
                  required
                  aria-required="true"
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={describedBy("name")}
                  className={INPUT_CLASS}
                />
              </Field>
              <Field id="inquiry-email" label="Email address" required error={errors.email}>
                <input
                  id="inquiry-email"
                  onChange={handleUserDataChange}
                  onBlur={handleFieldBlur}
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={userData.email}
                  placeholder="you@email.com"
                  required
                  aria-required="true"
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
                  onBlur={handleFieldBlur}
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
                  onBlur={handleFieldBlur}
                  type="text"
                  name="address"
                  autoComplete="street-address"
                  value={userData.address}
                  placeholder="Street, city"
                  className={INPUT_CLASS}
                />
              </Field>
            </div>

            {/* Row 3: Message */}
            <Field id="inquiry-description" label="Project or inquiry details" required error={errors.description}>
              <textarea
                id="inquiry-description"
                onChange={handleUserDataChange}
                onBlur={handleFieldBlur}
                name="description"
                value={userData.description}
                placeholder="Tell us about your project or inquiry"
                required
                aria-required="true"
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
                  onBlur={handleFieldBlur}
                  name="platform"
                  value={userData.platform}
                  required
                  aria-required="true"
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
                  onBlur={handleFieldBlur}
                  name="product"
                  value={userData.product}
                  required
                  aria-required="true"
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
                onBlur={handleFieldBlur}
                name="category"
                value={userData.category}
                required
                aria-required="true"
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
              className={`w-full rounded-full py-4 text-sm font-bold uppercase tracking-[0.12em] text-[#06212E] shadow-[0_14px_34px_-14px_rgba(60,189,230,0.9)] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B1622] ${
                loading
                  ? "cursor-not-allowed bg-[#3CBDE6] opacity-50"
                  : "bg-[#3CBDE6] hover:-translate-y-0.5 hover:bg-[#29A6CC] active:translate-y-0 active:bg-[#1F93B5]"
              }`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {submitError && (
              <p
                id="contact-form-error"
                role="alert"
                className="rounded-xl border border-[#B91C1C]/30 bg-[#B91C1C]/5 px-4 py-3 text-sm font-medium text-[#B91C1C]"
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
            <div className="w-24 h-24 bg-[#3CBDE6]/15 text-[#0E7490] rounded-full flex items-center justify-center text-5xl mx-auto border-4 border-[#3CBDE6]/30 shadow-xl">
              ✓
            </div>
            <div>
              <p className="font-mono-label mb-3 text-[10px] uppercase tracking-[0.18em] text-[#0E7490]">
                Transmission complete
              </p>
              <h2 className="text-3xl font-bold text-[#0B1622]">Thank You!</h2>
              <p className="text-[#475569] mt-4 leading-relaxed max-w-xs mx-auto">
                Your message has been sent successfully. We'll get back to you within 24 hours.
              </p>
            </div>
            <button
              type="button"
              onClick={handleSendAnother}
              className="inline-flex min-h-11 items-center justify-center rounded-full px-4 text-[#0E7490] font-bold uppercase tracking-widest text-xs hover:text-[#0B5E73] active:opacity-70 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E7490]"
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
