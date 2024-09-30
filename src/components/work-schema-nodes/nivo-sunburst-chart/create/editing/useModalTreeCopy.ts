import { useGlobalDispatchAndListener } from 'selective-context';
import {
  klsgTemplate,
  KnowledgeLevelSeriesGroupContextKey
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelSeriesGroupManager';
import { useCallback, useState } from 'react';
import { KnowledgeLevelSeriesGroup } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { useRefUpdatedEachRender } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/selection/useRefUpdatedEachRender';
import { usePathSelectionListener } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/selection/usePathSelectionListener';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';

export function useModalTreeCopy(onClose: () => void) {
  const listenerKey = useUuidListenerKey();
  const { currentState, dispatchWithoutControl } = useGlobalDispatchAndListener(
    {
      contextKey: KnowledgeLevelSeriesGroupContextKey,
      listenerKey: listenerKey,
      initialValue: klsgTemplate
    }
  );
  const [modalCopy, setModalCopy] = useState(
    currentState as KnowledgeLevelSeriesGroup
  );
  const mutableRefObject = useRefUpdatedEachRender(modalCopy);

  const [path, splittedPath] = usePathSelectionListener(listenerKey);

  const confirmChanges = useCallback(() => {
    dispatchWithoutControl(mutableRefObject.current);
    onClose();
  }, [dispatchWithoutControl, mutableRefObject, onClose]);
  return { modalCopy, setModalCopy, path, splittedPath, confirmChanges };
}
