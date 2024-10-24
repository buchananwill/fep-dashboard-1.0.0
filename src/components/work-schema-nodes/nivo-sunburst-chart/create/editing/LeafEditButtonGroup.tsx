import {
  deliveryAllocationLeafDepth,
  knowledgeDomainGroupDepth,
  useLeafEdits
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/editSunburstHooks';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection
} from '@nextui-org/react';
import { Button } from '@mantine/core';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import React, { useCallback, useMemo, useState } from 'react';
import { ButtonEditGroupProps } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/BundleButtonGroup';
import { useSelectedEntityMap } from '@/hooks/useEntitySelection';
import { CycleDto } from '@/api/generated-types/generated-types';
import { EntityClassMap } from '@/api/entity-class-map';
import { MemoEditButton } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/WorkNodeHierarchyButton';
import { getCycleSubspanSize } from '@/components/work-schema-nodes/nivo-sunburst-chart/WorkNodeResponsiveSunburst';
import { useGlobalListener } from 'selective-context';
import {
  klsgTemplate,
  KnowledgeLevelSeriesGroupContextKey
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelSeriesGroupManager';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';

export default function LeafEditGroup({
  selectionLength,
  selectionSplitRef,
  deselectRemovedId
}: ButtonEditGroupProps) {
  const listenerKey = useUuidListenerKey();
  const {
    currentState: { cycle }
  } = useGlobalListener({
    contextKey: KnowledgeLevelSeriesGroupContextKey,
    initialValue: klsgTemplate,
    listenerKey
  });

  const cycleSubspanGroupSizeItems = useMemo(() => {
    if (!cycle) return [];

    return cycle.cycleSubspanGroupSizes.map((size, index) => ({
      id: index,
      value: size
    }));
  }, [cycle]);

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

  const {
    handleAddDeliveryAllocationLeaf,
    handleRemoveDeliveryAllocationLeaf
  } = useLeafEdits(selectionSplitRef, sizeToAdd, deselectRemovedId);

  return (
    <>
      <MemoEditButton
        editCommand={handleAddDeliveryAllocationLeaf}
        disabled={selectionLength <= knowledgeDomainGroupDepth || !sizeToAdd}
      >
        Add: {getCycleSubspanSize(sizeToAdd?.value ?? 1)}
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
          {(item) => (
            <DropdownItem key={item.id}>
              {getCycleSubspanSize(item.value)}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
      <MemoEditButton
        editCommand={handleRemoveDeliveryAllocationLeaf}
        disabled={selectionLength <= deliveryAllocationLeafDepth}
      >
        Remove
      </MemoEditButton>
    </>
  );
}
