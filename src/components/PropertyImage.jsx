import { useState, useEffect } from 'react';
import { HomeBrandIcon } from './Icons';

export function PropertyImage({
  src,
  alt,
  aspectClass = 'aspect-[4/3]',
  className = '',
  imgClassName = '',
  loading = 'lazy',
}) {
  const [hasError, setHasError] = useState(!src);

  useEffect(() => {
    setHasError(!src);
  }, [src]);

  return (
    <div
      className={`relative w-full overflow-hidden bg-[#eaeaea] ${aspectClass} ${className}`}
    >
      {hasError ? (
        <div
          role="img"
          aria-label={alt || 'Property image unavailable'}
          className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#eaeaea] text-[#737373]"
        >
          <HomeBrandIcon className="h-9 w-9 text-[#737373]" />
          <span className="text-xs font-medium">Photo unavailable</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={loading}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      )}
    </div>
  );
}
