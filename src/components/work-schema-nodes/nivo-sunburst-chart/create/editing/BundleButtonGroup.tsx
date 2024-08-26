import {
  bundleDepth,
  DeSelectRemovedId,
  useBundleEdits
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/editSunburstHooks';
import React from 'react';
import { SelectionSplitRef } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/EditButtonGroup';
import { MemoEditButton } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/WorkNodeHierarchyButton';

export type ButtonEditGroupProps = {
  selectionSplitRef: SelectionSplitRef;
  selectionLength: number;
  deselectRemovedId: DeSelectRemovedId;
};
export default function BundleButtonGroup({
  selectionSplitRef,
  deselectRemovedId,
  selectionLength
}: ButtonEditGroupProps) {
  const { removeBundle, handleAddBundle } = useBundleEdits(
    deselectRemovedId,
    selectionSplitRef
  );

  return (
    <>
      <MemoEditButton editCommand={handleAddBundle}>Add</MemoEditButton>
      <MemoEditButton
        editCommand={removeBundle}
        isDisabled={selectionLength < bundleDepth}
      >
        Remove
      </MemoEditButton>
    </>
  );
}
