function moveItem<T>(
  current: number,
  target: number,
  position: 'above' | 'below',
  list: T[]
): T[] {
  // Validate inputs
  if (
    current < 0 ||
    current >= list.length ||
    target < 0 ||
    target >= list.length ||
    current === target
  ) {
    throw new Error('Invalid indices');
  }

  // Create a copy of the list to avoid mutation
  const newList = [...list];

  // Remove the item at the current index
  const [item] = newList.splice(current, 1);

  // Adjust target index if current comes before target and item was removed
  const adjustedTarget = current < target ? target - 1 : target;

  // Determine the final position
  const insertIndex =
    position === 'above' ? adjustedTarget : adjustedTarget + 1;

  // Insert the item at the new position
  newList.splice(insertIndex, 0, item);

  return newList;
}
