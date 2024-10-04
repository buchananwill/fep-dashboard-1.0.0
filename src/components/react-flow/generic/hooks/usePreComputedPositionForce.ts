import { Layoutable } from '@/components/react-flow/generic/hooks/useForces';
import { useRef } from 'react';
import { InitialMap } from 'dto-stores';
import { useGlobalController } from 'selective-context';
import { hierarchicalLayoutMap } from '@/components/react-flow/generic/hooks/useHierarchicalTreeLayout';

export function usePreComputedPositionForce(
  layoutMemo: Map<string, Layoutable>
) {
  const layoutMemoRef = useRef(InitialMap as Map<string, Layoutable>);

  layoutMemoRef.current = layoutMemo;
  console.log({ layoutMemo });

  useGlobalController({
    contextKey: hierarchicalLayoutMap,
    listenerKey: 'precomputed-position-hook',
    initialValue: layoutMemoRef
  });
}
