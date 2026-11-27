import { useFavourites } from '../hooks/useFavourites';
import { HeartIcon } from './Icons';

export function FavouriteButton({
  propertyId,
  propertyTitle = 'property',
  variant = 'icon',
  className = '',
}) {
  const { isFavourite, toggleFavourite } = useFavourites();
  const saved = isFavourite(propertyId);

  function handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    toggleFavourite(propertyId);
  }

  if (variant === 'pill') {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={saved}
        aria-label={
          saved
            ? `Remove ${propertyTitle} from favourites`
            : `Save ${propertyTitle} to favourites`
        }
        className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap shrink-0 cursor-pointer ${
          saved
            ? 'border-[#141414] bg-[#141414] text-white hover:bg-black/85'
            : 'border-black/15 bg-white text-[#141414] hover:border-black/35'
        } ${className}`}
      >
        <HeartIcon className="h-4 w-4" filled={saved} />
        <span>{saved ? 'Saved' : 'Save'}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={saved}
      aria-label={
        saved
          ? `Remove ${propertyTitle} from favourites`
          : `Save ${propertyTitle} to favourites`
      }
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/95 text-[#141414] shadow-sm transition-all duration-200 hover:scale-105 hover:bg-white active:scale-95 cursor-pointer ${className}`}
    >
      <HeartIcon className="h-5 w-5" filled={saved} />
    </button>
  );
}
