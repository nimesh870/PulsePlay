import Logo from '../ui/Logo'

/**
 * Split auth layout: visual brand panel (desktop) + form panel.
 */
export default function AuthLayout({ children, title, subtitle, footer }) {
  return (
    <div className="relative flex min-h-dvh bg-base">
      {/* Brand panel */}
      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-accent-600/40 via-base to-magenta-500/25"
        />
        <div
          aria-hidden="true"
          className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-accent-500/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-magenta-500/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute top-1/3 right-16 h-40 w-40 animate-bounce-slow rounded-full bg-teal-glow/20 blur-2xl"
        />

        <div className="relative flex h-full flex-col justify-between p-10">
          <Logo />
          <div>
            <h2 className="font-display text-4xl leading-tight font-bold text-ink-0">
              Sound, <span className="text-gradient">pulsing</span> with you.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-300">
              Upload your own music, discover artists and explore new sounds — all
              in one beautifully dark place.
            </p>
          </div>
          <p className="text-xs tracking-widest text-ink-500 uppercase">
            PulsePlay · Stream your sound
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-md animate-fade-up">
          <div className="mb-8 flex justify-center lg:hidden">
            <Logo />
          </div>

          <div className="rounded-3xl border border-white/[0.06] bg-surface/60 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8">
            <h1 className="font-display text-2xl font-bold text-ink-0">
              {title}
            </h1>
            <p className="mt-1.5 text-sm text-ink-500">{subtitle}</p>
            <div className="mt-7">{children}</div>
          </div>

          {footer && (
            <p className="mt-6 text-center text-sm text-ink-500">{footer}</p>
          )}
        </div>
      </div>
    </div>
  )
}
