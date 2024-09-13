import { BaseDtoUiProps } from 'dto-stores';

import {
  ArrayPlaceholder,
  useGlobalListener,
  useGlobalReadAny
} from 'selective-context';

import { EntityClassMap } from '@/api/entity-class-map';
import { isNotUndefined } from '@/api/main';
import { Chip } from '@nextui-org/chip';
import {
  CycleDay,
  getWeekNumberInt
} from '@/functions/cycles/groupCycleSubspansByDay';
import { numberToWeekLetter } from '@/functions/cycles/numberToWeekLetter';

import { CycleSubspanGroupDto } from '@/api/zod-schemas/CycleSubspanGroupDtoSchema';
import { CycleSubspanDto } from '@/api/zod-schemas/CycleSubspanDtoSchema';
import { CycleSubspanJoinDto } from '@/api/zod-schemas/CycleSubspanJoinDtoSchema';
import { makeTransientId } from '@/makeTransientId';

function updateGroupJoins(
  updatedKeys: string[],
  collection: CycleSubspanGroupDto
): CycleSubspanGroupDto {
  const numbers = updatedKeys.map((key) => parseInt(key, 10));
  const keepTheseJoins = collection.cycleSubspanJoins.filter((join) =>
    numbers.includes(join.cycleSubspanId)
  );
  const addTheseJoins = numbers
    .filter(
      (key) =>
        collection.cycleSubspanJoins.find(
          (join) => join.cycleSubspanId === key
        ) === undefined
    )
    .map((key, index) => {
      const newJoin: Partial<CycleSubspanJoinDto> = {
        id: makeTransientId(key),
        cycleSubspanId: key,
        cycleSubspanGroupId: collection.id,
        joinOrdinal: keepTheseJoins.length + index
      };
      return newJoin;
    });
  return {
    ...collection,
    cycleSubspanJoins: [...keepTheseJoins, ...addTheseJoins]
  } as CycleSubspanGroupDto;
}

export default function CycleSubspanGroup({
  entity,
  dispatchWithoutControl,
  dispatchDeletion,
  deleted,
  entityClass
}: BaseDtoUiProps<CycleSubspanGroupDto>) {
  const selectiveContextReadAll = useGlobalReadAny<CycleSubspanDto>();

  const cycleSubspanDtoList = entity.cycleSubspanJoins
    .sort((j1, j2) => j1.joinOrdinal - j2.joinOrdinal)
    .map((join) => `${EntityClassMap.cycleSubspan}:${join.cycleSubspanId}`)
    .map(selectiveContextReadAll)
    .filter(isNotUndefined);

  const { currentState } = useGlobalListener<CycleDay[]>({
    contextKey: 'cycleDayList',
    listenerKey: `${entityClass}${entity.id}`,
    initialValue: ArrayPlaceholder
  });

  return (
    <div className={'w-full'}>
      {cycleSubspanDtoList.map((dto) => (
        <Chip
          key={dto.id}
          color={cycleSubspanDtoList.length === 1 ? 'primary' : 'secondary'}
        >
          {currentState[dto.zeroIndexedCycleDay].day}:
          {numberToWeekLetter(
            getWeekNumberInt(currentState[dto.zeroIndexedCycleDay])
          )}
          :{dto.name}
        </Chip>
      ))}
    </div>
  );
}
