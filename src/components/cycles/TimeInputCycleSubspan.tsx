import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { CycleSubspanDto } from '@/api/generated-types/generated-types_';
import { TimeSpanDto } from '@/api/generated-types/generated-types_';
import { ABSOLUTE_SMALLEST_TRANSIENT_ID } from '@/api/client-literals';
import { TimeInput } from '@mantine/dates';

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
      size={'sm'}
      aria-label={`${entity.name} ${boundary} time`}
      value={
        boundary === 'Start'
          ? entity.timeSpanDto.startTimeDivisionInstant
          : entity.timeSpanDto.endTimeDivisionInstant
      }
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        handleTimeChange(event.target.value, boundary, dispatchWithoutControl)
      }
    />
  );
}

function handleTimeChange(
  time: string,
  target: 'Start' | 'End',
  dispatcher?: Dispatch<SetStateAction<CycleSubspanDto>>
) {
  if (!dispatcher) return;
  dispatcher((cycleSubspan) => {
    const { timeSpanDto } = cycleSubspan;
    const zTimeOnly = time;

    let updatedTimespan: TimeSpanDto;
    switch (target) {
      case 'Start':
        updatedTimespan = {
          ...timeSpanDto,
          startTimeDivisionInstant: zTimeOnly,
          startTimeDivisionId: ABSOLUTE_SMALLEST_TRANSIENT_ID
        };
        break;
      case 'End':
        updatedTimespan = {
          ...timeSpanDto,
          endTimeDivisionInstant: zTimeOnly,
          endTimeDivisionId: ABSOLUTE_SMALLEST_TRANSIENT_ID
        };
        break;
    }
    return { ...cycleSubspan, timeSpanDto: updatedTimespan };
  });
}
