import { ColorDto } from '@/api/generated-types/generated-types';

export function parseToCssRgba(color: ColorDto | undefined) {
  if (!color) return undefined;
  const { r, g, b, a } = color;

  // Ensure that r, g, and b are integers between 0 and 255, and a is a float between 0 and 1.
  const red = Math.min(255, Math.max(0, r));
  const green = Math.min(255, Math.max(0, g));
  const blue = Math.min(255, Math.max(0, b));
  const alpha = Math.min(1, Math.max(0, a));

  // Return the CSS rgba string
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}