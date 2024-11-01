import {
  bundleDepth,
  DeSelectRemovedId,
  useBundleEdits
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/editSunburstHooks';
import React from 'react';
import { SelectionSplitRef } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/EditButtonGroup';
import { MemoEditButton } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/WorkNodeHierarchyButton';

import { EditWorkNodeDetails } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/EditWorkNodeDetails';
import { EditBundleDetails } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/EditBundleDetails';

export type ButtonEditGroupProps = {
  selectionSplitRef: SelectionSplitRef;
  selectionLength: number;
  deselectRemovedId: DeSelectRemovedId;
};

export default function BundleButtonGroup(props: ButtonEditGroupProps) {
  const { selectionSplitRef, deselectRemovedId, selectionLength } = props;
  const { removeBundle, handleAddBundle } = useBundleEdits(
    deselectRemovedId,
    selectionSplitRef
  );

  return (
    <>
      <MemoEditButton editCommand={handleAddBundle}>Add</MemoEditButton>
      <MemoEditButton
        editCommand={removeBundle}
        disabled={selectionLength < bundleDepth}
      >
        Remove
      </MemoEditButton>
      <EditBundleDetails {...props} />
    </>
  );
}
