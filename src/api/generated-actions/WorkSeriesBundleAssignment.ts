'use server';
import { WorkSeriesBundleAssignmentDto } from '../dtos/WorkSeriesBundleAssignmentDtoSchema';
import { generateBaseEndpointSet } from '@/api/actions/template-base-endpoints';
import { generateIntersectionEndpointSet } from '@/api/actions/template-intersection-endpoints';

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
} = generateBaseEndpointSet<WorkSeriesBundleAssignmentDto, number>(
  '/api/v2/workProjectSeriesSchemas/bundleAssignments'
);

const {
  getByRowIdListAndColumnIdList,
  getColumnIdList,
  getByRowIdList,
  getIntersectionTable
} = generateIntersectionEndpointSet<
  WorkSeriesBundleAssignmentDto,
  number,
  number
>('/api/v2/workProjectSeriesSchemas/bundleAssignments');

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
  getByRowIdListAndColumnIdList,
  getColumnIdList,
  getByRowIdList,
  getIntersectionTable
};
