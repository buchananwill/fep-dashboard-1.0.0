import {
  bundleDepth,
  knowledgeDomainGroupDepth,
  useKnowledgeDomainGroupEdits
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/editSunburstHooks';
import React from 'react';
import { ButtonEditGroupProps } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/BundleButtonGroup';
import { MemoEditButton } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/WorkNodeHierarchyButton';
import { EditKnowledgeDomainDetails } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/EditKnowledgeDomainGroupDetails';

export default function KnowledgeDomainGroupButtons(
  props: ButtonEditGroupProps
) {
  const { selectionSplitRef, deselectRemovedId, selectionLength } = props;
  const { handleAddKnowledgeDomainGroup, handleRemoveKDG } =
    useKnowledgeDomainGroupEdits(selectionSplitRef, deselectRemovedId);

  return (
    <>
      <MemoEditButton
        editCommand={handleAddKnowledgeDomainGroup}
        disabled={selectionLength < knowledgeDomainGroupDepth}
      >
        Add
      </MemoEditButton>
      <MemoEditButton
        editCommand={handleRemoveKDG}
        disabled={selectionLength <= knowledgeDomainGroupDepth}
      >
        Remove
      </MemoEditButton>
      <EditKnowledgeDomainDetails {...props} />
    </>
  );
}
