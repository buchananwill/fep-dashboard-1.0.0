'use server';
import { WorkSeriesSchemaBundleDto } from '../dtos/WorkSeriesSchemaBundleDtoSchema';
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
} = generateBaseEndpointSet<WorkSeriesSchemaBundleDto, string>(
  '/api/v2/workProjectSeriesSchemas/bundles'
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
