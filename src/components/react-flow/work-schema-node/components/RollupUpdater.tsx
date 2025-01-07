import { Identifier, NamespacedHooks, useWriteAnyDto } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/client-literals';
import { useEffect } from 'react';
import { AllocationRollupEntityClass } from '@/components/react-flow/work-schema-node/components/WorkSchemaNodeLayoutFlowWithForces';
import { AllocationRollup } from '@/components/react-flow/work-schema-node/functions/useLeafNodeRollUpListener';

export function RollupUpdater({
  allocationRollupEntities
}: {
  allocationRollupEntities: AllocationRollup[];
}) {
  const { currentState: rollupIdList } = NamespacedHooks.useListen(
    AllocationRollupEntityClass,
    KEY_TYPES.ID_LIST,
    'rollupUpdater',
    EmptyArray as Identifier[]
  );

  const dispatchMasterList = NamespacedHooks.useDispatch(
    AllocationRollupEntityClass,
    KEY_TYPES.MASTER_LIST
  );

  const writeAnyAllocationRollup = useWriteAnyDto<AllocationRollup>(
    AllocationRollupEntityClass
  );

  useEffect(() => {
    dispatchMasterList(allocationRollupEntities);
  }, [allocationRollupEntities, dispatchMasterList]);
  useEffect(() => {
    allocationRollupEntities
      .filter((entity) => rollupIdList.includes(entity.id))
      .forEach((filteredEntity, key) => {
        const idAsString = `${filteredEntity.id}`;
        writeAnyAllocationRollup(idAsString, filteredEntity);
      });
  }, [allocationRollupEntities, writeAnyAllocationRollup, rollupIdList]);

  return null;
}
