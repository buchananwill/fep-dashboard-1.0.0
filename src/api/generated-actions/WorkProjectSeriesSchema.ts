'use server';
import { WorkProjectSeriesSchemaDto } from '@/api/zod-schemas/WorkProjectSeriesSchemaDtoSchema';
import { generateBaseEndpointSet } from '../actions/template-base-endpoints';

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
} = generateBaseEndpointSet<
  WorkProjectSeriesSchemaDto,
  string
>(
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

}

