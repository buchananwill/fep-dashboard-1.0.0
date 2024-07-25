import React, { useCallback, useMemo } from 'react';

import { BaseDtoUiProps, DtoUiProps } from 'dto-stores';

import { sumDeliveryAllocations } from '@/app/work-project-series-schemas/_functions/sumDeliveryAllocations';
import { StepperContext } from '@/components/generic/stepperContextCreator';
import { AllocationUnitGroup } from '@/app/work-project-series-schemas/_components/AllocationUnitGroup';
import LandscapeStepper from '@/components/generic/LandscapeStepper';
import { DeliveryAllocation } from '@/app/work-project-series-schemas/_components/DeliveryAllocation';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { DeliveryAllocationDto } from '@/api/dtos/DeliveryAllocationDtoSchema';
import { SetOptional } from 'type-fest';
import { TransientIdOffset } from '@/api/literals';

export const allocationSizes = [1, 2];

export function AdjustAllocation({
  entity: workProjectSeriesSchemaDto,
  dispatchWithoutControl
}: SetOptional<BaseDtoUiProps<WorkProjectSeriesSchemaDto>, 'deleted'>) {
  const currentAllocations = useMemo(() => {
    return allocationSizes.map((size: number) => {
      const found = workProjectSeriesSchemaDto?.deliveryAllocations?.find(
        (da) => da.deliveryAllocationSize === size
      );
      const nullAllocation: DeliveryAllocationDto = {
        id: TransientIdOffset + size, // TODO improve this transient ID allocation
        count: 0,
        deliveryAllocationSize: size,
        workProjectSeriesSchemaId: workProjectSeriesSchemaDto.id,
        workTaskTypeId: workProjectSeriesSchemaDto.workTaskTypeId
      };
      return found || nullAllocation;
    });
  }, [workProjectSeriesSchemaDto]);

  const totalAllocations = useMemo(() => {
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
    [workProjectSeriesSchemaDto, dispatchWithoutControl, currentAllocations]
  );

  return (
    <div>
      <div className=" flex items-center justify-start gap-1 py-2 align-middle">
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
        <h3 className={'w-20 px-2 text-sm'}>Total: {totalAllocations}</h3>
        {currentAllocations.map((delivAl) => (
          <DeliveryAllocation deliveryAllocation={delivAl} key={delivAl.id} />
        ))}
      </div>
    </div>
  );
}
