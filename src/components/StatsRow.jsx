import { SITE_STATS } from '../utils/constants';

export function StatsRow() {
  return (
    <section
      aria-label="Platform highlights"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <div className="rounded-3xl border border-black/10 bg-white px-6 py-10 sm:px-8 sm:py-12">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 md:gap-0 md:divide-x md:divide-black/10">
          {SITE_STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center md:px-6"
            >
              <dt className="order-2 mt-2 text-xs font-medium text-[#737373] sm:text-sm">
                {stat.label}
              </dt>
              <dd className="order-1 text-[clamp(1.75rem,3.4vw,2.75rem)] font-extrabold leading-none tracking-tight text-[#141414] tabular-nums">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
