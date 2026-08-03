# PulsePlay — Frontend UI

A dark, production-ready UI system for a Spotify-like music streaming app.
Presentational components only — no routing, state management or API logic.

## Tech Stack

- **React 19** (functional components)
- **Tailwind CSS v4** (utility-first, custom theme in `src/index.css`)
- **React Icons** (Remix icon set)
- **React Hook Form** (forms UI, validation rules)
- **Headless UI** (accessible profile menu)

## Install & Run

```bash
npm install
npm run dev          # start dev server
npm run build        # production build
npm run lint         # eslint
```

Dependencies used by this UI:

```bash
npm i react-icons react-hook-form @headlessui/react
npm i -D tailwindcss @tailwindcss/vite
```

Tailwind is wired through the Vite plugin in `vite.config.js`. The design
tokens (colors, fonts, animations) live in `src/index.css` via Tailwind v4's
`@theme` — there is no `tailwind.config.js` by design.

## Folder Structure

```
src/
├── App.jsx                    # shell composition (home screen, loading state)
├── index.css                  # theme tokens, base styles, shared component classes
├── config/
│   ├── nav.js                 # navigation structure (sidebar + mobile tabs)
│   └── constants.js           # genres, file accept rules
├── utils/
│   ├── cx.js                  # className merge helper
│   └── format.js              # duration / count formatting
├── components/
│   ├── ui/                    # primitives: Button, IconButton, PlayButton,
│   │                          # LikeButton, Avatar, Logo, Skeleton, Slider,
│   │                          # EmptyState, ViewToggle, CoverPlaceholder, ...
│   ├── cards/                 # CardShell, MusicCard, AlbumCard, ArtistCard, TrackRow
│   ├── sections/              # SectionHeader, HeroBanner, CollectionHeader
│   ├── layout/                # AppLayout, Sidebar, BottomTabNavigator, Header
│   ├── player/                # MusicPlayer, MobilePlayer, PlayerControls,
│   │                          # ProgressBar, VolumeControl
│   └── forms/                 # FormField, Input, Select, Textarea, Checkbox,
│                              # FileDropzone, CreateAlbumForm, UploadMusicForm,
│                              # LoginForm, SignupForm, AuthLayout
└── pages/                     # HomePage, AlbumPage, ArtistPage, LoginPage, SignupPage
```

## Wiring It Up

- Every component is data-driven through props; there is **no mock data, fake
  API or hardcoded content** anywhere. Empty arrays render designed empty
  states; `isLoading` renders matching skeleton patterns.
- `AppLayout` accepts the shell chrome (sidebar/nav, header, player) and a
  page as `children`. Feed it your own `track`, `volume`, `isPlaying`, etc.
- Screens accept callbacks (`onPlay`, `onSelect`, `onSubmit`, `onFollow`, ...)
  — connect them to your router / API layer.

## Responsive Behavior

- **Desktop (`lg`+):** sidebar navigation + sticky bottom music player.
- **Tablet / Mobile:** hidden sidebar, compact player + fixed bottom tab bar.
- Mobile-first breakpoints throughout; scrollable rows for horizontal sections.
