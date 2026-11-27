import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { properties, SITE_IMAGES } from '../data/properties';
import { BRAND_NAME } from '../utils/constants';
import { SectionHeading } from '../components/SectionHeading';
import { PropertyImage } from '../components/PropertyImage';
import { HeroSearch } from '../components/HeroSearch';
import { PropertyGrid } from '../components/PropertyGrid';
import { StatsRow } from '../components/StatsRow';
import { ArrowRightIcon } from '../components/Icons';

export function Home() {
  useEffect(() => {
    document.title = `${BRAND_NAME} — Homes, Apartments & Land Across Nigeria`;
  }, []);

  const featuredProperties = useMemo(
    () => properties.filter((property) => property.featured).slice(0, 6),
    []
  );

  return (
    <div className="space-y-20 pt-8 sm:space-y-28 sm:pt-12">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            as="h1"
            darkText="Live where you've always"
            mutedText="dreamed of living."
            className="text-[clamp(2.2rem,5.5vw,4.25rem)]"
          />
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#737373] sm:mt-5 sm:text-lg">
            Find your perfect home in a place that inspires you every single
            day.
          </p>
        </div>

        <div className="mt-8 sm:mt-10">
          <div className="overflow-hidden rounded-[28px] border border-black/10 bg-white sm:rounded-[32px]">
            <PropertyImage
              src={SITE_IMAGES.hero}
              alt="Modern architectural residence with clean facade and landscaped courtyard"
              aspectClass="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/10]"
              loading="eager"
            />
          </div>

          <HeroSearch />
        </div>
      </section>

      {/* Featured Properties */}
      <section
        aria-labelledby="featured-heading"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionHeading
              as="h2"
              id="featured-heading"
              darkText="Featured"
              mutedText="properties."
              className="text-[clamp(1.75rem,3.6vw,2.75rem)]"
            />
            <p className="mt-2 max-w-lg text-sm text-[#737373] sm:text-base">
              Handpicked residences across Lagos, Abuja, and Port Harcourt ready
              for immediate viewing.
            </p>
          </div>

          <Link
            to="/properties"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 self-start rounded-full border border-black/15 bg-white px-5 py-2.5 text-sm font-semibold text-[#141414] transition-all duration-200 hover:-translate-y-0.5 hover:border-black/35 active:translate-y-0 sm:self-auto whitespace-nowrap"
          >
            <span>View all properties</span>
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <PropertyGrid properties={featuredProperties} />
      </section>

      {/* About Section */}
      <section
        aria-labelledby="about-heading"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="rounded-3xl border border-black/10 bg-white p-6 sm:p-10 lg:p-14">
          <span className="inline-block rounded-full border border-black/15 bg-[#f5f5f5] px-4 py-1.5 text-xs font-semibold text-[#141414]">
            About Us
          </span>

          <h2
            id="about-heading"
            className="mt-6 max-w-4xl text-[clamp(1.5rem,3.2vw,2.5rem)] font-extrabold leading-[1.2] tracking-tight text-balance"
          >
            <span className="text-[#141414]">
              We are a modern real estate platform built to help people find
              homes and spaces where they truly belong,
            </span>{' '}
            <span className="text-[#737373]">
              bringing verified listings, transparent pricing, and trusted local
              agents together in one calm experience.
            </span>
          </h2>

          <div className="mt-10 grid grid-cols-1 items-center gap-6 lg:mt-12 lg:grid-cols-12 lg:gap-8">
            <div className="overflow-hidden rounded-3xl border border-black/10 lg:col-span-5">
              <PropertyImage
                src={SITE_IMAGES.aboutPrimary}
                alt="Contemporary white architectural home exterior"
                aspectClass="aspect-[4/3]"
              />
            </div>

            <div className="flex flex-col justify-center space-y-6 lg:col-span-4 lg:px-2">
              <p className="text-sm leading-relaxed text-[#525252] sm:text-base">
                Whether you are buying a family duplex in Lekki, leasing an
                executive apartment in Victoria Island, or securing titled land
                in Abuja or Port Harcourt, every listing on {BRAND_NAME} is
                reviewed for clarity before it appears.
              </p>

              <div>
                <Link
                  to="/properties"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#141414] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-black/85 active:translate-y-0 whitespace-nowrap"
                >
                  <span>Browse Properties</span>
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-black/10 lg:col-span-3">
              <PropertyImage
                src={SITE_IMAGES.aboutSecondary}
                alt="Sunlit minimalist residential interior"
                aspectClass="aspect-[4/3] lg:aspect-[3/4]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <StatsRow />
    </div>
  );
}
