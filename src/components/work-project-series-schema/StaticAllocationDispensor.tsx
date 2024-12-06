import {
  DeliveryAllocationDto,
  StaticDeliveryAllocationItemDto,
  WorkProjectSeriesSchemaDto
} from '@/api/generated-types/generated-types_';
import {
  allocationCounter,
  AllocationCounter,
  getAllocationCounterId
} from '@/components/work-project-series-schema/static-allocation/StaticAllocationAuditor';
import { BaseDtoUiProps, InitialMap } from 'dto-stores';
import { useMemo } from 'react';
import { useGlobalListener } from 'selective-context';
import { getDeliveryAllocationSize } from '@/components/work-project-series-schema/static-allocation/StaticAllocationDropZone';
import { StaticAllocationDraggable } from '@/components/work-project-series-schema/static-allocation/StaticAllocationDraggable';
import { idDecrementer } from '@/components/work-schema-node-assignments/enrollment-table/GetNextIdDecrement';

const TWO_FIVE_SIX = Math.pow(2, 8);
const PRODUCTION_STATIC_CYCLE_ID = 1;

function getTransientStaticAllocationId(
  deliveryAllocation: DeliveryAllocationDto,
  used: number
) {
  return (deliveryAllocation.id * TWO_FIVE_SIX + used) * -1;
}

function getCount(unusedAllocation: StaticDeliveryAllocationItemDto) {
  return unusedAllocation.staticDeliveryAllocation.deliveryAllocation.count;
}

function getUsed(
  idToCounterMap: Map<string, AllocationCounter>,
  entity: WorkProjectSeriesSchemaDto,
  deliveryAllocationSize: number
) {
  return (
    idToCounterMap.get(
      `${getAllocationCounterId(entity.id, deliveryAllocationSize)}`
    )?.count ?? 0
  );
}

export function StaticAllocationDispensor({
  entity
}: BaseDtoUiProps<WorkProjectSeriesSchemaDto>) {
  const allocationCounterIds = useMemo(() => {
    return Object.values(entity.deliveryAllocations).map(
      (deliveryAllocation) => {
        return getAllocationCounterId(
          entity.id,
          deliveryAllocation.deliveryAllocationSize
        );
      }
    );
  }, [entity]);

  const { currentState: idToCounterMap } = useGlobalListener<
    Map<string, AllocationCounter>
  >({
    contextKey: allocationCounter,
    listenerKey: `StaticAllocationDispensor:${entity.id}`,
    initialValue: InitialMap as Map<string, AllocationCounter>
  });

  const unusedAllocations: StaticDeliveryAllocationItemDto[] = useMemo(() => {
    return Object.values(entity.deliveryAllocations).map(
      (deliveryAllocation) => {
        const used = getUsed(
          idToCounterMap,
          entity,
          deliveryAllocation.deliveryAllocationSize
        );
        return {
          id: idDecrementer(), //getTransientStaticAllocationId(deliveryAllocation, used),
          cycleSubspanGroupId: NaN,
          staticDeliveryAllocation: {
            id: deliveryAllocation.id,
            cycleId: PRODUCTION_STATIC_CYCLE_ID,
            deliveryAllocation: deliveryAllocation
          },
          workProjectSeriesSchemaId:
            deliveryAllocation.workProjectSeriesSchemaId
        } as StaticDeliveryAllocationItemDto;
      }
    );
  }, [entity, idToCounterMap]);

  return (
    <table>
      <tbody>
        {unusedAllocations.map((unusedAllocation) => {
          const remaining =
            getCount(unusedAllocation) -
            getUsed(
              idToCounterMap,
              entity,
              getDeliveryAllocationSize(unusedAllocation)
            );
          return (
            <tr key={unusedAllocation.id}>
              <td>{remaining}</td>
              <td>
                <StaticAllocationDraggable
                  entity={unusedAllocation}
                  disabled={remaining === 0}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
