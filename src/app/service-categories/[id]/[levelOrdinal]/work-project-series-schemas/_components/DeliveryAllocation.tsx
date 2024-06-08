import React from 'react';

import { AllocationUnitGroup } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schemas/_components/AllocationUnitGroup';
import { DeliveryAllocationDto } from '@/api/dtos/DeliveryAllocationDtoSchema';

export function DeliveryAllocation({
  deliveryAllocation: { deliveryAllocationSize, count }
}: {
  deliveryAllocation: DeliveryAllocationDto;
}) {
  const allocation: React.JSX.Element[] = [];
  for (let i = 0; i < count; i++) {
    allocation.push(
      <AllocationUnitGroup
        key={`unit-${i}`}
        size={deliveryAllocationSize}
        indexOfGroup={i}
      />
    );
  }

  return allocation.length > 0 ? (
    <div className={'flex h-4 '}>{[...allocation]}</div>
  ) : null;
}