import { DtoUiComponentProps } from 'dto-stores';

import {
  ArrayPlaceholder,
  useGlobalListener,
  useGlobalReadAny
} from 'selective-context';

import { EntityClassMap } from '@/api/entity-class-map';
import { isNotUndefined, TransientIdOffset } from '@/api/main';
import { Chip } from '@nextui-org/chip';
import {
  CycleDay,
  getWeekNumberInt
} from '@/app/cycles/_functions/groupCycleSubspansByDay';
import { numberToWeekLetter } from '@/app/cycles/_functions/numberToWeekLetter';

import { CycleSubspanGroupDto } from '@/api/dtos/CycleSubspanGroupDtoSchema';
import { CycleSubspanDto } from '@/api/dtos/CycleSubspanDtoSchema';
import { CycleSubspanJoinDto } from '@/api/dtos/CycleSubspanJoinDtoSchema';

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
        id: key + TransientIdOffset,
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
}: DtoUiComponentProps<CycleSubspanGroupDto>) {
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
