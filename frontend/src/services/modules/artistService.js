import { musicService } from './musicService'
import { albumService } from './albumService'
import {
  normalizeTrack,
  normalizeAlbum,
  normalizeArtist,
} from '../../utils/normalizers'

/**
 * The backend exposes no artist-scoped routes, so an artist bundle is derived
 * from the catalog GETs: albums carry the populated artist ref and the music
 * list carries the artist id on every track.
 */
export const artistService = {
  async fetchBundle(artistId) {
    const [tracks, albums] = await Promise.all([
      musicService.fetchAll(),
      albumService.fetchAll(),
    ])

    const artistAlbums = albums.filter(
      (album) => String(album.artist?._id) === String(artistId),
    )
    const artistRef = artistAlbums[0]?.artist

    if (!artistRef) {
      return { artist: null, tracks: [], albums: [] }
    }

    const artist = normalizeArtist(artistRef)
    const artistTracks = tracks
      .filter((track) => String(track.artist) === String(artistId))
      .map((track) => normalizeTrack(track, artist.name))

    return {
      artist,
      tracks: artistTracks,
      albums: artistAlbums.map((album) => normalizeAlbum(album)),
    }
  },
}
