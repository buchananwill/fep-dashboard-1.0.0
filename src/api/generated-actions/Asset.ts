'use server';
import { AssetDto } from '@/api/generated-types/generated-types';
import { generateBaseEndpointSet } from '../actions/template-base-endpoints';
import { generateWithTypeEndpointSet } from '../actions/template-type-endpoints';
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
  AssetDto,
  number
>(
  '/api/v2/assets'
);


const {
getByTypeIdList  } = generateWithTypeEndpointSet<AssetDto>(
  '/api/v2/assets'
);


const {
getGraph, getGraphByNodeList, getGraphByRootId, putGraph, getRootNodeList } =
 generateGraphEndpointSet<
  AssetDto
>(
  '/api/v2/assets'
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
, getByTypeIdList, getGraph, getGraphByNodeList, getGraphByRootId, putGraph, getRootNodeList
}

