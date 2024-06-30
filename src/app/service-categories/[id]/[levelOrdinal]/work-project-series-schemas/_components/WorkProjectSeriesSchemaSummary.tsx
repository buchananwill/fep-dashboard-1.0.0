import { BaseLazyDtoUiProps } from 'dto-stores';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { NumberPropertyKey, StringPropertyKey } from '@/types';
import { useMemo } from 'react';
import { sumDeliveryAllocationList } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schemas/_functions/sumDeliveryAllocations';

export default function WorkProjectionSeriesSchemaSummary({
  entity
}: BaseLazyDtoUiProps<WorkProjectSeriesSchemaDto>) {
  const allocationTotal = useMemo(() => {
    return sumDeliveryAllocationList(entity.deliveryAllocations);
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
          className={'inline-block  rounded-xl bg-primary-500 px-2 text-white'}
        >
          {allocationTotal}
        </span>
      </span>
    </>
  );
}

const simpleAttributes: (
  | StringPropertyKey<WorkProjectSeriesSchemaDto>
  | NumberPropertyKey<WorkProjectSeriesSchemaDto>
)[] = ['name', 'shortCode', 'userToProviderRatio', 'workProjectBandwidth'];
