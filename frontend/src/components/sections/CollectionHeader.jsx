import CoverPlaceholder from '../ui/CoverPlaceholder'

/**
 * Shared hero header for albums and playlists: aurora backdrop, cover,
 * type label, title, meta and an actions row.
 * @param {object} props
 * @param {React.ReactNode} props.cover - image or placeholder
 * @param {React.ReactNode} props.meta - e.g. artist · year · 12 songs
 * @param {React.ReactNode} props.actions - play / like / more buttons
 */
export default function CollectionHeader({
  typeLabel,
  title,
  subtitle,
  coverUrl,
  meta,
  actions,
}) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/[0.06]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-accent-600/35 via-surface to-magenta-500/20"
      />
      <div
        aria-hidden="true"
        className="absolute -top-20 -right-10 h-56 w-56 rounded-full bg-accent-500/25 blur-3xl"
      />

      <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:items-end sm:p-8">
        <div className="mx-auto w-40 shrink-0 sm:mx-0 sm:w-48 lg:w-52">
          <div className="relative aspect-square overflow-hidden rounded-2xl shadow-2xl shadow-black/60 ring-1 ring-white/15">
            {coverUrl ? (
              <img
                src={coverUrl}
                alt={title ?? ''}
                className="h-full w-full object-cover"
              />
            ) : (
              <CoverPlaceholder />
            )}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-[0.25em] text-ink-300 uppercase">
            {typeLabel}
          </p>
          <h1 className="mt-2 font-display text-3xl leading-tight font-bold text-ink-0 sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 text-sm font-medium text-ink-300">{subtitle}</p>
          )}
          {meta && <div className="mt-2 text-sm text-ink-500">{meta}</div>}
          {actions && <div className="mt-6 flex items-center gap-3">{actions}</div>}
        </div>
      </div>
    </section>
  )
}
