import Image from 'next/image';

interface BrandMarkProps {
  size: number;
  className?: string;
  alt?: string;
}

export default function BrandMark({ size, className, alt = '' }: BrandMarkProps) {
  return (
    <Image
      src="/mpa-3d-logo.webp"
      alt={alt}
      width={size}
      height={size}
      className={className}
      unoptimized
    />
  );
}
