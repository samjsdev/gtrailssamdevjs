import React from 'react';

export type ArchitecturalVariant = 'master-plan' | 'elevation' | 'structural' | 'axonometric' | 'grid';

interface ArchitecturalDiagramBgProps {
  variant?: ArchitecturalVariant;
  theme?: 'dark' | 'light';
  opacity?: number;
  showGrid?: boolean;
  showCornerMarks?: boolean;
  watermarkText?: string;
  position?: 'center' | 'top' | 'bottom' | 'repeat';
  dualPlacement?: boolean;
  className?: string;
  softDarkBg?: boolean;
}

export default function ArchitecturalDiagramBg({
  variant = 'master-plan',
  theme = 'dark',
  opacity,
  showGrid = true,
  showCornerMarks = true,
  watermarkText,
  position = 'center',
  dualPlacement = false,
  className = '',
  softDarkBg = false,
}: ArchitecturalDiagramBgProps) {
  const defaultOpacity = theme === 'dark' ? 0.38 : 0.35;
  const currentOpacity = opacity !== undefined ? opacity : defaultOpacity;

  const svgSrcMap: Record<ArchitecturalVariant, string> = {
    'master-plan': '/images/drawings/architectural-master-plan.svg',
    'elevation': '/images/drawings/architectural-elevation-detail.svg',
    'structural': '/images/drawings/architectural-structural-lines.svg',
    'axonometric': '/images/drawings/architectural-axonometric-lines.svg',
    'grid': '',
  };

  const svgSrc = svgSrcMap[variant];

  const positionClass = {
    center: 'bg-center bg-no-repeat',
    top: 'bg-top bg-no-repeat',
    bottom: 'bg-bottom bg-no-repeat',
    repeat: 'bg-top bg-repeat-y',
  }[position];

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${
        softDarkBg
          ? 'bg-gradient-to-b from-[#16181D] via-[#101216] to-[#14171D]'
          : ''
      } ${className}`}
      aria-hidden="true"
    >
      {/* 1. Subtle Modular Architectural Axis Grid (120px calm spacing) */}
      {showGrid && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              theme === 'dark'
                ? `linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                   linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`
                : `linear-gradient(to right, rgba(17, 17, 17, 0.03) 1px, transparent 1px),
                   linear-gradient(to bottom, rgba(17, 17, 17, 0.03) 1px, transparent 1px)`,
            backgroundSize: '120px 120px, 120px 120px',
          }}
        />
      )}

      {/* 2. Soft Studio Atmosphere Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            theme === 'dark'
              ? 'radial-gradient(ellipse at 50% 30%, transparent 40%, rgba(10, 12, 16, 0.5) 100%)'
              : 'radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(248, 248, 246, 0.4) 100%)',
        }}
      />

      {/* 3. Primary Architectural Blueprint Linework SVG (Quiet, delicate watermark) */}
      {svgSrc && (
        <div
          className={`absolute inset-0 ${positionClass} transition-opacity duration-700`}
          style={{
            backgroundImage: `url(${svgSrc})`,
            backgroundSize: 'min(1200px, 85%) auto',
            opacity: currentOpacity,
            filter: theme === 'dark' ? 'invert(1) hue-rotate(180deg)' : 'none',
          }}
        />
      )}

      {/* 4. Minimal Architectural Crop / Registration Crosshairs */}
      {showCornerMarks && (
        <>
          <div className="absolute top-6 left-8 font-mono text-xs font-light text-[#EA580C]/40 select-none">
            +
          </div>
          <div className="absolute top-6 right-8 font-mono text-xs font-light text-[#EA580C]/40 select-none">
            +
          </div>
          <div className="absolute bottom-6 left-8 font-mono text-xs font-light text-[#EA580C]/40 select-none">
            +
          </div>
          <div className="absolute bottom-6 right-8 font-mono text-xs font-light text-[#EA580C]/40 select-none">
            +
          </div>
        </>
      )}
    </div>
  );
}
