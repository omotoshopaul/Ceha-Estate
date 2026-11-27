import { PropertyCard } from './PropertyCard';
import { PropertyCardSkeleton } from './PropertyCardSkeleton';

export function PropertyGrid({
  properties = [],
  isLoading = false,
  skeletonCount = 6,
}) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {isLoading
        ? Array.from({ length: skeletonCount }).map((_, index) => (
            <PropertyCardSkeleton key={`skeleton-${index}`} />
          ))
        : properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
    </div>
  );
}
