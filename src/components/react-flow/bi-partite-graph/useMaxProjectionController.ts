import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import {
  NamespacedHooks,
  useEffectSyncDeepEqualWithDispatch
} from 'dto-stores';

import { KEY_TYPES } from 'dto-stores/dist/literals';
import { useMemo } from 'react';
import { useGlobalController, useGlobalListener } from 'selective-context';
import { WorkTaskTypeProjection } from '@/components/react-flow/bi-partite-graph/BandwidthLayoutFlowWithForces';
import { initialMap } from '@/app/_literals';

export const maxProjectionContextKey = 'maxProjection';

const workTaskTypeProjection = 'workTaskTypeProjection';

export function useMaxProjectionController() {
  const listenerKey = useUuidListenerKey();
  const { currentState } = NamespacedHooks.useListen(
    workTaskTypeProjection,
    KEY_TYPES.MASTER_LIST,
    listenerKey,
    initialMap as Map<string, WorkTaskTypeProjection>
  );
  const maxProjection = useMemo(() => {
    return [...currentState.values()].reduce(
      (prev, curr) => Math.max(prev, curr.totalTaskVolume),
      1
    );
  }, [currentState]);
  const { dispatch } = useGlobalController({
    contextKey: maxProjectionContextKey,
    listenerKey,
    initialValue: 1
  });
  useEffectSyncDeepEqualWithDispatch(maxProjection, dispatch);
}

export function useMaxProjectionListener() {
  const listenerKey = useUuidListenerKey();
  return useGlobalListener({
    contextKey: maxProjectionContextKey,
    initialValue: 1,
    listenerKey
  }).currentState;
}
