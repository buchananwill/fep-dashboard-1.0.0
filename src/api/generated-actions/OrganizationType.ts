'use server';
import { OrganizationTypeDto } from '@/api/generated-types/generated-types';
import { generateGraphEndpointSet } from '../actions/template-graph-endpoints';
import { generateBaseEndpointSet } from '../actions/template-base-endpoints';

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
} = generateBaseEndpointSet<OrganizationTypeDto, number>(
  '/api/v3/organization-type'
);
const {
  getGraph,
  getGraphByNodeList,
  getGraphByRootId,
  putGraph,
  getRootNodeList
} = generateGraphEndpointSet<OrganizationTypeDto>('/api/v3/organization-type');

export {
  getGraph,
  getGraphByNodeList,
  getGraphByRootId,
  putGraph,
  getRootNodeList,
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
};
