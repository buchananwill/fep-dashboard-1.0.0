'use server';

import { CycleSubspanDto } from '@/api/zod-schemas/CycleSubspanDtoSchema';
import { postList, putList } from '@/api/generated-actions/CycleSubspan';

export const interceptPut = async (dtoList: CycleSubspanDto[]) => {
  // We remove the IDs from the Timespans to allow from the assumption that they might have been edited and need to be compared/retrieved by value.
  const stripTheTimeSpanIds = dtoList.map((cycleS) => ({
    ...cycleS,
    timeSpanDto: { ...cycleS.timeSpanDto, id: NaN }
  }));
  return await putList(stripTheTimeSpanIds);
};
export const interceptPost = async (dtoList: CycleSubspanDto[]) => {
  return await postList(dtoList);
};
