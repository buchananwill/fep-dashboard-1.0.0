import React, { useMemo } from 'react';

import { DtoUiComponentProps } from 'dto-stores';
import { WorkProjectSeriesSchemaDto } from '@/app/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { DeliveryAllocationDto } from '@/app/api/dtos/DeliveryAllocationDtoSchema';
import { TransientIdOffset } from '@/app/api/main';
import { sumDeliveryAllocations } from '@/app/work-project-series-schemas/functions/sum-delivery-allocations';
import { StepperContext } from '@/components/generic/stepperContextCreator';
import { AllocationUnitGroup } from '@/app/work-project-series-schemas/components/AllocationUnitGroup';
import LandscapeStepper from '@/components/generic/LandscapeStepper';
import { DeliveryAllocation } from '@/app/work-project-series-schemas/components/DeliveryAllocation';

export const allocationSizes = [1, 2];

export function AdjustAllocation({
  entity: workProjectSeriesSchemaDto,
  dispatchWithoutControl
}: DtoUiComponentProps<WorkProjectSeriesSchemaDto>) {
  const currentAllocations = useMemo(() => {
    return allocationSizes.map((size: number) => {
      const found = workProjectSeriesSchemaDto?.deliveryAllocations.find(
        (da) => da.deliveryAllocationSize === size
      );
      const nullAllocation: DeliveryAllocationDto = {
        id: TransientIdOffset + size, // TODO improve this transient ID allocation
        count: 0,
        deliveryAllocationSize: size,
        priority: 1,
        workProjectSeriesSchemaId: workProjectSeriesSchemaDto.id,
        workTaskTypeId: workProjectSeriesSchemaDto.workTaskTypeId
      };
      return found || nullAllocation;
    });
  }, [workProjectSeriesSchemaDto]);

  const totalAllocations = useMemo(
    () => sumDeliveryAllocations(workProjectSeriesSchemaDto),
    [workProjectSeriesSchemaDto]
  );

  const handleModifyAllocation = (size: number, up: boolean) => {
    if (dispatchWithoutControl === undefined) return;
    const updatedDevAlloc = currentAllocations.map((allocation) => {
      if (allocation.deliveryAllocationSize === size) {
        const newCount = up
          ? Math.min(allocation.count + 1, 10)
          : Math.max(allocation.count - 1, 0);
        return { ...allocation, count: newCount };
      } else return allocation;
    });
    const updatedSchema: WorkProjectSeriesSchemaDto = {
      ...workProjectSeriesSchemaDto,
      deliveryAllocations: updatedDevAlloc
    };
    dispatchWithoutControl(updatedSchema);
  };

  return (
    <div>
      <h3 className={'px-2 text-sm'}>Total Allocation: {totalAllocations}</h3>
      <div className=" py-2 divide-x flex justify-start align-baseline">
        {currentAllocations.map((deliveryAllocation, index) => (
          <div key={`del-al-${index}`} className={'px-1'}>
            <StepperContext.Provider
              value={{
                increment: () =>
                  handleModifyAllocation(
                    deliveryAllocation.deliveryAllocationSize,
                    true
                  ),
                decrement: () =>
                  handleModifyAllocation(
                    deliveryAllocation.deliveryAllocationSize,
                    false
                  ),
                min: 0,
                max: 10,
                current: currentAllocations[index].count
              }}
            >
              <div className={'flex items-center'}>
                <AllocationUnitGroup
                  size={deliveryAllocation.deliveryAllocationSize}
                  indexOfGroup={index}
                />
                <LandscapeStepper></LandscapeStepper>
              </div>
              <div className={'h-1'}></div>
            </StepperContext.Provider>
          </div>
        ))}
      </div>
    </div>
  );
}
