export function getMaxMinListLengths<T>(entryList: [keyof T, T[keyof T][]][]) {
  return entryList.reduce(
    (prev, curr, index, array) => {
      const currLength = (curr[1] as T[keyof T][]).length;
      return {
        maxLength: Math.max(prev.maxLength, currLength),
        minLength: Math.min(prev.minLength, currLength)
      };
    },
    { maxLength: 0, minLength: Infinity }
  );
}
