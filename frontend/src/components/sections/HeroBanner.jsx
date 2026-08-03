import { RiArrowRightUpLine, RiMusic2Line } from 'react-icons/ri'
import PlayButton from '../ui/PlayButton'
import CoverPlaceholder from '../ui/CoverPlaceholder'

/**
 * Featured spotlight panel with a soft aurora backdrop and glass card.
 * @param {object} props
 * @param {object} props.feature - { title, subtitle, coverUrl }
 */
export default function HeroBanner({
  feature,
  playing = false,
  onPlay,
  onSelect,
}) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10">
      {/* Aurora backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-accent-600/50 via-magenta-500/30 to-teal-glow/20"
      />
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-16 h-64 w-64 rounded-full bg-accent-500/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-magenta-500/30 blur-3xl"
      />

      <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8 lg:p-10">
        <div className="min-w-0 flex-1">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold tracking-widest text-white uppercase backdrop-blur">
            <RiMusic2Line aria-hidden="true" className="text-accent-300" />
            Featured
          </span>
          <h1 className="mt-4 font-display text-3xl leading-tight font-bold text-white sm:text-4xl lg:text-5xl">
            {feature?.title}
          </h1>
          <p className="mt-3 max-w-md text-sm text-white/70 sm:text-base">
            {feature?.subtitle}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <PlayButton playing={playing} size="lg" onClick={onPlay} />
            <button
              type="button"
              onClick={onSelect}
              className="focus-ring inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-white/80 transition-colors duration-200 hover:text-white"
            >
              Explore
              <RiArrowRightUpLine aria-hidden="true" className="text-base" />
            </button>
          </div>
        </div>

        <div className="mx-auto w-40 shrink-0 sm:w-48 lg:w-56">
          <div className="relative aspect-square overflow-hidden rounded-2xl shadow-2xl shadow-black/60 ring-1 ring-white/20">
            {feature?.coverUrl ? (
              <img
                src={feature.coverUrl}
                alt={feature?.title ?? ''}
                className="h-full w-full object-cover"
              />
            ) : (
              <CoverPlaceholder />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
