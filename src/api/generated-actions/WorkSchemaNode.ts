'use server';
import { WorkSchemaNodeDto } from '@/api/generated-types/generated-types';
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
} = generateBaseEndpointSet<
  WorkSchemaNodeDto,
  number
>(
  '/api/v2/workSchemaNodes'
);



const {
getGraph, getGraphByNodeList, getGraphByRootId, putGraph, getRootNodeList } =
 generateGraphEndpointSet<
  WorkSchemaNodeDto
>(
  '/api/v2/workSchemaNodes'
);


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
getDtoListByExampleList
, getGraph, getGraphByNodeList, getGraphByRootId, putGraph, getRootNodeList
}

