'use client';
import { K_D_TEMPLATE_ID } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelSeriesGroupManager';
import NestedWorkNodeChildSelector from '@/components/work-schema-nodes/nivo-sunburst-chart/create/NestedWorkNodeChildSelector';
import { useGlobalListener } from 'selective-context';
import { SelectionIdPathKey } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/EditButtons';
import { useSplitSelectionPath } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/useSplitSelectionPath';
import { joinPath } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/knowledgeLevelGroupFunctions';

export function usePathSelectionListener(listenerKey: string) {
  const { currentState: selectionPath } = useGlobalListener({
    contextKey: SelectionIdPathKey,
    initialValue: K_D_TEMPLATE_ID,
    listenerKey: listenerKey
  });

  return useSplitSelectionPath(selectionPath);
}

export default function Selectors() {
  const splitSelectionPath = usePathSelectionListener('selectors');

  return (
    <div className={'flex flex-col gap-2'}>
      {splitSelectionPath.map((pathSection, index, array) => {
        const selectionParts = array.length;
        const parentPath = joinPath(...array.slice(0, index + 1));
        const selectionId =
          index + 1 === selectionParts
            ? ''
            : joinPath(...array.slice(0, index + 2));
        return (
          <NestedWorkNodeChildSelector
            parentPath={parentPath}
            selectionPath={selectionId}
            key={index}
            aria-label={`select child of ${parentPath}`}
          />
        );
      })}
    </div>
  );
}
