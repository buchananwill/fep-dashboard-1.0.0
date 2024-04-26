const StartAtCapitalA = 64;

export function numberToWeekLetter(weekNumber: number) {
  return String.fromCharCode(weekNumber + StartAtCapitalA);
}
