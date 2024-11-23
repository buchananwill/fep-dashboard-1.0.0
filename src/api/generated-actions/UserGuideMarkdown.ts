'use server';
import {
  UserRoleTypeDto,
  WorkSchemaNodeDto
} from '@/api/generated-types/generated-types';
import { generateBaseEndpointSet } from '../actions/template-base-endpoints';
import { UserGuideMarkdown } from '@/app/user-guide/parseMarkdownToTree';
import { generateGraphEndpointSet } from '@/api/actions/template-graph-endpoints';

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
} = generateBaseEndpointSet<UserGuideMarkdown, number>(
  '/api/v3/user-guide-markdown'
);

const {
  getGraph,
  getGraphByNodeList,
  getGraphByRootId,
  putGraph,
  getRootNodeList,
  postByNestedEntity,
  postByNestedEntityList
} = generateGraphEndpointSet<UserGuideMarkdown>('/api/v3/user-guide-markdown');

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
  getRootNodeList,
  postByNestedEntity,
  postByNestedEntityList
};
