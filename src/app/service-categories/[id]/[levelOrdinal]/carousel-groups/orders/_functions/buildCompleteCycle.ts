export type DirectedEdgePredicate<T> = (nodeA: T, nodeB: T) => boolean;

export function buildCompleteCycle<T>(
  nodes: T[],
  isValidConnection: DirectedEdgePredicate<T>,
  visited: Set<T>
): T[] | undefined {
  if (nodes.length < 2) return undefined;
  if (new Set(nodes).size !== nodes.length)
    throw Error('duplicate nodes in list');

  const possibleConnections = nodes.slice();
  possibleConnections.splice(0, 1);
  const currentNode = nodes[0];
  const lastNode = visited.size === possibleConnections.length;
  if (lastNode) {
    if (isValidConnection(currentNode, possibleConnections[0])) {
      return [...possibleConnections, currentNode];
    } else {
      return undefined;
    }
  } else {
    for (let i = 0; i + visited.size < possibleConnections.length; i++) {
      const nextNode = possibleConnections[i];
      if (isValidConnection(currentNode, nextNode)) {
        visited.add(currentNode);
        const connectionCopy = possibleConnections.slice();
        connectionCopy.splice(i, 1);
        const completeCycle = buildCompleteCycle(
          [nextNode, ...connectionCopy, currentNode],
          isValidConnection,
          visited
        );
        if (completeCycle?.length === nodes.length) {
          return completeCycle;
        } else {
          visited.delete(currentNode);
        }
      }
    }
    return undefined;
  }
}

const stringsCanConnect: DirectedEdgePredicate<string> = (nodeA, nodeB) => {
  return nodeA.substring(nodeA.length - 1) === nodeB.substring(0, 1);
};
