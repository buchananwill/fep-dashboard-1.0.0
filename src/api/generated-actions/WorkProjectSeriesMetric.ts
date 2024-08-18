'use server';
import { WorkProjectSeriesMetricDto } from '../dtos/WorkProjectSeriesMetricDtoSchema';
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
  WorkProjectSeriesMetricDto,
  number
>(
  '/api/v2/workProjectSeries/metrics'
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

