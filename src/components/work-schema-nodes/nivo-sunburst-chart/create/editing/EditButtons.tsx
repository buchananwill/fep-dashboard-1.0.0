'use client';
import WorkNodeHierarchyButton from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/WorkNodeHierarchyButton';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useGlobalController } from 'selective-context';
import {
  K_D_TEMPLATE_ID,
  KnowledgeLevelGroupTemplate
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelSeriesGroupManager';
import {
  addBundle,
  addDeliveryAllocationLeaf,
  produceKnowledgeDomainGroup,
  removeChildImmutably
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/knowledgeLevelGroupProducers';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection
} from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useSplitSelectionPath } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/selection/useSplitSelectionPath';
import { joinPathUpTo } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/selection/joinPathUpTo';
import { useSelectedEntityMap } from '@/hooks/useEntitySelection';
import { EntityClassMap } from '@/api/entity-class-map';
import { CycleDto } from '@/api/generated-types/generated-types';
import { joinPath } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/knowledgeLevelGroupFunctions';
import {
  DiscriminatorOrder,
  getTypeDepth,
  KnowledgeLevelSeriesGroup,
  NestedWorkNode,
  WorkNodeHierarchy
} from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';

export const SelectionPathKey = 'selectionPath';

const bundleDepth = getTypeDepth('bundle');
const knowledgeDomainGroupDepth = getTypeDepth('knowledgeDomainGroup');
const deliveryAllocationListDepth = getTypeDepth('leafList');
const deliveryAllocationLeafDepth = getTypeDepth('leaf');

export default function EditButtons({
  initialKnowledgeLevelSeriesGroup
}: {
  initialKnowledgeLevelSeriesGroup: KnowledgeLevelSeriesGroup;
}) {
  const { currentState, dispatch } = useGlobalController({
    contextKey: SelectionPathKey,
    initialValue: initialKnowledgeLevelSeriesGroup.path,
    listenerKey: 'edit-buttons'
  });
  const [path, selectionSplit] = useSplitSelectionPath(currentState);
  const selectionSplitRef = useRef(selectionSplit);
  selectionSplitRef.current = selectionSplit;
  const cycleMap = useSelectedEntityMap<CycleDto>(EntityClassMap.cycle);

  const cycleSubspanGroupSizeItems = useMemo(() => {
    if (cycleMap.currentState.size === 0) return [];
    const cycleDto = [...cycleMap.currentState.values()][0];
    return cycleDto.cycleSubspanGroupSizes.map((size, index) => ({
      id: index,
      value: size
    }));
  }, [cycleMap]);

  const [sizeToAdd, setSizeToAdd] = useState<
    { id: number; value: number } | undefined
  >(undefined);
  const handleSelectionOfSize = useCallback(
    (selection: Selection) => {
      if (selection === 'all')
        throw Error(
          'all not allowed and this is hands down the most annoying "feature" of NextUI'
        );
      const selectionId = [...selection.values()][0];
      const find = cycleSubspanGroupSizeItems.find(
        (item) => String(item.id) === selectionId
      );
      setSizeToAdd(find);
    },
    [cycleSubspanGroupSizeItems]
  );

  const deSelectRemovedId = useCallback(
    (idDepth: number) => {
      const newSelection = joinPath(
        ...selectionSplitRef.current.slice(0, idDepth - 1)
      );
      dispatch(newSelection);
    },
    [dispatch]
  );

  const removeBundle = useCallback(
    (klg: WorkNodeHierarchy) => {
      deSelectRemovedId(bundleDepth);
      return removeChildImmutably(
        klg,
        joinPathUpTo(selectionSplitRef.current, bundleDepth)
      );
    },
    [deSelectRemovedId]
  );

  const handleAddKnowledgeDomainGroup = useCallback(
    (klg: WorkNodeHierarchy) => {
      return produceKnowledgeDomainGroup(
        klg,
        joinPathUpTo(selectionSplitRef.current, bundleDepth)
      );
    },
    []
  );

  const handleRemoveKDG = useCallback(
    (klg: WorkNodeHierarchy) => {
      deSelectRemovedId(knowledgeDomainGroupDepth);
      return removeChildImmutably(
        klg,
        joinPathUpTo(selectionSplitRef.current, knowledgeDomainGroupDepth)
      );
    },
    [deSelectRemovedId]
  );

  const handleAddDeliveryAllocationLeaf = useCallback(
    (klg: WorkNodeHierarchy) => {
      return addDeliveryAllocationLeaf(
        klg,
        joinPathUpTo(selectionSplitRef.current, knowledgeDomainGroupDepth),
        sizeToAdd?.value ?? 1
      );
    },
    [sizeToAdd]
  );

  const handleRemoveDeliveryAllocationLeaf = useCallback(
    (klg: WorkNodeHierarchy) => {
      deSelectRemovedId(deliveryAllocationLeafDepth);
      return removeChildImmutably(
        klg,
        joinPathUpTo(selectionSplitRef.current, deliveryAllocationLeafDepth)
      );
    },
    [deSelectRemovedId]
  );

  const handleRemoveDeliveryAllocationList = useCallback(
    (klg: WorkNodeHierarchy) => {
      deSelectRemovedId(deliveryAllocationListDepth);
      return removeChildImmutably(
        klg,
        joinPathUpTo(selectionSplitRef.current, deliveryAllocationListDepth)
      );
    },
    [deSelectRemovedId]
  );

  const handleAddBundle = useCallback((wnh: WorkNodeHierarchy) => {
    return addBundle(wnh, joinPath(...selectionSplitRef.current));
  }, []);

  return (
    <div className={'flex flex-col gap-2'}>
      <div>
        <MemoEditButton editCommand={handleAddBundle}>Add</MemoEditButton>
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
      <div className={'flex'}>
        <MemoEditButton
          editCommand={handleAddDeliveryAllocationLeaf}
          isDisabled={
            selectionSplit.length < knowledgeDomainGroupDepth || !sizeToAdd
          }
        >
          Add: {sizeToAdd?.value ?? 1}
        </MemoEditButton>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button isIconOnly className={'rounded-none'}>
              <ChevronDownIcon className={'h-6 w-6'} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection={true}
            aria-label="Merge options"
            selectedKeys={sizeToAdd ? [String(sizeToAdd.id)] : []}
            selectionMode="single"
            onSelectionChange={handleSelectionOfSize}
            className="max-w-[300px]"
            items={cycleSubspanGroupSizeItems}
          >
            {(item) => <DropdownItem key={item.id}>{item.value}</DropdownItem>}
          </DropdownMenu>
        </Dropdown>
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

const MemoEditButton = React.memo(WorkNodeHierarchyButton);

const dropdownItems = [
  { id: 1, value: 1 },
  { id: 2, value: 2 }
];
