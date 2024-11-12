import { HierarchicalDataOptions } from '@/components/react-flow/generic/hooks/getHierarchicalDataLayout';
import { useTreeHierarchicalDataLayoutMemo } from '@/components/react-flow/generic/hooks/useTreeHierarchicalDataLayoutMemo';
import { usePreComputedPositionForce } from '@/components/react-flow/generic/hooks/usePreComputedPositionForce';

import { Layoutable } from '@/components/react-flow/generic/hooks/getCustomForce';

const options: HierarchicalDataOptions = {
  nodeSize: [50, 400],
  orientation: 'horizontal'
};

export function useHierarchicalTreeLayout(
  idToChildIdMap: Map<string, Set<string>>
) {
  const [layoutMemo] = useTreeHierarchicalDataLayoutMemo(
    idToChildIdMap,
    options
  );
  usePreComputedPositionForce(layoutMemo as Map<string, Layoutable>);
}

export const hierarchicalLayoutMap = 'hierarchicalLayoutMap';
