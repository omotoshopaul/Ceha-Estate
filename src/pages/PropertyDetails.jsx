import { useEffect, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { properties } from '../data/properties';
import { BRAND_NAME, PROPERTY_TYPE_LABELS } from '../utils/constants';
import { formatPrice } from '../utils/formatPrice';
import { Gallery } from '../components/Gallery';
import { FavouriteButton } from '../components/FavouriteButton';
import { ContactAgentForm } from '../components/ContactAgentForm';
import { EmptyState } from '../components/EmptyState';
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  MapPinIcon,
  BedIcon,
  BathIcon,
  AreaIcon,
  BuildingIcon,
  CheckIcon,
} from '../components/Icons';

export function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const property = useMemo(
    () => properties.find((item) => item.id === id) || null,
    [id]
  );

  useEffect(() => {
    if (property) {
      document.title = `${property.title} — ${BRAND_NAME}`;
    } else {
      document.title = `Property Not Found — ${BRAND_NAME}`;
    }

    return () => {
      document.title = `${BRAND_NAME} — Homes, Apartments & Land Across Nigeria`;
    };
  }, [property]);

  function handleBack() {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/properties');
    }
  }

  if (!property) {
    return (
      <div className="mx-auto max-w-3xl px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        <EmptyState
          title="Property not found"
          description="The listing you are looking for may have been removed or the link may be incorrect."
          actionLabel="Browse properties"
          actionTo="/properties"
        />
      </div>
    );
  }

  const showRoomStats =
    property.propertyType === 'house' || property.propertyType === 'apartment';
  const propertyTypeLabel =
    PROPERTY_TYPE_LABELS[property.propertyType] || property.propertyType;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    property.address
  )}`;

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 sm:pt-10 lg:px-8">
      {/* Back link and slash-separated breadcrumb */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-semibold text-[#141414] transition-colors hover:border-black/35 cursor-pointer"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          <span>Back</span>
        </button>

        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#737373] sm:text-sm min-w-0"
        >
          <Link
            to="/properties"
            className="transition-colors hover:text-[#141414]"
          >
            Properties
          </Link>
          <span className="text-black/25" aria-hidden="true">
            /
          </span>
          <span className="text-[#525252]">{property.area}</span>
          <span className="text-black/25" aria-hidden="true">
            /
          </span>
          <span className="truncate max-w-[200px] sm:max-w-[300px] text-[#141414] font-semibold">
            {property.title}
          </span>
        </nav>
      </div>

      {/* Main 2-column layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
        <div className="space-y-6 lg:col-span-8 min-w-0">
          <Gallery
            images={property.images}
            title={property.title}
            propertyId={property.id}
          />

          {/* Main Info */}
          <section className="rounded-3xl border border-black/10 bg-white p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#737373] sm:text-sm">
                <span>
                  {property.listingType === 'rent' ? 'For Rent' : 'For Sale'}
                </span>
                <span className="text-black/25" aria-hidden="true">
                  /
                </span>
                <span>{propertyTypeLabel}</span>
              </div>

              <FavouriteButton
                propertyId={property.id}
                propertyTitle={property.title}
                variant="pill"
              />
            </div>

            <h1 className="mt-4 text-[clamp(1.5rem,3.2vw,2.35rem)] font-extrabold leading-tight tracking-tight text-[#141414] break-words">
              {property.title}
            </h1>

            <p className="mt-2.5 flex items-center gap-1.5 text-sm text-[#737373] sm:text-base">
              <MapPinIcon className="h-4 w-4 shrink-0 text-[#737373]" />
              <span className="break-words">
                {property.area}, {property.city}
              </span>
            </p>

            <p className="mt-5 text-[clamp(1.6rem,3vw,2.25rem)] font-extrabold tracking-tight text-[#141414] tabular-nums">
              {formatPrice(property.price, property.listingType)}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-black/10 pt-6 sm:flex sm:flex-wrap sm:items-center sm:gap-6">
              {showRoomStats ? (
                <>
                  <div className="flex items-center gap-2.5">
                    <BedIcon className="h-5 w-5 text-[#737373]" />
                    <div>
                      <p className="text-sm font-bold text-[#141414] tabular-nums">
                        {property.bedrooms}
                      </p>
                      <p className="text-xs text-[#737373]">
                        {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                      </p>
                    </div>
                  </div>

                  <span
                    className="hidden h-8 w-px bg-black/10 sm:inline-block"
                    aria-hidden="true"
                  />

                  <div className="flex items-center gap-2.5">
                    <BathIcon className="h-5 w-5 text-[#737373]" />
                    <div>
                      <p className="text-sm font-bold text-[#141414] tabular-nums">
                        {property.bathrooms}
                      </p>
                      <p className="text-xs text-[#737373]">
                        {property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}
                      </p>
                    </div>
                  </div>

                  <span
                    className="hidden h-8 w-px bg-black/10 sm:inline-block"
                    aria-hidden="true"
                  />
                </>
              ) : null}

              <div className="flex items-center gap-2.5">
                <AreaIcon className="h-5 w-5 text-[#737373]" />
                <div>
                  <p className="text-sm font-bold text-[#141414] tabular-nums">
                    {property.sizeSqm.toLocaleString()} sqm
                  </p>
                  <p className="text-xs text-[#737373]">Floor / Plot Area</p>
                </div>
              </div>

              <span
                className="hidden h-8 w-px bg-black/10 sm:inline-block"
                aria-hidden="true"
              />

              <div className="flex items-center gap-2.5">
                <BuildingIcon className="h-5 w-5 text-[#737373]" />
                <div>
                  <p className="text-sm font-bold text-[#141414]">
                    {propertyTypeLabel}
                  </p>
                  <p className="text-xs text-[#737373]">Property Type</p>
                </div>
              </div>
            </div>
          </section>

          {/* Description & Features */}
          <section className="rounded-3xl border border-black/10 bg-white p-6 sm:p-8">
            <h2 className="text-lg font-extrabold tracking-tight text-[#141414] sm:text-xl">
              About this property
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#525252] sm:text-base">
              {property.description}
            </p>

            {property.features && property.features.length > 0 ? (
              <div className="mt-8 border-t border-black/10 pt-7">
                <h2 className="text-lg font-extrabold tracking-tight text-[#141414] sm:text-xl">
                  Key features
                </h2>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {property.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-[#141414]"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-black/15 bg-[#f5f5f5] text-[#141414]">
                        <CheckIcon className="h-3.5 w-3.5" />
                      </span>
                      <span className="break-words">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>

          {/* Location Block */}
          <section className="rounded-3xl border border-black/10 bg-white p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <h2 className="text-lg font-extrabold tracking-tight text-[#141414] sm:text-xl">
                  Location
                </h2>
                <p className="mt-2 flex items-start gap-2 text-sm text-[#525252] sm:text-base">
                  <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#737373]" />
                  <span className="break-words">{property.address}</span>
                </p>
              </div>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 self-start rounded-full border border-black/15 bg-white px-5 py-2.5 text-sm font-semibold text-[#141414] transition-all duration-200 hover:-translate-y-0.5 hover:border-black/35 active:translate-y-0 sm:self-center whitespace-nowrap shrink-0"
              >
                <span>View on Google Maps</span>
                <ArrowUpRightIcon className="h-4 w-4" />
              </a>
            </div>
          </section>
        </div>

        {/* Sticky Contact Agent Form */}
        <div className="lg:col-span-4 min-w-0">
          <ContactAgentForm property={property} />
        </div>
      </div>
    </div>
  );
}
