'use client';
import { K_D_TEMPLATE_ID } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelGroupManager';
import NestedWorkNodeChildSelector from '@/components/work-schema-nodes/nivo-sunburst-chart/create/NestedWorkNodeChildSelector';
import { useGlobalListener } from 'selective-context';
import {
  SelectionIdPathKey,
  useSplitSelectionPath
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/EditButtons';

export default function Selectors() {
  const { currentState: selectionPath } = useGlobalListener({
    contextKey: SelectionIdPathKey,
    initialValue: K_D_TEMPLATE_ID,
    listenerKey: 'selectors'
  });

  const splitSelectionPath = useSplitSelectionPath(selectionPath);

  return (
    <div className={'flex flex-col gap-2'}>
      {splitSelectionPath.map((idPart, index, array) => {
        const selectionParts = array.length;
        const parentId = array.slice(0, index + 1).join(':');
        const selectionId =
          index + 1 === selectionParts
            ? ''
            : array.slice(0, index + 2).join(':');
        return (
          <NestedWorkNodeChildSelector
            parentId={parentId}
            selectionId={selectionId}
            key={index}
            aria-label={`select child of ${parentId}`}
          />
        );
      })}
    </div>
  );
}
