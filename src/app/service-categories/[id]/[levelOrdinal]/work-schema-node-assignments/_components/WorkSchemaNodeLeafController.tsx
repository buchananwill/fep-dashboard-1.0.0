import { DataNode } from 'react-d3-force-wrapper';
import { WorkSchemaNodeDto } from '@/api/dtos/WorkSchemaNodeDtoSchema';

import { useLeafNodeController } from '@/components/react-flow/work-schema-node/useLeafNodeController';
import { Identifier, NamespacedHooks, useDtoStore } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { useEffect } from 'react';
import { safeFunctionalSplice } from 'dto-stores/dist/functions/safeFunctionalSplice';
import { useGlobalController } from 'selective-context';
import { CarouselOptionDto } from '@/api/dtos/CarouselOptionDtoSchema';

function useConditionalLazyDtoRequest(
  id: Identifier | undefined,
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
