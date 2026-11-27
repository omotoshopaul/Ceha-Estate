import { Link } from 'react-router-dom';
import { HomeBrandIcon, ArrowRightIcon } from './Icons';

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  actionTo,
  icon: Icon = HomeBrandIcon,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-black/10 bg-white px-6 py-14 text-center sm:py-16">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-black/10 bg-[#f5f5f5] text-[#141414]">
        <Icon className="h-6 w-6" />
      </div>
      <h2 className="mt-5 text-xl font-bold tracking-tight text-[#141414] sm:text-2xl">
        {title}
      </h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-[#737373] sm:text-base">
        {description}
      </p>

      {actionLabel && actionTo ? (
        <Link
          to={actionTo}
          className="mt-7 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#141414] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-black/85 active:translate-y-0"
        >
          <span>{actionLabel}</span>
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      ) : null}

      {actionLabel && onAction && !actionTo ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-7 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#141414] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-black/85 active:translate-y-0 cursor-pointer"
        >
          <span>{actionLabel}</span>
        </button>
      ) : null}
    </div>
  );
}
