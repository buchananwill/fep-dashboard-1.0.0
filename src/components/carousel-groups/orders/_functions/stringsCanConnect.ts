import { DirectedEdgePredicate } from '@/components/carousel-groups/orders/_functions/buildCompleteCycle';

export const stringsCanConnect: DirectedEdgePredicate<string> = (
  nodeA,
  nodeB
) => {
  return nodeA.substring(nodeA.length - 1) === nodeB.substring(0, 1);
};
