import { AlertCircleIcon } from './Icons';

export function ErrorMessage({
  title = 'Something went wrong',
  message = 'We could not load the listings right now. Please try again.',
  onRetry,
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center rounded-3xl border border-black/15 bg-white px-6 py-12 text-center"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-[#f5f5f5] text-[#141414]">
        <AlertCircleIcon className="h-6 w-6" />
      </div>
      <h2 className="mt-4 text-lg font-bold text-[#141414] sm:text-xl">
        {title}
      </h2>
      <p className="mt-2 max-w-md text-sm text-[#737373]">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#141414] px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-black/85 active:translate-y-0 cursor-pointer"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}
