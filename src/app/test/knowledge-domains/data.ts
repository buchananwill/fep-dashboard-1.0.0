import data from '@/utils/init-json-data/work-project-series-schema/knowledgeDomains.json';
import { converter, formatRgb } from 'culori';
import { camelCase } from 'lodash';

export const raw = data.map((item) => {
  const fixedSnakeCase = Object.entries(item).map(([key, value]) => [
    camelCase(key),
    value
  ]);
  const obj = Object.fromEntries(fixedSnakeCase);
  // obj.shortCode = crypto.randomUUID().toString().slice(0, 3);
  return obj;
});

type DataType = (typeof raw)[number];
const converterToRgb = converter();

export function applyColorPalette(kdView: DataType[]) {
  const count = kdView.length;
  return kdView.map((kd, index) => {
    const withColor = { ...kd };
    withColor.cssRgb = getColorSlice(count, index);
    return withColor;
  });
}

const lightness = 0.65;
const chroma = 0.25;
const saturation = 0.7;

function getColorSlice(n: number, i: number) {
  if (n <= 0) throw new Error('Number of slices must be greater than 0');
  if (i < 0 || i >= n) throw new Error('Index out of bounds');

  const hue = (i / n) * 360;
  // const colorFromPalette = `oklch(${lightness} ${chroma} ${hue})`;
  const colorFromPalette = `hsl(${hue} ${saturation * 100}% ${lightness * 100}%)`;
  const culoriObj = converterToRgb(colorFromPalette);

  if (!culoriObj) {
    console.error({ culoriObj, colorFromPalette });
    throw Error('Could not create color');
  }
  culoriObj.alpha = 1;
  return formatRgb(culoriObj);
}
