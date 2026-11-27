import { useState, useEffect, useCallback } from 'react';
import { PropertyImage } from './PropertyImage';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

export function Gallery({ images = [], title = 'Property', propertyId }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = images.length;

  useEffect(() => {
    setActiveIndex(0);
  }, [propertyId]);

  const goPrevious = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  const goNext = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  }, [total]);

  function handleKeyDown(event) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goPrevious();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goNext();
    }
  }

  const currentSrc = images[activeIndex] || '';

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${title} photo gallery`}
      className="rounded-3xl focus-visible:outline-offset-4"
    >
      <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white">
        <PropertyImage
          src={currentSrc}
          alt={`${title} — photo ${activeIndex + 1} of ${Math.max(total, 1)}`}
          aspectClass="aspect-[4/3] sm:aspect-[16/10]"
          loading="eager"
        />

        {total > 1 ? (
          <>
            <button
              type="button"
              onClick={goPrevious}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/95 text-[#141414] shadow-sm transition-all duration-150 hover:bg-white active:scale-95 sm:left-4 cursor-pointer"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/95 text-[#141414] shadow-sm transition-all duration-150 hover:bg-white active:scale-95 sm:right-4 cursor-pointer"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </>
        ) : null}

        {total > 0 ? (
          <div
            aria-live="polite"
            className="absolute bottom-3.5 right-3.5 rounded-full bg-[#141414]/85 px-3.5 py-1.5 text-xs font-semibold text-white tabular-nums backdrop-blur-sm sm:bottom-4 sm:right-4"
          >
            {activeIndex + 1} / {total}
          </div>
        ) : null}
      </div>

      {total > 1 ? (
        <div
          aria-label="Gallery thumbnails"
          className="mt-3.5 flex gap-3 overflow-x-auto pb-1.5"
        >
          {images.map((imageUrl, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={`${propertyId}-thumb-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`View photo ${index + 1} of ${total}`}
                aria-current={isActive ? 'true' : undefined}
                className={`relative w-24 shrink-0 overflow-hidden rounded-2xl border-2 transition-all duration-150 sm:w-28 cursor-pointer ${
                  isActive
                    ? 'border-[#141414] opacity-100'
                    : 'border-transparent opacity-65 hover:opacity-100'
                }`}
              >
                <PropertyImage
                  src={imageUrl}
                  alt={`${title} thumbnail ${index + 1}`}
                  aspectClass="aspect-[4/3]"
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
