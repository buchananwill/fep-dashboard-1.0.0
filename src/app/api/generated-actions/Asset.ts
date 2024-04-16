'use server';
import { AssetDto } from '../dtos/AssetDtoSchema';
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
getGraph, getGraphByNodeList, getGraphByRootId, putGraph } =
 generateGraphEndpointSet<
  AssetDto
>(
  '/api/v2/assets'
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
, getByTypeIdList, getGraph, getGraphByNodeList, getGraphByRootId, putGraph
}

