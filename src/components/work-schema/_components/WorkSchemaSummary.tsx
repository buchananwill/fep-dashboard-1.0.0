import { BaseLazyDtoUiProps } from 'dto-stores';
import { WorkSchemaDto } from '@/api/generated-types/generated-types_';
import { NumberPropertyKey, StringPropertyKey } from '@/types';
import { useMemo } from 'react';
import { sumDeliveryAllocationList } from '@/components/work-schema/_functions/sumDeliveryAllocations';

export default function WorkProjectionSeriesSchemaSummary({
  entity
}: BaseLazyDtoUiProps<WorkSchemaDto>) {
  const allocationTotal = useMemo(() => {
    return sumDeliveryAllocationList(Object.values(entity.deliveryAllocations));
  }, [entity.deliveryAllocations]);

  return (
    <>
      {simpleAttributes.map((attr) => (
        <span key={`${entity.id}:${attr}`} className={'inline-block'}>
          {attr}: {entity[attr]}
        </span>
      ))}
      <span className={'inline-block'}>
        Delivery Allocation Total:{' '}
        <span
          className={'inline-block  rounded-xl bg-blue-500 px-2 text-white'}
        >
          {allocationTotal}
        </span>
      </span>
    </>
  );
}

const simpleAttributes: (
  | StringPropertyKey<WorkSchemaDto>
  | NumberPropertyKey<WorkSchemaDto>
)[] = ['name', 'userToProviderRatio'];
