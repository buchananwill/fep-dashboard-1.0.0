'use client';
import KnowledgeLevelGroupEditButton from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelGroupEditButton';
import React, { useCallback, useMemo, useState } from 'react';
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
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/knowledgeLevelGroupProducers';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection
} from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useSplitSelectionPath } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/useSplitSelectionPath';
import { joinPathUpTo } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/joinPathUpTo';
import { useSelectedEntityMap } from '@/hooks/useEntitySelection';
import { EntityClassMap } from '@/api/entity-class-map';
import { CycleDto } from '@/api/generated-types/generated-types';
import { joinPath } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/knowledgeLevelGroupFunctions';
import { KnowledgeLevelSeriesGroup } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';

export const SelectionPathKey = 'selectionPath';

const bundleDepth = 2;
const knowledgeDomainGroupDepth = 3;
const deliveryAllocationListDepth = 4;
const deliveryAllocationLeafDepth = 5;

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
      const newSelection = joinPath(...selectionSplit.slice(0, idDepth - 1));
      dispatch(newSelection);
    },
    [selectionSplit, dispatch]
  );

  const removeBundle = useCallback(
    (klg: KnowledgeLevelGroupTemplate) => {
      deSelectRemovedId(bundleDepth);
      return removeChildImmutably(
        klg,
        joinPathUpTo(selectionSplit, bundleDepth)
      );
    },
    [selectionSplit, deSelectRemovedId]
  );

  const handleAddKnowledgeDomainGroup = useCallback(
    (klg: KnowledgeLevelGroupTemplate) => {
      return produceKnowledgeDomainGroup(
        klg,
        joinPathUpTo(selectionSplit, bundleDepth)
      );
    },
    [selectionSplit]
  );

  const handleRemoveKDG = useCallback(
    (klg: KnowledgeLevelGroupTemplate) => {
      deSelectRemovedId(knowledgeDomainGroupDepth);
      return removeChildImmutably(
        klg,
        joinPathUpTo(selectionSplit, knowledgeDomainGroupDepth)
      );
    },
    [selectionSplit, deSelectRemovedId]
  );

  const handleAddDeliveryAllocationLeaf = useCallback(
    (klg: KnowledgeLevelGroupTemplate) => {
      return addDeliveryAllocationLeaf(
        klg,
        joinPathUpTo(selectionSplit, knowledgeDomainGroupDepth),
        sizeToAdd?.value ?? 1
      );
    },
    [selectionSplit, sizeToAdd]
  );

  const handleRemoveDeliveryAllocationLeaf = useCallback(
    (klg: KnowledgeLevelGroupTemplate) => {
      deSelectRemovedId(deliveryAllocationLeafDepth);
      return removeChildImmutably(
        klg,
        joinPathUpTo(selectionSplit, deliveryAllocationLeafDepth)
      );
    },
    [selectionSplit, deSelectRemovedId]
  );

  const handleRemoveDeliveryAllocationList = useCallback(
    (klg: KnowledgeLevelGroupTemplate) => {
      deSelectRemovedId(deliveryAllocationListDepth);
      return removeChildImmutably(
        klg,
        joinPathUpTo(selectionSplit, deliveryAllocationListDepth)
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

const MemoEditButton = React.memo(KnowledgeLevelGroupEditButton);

const dropdownItems = [
  { id: 1, value: 1 },
  { id: 2, value: 2 }
];
