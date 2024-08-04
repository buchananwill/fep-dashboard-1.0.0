'use server';
import { BuildMetricDto } from '../dtos/BuildMetricDtoSchema';
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
  getDtoListByExampleList,
  getIdList
} = generateBaseEndpointSet<BuildMetricDto, string>(
  '/api/v2/schedule/buildMetric'
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
  getIdList
};
