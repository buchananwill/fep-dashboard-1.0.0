import {
  deliveryAllocationListDepth,
  useRemoveLeafList
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/editSunburstHooks';
import React, { useMemo } from 'react';
import { ButtonEditGroupProps } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/BundleButtonGroup';
import { MemoEditButton } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/WorkNodeHierarchyButton';
import { usePathSelectionListener } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/selection/usePathSelectionListener';
import { getTypeDepth } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { getCycleSubspanSize } from '@/components/work-schema-nodes/nivo-sunburst-chart/WorkNodeResponsiveSunburst';

export default function LeafListButtonGroup({
  selectionLength,
  deselectRemovedId,
  selectionSplitRef
}: ButtonEditGroupProps) {
  const handleRemoveDeliveryAllocationList = useRemoveLeafList(
    deselectRemovedId,
    selectionSplitRef
  );
  const [path, splitPath] = usePathSelectionListener('leafListButton');

  const hours = useMemo(() => {
    const hours = parseInt(splitPath[getTypeDepth('leafList')]);
    return isNaN(hours) ? '' : getCycleSubspanSize(hours);
  }, [splitPath]);

  return (
    <MemoEditButton
      editCommand={handleRemoveDeliveryAllocationList}
      isDisabled={selectionLength <= deliveryAllocationListDepth}
    >
      Remove all leaves: {hours}
    </MemoEditButton>
  );
}
