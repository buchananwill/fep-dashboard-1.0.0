'use server';
import { ProviderRoleTypeDto } from '../dtos/ProviderRoleTypeDtoSchema';
import { generateBaseEndpointSet } from '@/api/actions/template-base-endpoints';
import { generateGraphEndpointSet } from '@/api/actions/template-graph-endpoints';

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
} = generateBaseEndpointSet<ProviderRoleTypeDto, number>(
  '/api/v2/providerRoles/types'
);

const { getGraph, getGraphByNodeList, getGraphByRootId, putGraph } =
  generateGraphEndpointSet<ProviderRoleTypeDto>('/api/v2/providerRoles/types');

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
  getGraph,
  getGraphByNodeList,
  getGraphByRootId,
  putGraph
};
