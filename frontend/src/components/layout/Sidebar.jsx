import { RiSettings3Line, RiAddLine } from 'react-icons/ri'
import { primaryNav, createNav } from '../../config/nav'
import Logo from '../ui/Logo'
import Avatar from '../ui/Avatar'
import NavItem from './NavItem'

/**
 * Desktop sidebar navigation.
 * @param {object} props
 * @param {object[]} props.playlists - user playlists (each { id, name })
 * @param {object} props.user - { name, email, avatarUrl }
 */
export default function Sidebar({
  active,
  onSelect,
  playlists = [],
  user,
}) {
  return (
    <aside className="hidden w-72 shrink-0 flex-col border-r border-white/[0.06] bg-surface/40 backdrop-blur-xl lg:flex">
      {/* Brand */}
      <div className="px-6 pt-6 pb-4">
        <Logo />
      </div>

      {/* Primary nav */}
      <nav aria-label="Primary" className="px-3">
        <ul className="space-y-1">
          {primaryNav.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              active={active === item.id}
              onSelect={onSelect}
            />
          ))}
        </ul>
      </nav>

      {/* Create + library */}
      <nav aria-label="Create and library" className="mt-6 px-3">
        <p className="px-3 pb-2 text-[11px] font-semibold tracking-widest text-ink-500 uppercase">
          Create
        </p>
        <ul className="space-y-1">
          {createNav.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              active={active === item.id}
              onSelect={onSelect}
            />
          ))}
        </ul>

        <div className="mx-3 mt-6 mb-2 flex items-center justify-between">
          <p className="text-[11px] font-semibold tracking-widest text-ink-500 uppercase">
            Your playlists
          </p>
          <button
            type="button"
            aria-label="Create playlist"
            className="focus-ring flex h-7 w-7 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-white/[0.06] hover:text-ink-0"
          >
            <RiAddLine aria-hidden="true" />
          </button>
        </div>

        {/* Playlist list (scrollable) */}
        <div className="max-h-52 space-y-0.5 overflow-y-auto pb-2">
          {playlists.length > 0 ? (
            playlists.map((playlist) => (
              <button
                key={playlist.id}
                type="button"
                onClick={() => onSelect?.(playlist.id)}
                className="focus-ring block w-full truncate rounded-lg px-3 py-2 text-left text-sm text-ink-500 transition-colors hover:bg-white/[0.04] hover:text-ink-0"
              >
                {playlist.name}
              </button>
            ))
          ) : (
            <p className="px-3 py-2 text-sm text-ink-500/70">
              No playlists yet
            </p>
          )}
        </div>
      </nav>

      {/* Footer: user + settings */}
      <div className="mt-auto border-t border-white/[0.06] p-3">
        <button
          type="button"
          className="focus-ring flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-white/[0.04]"
        >
          <Avatar name={user?.name} src={user?.avatarUrl} size="sm" />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium text-ink-0">
              {user?.name ?? 'Guest'}
            </span>
            <span className="block truncate text-xs text-ink-500">
              {user?.email ?? 'Sign in to sync'}
            </span>
          </span>
          <RiSettings3Line
            aria-hidden="true"
            className="shrink-0 text-lg text-ink-500"
          />
        </button>
      </div>
    </aside>
  )
}
