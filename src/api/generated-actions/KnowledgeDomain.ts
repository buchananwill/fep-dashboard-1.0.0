'use server';
import { KnowledgeDomainDto } from '@/api/generated-types/generated-types';
import { generateGraphEndpointSet } from '../actions/template-graph-endpoints';
import { generateBaseEndpointSet } from '../actions/template-base-endpoints';

const {
getGraph, getGraphByNodeList, getGraphByRootId, putGraph, getRootNodeList } =
 generateGraphEndpointSet<
  KnowledgeDomainDto
>(
  '/knowledgeDomains'
);



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
  KnowledgeDomainDto,
  number
>(
  '/api/v2/serviceCategories/knowledgeDomains'
);


export {
    getGraph, getGraphByNodeList, getGraphByRootId, putGraph, getRootNodeList, getPage,
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

}

