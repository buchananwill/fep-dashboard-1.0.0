'use server';
import { TimeDivisionDto } from '../dtos/TimeDivisionDtoSchema';
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
} = generateBaseEndpointSet<TimeDivisionDto, number>(
  '/api/v2/time/timeDivisions'
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
