'use client';
import {
  NamespacedHooks,
  useEffectSyncDeepEqualWithDispatch
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { useMemo } from 'react';
import { StaticDeliveryAllocationItemDto } from '@/api/zod-schemas/StaticDeliveryAllocationItemDtoSchema';
import { getDeliveryAllocationSize } from '@/components/work-project-series-schema/static-allocation/StaticAllocationDropZone';
import { useGlobalController } from 'selective-context';
import { WorkProjectSeriesSchema } from '@/api/generated-types/generated-types';

export function getWorkProjectSeriesSchemaId(
  curr: StaticDeliveryAllocationItemDto
) {
  return curr.staticDeliveryAllocation.deliveryAllocation
    .workProjectSeriesSchemaId;
}

export function getAllocationCounterId(
  wpssId: WorkProjectSeriesSchema['id'],
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

  const staticAllocationCounters = useMemo(() => {
    return currentState.reduce((prev, curr) => {
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
      counter.count = counter.count + 1;

      return prev;
    }, new Map<string, AllocationCounter>());
  }, [currentState]);

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
