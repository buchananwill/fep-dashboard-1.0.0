import { Identifier, NamespacedHooks, useWriteAnyDto } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { useEffect } from 'react';
import { AllocationRollupEntityClass } from '@/components/react-flow/work-schema-node/WorkSchemaNodeLayoutFlowWithForces';
import { AllocationRollup } from '@/components/react-flow/work-schema-node/useLeafNodeRollUpListener';

export function getMilliseconds() {
  return new Date(Date.now()).getMilliseconds();
}

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

  const writeAnyAllocationRollup = useWriteAnyDto<AllocationRollup>(
    AllocationRollupEntityClass
  );

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
