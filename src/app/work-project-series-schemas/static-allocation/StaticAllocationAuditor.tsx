'use client';
import {
  EditAddDeleteDtoControllerArray,
  NamespacedHooks,
  useEffectSyncDeepEqualWithDispatch
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { useMemo } from 'react';
import { StaticDeliveryAllocationItemDto } from '@/api/dtos/StaticDeliveryAllocationItemDtoSchema_';
import { getDeliveryAllocationSize } from '@/app/work-project-series-schemas/static-allocation/StaticAllocationDropZone';
import { useGlobalController } from 'selective-context';

export function getWorkProjectSeriesSchemaId(
  curr: StaticDeliveryAllocationItemDto
) {
  return curr.staticDeliveryAllocation.deliveryAllocation
    .workProjectSeriesSchemaId;
}

export function getAllocationCounterId(
  wpssId: string,
  deliveryAllocationSize: number
) {
  return `${wpssId}:${deliveryAllocationSize}`;
}

export const allocationCounter = 'AllocationCounter';
export default function StaticAllocationAuditor() {
  const { currentState } = NamespacedHooks.useListen<
    StaticDeliveryAllocationItemDto[]
  >(
    EntityClassMap.staticDeliveryAllocationItem,
    KEY_TYPES.MASTER_LIST,
    'StaticAllocationAuditor',
    EmptyArray
  );
  const dispatchMasterAllocationCounterList = NamespacedHooks.useDispatch(
    allocationCounter,
    KEY_TYPES.MASTER_LIST
  );

  console.log(currentState);

  const staticAllocationCounters = useMemo(() => {
    const map = currentState.reduce((prev, curr) => {
      const allocationCounterId = getAllocationCounterId(
        getWorkProjectSeriesSchemaId(curr),
        getDeliveryAllocationSize(curr)
      );
      let counter = prev.get(allocationCounterId);
      if (counter === undefined) {
        counter = {
          id: allocationCounterId,
          count: 0,
          size: getDeliveryAllocationSize(curr)
        };
        prev.set(allocationCounterId, counter);
      }
      console.log('count before:', counter.count);
      counter.count = counter.count + 1;
      console.log('count after:', counter.count);

      return prev;
    }, new Map<string, AllocationCounter>());
    return map;
  }, [currentState]);

  console.log(staticAllocationCounters);

  const { dispatch } = useGlobalController({
    contextKey: allocationCounter,
    initialValue: staticAllocationCounters,
    listenerKey: 'StaticAllocationController'
  });

  useEffectSyncDeepEqualWithDispatch(staticAllocationCounters, dispatch);

  return null;
}

export interface AllocationCounter {
  id: string;
  size: number;
  count: number;
}
