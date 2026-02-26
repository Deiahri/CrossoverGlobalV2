import { getSupporters } from "../lib/api";

const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";

export default async function SponsorStrip() {
  const supporters = await getSupporters();

  if (supporters.length === 0) return null;

  return (
    <section
      className="border-y border-border bg-surface-raised py-10"
      aria-label="Our supporters"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-muted-fg">
          Supported By
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {supporters.map((s) => (
            <a
              key={s.title}
              href={s.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-52 flex-col items-center gap-3 rounded-xl border border-transparent px-5 py-4 text-center transition-[border-color,background-color,box-shadow] hover:border-border hover:bg-surface hover:shadow-sm"
              style={{ transitionDuration: 'var(--duration-fast)' }}
            >
              <div className="relative h-24 w-full overflow-hidden rounded-md">
                <img
                  src={`${STRAPI_URL}${s.img.url}`}
                  alt={s.img.alternativeText ?? s.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-foreground">
                  {s.title}
                </span>
                <span className="text-xs leading-relaxed text-muted-fg">
                  {s.description}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
