import {
  deliveryAllocationLeafDepth,
  knowledgeDomainGroupDepth,
  useLeafEdits
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/editSunburstHooks';
import { Button, Combobox, useCombobox } from '@mantine/core';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import React, { useCallback, useMemo, useState } from 'react';
import { ButtonEditGroupProps } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/BundleButtonGroup';
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
      value: String(index),
      label: String(size),
      id: size
    }));
  }, [cycle]);

  const [sizeToAdd, setSizeToAdd] = useState<
    { id: number; value: string; label: string } | undefined
  >(undefined);
  const handleSelectionOfSize = useCallback(
    (selection: string) => {
      setSizeToAdd(
        cycleSubspanGroupSizeItems.find((item) => item.value === selection)
      );
    },
    [cycleSubspanGroupSizeItems]
  );

  const comboBox = useCombobox({});

  const {
    handleAddDeliveryAllocationLeaf,
    handleRemoveDeliveryAllocationLeaf
  } = useLeafEdits(selectionSplitRef, sizeToAdd?.id, deselectRemovedId);

  return (
    <>
      <MemoEditButton
        editCommand={handleAddDeliveryAllocationLeaf}
        disabled={selectionLength <= knowledgeDomainGroupDepth || !sizeToAdd}
      >
        Add: {getCycleSubspanSize(sizeToAdd?.id ?? 1)}
      </MemoEditButton>
      <Combobox
        position={'bottom-end'}
        store={comboBox}
        onOptionSubmit={(value, optionProps) => {
          handleSelectionOfSize(value);
          comboBox.closeDropdown();
        }}
        classNames={{
          option: 'text-right'
        }}
      >
        <Combobox.Target>
          <Button
            className={'rounded-none'}
            onClick={() => comboBox.toggleDropdown()}
          >
            <ChevronDownIcon className={'h-6 w-6'} />
          </Button>
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Options>
            {cycleSubspanGroupSizeItems.map((cycleSubspanGroupSizeItem) => (
              <Combobox.Option
                key={cycleSubspanGroupSizeItem.value}
                active={cycleSubspanGroupSizeItem.id === sizeToAdd?.id}
                selected={cycleSubspanGroupSizeItem.id === sizeToAdd?.id}
                value={cycleSubspanGroupSizeItem.value}
              >
                {cycleSubspanGroupSizeItem.label}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
      <MemoEditButton
        editCommand={handleRemoveDeliveryAllocationLeaf}
        disabled={selectionLength <= deliveryAllocationLeafDepth}
      >
        Remove
      </MemoEditButton>
    </>
  );
}
