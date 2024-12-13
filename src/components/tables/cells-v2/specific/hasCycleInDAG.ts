export function hasCycleInDAG(
  startParents: (string | number)[],
  getParentIds: (nodeId: string | number) => (string | number)[] | undefined,
  startChild: string | number
): (string | number) | null {
  // A set to track visited nodes and avoid redundant processing
  const visited = new Set<string | number>();

  // Helper function to perform a DFS search for `startChild`
  function dfs(current: string | number): (string | number) | null {
    if (current === startChild) {
      // Cycle detected
      return current;
    }
    if (visited.has(current)) {
      // Skip already visited nodes
      return null;
    }
    // Mark the current node as visited
    visited.add(current);
    const nextParents = getParentIds(current);
    if (nextParents === undefined) {
      return null;
    } else {
      for (const parent of nextParents) {
        if (dfs(parent) !== null) {
          return parent;
        }
      }
    }
    // Recursively check the ancestors of the current node

    return null;
  }

  // Iterate through all starting parents
  for (const startParent of startParents) {
    if (dfs(startParent) !== null) {
      return startParent; // Cycle detected
    }
  }

  return null; // No cycle detected
}
