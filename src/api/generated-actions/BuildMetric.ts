'use server';
import { generateBaseEndpointSet } from '../actions/template-base-endpoints';
import { BuildMetricDto } from '@/api/generated-types/generated-types';

const {
  getPage,
  getAll,
  getIdList,
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
} = generateBaseEndpointSet<BuildMetricDto, number>(
  '/api/v2/schedule/buildMetric'
);

export {
  getPage,
  getIdList,
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
