'use server';
import { generateBaseEndpointSet } from '../actions/template-base-endpoints';
import { generateIntersectionEndpointSet } from '../actions/template-intersection-endpoints';
import { WorkSchemaNodeAssignmentDto } from '@/api/dtos/WorkSchemaNodeAssignmentDtoSchema_';

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
} = generateBaseEndpointSet<WorkSchemaNodeAssignmentDto, number>(
  '/api/v2/workProjectSeriesSchemas/bundleAssignments'
);

const {
  getByRowIdListAndColumnIdList,
  getColumnIdList,
  getByRowIdList,
  getIntersectionTable
} = generateIntersectionEndpointSet<
  WorkSchemaNodeAssignmentDto,
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
