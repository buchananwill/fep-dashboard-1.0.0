import { MutableRefObject, useCallback } from 'react';
import {
  getTypeDepth,
  WorkNodeHierarchy
} from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import {
  addBundle,
  addDeliveryAllocationLeaf,
  produceKnowledgeDomainGroup,
  removeChildImmutably
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/knowledgeLevelGroupProducers';
import { joinPathUpTo } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/selection/joinPathUpTo';
import { joinPath } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/knowledgeLevelGroupFunctions';
import { DispatchState } from '@/types';

export const bundleDepth = getTypeDepth('bundle');
export const knowledgeDomainGroupDepth = getTypeDepth('knowledgeDomainGroup');
export const deliveryAllocationListDepth = getTypeDepth('leafList');
export const deliveryAllocationLeafDepth = getTypeDepth('leaf');

export type DeSelectRemovedId = (idDepth: number) => void;

export function useDeselectRemovedId(
  selectionSplitRef: MutableRefObject<string[]>,
  dispatch: DispatchState<string>
): DeSelectRemovedId {
  return useCallback(
    (idDepth: number) => {
      const newSelection = joinPath(
        ...selectionSplitRef.current.slice(0, idDepth - 1)
      );
      dispatch(newSelection);
    },
    [selectionSplitRef, dispatch]
  );
}

export function useBundleEdits(
  deSelectRemovedId: DeSelectRemovedId,
  selectionSplitRef: MutableRefObject<string[]>
) {
  const removeBundle = useCallback(
    (klg: WorkNodeHierarchy) => {
      deSelectRemovedId(bundleDepth);
      return removeChildImmutably(
        klg,
        joinPathUpTo(selectionSplitRef.current, bundleDepth)
      );
    },
    [deSelectRemovedId, selectionSplitRef]
  );

  const handleAddBundle = useCallback(
    (wnh: WorkNodeHierarchy) => {
      return addBundle(wnh, joinPath(...selectionSplitRef.current));
    },
    [selectionSplitRef]
  );
  return { removeBundle, handleAddBundle };
}

export function useKnowledgeDomainGroupEdits(
  selectionSplitRef: MutableRefObject<string[]>,
  deSelectRemovedId: DeSelectRemovedId
) {
  const handleAddKnowledgeDomainGroup = useCallback(
    (klg: WorkNodeHierarchy) => {
      return produceKnowledgeDomainGroup(
        klg,
        joinPathUpTo(selectionSplitRef.current, bundleDepth)
      );
    },
    [selectionSplitRef]
  );

  const handleRemoveKDG = useCallback(
    (klg: WorkNodeHierarchy) => {
      deSelectRemovedId(knowledgeDomainGroupDepth);
      return removeChildImmutably(
        klg,
        joinPathUpTo(selectionSplitRef.current, knowledgeDomainGroupDepth)
      );
    },
    [deSelectRemovedId, selectionSplitRef]
  );
  return { handleAddKnowledgeDomainGroup, handleRemoveKDG };
}

export function useLeafEdits(
  selectionSplitRef: MutableRefObject<string[]>,
  sizeToAdd:
    | undefined
    | {
        id: number;
        value: number;
      },
  deSelectRemovedId: DeSelectRemovedId
) {
  const handleAddDeliveryAllocationLeaf = useCallback(
    (klg: WorkNodeHierarchy) => {
      return addDeliveryAllocationLeaf(
        klg,
        joinPathUpTo(
          selectionSplitRef.current,
          selectionSplitRef.current.length
        ),
        sizeToAdd?.value ?? 1
      );
    },
    [sizeToAdd, selectionSplitRef]
  );

  const handleRemoveDeliveryAllocationLeaf = useCallback(
    (klg: WorkNodeHierarchy) => {
      deSelectRemovedId(deliveryAllocationLeafDepth);
      return removeChildImmutably(
        klg,
        joinPathUpTo(selectionSplitRef.current, deliveryAllocationLeafDepth)
      );
    },
    [deSelectRemovedId, selectionSplitRef]
  );
  return {
    handleAddDeliveryAllocationLeaf,
    handleRemoveDeliveryAllocationLeaf
  };
}

export function useRemoveLeafList(
  deSelectRemovedId: DeSelectRemovedId,
  selectionSplitRef: MutableRefObject<string[]>
) {
  return useCallback(
    (klg: WorkNodeHierarchy) => {
      deSelectRemovedId(deliveryAllocationListDepth);
      return removeChildImmutably(
        klg,
        joinPathUpTo(selectionSplitRef.current, deliveryAllocationListDepth)
      );
    },
    [deSelectRemovedId, selectionSplitRef]
  );
}
