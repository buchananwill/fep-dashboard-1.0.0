'use server';
import { OrganizationDto } from '../dtos/OrganizationDtoSchema';
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
} = generateBaseEndpointSet<OrganizationDto, number>('/api/v2/organizations');

const { getByTypeIdList } = generateWithTypeEndpointSet<OrganizationDto>(
  '/api/v2/organizations'
);

const { getGraph, getGraphByNodeList, getGraphByRootId, putGraph } =
  generateGraphEndpointSet<OrganizationDto>('/api/v2/organizations');

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
