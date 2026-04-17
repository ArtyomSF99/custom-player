import type Hls from "hls.js";
import type { ErrorData, HlsConfig, Level } from "hls.js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { RefObject } from "react";

import type { QualityOption } from "../lib/types";

const HLS_CONFIG: Partial<HlsConfig> = {
  enableWorker: true,
  backBufferLength: 90,
};

export function useHls(videoRef: RefObject<HTMLVideoElement | null>, sourceUrl: string) {
  const hlsRef = useRef<Hls | null>(null);
  const [levels, setLevels] = useState<Level[]>([]);
  const [selectedLevel, setSelectedLevel] = useState(-1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    let disposed = false;

    if (!video) {
      return;
    }

    setLevels([]);
    setSelectedLevel(-1);
    setError(null);

    const setupHls = async () => {
      const { default: HlsRuntime } = await import("hls.js");

      if (disposed) {
        return;
      }

      if (HlsRuntime.isSupported()) {
        const hls = new HlsRuntime(HLS_CONFIG);
        hlsRef.current = hls;

        hls.loadSource(sourceUrl);
        hls.attachMedia(video);

        hls.on(HlsRuntime.Events.MANIFEST_PARSED, (_, data) => {
          setError(null);
          setLevels(data.levels);
        });

        hls.on(HlsRuntime.Events.ERROR, (_, data: ErrorData) => {
          if (!data.fatal) {
            return;
          }

          if (data.type === HlsRuntime.ErrorTypes.NETWORK_ERROR) {
            hls.startLoad();
            setError("Network hiccup while loading the HLS stream. Retrying...");
            return;
          }

          if (data.type === HlsRuntime.ErrorTypes.MEDIA_ERROR) {
            hls.recoverMediaError();
            setError("Media error recovered while loading the HLS stream.");
            return;
          }

          setError("The HLS stream could not be loaded.");
          hls.destroy();
          hlsRef.current = null;
        });

        return;
      }

      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = sourceUrl;
        video.load();
        setError(null);
        return;
      }

      setError("This browser cannot play the provided HLS stream.");
    };

    void setupHls();

    return () => {
      disposed = true;
      hlsRef.current?.destroy();
      hlsRef.current = null;
    };
  }, [sourceUrl]);

  const qualityOptions = useMemo<QualityOption[]>(() => {
    if (levels.length === 0) {
      return [{ label: "Auto", levelIndex: -1, isAuto: true }];
    }

    const uniqueByHeight = new Map<number, QualityOption>();

    levels.forEach((level, levelIndex) => {
      const height = level.height ?? 0;

      if (!uniqueByHeight.has(height)) {
        uniqueByHeight.set(height, {
          label: `${height}p`,
          levelIndex,
          height,
          bitrate: level.bitrate,
        });
      }
    });

    return [
      { label: "Auto", levelIndex: -1, isAuto: true },
      ...Array.from(uniqueByHeight.values()).sort((left, right) => (right.height ?? 0) - (left.height ?? 0)),
    ];
  }, [levels]);

  const setQuality = useCallback((levelIndex: number) => {
    const hls = hlsRef.current;
    setSelectedLevel(levelIndex);

    if (!hls) {
      return;
    }

    hls.currentLevel = levelIndex;
    hls.nextLevel = levelIndex;
    hls.loadLevel = levelIndex;
  }, []);

  return {
    error,
    qualityOptions,
    selectedLevel,
    setQuality,
    supportsAdaptiveLevels: levels.length > 0,
  };
}