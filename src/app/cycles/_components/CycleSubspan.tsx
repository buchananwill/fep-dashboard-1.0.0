'use client';

import { DtoUiComponentProps, useDtoStoreDispatch } from 'dto-stores';
import { EntityClassMap } from '@/app/api/entity-class-map';
import { TimeInput } from '@nextui-org/date-input';
import { Time } from '@internationalized/date';
import { CycleSubspanDto } from '@/app/api/dtos/CycleSubspanDtoSchema';
import { Dispatch, SetStateAction } from 'react';
import { TimeSpanDto } from '@/app/api/dtos/TimeSpanDtoSchema';
import { TransientIdOffset } from '@/app/api/main';
import { DtoStoreStringValueEdit } from '@/components/generic/DtoStoreStringValueEdit';

export interface CycleSubspanProps {
  id: number;
}

function timeFromZTimeOnly(timeOnly: string): Time {
  const [hour, minute, second] = timeOnly
    .split(':')
    .map((part) => parseInt(part, 10));
  return new Time(hour, minute, second);
}

function handleTimeChange(
  time: Time,
  target: 'Start' | 'End',
  dispatcher?: Dispatch<SetStateAction<CycleSubspanDto>>
) {
  if (!dispatcher) return;
  dispatcher((cycleSubspan) => {
    const { timeSpanDto } = cycleSubspan;
    const zTimeOnly = time.toString();
    let updatedTimespan: TimeSpanDto;
    switch (target) {
      case 'Start':
        updatedTimespan = {
          ...timeSpanDto,
          startTimeDivisionInstant: zTimeOnly,
          startTimeDivisionId: TransientIdOffset
        };
        break;
      case 'End':
        updatedTimespan = {
          ...timeSpanDto,
          endTimeDivisionInstant: zTimeOnly,
          endTimeDivisionId: TransientIdOffset
        };
        break;
    }
    return { ...cycleSubspan, timeSpanDto: updatedTimespan };
  });
}

const entityType = EntityClassMap.cycleSubspan;

export default function CycleSubspan({
  entity,
  dispatchWithoutControl
}: DtoUiComponentProps<CycleSubspanDto>) {
  return (
    <div className={'flex items-center gap-2 w-fit'}>
      <DtoStoreStringValueEdit
        entity={entity}
        entityType={entityType}
        size={'sm'}
        listenerKey={'editDescription'}
        valueAccessor={(e) => e.description}
        producer={(value, entity) => ({ ...entity, description: value })}
        classNames={{ base: 'w-24', input: 'text-xs' }}
      />
      <TimeInputCycleSubspan
        entity={entity}
        boundary={'Start'}
        dispatchWithoutControl={dispatchWithoutControl}
      />
      <TimeInputCycleSubspan
        entity={entity}
        boundary={'End'}
        dispatchWithoutControl={dispatchWithoutControl}
      />
    </div>
  );
}

function TimeInputCycleSubspan({
  entity,
  boundary,
  dispatchWithoutControl
}: {
  entity: CycleSubspanDto;
  boundary: 'Start' | 'End';
  dispatchWithoutControl?: Dispatch<SetStateAction<CycleSubspanDto>>;
}) {
  return (
    <TimeInput
      hourCycle={24}
      size={'sm'}
      aria-label={`${entity.description} ${boundary} time`}
      label={boundary}
      value={timeFromZTimeOnly(
        boundary === 'Start'
          ? entity.timeSpanDto.startTimeDivisionInstant
          : entity.timeSpanDto.endTimeDivisionInstant
      )}
      onChange={(value) =>
        handleTimeChange(value, boundary, dispatchWithoutControl)
      }
      classNames={{ base: 'w-fit' }}
    />
  );
}
