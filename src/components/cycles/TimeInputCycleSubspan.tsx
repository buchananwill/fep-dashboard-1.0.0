import { Dispatch, SetStateAction } from 'react';
import { CycleSubspanDto } from '@/api/zod-schemas/CycleSubspanDtoSchema';
import { TimeSpanDto } from '@/api/zod-schemas/TimeSpanDtoSchema';
import { TimeInput } from '@nextui-org/date-input';
import { TransientIdOffset } from '@/api/literals';
import { Time } from '@internationalized/date';
import { TimeValue } from '@react-types/datepicker';

export function TimeInputCycleSubspan({
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
      granularity={'minute'}
      aria-label={`${entity.name} ${boundary} time`}
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

function timeFromZTimeOnly(timeOnly: string): TimeValue {
  const [hour, minute, second] = timeOnly
    .split(':')
    .map((part) => parseInt(part, 10));

  return new Time(hour, minute, second) as unknown as TimeValue;
}

function handleTimeChange(
  time: TimeValue,
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
