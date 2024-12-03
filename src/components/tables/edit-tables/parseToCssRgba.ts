import { ColorDto } from '@/api/generated-types/generated-types';
import { hsl, lab, LabColor } from 'd3';

export function parseToCssRgba(color: RgbaDto | undefined) {
  if (!color) return undefined;
  const { r, g, b, a } = color;

  // Ensure that r, g, and b are integers between 0 and 255, and a is a float between 0 and 1.
  const red = Math.min(255, Math.max(0, r));
  const green = Math.min(255, Math.max(0, g));
  const blue = Math.min(255, Math.max(0, b));
  const alpha = Math.min(1, Math.max(0, a / 255));

  // Return the CSS rgba string
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export type RgbaDto = Pick<ColorDto, 'r' | 'g' | 'b' | 'a'>;

export function parseToCssRgbOpacityOne(color: RgbaDto | undefined) {
  if (!color) return undefined;
  return parseToCssRgba({ ...color, a: 255 });
}

export function parseToHsl(color: RgbaDto | undefined) {
  if (!color) return undefined;
  const rgba = parseToCssRgba(color);
  return rgba ? hsl(rgba) : undefined;
}

export function parseToCielab(color: RgbaDto | undefined) {
  if (!color) return undefined;
  const rgba = parseToCssRgba(color);
  return rgba ? lab(rgba) : undefined;
}

export function getAutoContrastFromCielab(asCielab: LabColor | undefined) {
  if (asCielab === undefined) return undefined;
  const contrastWhite = contrastDistance(asCielab, whiteCielab);
  const contrastBlack = contrastDistance(asCielab, blackCielab);
  const contrast =
    contrastWhite > contrastBlack
      ? 'var(--mantine-color-white)'
      : 'var(--mantine-color-black)';
  return { contrast, main: asCielab.formatRgb() };
}

export function parseToAutoContrastWhiteBlack(color: RgbaDto | undefined) {
  const asCielab = parseToCielab(color);
  return getAutoContrastFromCielab(asCielab);
}

const whiteCielab = lab('white');
const blackCielab = lab('black');
function contrastDistance(color1: LabColor, color2: LabColor) {
  return Math.sqrt(
    Math.pow(color1.l - color2.l, 2) +
      Math.pow(color1.a - color2.a, 2) +
      Math.pow(color1.b - color2.b, 2)
  );
}
