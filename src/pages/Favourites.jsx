import { useState, useEffect } from 'react';
import { BRAND_NAME } from '../utils/constants';
import { useFavourites } from '../hooks/useFavourites';
import { SectionHeading } from '../components/SectionHeading';
import { PropertyGrid } from '../components/PropertyGrid';
import { EmptyState } from '../components/EmptyState';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { HeartIcon } from '../components/Icons';

export function Favourites() {
  const { favouriteProperties, count, clearFavourites } = useFavourites();
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    document.title = `Saved Properties — ${BRAND_NAME}`;
  }, []);

  function handleConfirmClear() {
    clearFavourites();
    setConfirmOpen(false);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-12 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <SectionHeading
            as="h1"
            darkText="Saved"
            mutedText="properties."
            className="text-[clamp(1.85rem,4vw,3rem)]"
          />
          <p className="mt-2 text-sm text-[#737373] tabular-nums sm:text-base">
            {count === 0
              ? 'Properties you save while browsing will appear here.'
              : `${count} saved ${count === 1 ? 'property' : 'properties'}`}
          </p>
        </div>

        {count > 0 ? (
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="inline-flex min-h-[44px] items-center self-start text-sm font-semibold text-[#737373] underline underline-offset-4 transition-colors hover:text-[#141414] sm:self-auto cursor-pointer"
          >
            Clear all
          </button>
        ) : null}
      </div>

      {count === 0 ? (
        <EmptyState
          icon={HeartIcon}
          title="No saved properties yet"
          description="Tap the heart icon on any listing to save it here for quick comparison later."
          actionLabel="Browse Properties"
          actionTo="/properties"
        />
      ) : (
        <PropertyGrid properties={favouriteProperties} />
      )}

      <ConfirmDialog
        isOpen={confirmOpen}
        title="Clear all saved properties?"
        message="This will remove all saved listings from your favourites on this device."
        confirmLabel="Clear all"
        cancelLabel="Cancel"
        onConfirm={handleConfirmClear}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
