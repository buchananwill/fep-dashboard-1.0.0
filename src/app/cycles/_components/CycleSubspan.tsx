'use client';

import { useDtoStoreDispatch } from 'dto-stores';
import { EntityNamesMap } from '@/app/api/entity-names-map';
import { DtoStoreNumberInput } from '@/components/generic/DtoStoreNumberInput';
import { TimeInput } from '@nextui-org/date-input';

export interface CycleSubspanProps {
  id: number;
}

const entityType = EntityNamesMap.cycleSubspan;
export default function CycleSubspan({ id }: CycleSubspanProps) {
  const { currentState, dispatchWithoutControl } = useDtoStoreDispatch(
    id,
    entityType,
    `edit`
  );

  return (
    <div>
      <TimeInput></TimeInput>
    </div>
  );
}
