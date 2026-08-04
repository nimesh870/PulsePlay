/**
 * Shape normalizers mapping backend documents to the UI data contract used
 * by cards, rows, the player and collection headers.
 */

export function normalizeTrack(music, artistName = '', albumName = '') {
  return {
    id: music._id,
    title: music.title,
    uri: music.uri,
    artist: artistName || music.artist?.username || 'Unknown artist',
    artistId: music.artist?._id || music.artist,
    album: albumName,
    coverUrl: undefined,
    duration: music.duration,
    liked: false,
  }
}

export function normalizeAlbum(album) {
  const artist = album.artist
  const artistIsObject = artist && typeof artist === 'object'
  return {
    id: album._id,
    title: album.title,
    artist: artistIsObject ? artist.username || 'Unknown artist' : 'Unknown artist',
    artistId: artistIsObject ? artist._id : artist,
    coverUrl: undefined,
    year: undefined,
    trackCount: Array.isArray(album.musics) ? album.musics.length : undefined,
  }
}

export function normalizeArtist(artist) {
  return {
    id: artist._id,
    name: artist.username || artist.name || 'Unknown artist',
    email: artist.email,
    avatarUrl: undefined,
    followers: 0,
  }
}

export function normalizeUser(user) {
  return {
    id: user._id,
    name: user.username || user.name || 'Guest',
    email: user.email,
    role: user.role || 'user',
    avatarUrl: undefined,
  }
}

/**
 * Merge a liked-ids list into a set of tracks so UI cards/rows show the
 * correct heart state without mutating the stored track objects.
 */
export function withLikes(tracks, likedIds) {
  const set = new Set(likedIds)
  return tracks.map((track) => ({ ...track, liked: set.has(track.id) }))
}
