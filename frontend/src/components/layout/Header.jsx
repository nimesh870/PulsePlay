import { Fragment } from 'react'
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from '@headlessui/react'
import {
  RiSearchLine,
  RiUpload2Line,
  RiUserLine,
  RiHeart3Line,
  RiAlbumLine,
  RiSettings3Line,
  RiLogoutBoxRLine,
} from 'react-icons/ri'
import { cx } from '../../utils/cx'
import Logo from '../ui/Logo'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'

const profileMenu = [
  { label: 'Profile', icon: RiUserLine },
  { label: 'Liked Songs', icon: RiHeart3Line },
  { label: 'Create Album', icon: RiAlbumLine, artistOnly: true },
  { label: 'Upload Music', icon: RiUpload2Line, artistOnly: true },
  { divider: true },
  { label: 'Settings', icon: RiSettings3Line },
  { label: 'Log out', icon: RiLogoutBoxRLine, danger: true },
]

/**
 * Sticky top bar with search, actions and the profile menu.
 * @param {object} props
 * @param {object} props.user - { name, email, avatarUrl }
 * @param {boolean} props.isArtist - show artist-only actions/menu items
 */
export default function Header({
  user,
  searchValue = '',
  onSearchChange,
  onUpload,
  onNavigate,
  isArtist = false,
}) {
  const menuItems = profileMenu.filter(
    (item) => !item.artistOnly || isArtist,
  )

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-white/[0.06] bg-overlay/80 px-4 backdrop-blur-xl sm:px-6">
      {/* Brand (mobile only) */}
      <Logo className="lg:hidden" />

      {/* Search */}
      <div className="relative hidden max-w-xl flex-1 md:block">
        <RiSearchLine
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-4 z-10 -translate-y-1/2 text-lg text-ink-500"
        />
        <input
          type="search"
          value={searchValue}
          onChange={(event) => onSearchChange?.(event.target.value)}
          placeholder="What do you want to listen to?"
          className="input-base rounded-full pr-4 pl-11"
        />
      </div>

      <div className="flex-1 md:hidden" />

      {/* Actions */}
      <div className="flex items-center gap-2">
        {isArtist && (
          <Button
            variant="soft"
            size="sm"
            className="hidden sm:inline-flex"
            onClick={onUpload}
          >
            <RiUpload2Line aria-hidden="true" className="text-base" />
            Upload
          </Button>
        )}

        <ProfileMenu user={user} onNavigate={onNavigate} items={menuItems} />
      </div>
    </header>
  )
}

function ProfileMenu({ user, onNavigate, items = profileMenu }) {
  return (
    <Menu as="div" className="relative">
      <MenuButton className="focus-ring rounded-full">
        <Avatar name={user?.name} src={user?.avatarUrl} size="sm" />
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-150"
        enterFrom="opacity-0 translate-y-1 scale-95"
        enterTo="opacity-100 translate-y-0 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 translate-y-0 scale-100"
        leaveTo="opacity-0 translate-y-1 scale-95"
      >
        <MenuItems className="absolute right-0 mt-3 w-56 origin-top-right rounded-2xl border border-white/10 bg-raised/95 p-1.5 shadow-2xl shadow-black/60 backdrop-blur-xl focus:outline-none">
          <div className="border-b border-white/[0.06] px-3 py-2.5">
            <p className="truncate text-sm font-semibold text-ink-0">
              {user?.name ?? 'Guest'}
            </p>
            <p className="truncate text-xs text-ink-500">
              {user?.email ?? 'Not signed in'}
            </p>
          </div>
          {items.map((item, index) =>
            item.divider ? (
              <div
                key={index}
                className="my-1.5 h-px bg-white/[0.06]"
                aria-hidden="true"
              />
            ) : (
              <MenuItem key={item.label}>
                {({ focus }) => (
                  <button
                    type="button"
                    onClick={() => onNavigate?.(item.label)}
                    className={cx(
                      'flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors',
                      focus
                        ? 'bg-white/[0.07] text-ink-0'
                        : 'text-ink-300',
                      item.danger && 'text-magenta-400',
                    )}
                  >
                    <item.icon aria-hidden="true" className="text-lg" />
                    {item.label}
                  </button>
                )}
              </MenuItem>
            ),
          )}
        </MenuItems>
      </Transition>
    </Menu>
  )
}
