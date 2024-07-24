import { Identifier, NamespacedHooks, useWriteAnyDto } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { useEffect } from 'react';
import { AllocationRollupEntityClass } from '@/components/react-flow/work-schema-node/WorkSchemaNodeLayoutFlowWithForces';
import { AllocationRollup } from '@/components/react-flow/work-schema-node/useLeafNodeController';

export function getMilliseconds() {
  return new Date(Date.now()).getMilliseconds();
}

export function RollupUpdater({
  allocationRollupEntities
}: {
  allocationRollupEntities: AllocationRollup[];
}) {
  // 24/7/24 Currently the entire work schema node archive is fetched from the backend to determine the assignment rollups.
  console.log(
    'rendering rollup updater: ',
    allocationRollupEntities,
    getMilliseconds()
  );

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
        console.log('updating AllocationRollup:', filteredEntity);
        writeAnyAllocationRollup(idAsString, filteredEntity);
      });
  }, [allocationRollupEntities, writeAnyAllocationRollup, rollupIdList]);

  return null;
}
