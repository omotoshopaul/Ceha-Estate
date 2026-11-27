import { useState, useEffect, useMemo } from 'react';
import { CONTACT_EMAIL } from '../utils/constants';
import { formatPrice } from '../utils/formatPrice';
import {
  validateContactField,
  validateContactForm,
  hasValidationErrors,
} from '../utils/validators';
import {
  PhoneIcon,
  MailIcon,
  ArrowRightIcon,
  AlertCircleIcon,
  CheckIcon,
} from './Icons';

function buildInitialValues(defaultMessage) {
  return {
    name: '',
    email: '',
    phone: '',
    message: defaultMessage,
  };
}

export function ContactAgentForm({ property }) {
  const formattedPrice = useMemo(
    () => formatPrice(property.price, property.listingType),
    [property.price, property.listingType]
  );

  const defaultMessage = useMemo(
    () =>
      `Hello, I'm interested in ${property.title} (${formattedPrice}). Please share more details.`,
    [property.title, formattedPrice]
  );

  const [values, setValues] = useState(() => buildInitialValues(defaultMessage));
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
  });
  const [submittedMailto, setSubmittedMailto] = useState('');

  useEffect(() => {
    setValues(buildInitialValues(defaultMessage));
    setErrors({ name: '', email: '', phone: '', message: '' });
    setTouched({ name: false, email: false, phone: false, message: false });
    setSubmittedMailto('');
  }, [property.id, defaultMessage]);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));

    if (touched[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: validateContactField(name, value),
      }));
    }
  }

  function handleBlur(event) {
    const { name, value } = event.target;
    setTouched((previous) => ({ ...previous, [name]: true }));
    setErrors((previous) => ({
      ...previous,
      [name]: validateContactField(name, value),
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, phone: true, message: true });

    if (hasValidationErrors(nextErrors)) {
      return;
    }

    const subject = `Enquiry: ${property.title} (${property.area}, ${property.city})`;
    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
    const bodyLines = [
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      `Phone: ${values.phone.trim()}`,
      '',
      `Message:`,
      values.message.trim(),
      '',
      `Property: ${property.title}`,
      `Price: ${formattedPrice}`,
      `Listing URL: ${pageUrl}`,
    ];

    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyLines.join('\r\n'))}`;

    setSubmittedMailto(mailtoUrl);
    window.location.href = mailtoUrl;
  }

  function handleResetForm() {
    setValues(buildInitialValues(defaultMessage));
    setErrors({ name: '', email: '', phone: '', message: '' });
    setTouched({ name: false, email: false, phone: false, message: false });
    setSubmittedMailto('');
  }

  return (
    <aside
      aria-label="Contact agent"
      className="rounded-3xl border border-black/10 bg-white p-6 sm:p-7 lg:sticky lg:top-24"
    >
      <div className="border-b border-black/10 pb-5">
        <p className="text-xs font-semibold text-[#737373]">Listing Agent</p>
        <h2 className="mt-1 text-xl font-extrabold tracking-tight text-[#141414]">
          {property.agent.name}
        </h2>
        <p className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-[#525252] tabular-nums">
          <PhoneIcon className="h-4 w-4 text-[#737373]" />
          <span>{property.agent.phone}</span>
        </p>
      </div>

      <div aria-live="polite" className="mt-5">
        {submittedMailto ? (
          <div className="rounded-2xl border border-black/15 bg-[#f5f5f5] p-5">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#141414] text-white">
                <CheckIcon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-[#141414]">
                  Ready in your email app
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#525252] break-words">
                  Your email app should open with your message ready to send. If
                  nothing opens, email us directly at{' '}
                  <a
                    href={submittedMailto}
                    className="font-semibold text-[#141414] underline underline-offset-4 hover:opacity-75"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-2.5">
              <a
                href={submittedMailto}
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-[#141414] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-black/85"
              >
                <MailIcon className="h-4 w-4" />
                <span>Open email app again</span>
              </a>
              <button
                type="button"
                onClick={handleResetForm}
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-black/15 bg-white px-5 py-2.5 text-sm font-semibold text-[#141414] transition-colors hover:border-black/35 cursor-pointer"
              >
                Send another message
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label
                htmlFor="contact-name"
                className="mb-1.5 block text-xs font-semibold text-[#141414]"
              >
                Full name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                placeholder="Your full name"
                className={`h-12 w-full rounded-2xl border bg-[#f5f5f5] px-4 text-sm text-[#141414] placeholder:text-[#737373] transition-colors focus:bg-white ${
                  errors.name ? 'border-[#141414]' : 'border-black/10'
                }`}
              />
              {errors.name ? (
                <p
                  id="contact-name-error"
                  className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#141414]"
                >
                  <AlertCircleIcon className="h-3.5 w-3.5 shrink-0" />
                  <span>{errors.name}</span>
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="mb-1.5 block text-xs font-semibold text-[#141414]"
              >
                Email address
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? 'contact-email-error' : undefined
                }
                placeholder="you@example.com"
                className={`h-12 w-full rounded-2xl border bg-[#f5f5f5] px-4 text-sm text-[#141414] placeholder:text-[#737373] transition-colors focus:bg-white ${
                  errors.email ? 'border-[#141414]' : 'border-black/10'
                }`}
              />
              {errors.email ? (
                <p
                  id="contact-email-error"
                  className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#141414]"
                >
                  <AlertCircleIcon className="h-3.5 w-3.5 shrink-0" />
                  <span>{errors.email}</span>
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="contact-phone"
                className="mb-1.5 block text-xs font-semibold text-[#141414]"
              >
                Phone number
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={
                  errors.phone ? 'contact-phone-error' : undefined
                }
                placeholder="+234 800 000 0000"
                className={`h-12 w-full rounded-2xl border bg-[#f5f5f5] px-4 text-sm text-[#141414] placeholder:text-[#737373] transition-colors focus:bg-white ${
                  errors.phone ? 'border-[#141414]' : 'border-black/10'
                }`}
              />
              {errors.phone ? (
                <p
                  id="contact-phone-error"
                  className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#141414]"
                >
                  <AlertCircleIcon className="h-3.5 w-3.5 shrink-0" />
                  <span>{errors.phone}</span>
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-1.5 block text-xs font-semibold text-[#141414]"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message ? 'contact-message-error' : undefined
                }
                className={`w-full resize-y rounded-2xl border bg-[#f5f5f5] px-4 py-3 text-sm leading-relaxed text-[#141414] placeholder:text-[#737373] transition-colors focus:bg-white ${
                  errors.message ? 'border-[#141414]' : 'border-black/10'
                }`}
              />
              {errors.message ? (
                <p
                  id="contact-message-error"
                  className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#141414]"
                >
                  <AlertCircleIcon className="h-3.5 w-3.5 shrink-0" />
                  <span>{errors.message}</span>
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#141414] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-black/85 active:translate-y-0 cursor-pointer"
            >
              <span>Send enquiry</span>
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </form>
        )}
      </div>
    </aside>
  );
}
