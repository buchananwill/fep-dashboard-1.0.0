'use server';
import { KnowledgeDomainDto } from '@/api/generated-types/generated-types';
import { generateGraphEndpointSet } from '../actions/template-graph-endpoints';
import { generateBaseEndpointSet } from '../actions/template-base-endpoints';

const {
  getGraph,
  getGraphByNodeList,
  getGraphByRootId,
  putGraph,
  getRootNodeList
} = generateGraphEndpointSet<KnowledgeDomainDto>('/api/v3/knowledge-domain');

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
} = generateBaseEndpointSet<KnowledgeDomainDto, number>(
  '/api/v3/knowledge-domain'
);

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
