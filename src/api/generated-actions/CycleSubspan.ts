'use server';
import { generateBaseEndpointSet } from '../actions/template-base-endpoints';
import { generateWithTypeEndpointSet } from '../actions/template-type-endpoints';
import { CycleSubspanDto } from '@/api/generated-types/generated-types';

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
} = generateBaseEndpointSet<CycleSubspanDto, number>(
  '/api/v2/time/cycleSubspans'
);

const { getByTypeIdList } = generateWithTypeEndpointSet<CycleSubspanDto>(
  '/api/v2/time/cycleSubspans'
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
  getDtoListByExampleList,
  getByTypeIdList
};
