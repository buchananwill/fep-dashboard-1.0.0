'use server';

import { CycleSubspanDto } from '@/api/dtos/CycleSubspanDtoSchema';
import { postList, putList } from '@/api/generated-actions/CycleSubspan';

export const interceptPut = async (dtoList: CycleSubspanDto[]) => {
  return await putList(dtoList);
};
export const interceptPost = async (dtoList: CycleSubspanDto[]) => {
  return await postList(dtoList);
};
