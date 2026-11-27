import { Link } from 'react-router-dom';
import { BRAND_NAME, CONTACT_EMAIL, WHATSAPP_URL } from '../utils/constants';
import { SectionHeading } from './SectionHeading';
import { MailIcon, ChatIcon } from './Icons';

export function Footer() {
  return (
    <footer
      id="contact"
      className="mt-20 border-t border-black/10 bg-white sm:mt-28"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            as="h2"
            darkText="Tell us what you're"
            mutedText="looking for."
            className="text-[clamp(1.85rem,4vw,3rem)]"
          />
          <p className="mt-4 text-sm leading-relaxed text-[#737373] sm:text-base">
            Have a specific neighbourhood, budget, or property type in mind? Reach
            out to our team directly and we will help you find the right match.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-full bg-[#141414] px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-black/85 active:translate-y-0 sm:w-auto whitespace-nowrap"
            >
              <MailIcon className="h-4 w-4" />
              <span>Email Us</span>
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-full border border-black/15 bg-white px-7 py-3 text-sm font-semibold text-[#141414] transition-all duration-200 hover:-translate-y-0.5 hover:border-black/35 active:translate-y-0 sm:w-auto whitespace-nowrap"
            >
              <ChatIcon className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-8 text-center text-sm text-[#737373] sm:mt-16 md:flex-row md:text-left">
          <p>© 2026 {BRAND_NAME}. All rights reserved.</p>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium"
          >
            <Link
              to="/"
              className="text-[#525252] transition-colors hover:text-[#141414]"
            >
              Home
            </Link>
            <span className="text-black/25" aria-hidden="true">
              /
            </span>
            <Link
              to="/properties"
              className="text-[#525252] transition-colors hover:text-[#141414]"
            >
              Properties
            </Link>
            <span className="text-black/25" aria-hidden="true">
              /
            </span>
            <Link
              to="/favourites"
              className="text-[#525252] transition-colors hover:text-[#141414]"
            >
              Favourites
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
