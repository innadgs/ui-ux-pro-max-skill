import Image, { type ImageProps } from "next/image";

type AccessibleImageProps = Omit<ImageProps, "alt"> &
  ({ alt: string; decorative?: false } | { alt?: string; decorative: true });

/**
 * Thin wrapper over next/image that forces a deliberate choice: either a
 * real, meaningful `alt`, or an explicit `decorative` flag (which renders
 * `alt=""` so the image is excluded from the accessibility tree). There is
 * no default that lets an image slip through without either.
 */
export function AccessibleImage({ decorative, alt, ...rest }: AccessibleImageProps) {
  return <Image alt={decorative ? "" : (alt as string)} {...rest} />;
}
