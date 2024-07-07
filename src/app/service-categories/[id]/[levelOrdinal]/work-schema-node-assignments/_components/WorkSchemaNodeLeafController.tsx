import { DataNode } from 'react-d3-force-wrapper';
import { WorkSchemaNodeDto } from '@/api/dtos/WorkSchemaNodeDtoSchema';

import { useLeafNodeController } from '@/components/react-flow/work-schema-node/useLeafNodeController';
import { NamespacedHooks, useLazyDtoStore } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { useEffect } from 'react';
import { safeFunctionalSplice } from 'dto-stores/dist/functions/safeFunctionalSplice';
import { useGlobalController } from 'selective-context';

export default function WorkSchemaNodeLeafController({
  node
}: {
  node: DataNode<WorkSchemaNodeDto>;
}) {
  const { workProjectSeriesSchemaId } = node.data;
  const dispatch = NamespacedHooks.useDispatch(
    EntityClassMap.workProjectSeriesSchema,
    KEY_TYPES.ID_LIST
  );

  useEffect(() => {
    if (workProjectSeriesSchemaId !== undefined) {
      dispatch((list: (string | number)[]) => [
        ...list,
        workProjectSeriesSchemaId
      ]);
    }
    return () => {
      if (workProjectSeriesSchemaId !== undefined) {
        dispatch((list: (string | number)[]) => {
          return safeFunctionalSplice(list, workProjectSeriesSchemaId);
        });
      }
    };
  }, [dispatch, workProjectSeriesSchemaId]);

  const rollupTotal = useLeafNodeController(node.data);

  const { dispatch: dispatchRollupTotal } = useGlobalController({
    contextKey: `rollupTotal:${node.id}`,
    listenerKey: 'controller',
    initialValue: rollupTotal
  });

  useEffect(() => {
    dispatchRollupTotal(rollupTotal);
  }, [rollupTotal, dispatchRollupTotal]);

  return null;
}
