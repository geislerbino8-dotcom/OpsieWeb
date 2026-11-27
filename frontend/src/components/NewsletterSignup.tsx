import { useState, type FormEvent } from 'react';
import { subscribeNewsletter } from '@/api/subscribeNewsletter';

interface NewsletterSignupProps {
  compact?: boolean;
  showName?: boolean;
  className?: string;
}

const NewsletterSignup = ({
  compact = false,
  showName = false,
  className = '',
}: NewsletterSignupProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const result = await subscribeNewsletter({
        email,
        ...(showName ? { name } : {}),
      });
      setSuccess(true);
      setMessage(result.message);
      setEmail('');
      setName('');
    } catch (error) {
      const responseMessage =
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof error.response === 'object' &&
        error.response !== null &&
        'data' in error.response &&
        typeof error.response.data === 'object' &&
        error.response.data !== null &&
        'message' in error.response.data &&
        typeof error.response.data.message === 'string'
          ? error.response.data.message
          : 'We could not complete your subscription. Please try again.';
      setMessage(responseMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className={`w-full ${compact ? '' : 'mailchimp-inspired-card p-5 md:p-6'} ${className}`}
      data-newsletter-design="original-editorial"
      aria-labelledby="newsletter-title"
    >
      <h3
        id="newsletter-title"
        className={`text-lg font-bold ${compact ? 'text-white' : 'text-[#241c15]'}`}
      >
        Get Opsie updates
      </h3>
      <p className={`mt-1 mb-4 text-sm ${compact ? 'text-gray-300' : 'text-[#5f554a]'}`}>
        Product news, updates, and practical insights.
      </p>

      {success ? (
        <p className="rounded-xl border border-green-400/20 bg-green-400/10 px-4 py-3 text-sm text-green-300" role="status">
          {message}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          {showName && (
            <label className="block">
              <span className="sr-only">Name</span>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Name (optional)"
                maxLength={100}
                className="mailchimp-inspired-input w-full px-4 py-3 placeholder-[#756b60]"
              />
            </label>
          )}
          <label className="block">
            <span className="sr-only">Email address</span>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email address"
              required
              autoComplete="email"
              className="mailchimp-inspired-input w-full px-4 py-3 placeholder-[#756b60]"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="mailchimp-inspired-button w-full px-5 py-3 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
          {message && (
            <p className="text-sm text-red-300" role="alert">
              {message}
            </p>
          )}
        </form>
      )}
    </section>
  );
};

export default NewsletterSignup;
