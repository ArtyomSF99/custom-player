import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { RefObject } from "react";

export function usePlayerState(videoRef: RefObject<HTMLVideoElement | null>, fallbackDuration: number) {
  const previousVolumeRef = useRef(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(fallbackDuration);
  const [bufferedTime, setBufferedTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const syncState = () => {
      const nextDuration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : fallbackDuration;
      const bufferedEnd = video.buffered.length > 0 ? video.buffered.end(video.buffered.length - 1) : 0;

      setDuration(nextDuration);
      setCurrentTime(video.currentTime);
      setBufferedTime(bufferedEnd);
      setIsPlaying(!video.paused && !video.ended);
      setVolume(video.volume);
      setMuted(video.muted || video.volume === 0);
    };

    syncState();

    const eventNames: Array<keyof HTMLMediaElementEventMap> = [
      "play",
      "pause",
      "timeupdate",
      "durationchange",
      "loadedmetadata",
      "progress",
      "volumechange",
      "seeking",
      "seeked",
      "ended",
    ];

    eventNames.forEach((eventName) => {
      video.addEventListener(eventName, syncState);
    });

    return () => {
      eventNames.forEach((eventName) => {
        video.removeEventListener(eventName, syncState);
      });
    };
  }, [fallbackDuration]);

  const togglePlayback = useCallback(async () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused || video.ended) {
      try {
        await video.play();
      } catch {
        setIsPlaying(false);
      }

      return;
    }

    video.pause();
  }, []);

  const seekTo = useCallback(
    (nextTime: number) => {
      const video = videoRef.current;

      if (!video) {
        return;
      }

      const cappedDuration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : fallbackDuration;
      video.currentTime = Math.min(Math.max(nextTime, 0), cappedDuration);
    },
    [fallbackDuration, videoRef],
  );

  const toggleMute = useCallback(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.muted || video.volume === 0) {
      const restoredVolume = previousVolumeRef.current > 0 ? previousVolumeRef.current : 1;
      video.muted = false;
      video.volume = restoredVolume;
      return;
    }

    previousVolumeRef.current = video.volume;
    video.muted = true;
  }, []);

  const state = useMemo(
    () => ({
      bufferedTime,
      currentTime,
      duration,
      isPlaying,
      muted,
      volume,
    }),
    [bufferedTime, currentTime, duration, isPlaying, muted, volume],
  );

  return {
    ...state,
    seekTo,
    toggleMute,
    togglePlayback,
  };
}
