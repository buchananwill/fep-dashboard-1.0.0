import React, { useCallback, useMemo } from 'react';

import { BaseDtoUiProps, useLazyDtoStore } from 'dto-stores';

import { sumDeliveryAllocations } from '@/components/work-project-series-schema/_functions/sumDeliveryAllocations';
import { StepperContext } from '@/components/generic/stepper/stepperContextCreator';
import { AllocationUnitGroup } from '@/components/work-project-series-schema/_components/AllocationUnitGroup';
import LandscapeStepper from '@/components/generic/stepper/LandscapeStepper';
import { DeliveryAllocation } from '@/components/work-project-series-schema/_components/DeliveryAllocation';
import { SetOptional } from 'type-fest';
import { ABSOLUTE_SMALLEST_TRANSIENT_ID } from '@/api/literals';
import {
  CycleDto,
  DeliveryAllocationDto,
  WorkProjectSeriesSchemaDto
} from '@/api/generated-types/generated-types';
import { EntityClassMap } from '@/api/entity-class-map';

import { EntityInnerCellProps } from '@/components/tables/core-table-types';
import { useEntityTableContext } from '@/hooks/table-hooks/table-context';
import { Button, Popover } from '@mantine/core';

export function AdjustAllocation({
  entity: workProjectSeriesSchemaDto,
  dispatchWithoutControl
}: SetOptional<BaseDtoUiProps<WorkProjectSeriesSchemaDto>, 'deleted'>) {
  const { entity: cycle } = useLazyDtoStore<CycleDto>(1, EntityClassMap.cycle);
  const cycleSubspanGroupSizes = useMemo(() => {
    return cycle ? cycle.cycleSubspanGroupSizes : [];
  }, [cycle]);

  const currentAllocations = useMemo(() => {
    return cycleSubspanGroupSizes.map((size: number) => {
      const allocations = workProjectSeriesSchemaDto
        ? workProjectSeriesSchemaDto.deliveryAllocations
        : {};
      const found = allocations[String(size)];
      const nullAllocation: DeliveryAllocationDto = {
        id: ABSOLUTE_SMALLEST_TRANSIENT_ID - size, // TODO improve this transient ID allocation
        count: 0,
        deliveryAllocationSize: size,
        workProjectSeriesSchemaId: workProjectSeriesSchemaDto.id
      };
      return found ?? nullAllocation;
    });
  }, [workProjectSeriesSchemaDto, cycleSubspanGroupSizes]);

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
      const updatedRecord = updatedDevAlloc.reduce(
        (prev, curr) => {
          prev[String(curr.deliveryAllocationSize)] = curr;
          return prev;
        },
        {} as Record<string, DeliveryAllocationDto>
      );
      const updatedSchema: WorkProjectSeriesSchemaDto = {
        ...workProjectSeriesSchemaDto,
        deliveryAllocations: updatedRecord
      };
      dispatchWithoutControl(updatedSchema);
    },
    [workProjectSeriesSchemaDto, dispatchWithoutControl, currentAllocations]
  );

  return (
    <div className=" flex items-center justify-start gap-1 align-middle">
      <Popover withArrow shadow={'md'}>
        <Popover.Target>
          <Button variant={'subtle'} radius={'xs'}>
            Adjust Allocation
          </Button>
        </Popover.Target>
        <Popover.Dropdown>
          <div className={'flex flex-col items-end gap-1'}>
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
                <div className={'flex w-full items-center gap-1 '}>
                  <span>{deliveryAllocation.deliveryAllocationSize}</span>
                  <AllocationUnitGroup
                    size={deliveryAllocation.deliveryAllocationSize}
                    indexOfGroup={index}
                  />
                  <div className={'grow'}></div>
                  <LandscapeStepper></LandscapeStepper>
                </div>
              </StepperContext.Provider>
            ))}
          </div>
        </Popover.Dropdown>
      </Popover>
      <h3 className={'w-20 px-2 text-sm'}>Total: {totalAllocations}</h3>
      {currentAllocations.map((delivAl) => (
        <DeliveryAllocation deliveryAllocation={delivAl} key={delivAl.id} />
      ))}
    </div>
  );
}

export function AdjustAllocationInWrapper({
  entity,
  dispatchWithoutControl
}: EntityInnerCellProps<
  WorkProjectSeriesSchemaDto,
  number,
  'deliveryAllocations'
>) {
  const { entityClass } = useEntityTableContext();

  return (
    <AdjustAllocation
      entityClass={entityClass}
      entity={entity}
      dispatchWithoutControl={dispatchWithoutControl}
    />
  );
}
