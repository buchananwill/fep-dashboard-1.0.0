import { useGlobalListener } from 'selective-context';
import { SelectionPathKey } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/EditButtons';
import { K_D_TEMPLATE_ID } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelSeriesGroupManager';
import { useSplitSelectionPath } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/useSplitSelectionPath';

export function usePathSelectionListener(listenerKey: string) {
  const { currentState: selectionPath } = useGlobalListener({
    contextKey: SelectionPathKey,
    initialValue: '',
    listenerKey: listenerKey
  });

  return useSplitSelectionPath(selectionPath);
}
