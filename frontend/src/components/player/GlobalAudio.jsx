import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setCurrentTime,
  setDuration,
  next,
  togglePlay,
} from '../../store/slices/playerSlice'

/**
 * Single hidden <audio> element that syncs the Redux player state with
 * browser playback — track changes, play/pause, seeking, volume and repeat.
 */
export default function GlobalAudio() {
  const dispatch = useDispatch()
  const audioRef = useRef(null)
  const { current, isPlaying, currentTime, volume, muted, repeat } = useSelector(
    (state) => state.player,
  )

  const uri = current?.uri

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (uri) {
      if (audio.getAttribute('src') !== uri) {
        audio.src = uri
        audio.load()
      }
      if (isPlaying) {
        const playPromise = audio.play()
        if (playPromise) playPromise.catch(() => dispatch(togglePlay()))
      }
    } else if (isPlaying) {
      dispatch(togglePlay())
    }
  }, [uri, isPlaying, dispatch])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = muted
    }
  }, [muted])

  useEffect(() => {
    const audio = audioRef.current
    if (audio && Math.abs(audio.currentTime - currentTime) > 0.5) {
      audio.currentTime = currentTime
    }
  }, [currentTime])

  return (
    <audio
      ref={audioRef}
      className="hidden"
      onTimeUpdate={(event) => dispatch(setCurrentTime(event.currentTarget.currentTime))}
      onLoadedMetadata={(event) => dispatch(setDuration(event.currentTarget.duration))}
      onEnded={() => {
        const audio = audioRef.current
        if (repeat && audio) {
          audio.currentTime = 0
          audio.play().catch(() => dispatch(togglePlay()))
        } else {
          dispatch(next())
        }
      }}
    />
  )
}
