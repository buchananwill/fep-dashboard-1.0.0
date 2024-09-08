'use server';
import { generateBaseEndpointSet } from '../actions/template-base-endpoints';
import { WorkProjectSeriesSchemaDto } from '@/api/generated-types/generated-types';

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
} = generateBaseEndpointSet<WorkProjectSeriesSchemaDto, number>(
  '/api/v2/workProjectSeriesSchemas'
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
