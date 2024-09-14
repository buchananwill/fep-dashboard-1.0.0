export function removeLeadingZeroStringConversion<T>(
  numberValue: number,
  allowFloat: boolean
) {
  const withoutLeadingZero = String(numberValue).replace(/^0+/, '') || '0';
  if (allowFloat && Math.abs(numberValue) < 1 && numberValue !== 0)
    return `0${withoutLeadingZero}`;
  else return withoutLeadingZero;
}
