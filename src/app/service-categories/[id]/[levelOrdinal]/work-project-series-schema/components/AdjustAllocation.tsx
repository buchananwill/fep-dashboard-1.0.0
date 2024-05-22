import React, { useCallback, useMemo } from 'react';

import { DtoUiComponentProps } from 'dto-stores';

import { TransientIdOffset } from '@/api/main';
import { sumDeliveryAllocations } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/functions/sum-delivery-allocations';
import { StepperContext } from '@/components/generic/stepperContextCreator';
import { AllocationUnitGroup } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/components/AllocationUnitGroup';
import LandscapeStepper from '@/components/generic/LandscapeStepper';
import { DeliveryAllocation } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/components/DeliveryAllocation';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { DeliveryAllocationDto } from '@/api/dtos/DeliveryAllocationDtoSchema';

export const allocationSizes = [1, 2];

export function AdjustAllocation({
  entity: workProjectSeriesSchemaDto,
  dispatchWithoutControl
}: DtoUiComponentProps<WorkProjectSeriesSchemaDto>) {
  const currentAllocations = useMemo(() => {
    return allocationSizes.map((size: number) => {
      const found = workProjectSeriesSchemaDto?.deliveryAllocations?.find(
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

  const totalAllocations = useMemo(() => {
    console.log(workProjectSeriesSchemaDto);
    return sumDeliveryAllocations(workProjectSeriesSchemaDto);
  }, [workProjectSeriesSchemaDto]);

  const handleModifyAllocation = useCallback(
    (size: number, up: boolean) => {
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
    },
    [dispatchWithoutControl, currentAllocations]
  );

  return (
    <div>
      <div className=" py-2 flex justify-start align-middle items-center gap-1">
        {currentAllocations.map((deliveryAllocation, index) => (
          <StepperContext.Provider
            key={index}
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
          </StepperContext.Provider>
        ))}
        <h3 className={'px-2 text-sm w-20'}>Total: {totalAllocations}</h3>
        {currentAllocations.map((delivAl) => (
          <DeliveryAllocation deliveryAllocation={delivAl} key={delivAl.id} />
        ))}
      </div>
    </div>
  );
}
