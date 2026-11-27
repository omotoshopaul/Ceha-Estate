import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BRAND_NAME } from '../utils/constants';
import { SectionHeading } from '../components/SectionHeading';
import { ArrowRightIcon } from '../components/Icons';

export function NotFound() {
  useEffect(() => {
    document.title = `Page Not Found — ${BRAND_NAME}`;
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 sm:py-24">
      <div className="rounded-3xl border border-black/10 bg-white px-6 py-14 sm:px-10 sm:py-16">
        <p className="text-xs font-bold tracking-widest text-[#737373] tabular-nums">
          404
        </p>
        <SectionHeading
          as="h1"
          darkText="This page could"
          mutedText="not be found."
          className="mt-3 text-[clamp(1.85rem,4vw,2.75rem)]"
        />
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#737373] sm:text-base">
          The page you are looking for might have moved or does not exist.
          Return home or browse all available listings.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#141414] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-black/85 sm:w-auto"
          >
            <span>Back to Home</span>
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <Link
            to="/properties"
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full border border-black/15 bg-white px-6 py-3 text-sm font-semibold text-[#141414] transition-all duration-200 hover:-translate-y-0.5 hover:border-black/35 sm:w-auto"
          >
            Browse Properties
          </Link>
        </div>
      </div>
    </div>
  );
}
