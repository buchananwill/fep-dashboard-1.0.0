import { useRef } from 'react';
import { InitialMap } from 'dto-stores';
import { useGlobalController } from 'selective-context';
import { hierarchicalLayoutMap } from '@/components/react-flow/generic/hooks/useHierarchicalTreeLayout';
import { Layoutable } from '@/components/react-flow/generic/hooks/getTreeForce';

export function usePreComputedPositionForce(
  layoutMemo: Map<string, Layoutable>
) {
  const layoutMemoRef = useRef(InitialMap as Map<string, Layoutable>);

  layoutMemoRef.current = layoutMemo;

  useGlobalController({
    contextKey: hierarchicalLayoutMap,
    listenerKey: 'precomputed-position-hook',
    initialValue: layoutMemoRef
  });
}
