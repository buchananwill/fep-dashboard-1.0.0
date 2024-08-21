export function joinIdPath(selectionSplit: string[], childDepth: number) {
  return selectionSplit.slice(0, childDepth).join(':');
}
