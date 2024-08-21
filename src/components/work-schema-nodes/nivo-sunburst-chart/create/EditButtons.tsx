'use client';
import KnowledgeLevelGroupEditButton from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelGroupEditButton';
import React, { useCallback, useMemo } from 'react';
import { useGlobalController } from 'selective-context';
import {
  K_D_TEMPLATE_ID,
  KnowledgeLevelGroupTemplate
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelGroupManager';
import {
  addBundle,
  addDeliveryAllocationLeaf,
  addKnowledgeDomainGroup,
  removeChildImmutably
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/knowledgeLevelGroupProducers';

export const SelectionIdPathKey = 'selectionIdPath';

function joinIdPath(selectionSplit: string[], childDepth: number) {
  return selectionSplit.slice(0, childDepth).join(':');
}

const bundleDepth = 2;
const knowledgeDomainGroupDepth = 3;
const deliveryAllocationListDepth = 4;
const deliveryAllocationLeafDepth = 5;

export function useSplitSelectionPath(currentState: string) {
  return useMemo(() => {
    return currentState.split(':');
  }, [currentState]);
}

export default function EditButtons() {
  const { currentState, dispatch } = useGlobalController({
    contextKey: SelectionIdPathKey,
    initialValue: K_D_TEMPLATE_ID,
    listenerKey: 'edit-buttons'
  });
  const selectionSplit = useSplitSelectionPath(currentState);

  const deSelectRemovedId = useCallback(
    (idDepth: number) => {
      const newSelection = selectionSplit.slice(0, idDepth - 1).join(':');
      console.log(newSelection, selectionSplit, idDepth);
      dispatch(newSelection);
    },
    [selectionSplit, dispatch]
  );

  const removeBundle = useCallback(
    (klg: KnowledgeLevelGroupTemplate) => {
      deSelectRemovedId(bundleDepth);
      return removeChildImmutably(klg, joinIdPath(selectionSplit, bundleDepth));
    },
    [selectionSplit, deSelectRemovedId]
  );

  const handleAddKnowledgeDomainGroup = useCallback(
    (klg: KnowledgeLevelGroupTemplate) => {
      return addKnowledgeDomainGroup(
        klg,
        joinIdPath(selectionSplit, bundleDepth)
      );
    },
    [selectionSplit]
  );

  const handleRemoveKDG = useCallback(
    (klg: KnowledgeLevelGroupTemplate) => {
      deSelectRemovedId(knowledgeDomainGroupDepth);
      return removeChildImmutably(
        klg,
        joinIdPath(selectionSplit, knowledgeDomainGroupDepth)
      );
    },
    [selectionSplit, deSelectRemovedId]
  );

  const handleAddDeliveryAllocationLeaf = useCallback(
    (klg: KnowledgeLevelGroupTemplate) => {
      return addDeliveryAllocationLeaf(
        klg,
        joinIdPath(selectionSplit, knowledgeDomainGroupDepth),
        1
      );
    },
    [selectionSplit]
  );

  const handleRemoveDeliveryAllocationLeaf = useCallback(
    (klg: KnowledgeLevelGroupTemplate) => {
      deSelectRemovedId(deliveryAllocationLeafDepth);
      return removeChildImmutably(
        klg,
        joinIdPath(selectionSplit, deliveryAllocationLeafDepth)
      );
    },
    [selectionSplit, deSelectRemovedId]
  );

  const handleRemoveDeliveryAllocationList = useCallback(
    (klg: KnowledgeLevelGroupTemplate) => {
      deSelectRemovedId(deliveryAllocationListDepth);
      return removeChildImmutably(
        klg,
        joinIdPath(selectionSplit, deliveryAllocationListDepth)
      );
    },
    [selectionSplit, deSelectRemovedId]
  );

  return (
    <div className={'flex flex-col gap-2'}>
      <div>
        <MemoEditButton editCommand={addBundle}>Add</MemoEditButton>
        <MemoEditButton
          editCommand={removeBundle}
          isDisabled={selectionSplit.length < bundleDepth}
        >
          Remove
        </MemoEditButton>
      </div>
      <div>
        <MemoEditButton
          editCommand={handleAddKnowledgeDomainGroup}
          isDisabled={selectionSplit.length < bundleDepth}
        >
          Add
        </MemoEditButton>
        <MemoEditButton
          editCommand={handleRemoveKDG}
          isDisabled={selectionSplit.length < knowledgeDomainGroupDepth}
        >
          Remove
        </MemoEditButton>
      </div>
      <div>
        {/*<MemoEditButton*/}
        {/*  editCommand={handleAddDeliveryAllocationLeaf}*/}
        {/*  isDisabled={selectionSplit.length < knowledgeDomainGroupDepth}*/}
        {/*>*/}
        {/*  Add*/}
        {/*</MemoEditButton>*/}
        <MemoEditButton
          editCommand={handleRemoveDeliveryAllocationList}
          isDisabled={selectionSplit.length < deliveryAllocationListDepth}
        >
          Remove
        </MemoEditButton>
      </div>
      <div>
        <MemoEditButton
          editCommand={handleAddDeliveryAllocationLeaf}
          isDisabled={selectionSplit.length < knowledgeDomainGroupDepth}
        >
          Add
        </MemoEditButton>
        <MemoEditButton
          editCommand={handleRemoveDeliveryAllocationLeaf}
          isDisabled={selectionSplit.length < deliveryAllocationLeafDepth}
        >
          Remove
        </MemoEditButton>
      </div>
    </div>
  );
}

const MemoEditButton = React.memo(KnowledgeLevelGroupEditButton);
