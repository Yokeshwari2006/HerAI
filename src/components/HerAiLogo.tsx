import React from 'react';

export interface HerAiLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  animated?: boolean;
  variant?: 'emblem' | 'full' | 'display' | 'icon-only' | 'image-only';
  alt?: string;
}

export const HerAiLogo: React.FC<HerAiLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  animated = false,
  variant = 'emblem',
  alt = 'HerAI — Multilingual Voice Assistant for Women',
}) => {
  const dimensions = {
    xs: { iconSize: 26, textClass: 'text-sm', maxW: 140 },
    sm: { iconSize: 34, textClass: 'text-lg', maxW: 180 },
    md: { iconSize: 46, textClass: 'text-2xl', maxW: 240 },
    lg: { iconSize: 72, textClass: 'text-4xl', maxW: 320 },
    xl: { iconSize: 120, textClass: 'text-5xl', maxW: 420 },
  }[size];

  // Official single-line brand wordmark with twin-leaf flourish over the "i"
  const renderSingleLineWordmark = () => (
    <div className="inline-flex flex-row items-baseline flex-nowrap whitespace-nowrap shrink-0 select-none leading-none">
      <span
        className={`${dimensions.textClass} font-black text-[#E95D8A] tracking-tight shrink-0 inline-block`}
        style={{ letterSpacing: '-0.02em' }}
      >
        Her
      </span>
      <span
        className={`${dimensions.textClass} font-black text-[#F47B6C] tracking-tight shrink-0 inline-block`}
        style={{ letterSpacing: '-0.02em' }}
      >
        A
      </span>
      <span
        className={`${dimensions.textClass} font-black text-[#F47B6C] tracking-tight shrink-0 relative inline-block`}
        style={{ letterSpacing: '-0.02em' }}
      >
        i
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: size === 'xl' ? '-16px' : size === 'lg' ? '-12px' : size === 'xs' ? '-6px' : '-8px',
            right: size === 'xl' ? '-14px' : size === 'lg' ? '-10px' : size === 'xs' ? '-5px' : '-7px',
          }}
        >
          <svg
            viewBox="0 0 20 20"
            fill="none"
            className={
              size === 'xl'
                ? 'w-6 h-6'
                : size === 'lg'
                ? 'w-4 h-4'
                : size === 'xs'
                ? 'w-2.5 h-2.5'
                : 'w-3 h-3'
            }
          >
            <path d="M3 17C3 9 10 4 17 4C17 11 12 17 3 17Z" fill="#E95D8A" />
            <path d="M7 18C9 13 14 11 18 12C17 17 12 19 7 18Z" fill="#F47B6C" />
          </svg>
        </span>
      </span>
    </div>
  );

  // Variant 1 & 2: FULL OFFICIAL CARD & INTERFACE DISPLAY
  // Uses the official HerAI artwork image directly
  if (variant === 'full' || variant === 'display') {
    return (
      <div
        className={`relative flex flex-col items-center text-center select-none ${className}`}
      >
        <div className="relative group overflow-hidden rounded-[32px] sm:rounded-[40px] bg-gradient-to-b from-[#FFF5F7] via-[#FFF9FA] to-[#FFF0F3] p-3 sm:p-4 border border-[#FCE4EC] shadow-xl shadow-[#E95D8A]/10 transition-all duration-300 hover:shadow-2xl hover:shadow-[#E95D8A]/15">
          {/* Subtle ambient pink backlight glow */}
          <div className="absolute -inset-2 bg-gradient-to-tr from-[#E95D8A]/15 via-[#F47B6C]/10 to-transparent blur-xl opacity-70 -z-10 pointer-events-none" />

          <img
            src="/herai_logo.png"
            alt={alt}
            className={`w-full h-auto object-contain rounded-[24px] sm:rounded-[30px] transition-transform duration-500 group-hover:scale-[1.01] ${
              size === 'sm'
                ? 'max-w-[200px]'
                : size === 'md'
                ? 'max-w-[260px]'
                : size === 'lg'
                ? 'max-w-[320px]'
                : 'max-w-[290px] sm:max-w-[360px] md:max-w-[400px]'
            }`}
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    );
  }

  // Variant 3: IMAGE ONLY
  if (variant === 'image-only') {
    return (
      <img
        src="/herai_logo.png"
        alt={alt}
        className={`object-contain rounded-2xl ${className}`}
        loading="eager"
      />
    );
  }

  // Variant 4: ICON ONLY (For message avatars, quick action chips, status badges)
  if (variant === 'icon-only') {
    return (
      <div
        style={{ width: dimensions.iconSize, height: dimensions.iconSize }}
        className={`relative shrink-0 overflow-hidden rounded-2xl bg-gradient-to-b from-[#FFF5F7] to-[#FFE8ED] border border-[#FCE4EC] shadow-2xs flex items-center justify-center ${
          animated ? 'animate-pulse' : ''
        } ${className}`}
        title={alt}
      >
        <img
          src="/herai_icon.png"
          alt={alt}
          className="w-full h-full object-cover select-none pointer-events-none"
          loading="eager"
        />
      </div>
    );
  }

  // Variant 5: HORIZONTAL NAVBAR / HEADER EMBLEM
  // Features official icon artwork on left + crisp single-line wordmark on right
  return (
    <div
      className={`inline-flex flex-row items-center flex-nowrap whitespace-nowrap shrink-0 gap-2.5 select-none ${className}`}
    >
      <div
        style={{ width: dimensions.iconSize, height: dimensions.iconSize }}
        className={`relative shrink-0 overflow-hidden rounded-2xl bg-gradient-to-b from-[#FFF5F7] to-[#FFE8ED] border border-[#FCE4EC] p-0.5 shadow-2xs flex items-center justify-center ${
          animated ? 'animate-pulse' : ''
        }`}
      >
        <img
          src="/herai_icon.png"
          alt="HerAI Emblem"
          className="w-full h-full object-cover rounded-[14px] select-none pointer-events-none"
          loading="eager"
        />
      </div>

      {showText && renderSingleLineWordmark()}
    </div>
  );
};
