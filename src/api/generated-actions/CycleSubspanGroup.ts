'use server';
import { CycleSubspanGroupDto } from '../dtos/CycleSubspanGroupDtoSchema';
import { generateBaseEndpointSet } from '@/api/actions/template-base-endpoints';

const {
  getPage,
  getAll,
  deleteIdList,
  postList,
  putList,
  getOne,
  postOne,
  putOne,
  deleteOne,
  getDtoListByBodyList,
  getDtoListByParamList,
  getDtoListByExampleList
} = generateBaseEndpointSet<CycleSubspanGroupDto, number>(
  '/api/v2/time/cycleSubspanGroups'
);

export {
  getPage,
  getAll,
  deleteIdList,
  postList,
  putList,
  getOne,
  postOne,
  putOne,
  deleteOne,
  getDtoListByBodyList,
  getDtoListByParamList,
  getDtoListByExampleList
};
