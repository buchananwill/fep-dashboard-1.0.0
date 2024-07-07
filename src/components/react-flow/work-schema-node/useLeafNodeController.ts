import { Identifier, NamespacedHooks, useDtoStore } from 'dto-stores';
import { WorkSchemaNodeDto } from '@/api/dtos/WorkSchemaNodeDtoSchema';
import { CarouselOptionDto } from '@/api/dtos/CarouselOptionDtoSchema';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { useGlobalController, useGlobalDispatch } from 'selective-context';
import { useEffect, useMemo } from 'react';
import { AllocationRollupEntityClass } from '@/components/react-flow/work-schema-node/WorkSchemaNodeLayoutFlowWithForces';
import { ObjectPlaceholder } from '@/api/literals';
import { KEY_TYPES } from 'dto-stores/dist/literals';

export interface AllocationRollup {
  id: Identifier;
  allocationRollup: number[];
}

export function useLeafNodeController({
  id,
  carouselOptionId,
  workProjectSeriesSchemaId
}: WorkSchemaNodeDto) {
  const nodeId = `${id}`;

  const { entity: carouselOption } = useDtoStore<CarouselOptionDto>({
    entityId: carouselOptionId ?? 0,
    entityClass: EntityClassMap.carouselOption
  });
  const { entity: workProjectSeriesSchema } =
    useDtoStore<WorkProjectSeriesSchemaDto>({
      entityId:
        workProjectSeriesSchemaId ??
        carouselOption?.workProjectSeriesSchemaId ??
        '',
      entityClass: EntityClassMap.workProjectSeriesSchema
    });

  const { dispatchWithoutListen } =
    useGlobalDispatch<Map<string, WorkProjectSeriesSchemaDto>>(
      'leafToSchemaMap'
    );

  /**
   * If I remove this console log, the allocations/rollups don't calculate correctly. Carousel Options don't work.
   * */
  console.log(
    'carousel option id, carouselOption, schema id, schema',
    carouselOptionId,
    carouselOption,
    workProjectSeriesSchemaId,
    workProjectSeriesSchema
  );

  useEffect(() => {
    if (workProjectSeriesSchema) {
      dispatchWithoutListen((prevState) => {
        const updateMap = new Map(prevState.entries());
        updateMap.set(nodeId, workProjectSeriesSchema);
        return updateMap;
      });
    }
  }, [workProjectSeriesSchema, dispatchWithoutListen, nodeId]);

  const { currentState: allocationRollup } =
    useGlobalController<AllocationRollup>({
      contextKey: `${AllocationRollupEntityClass}:${nodeId}`,
      initialValue: ObjectPlaceholder as AllocationRollup,
      listenerKey: `baseNode:${nodeId}`
    });

  const dispatch = NamespacedHooks.useDispatch<string[]>(
    AllocationRollupEntityClass,
    KEY_TYPES.ID_LIST
  );
  useEffect(() => {
    dispatch((list) => (list.includes(nodeId) ? list : [...list, nodeId]));
  }, [dispatch, nodeId]);

  return useMemo(() => {
    return allocationRollup?.allocationRollup
      ? allocationRollup.allocationRollup.reduce((prev, curr) => prev + curr, 0)
      : 0;
  }, [allocationRollup]);
}
