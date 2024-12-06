/**
 * Replaces all occurrences of a target substring in a string with a replacement string.
 *
 * @param input - The original string.
 * @param target - The substring to find and replace.
 * @param replacement - The string to replace the target with.
 * @returns A new string with the target substring replaced by the replacement.
 */
export function spliceAndReplace(
  input: string,
  target: string,
  replacement: string
): string {
  if (!target) {
    throw new Error('Target string cannot be empty.');
  }
  return input.split(target).join(replacement);
}
