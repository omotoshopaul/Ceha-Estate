import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import { PROPERTY_TYPE_LABELS } from '../utils/constants';
import { PropertyImage } from './PropertyImage';
import { FavouriteButton } from './FavouriteButton';
import { MapPinIcon, BedIcon, BathIcon, AreaIcon, BuildingIcon } from './Icons';

export function PropertyCard({ property }) {
  const showRoomStats =
    property.propertyType === 'house' || property.propertyType === 'apartment';
  const propertyTypeLabel =
    PROPERTY_TYPE_LABELS[property.propertyType] || property.propertyType;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-black/10 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5">
      <div className="relative">
        <Link
          to={`/properties/${property.id}`}
          className="block overflow-hidden focus-visible:outline-offset-[-2px]"
          aria-label={`View details for ${property.title}`}
        >
          <PropertyImage
            src={property.images[0]}
            alt={`${property.title} in ${property.area}, ${property.city}`}
            aspectClass="aspect-[4/3]"
            imgClassName="transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        </Link>

        <div className="absolute right-3.5 top-3.5 z-10">
          <FavouriteButton
            propertyId={property.id}
            propertyTitle={property.title}
            variant="icon"
          />
        </div>
      </div>

      <Link
        to={`/properties/${property.id}`}
        className="flex flex-1 flex-col p-5 sm:p-6 min-w-0"
      >
        <div className="mb-1.5 flex items-baseline justify-between gap-3">
          <p className="text-lg font-extrabold tracking-tight text-[#141414] tabular-nums sm:text-xl">
            {formatPrice(property.price, property.listingType)}
          </p>
          <span className="text-xs font-medium text-[#737373] whitespace-nowrap shrink-0">
            {property.listingType === 'rent' ? 'For Rent' : 'For Sale'}
          </span>
        </div>

        <h3 className="text-base font-bold leading-snug text-[#141414] break-words sm:text-[17px]">
          {property.title}
        </h3>

        <p className="mt-2 flex items-center gap-1.5 text-sm text-[#737373] min-w-0">
          <MapPinIcon className="h-4 w-4 shrink-0 text-[#737373]" />
          <span className="truncate">
            {property.area}, {property.city}
          </span>
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-black/10 pt-4 text-xs font-medium text-[#525252] sm:text-sm">
          {showRoomStats ? (
            <>
              <span className="inline-flex items-center gap-1.5 tabular-nums whitespace-nowrap">
                <BedIcon className="h-4 w-4 text-[#737373]" />
                {property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}
              </span>
              <span className="h-3.5 w-px bg-black/15" aria-hidden="true" />
              <span className="inline-flex items-center gap-1.5 tabular-nums whitespace-nowrap">
                <BathIcon className="h-4 w-4 text-[#737373]" />
                {property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}
              </span>
              <span className="h-3.5 w-px bg-black/15" aria-hidden="true" />
              <span className="inline-flex items-center gap-1.5 tabular-nums whitespace-nowrap">
                <AreaIcon className="h-4 w-4 text-[#737373]" />
                {property.sizeSqm.toLocaleString()} sqm
              </span>
            </>
          ) : (
            <>
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <BuildingIcon className="h-4 w-4 text-[#737373]" />
                {propertyTypeLabel}
              </span>
              <span className="h-3.5 w-px bg-black/15" aria-hidden="true" />
              <span className="inline-flex items-center gap-1.5 tabular-nums whitespace-nowrap">
                <AreaIcon className="h-4 w-4 text-[#737373]" />
                {property.sizeSqm.toLocaleString()} sqm
              </span>
            </>
          )}
        </div>
      </Link>
    </article>
  );
}
