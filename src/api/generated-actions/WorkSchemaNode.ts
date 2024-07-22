'use server';
import { WorkSchemaNodeDto } from '../dtos/WorkSchemaNodeDtoSchema';
import { generateBaseEndpointSet } from '../actions/template-base-endpoints';
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
  WorkSchemaNodeDto,
  number
>(
  '/api/v2/workSchemaNode'
);



const {
getGraph, getGraphByNodeList, getGraphByRootId, putGraph, getRootNodeList } =
 generateGraphEndpointSet<
  WorkSchemaNodeDto
>(
  '/api/v2/workSchemaNode'
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
, getGraph, getGraphByNodeList, getGraphByRootId, putGraph, getRootNodeList
}

