import {
  deliveryAllocationListDepth,
  useRemoveLeafList
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/editSunburstHooks';
import React from 'react';
import { ButtonEditGroupProps } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/BundleButtonGroup';
import { MemoEditButton } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/WorkNodeHierarchyButton';

export default function LeafListButtonGroup({
  selectionLength,
  deselectRemovedId,
  selectionSplitRef
}: ButtonEditGroupProps) {
  const handleRemoveDeliveryAllocationList = useRemoveLeafList(
    deselectRemovedId,
    selectionSplitRef
  );

  return (
    <MemoEditButton
      editCommand={handleRemoveDeliveryAllocationList}
      isDisabled={selectionLength < deliveryAllocationListDepth}
    >
      Remove
    </MemoEditButton>
  );
}
