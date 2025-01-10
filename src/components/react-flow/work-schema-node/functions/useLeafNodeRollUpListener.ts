import { Identifier, NamespacedHooks } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { useGlobalDispatch, useGlobalListener } from 'selective-context';
import { useEffect, useMemo } from 'react';
import { AllocationRollupEntityClass } from '@/components/react-flow/work-schema-node/components/WorkSchemaNodeLayoutFlowWithForces';
import { ObjectPlaceholder } from '@/api/client-literals';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { WorkSchemaDto } from '@/api/generated-types/generated-types_';
import { WorkSchemaNodeDto } from '@/components/react-flow/generic/utils/adaptors';
import { useQuery } from '@tanstack/react-query';
import { Api } from '@/api/clientApi';

export interface AllocationRollup {
  id: Identifier;
  allocationRollup: number[];
}

export function useLeafNodeRollUpListener({
  id,
  workSchemaId
}: WorkSchemaNodeDto) {
  const nodeId = `${id}`;

  // const { data: workSchema, isPending } = useQuery({
  //   queryKey: [
  //     EntityClassMap.workSchema,
  //     workSchemaId
  //   ],
  //   queryFn: () =>
  //     workSchemaId
  //       ? Api.WorkSchema.getOne(workSchemaId)
  //       : undefined
  // });

  // const { dispatchWithoutListen } =
  //   useGlobalDispatch<Map<string, WorkSchemaDto>>(
  //     'leafToSchemaMap'
  //   );
  //
  // useEffect(() => {
  //   if (workSchema) {
  //     dispatchWithoutListen((prevState) => {
  //       const updateMap = new Map(prevState.entries());
  //       updateMap.set(nodeId, workSchema);
  //       return updateMap;
  //     });
  //   }
  // }, [workSchema, dispatchWithoutListen, nodeId]);

  const { currentState: allocationRollup } =
    useGlobalListener<AllocationRollup>({
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
