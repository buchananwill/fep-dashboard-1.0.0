'use server';
import { AssetDto } from '@/api/generated-types/generated-types_';
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
} = generateBaseEndpointSet<AssetDto, number>('/api/v3/asset');

const {
  getGraph,
  getGraphByNodeList,
  getGraphByRootId,
  putGraph,
  getRootNodeList
} = generateGraphEndpointSet<AssetDto>('/api/v3/asset');

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
