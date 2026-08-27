export type RuntimePerformanceProfile = {
  lowPowerMode: boolean;
  prefersReducedMotion: boolean;
  dpr: [number, number];
  antialias: boolean;
  enableShadows: boolean;
  allowAutoRotate: boolean;
  /** When true, components should swap expensive materials (e.g. transmission) for cheaper alternatives */
  useCheapMaterials: boolean;
};

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: {
    saveData?: boolean;
    effectiveType?: string;
  };
};

export const DEFAULT_PERFORMANCE_PROFILE: RuntimePerformanceProfile = {
  lowPowerMode: false,
  prefersReducedMotion: false,
  dpr: [1, 1.5],
  antialias: true,
  enableShadows: true,
  allowAutoRotate: true,
  useCheapMaterials: false,
};

export function getRuntimePerformanceProfile(): RuntimePerformanceProfile {
  if (typeof window === "undefined") {
    return DEFAULT_PERFORMANCE_PROFILE;
  }

  const nav = navigator as NavigatorWithHints;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
  const lowCpu = typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4;

  const connection = nav.connection;
  const saveData = Boolean(connection?.saveData);
  const networkType = connection?.effectiveType?.toLowerCase() ?? "";
  const slowNetwork = networkType.includes("2g") || networkType.includes("3g");

  const mobileViewport = window.innerWidth < 768;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

  const lowPowerMode =
    prefersReducedMotion ||
    saveData ||
    slowNetwork ||
    lowMemory ||
    lowCpu ||
    (mobileViewport && coarsePointer);

  // Adaptive quality based on device capabilities
  // Desktop: cap at 1.5 DPR (imperceptible vs 2.0, saves 44% pixels)
  // Mobile/low-power: 1.0 DPR for smooth performance
  const dpr: [number, number] = lowPowerMode ? [1, 1] : [1, 1.5];

  return {
    lowPowerMode,
    prefersReducedMotion,
    dpr,
    antialias: true, // Always on — cheap and visually important for 3D models
    enableShadows: !lowPowerMode, // Shadows off on low-power (subtle, saves GPU)
    allowAutoRotate: !prefersReducedMotion,
    useCheapMaterials: lowPowerMode,
  };
}
