'use server';
import { generateGraphEndpointSet } from '../actions/template-graph-endpoints';
import { generateBaseEndpointSet } from '../actions/template-base-endpoints';
import { InitJsonTemplateNodeData } from '@/components/react-flow/init-json-template/types';
type InitJsonTemplateDto = InitJsonTemplateNodeData;

const {
  getGraph,
  getGraphByNodeList,
  getGraphByRootId,
  putGraph,
  getRootNodeList
} = generateGraphEndpointSet<InitJsonTemplateDto>('/api/v2/initTemplates');

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
} = generateBaseEndpointSet<InitJsonTemplateDto, number>(
  '/api/v2/initTemplates'
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
