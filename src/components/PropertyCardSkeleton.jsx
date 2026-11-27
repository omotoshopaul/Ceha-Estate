export function PropertyCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex flex-col overflow-hidden rounded-3xl border border-black/10 bg-white"
    >
      <div className="skeleton-surface aspect-[4/3] w-full" />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="skeleton-surface h-6 w-36 rounded-lg" />
          <div className="skeleton-surface h-4 w-14 rounded-md" />
        </div>
        <div className="skeleton-surface mt-3 h-5 w-4/5 rounded-lg" />
        <div className="skeleton-surface mt-2.5 h-4 w-2/5 rounded-md" />
        <div className="mt-5 flex items-center gap-4 border-t border-black/10 pt-4">
          <div className="skeleton-surface h-4 w-16 rounded-md" />
          <div className="skeleton-surface h-4 w-16 rounded-md" />
          <div className="skeleton-surface h-4 w-20 rounded-md" />
        </div>
      </div>
    </div>
  );
}
