'use server';
import { WorkSchemaNodeDto } from '@/api/generated-types/generated-types_';
import { generateBaseEndpointSet } from '../actions/template-base-endpoints';
import { generateGraphEndpointSet } from '../actions/template-graph-endpoints';

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
} = generateBaseEndpointSet<WorkSchemaNodeDto, number>(
  '/api/v3/work-schema-node'
);

const {
  getGraph,
  getGraphByNodeList,
  getGraphByRootId,
  putGraph,
  getRootNodeList
} = generateGraphEndpointSet<WorkSchemaNodeDto>('/api/v3/work-schema-node');

export {
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
  getDtoListByExampleList,
  getGraph,
  getGraphByNodeList,
  getGraphByRootId,
  putGraph,
  getRootNodeList
};
