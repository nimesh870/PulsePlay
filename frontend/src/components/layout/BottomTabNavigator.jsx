import { cx } from '../../utils/cx'
import { mobileNav } from '../../config/nav'

/**
 * Fixed bottom navigation for mobile — hidden from `lg` up.
 */
export default function BottomTabNavigator({ active, onSelect }) {
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.06] bg-overlay pb-[env(safe-area-inset-bottom)] backdrop-blur-2xl lg:hidden"
    >
      <div className="flex items-stretch">
        {mobileNav.map((item) => {
          const isActive = active === item.id
          const Icon = item.icon
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect?.(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={cx(
                'focus-ring relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors duration-200',
                isActive ? 'text-accent-300' : 'text-ink-500 hover:text-ink-100',
              )}
            >
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute top-0 h-0.5 w-10 rounded-full bg-gradient-to-r from-accent-500 to-magenta-500"
                />
              )}
              <Icon aria-hidden="true" className="text-[22px]" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
