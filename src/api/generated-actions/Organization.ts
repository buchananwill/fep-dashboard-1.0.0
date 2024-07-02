'use server';
import { OrganizationDto } from '../dtos/OrganizationDtoSchema';
import { generateBaseEndpointSet } from '../actions/template-base-endpoints';
import { generateWithTypeEndpointSet } from '../actions/template-type-endpoints';
import { generateGraphEndpointSet } from '../actions/template-graph-endpoints';

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
} = generateBaseEndpointSet<
  OrganizationDto,
  number
>(
  '/api/v2/organizations'
);


const {
getByTypeIdList  } = generateWithTypeEndpointSet<OrganizationDto>(
  '/api/v2/organizations'
);


const {
getGraph, getGraphByNodeList, getGraphByRootId, putGraph, getRootNodeList } =
 generateGraphEndpointSet<
  OrganizationDto
>(
  '/api/v2/organizations'
);


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
  getDtoListByExampleList
, getByTypeIdList, getGraph, getGraphByNodeList, getGraphByRootId, putGraph, getRootNodeList
}

