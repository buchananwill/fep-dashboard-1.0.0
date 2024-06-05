export function removeLeadingZeroStringConversion<T>(numberValue: number) {
  return String(numberValue).replace(/^0+/, '') || '0';
}
