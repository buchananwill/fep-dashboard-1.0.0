'use server';
import { CycleSubspanDto } from '@/app/api/dtos/CycleSubspanDtoSchema';
import { postList, putList } from '@/app/api/generated-actions/CycleSubspan';

export const interceptPut = async (dtoList: CycleSubspanDto[]) => {
  return await putList(dtoList);
};
export const interceptPost = async (dtoList: CycleSubspanDto[]) => {
  return await postList(dtoList);
};
