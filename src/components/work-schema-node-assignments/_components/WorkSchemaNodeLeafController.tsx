import { DataNode } from 'react-d3-force-wrapper';

import { useLeafNodeRollUpListener } from '@/components/react-flow/work-schema-node/useLeafNodeRollUpListener';
import { Identifier, NamespacedHooks, useDtoStore } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { useEffect } from 'react';
import { safeFunctionalSplice } from 'dto-stores/dist/functions/safeFunctionalSplice';
import { useGlobalController } from 'selective-context';
import { CarouselOptionDto } from '@/api/generated-types/generated-types';
import { WorkSchemaNodeDto } from '@/components/react-flow/generic/utils/adaptors';

function useConditionalLazyDtoRequest(
  id: Identifier | undefined | null,
  entityClass: string
) {
  const dispatch = NamespacedHooks.useDispatch(entityClass, KEY_TYPES.ID_LIST);

  useEffect(() => {
    if (id !== undefined) {
      dispatch((list: (string | number)[]) => [...list, id]);
    }
    return () => {
      if (id !== undefined) {
        dispatch((list: (string | number)[]) => {
          return safeFunctionalSplice(list, id);
        });
      }
    };
  }, [dispatch, id]);
}

export default function WorkSchemaNodeLeafController({
  node
}: {
  node: DataNode<WorkSchemaNodeDto>;
}) {
  const { workProjectSeriesSchemaId, carouselOptionId } = node.data;

  useConditionalLazyDtoRequest(carouselOptionId, EntityClassMap.carouselOption);
  const { entity: carouselOption } = useDtoStore<CarouselOptionDto>({
    entityId: carouselOptionId ?? 0,
    entityClass: EntityClassMap.carouselOption
  });
  useConditionalLazyDtoRequest(
    workProjectSeriesSchemaId ?? carouselOption?.workProjectSeriesSchemaId,
    EntityClassMap.workProjectSeriesSchema
  );

  const rollupTotal = useLeafNodeRollUpListener(node.data);

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
