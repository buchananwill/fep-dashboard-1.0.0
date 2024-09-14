export function makeTransientId(index: number) {
  return index < 0 ? index : 0 - index;
}
