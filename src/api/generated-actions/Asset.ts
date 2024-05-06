'use server';
import { AssetDto } from '../dtos/AssetDtoSchema';
import { generateBaseEndpointSet } from '@/api/actions/template-base-endpoints';
import { generateWithTypeEndpointSet } from '@/api/actions/template-type-endpoints';
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
} = generateBaseEndpointSet<AssetDto, number>('/api/v2/assets');

const { getByTypeIdList } =
  generateWithTypeEndpointSet<AssetDto>('/api/v2/assets');

const { getGraph, getGraphByNodeList, getGraphByRootId, putGraph } =
  generateGraphEndpointSet<AssetDto>('/api/v2/assets');

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
  getByTypeIdList,
  getGraph,
  getGraphByNodeList,
  getGraphByRootId,
  putGraph
};
