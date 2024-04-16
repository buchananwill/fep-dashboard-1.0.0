export function normalizeQueryParamToNumber(
  value: string | string[] | undefined,
  defaultValue: number
): number {
  if (Array.isArray(value)) {
    // If it's an array, take the first value and parse it
    return parseInt(value[0], 10) || defaultValue;
  } else if (value) {
    // If it's a string, parse it directly
    return parseInt(value, 10) || defaultValue;
  }
  return defaultValue; // If undefined, return the default value
}

export function oneIndexToZeroIndex(index: number) {
  return Math.max(index - 1, 0);
}

export function zeroIndexToOneIndex(
  index: number,
  array?: [],
  totalPages?: number
) {
  const unsafeValue = index + 1;
  if (array) {
    return Math.min(unsafeValue, array.length);
  } else if (totalPages) {
    return Math.min(unsafeValue, totalPages);
  }
  return unsafeValue;
}
