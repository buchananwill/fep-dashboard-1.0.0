'use client';
import {
  NamespacedHooks,
  useEffectSyncDeepEqualWithDispatch
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/client-literals';
import { useMemo } from 'react';
import {
  StaticDeliveryAllocationItemDto,
  WorkSchemaDto
} from '@/api/generated-types/generated-types_';
import { getDeliveryAllocationSize } from '@/components/work-schema/static-allocation/StaticAllocationDropZone';
import { useGlobalController } from 'selective-context';

export function getWorkSchemaId(curr: StaticDeliveryAllocationItemDto) {
  return curr.staticDeliveryAllocation.deliveryAllocation.workSchemaId;
}

export function getAllocationCounterId(
  wpssId: WorkSchemaDto['id'],
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
        getWorkSchemaId(curr),
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
