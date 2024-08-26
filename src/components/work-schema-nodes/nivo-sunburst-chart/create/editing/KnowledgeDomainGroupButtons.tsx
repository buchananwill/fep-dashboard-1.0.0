import {
  bundleDepth,
  knowledgeDomainGroupDepth,
  useKnowledgeDomainGroupEdits
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/editSunburstHooks';
import React from 'react';
import { ButtonEditGroupProps } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/BundleButtonGroup';
import { MemoEditButton } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/WorkNodeHierarchyButton';

export default function KnowledgeDomainGroupButtons({
  selectionSplitRef,
  deselectRemovedId,
  selectionLength
}: ButtonEditGroupProps) {
  const { handleAddKnowledgeDomainGroup, handleRemoveKDG } =
    useKnowledgeDomainGroupEdits(selectionSplitRef, deselectRemovedId);

  return (
    <>
      <MemoEditButton
        editCommand={handleAddKnowledgeDomainGroup}
        isDisabled={selectionLength < bundleDepth}
      >
        Add
      </MemoEditButton>
      <MemoEditButton
        editCommand={handleRemoveKDG}
        isDisabled={selectionLength < knowledgeDomainGroupDepth}
      >
        Remove
      </MemoEditButton>
    </>
  );
}
