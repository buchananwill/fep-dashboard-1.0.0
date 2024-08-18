'use server';
import { OrganizationTypeDto } from '../dtos/OrganizationTypeDtoSchema';
import { generateGraphEndpointSet } from '../actions/template-graph-endpoints';
import { generateBaseEndpointSet } from '../actions/template-base-endpoints';

const {
getGraph, getGraphByNodeList, getGraphByRootId, putGraph, getRootNodeList } =
 generateGraphEndpointSet<
  OrganizationTypeDto
>(
  '/api/v2/organizations/types'
);



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
  OrganizationTypeDto,
  number
>(
  '/api/v2/organizations/types'
);


export {
    getGraph, getGraphByNodeList, getGraphByRootId, putGraph, getRootNodeList, getPage,
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

}

