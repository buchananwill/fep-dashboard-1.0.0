import { shortCodes } from '@/components/feasibility-report/shortCodes';

export const bgColorString = [
  'bg-red-400',
  'bg-orange-400',
  'bg-amber-400',
  'bg-yellow-400',
  'bg-lime-400',
  'bg-green-400',
  'bg-emerald-400',
  'bg-teal-400',
  'bg-cyan-400',
  'bg-sky-400',
  'bg-blue-400',
  'bg-indigo-400',
  'bg-violet-400',
  'bg-purple-400',
  'bg-fuchsia-400',
  'bg-pink-400',
  'bg-rose-400'
];

export function getShortCodeColor(subjectCode: string) {
  const shortCodeIndex = shortCodes.indexOf(subjectCode);
  if (shortCodeIndex === -1) return 'bg-white';
  else return bgColorString[shortCodeIndex % bgColorString.length];
}
