'use server';
import { ProviderRoleTypeWorkTaskTypeSuitabilityDto } from '@/api/generated-types/generated-types_';
import { generateBaseEndpointSet } from '../actions/template-base-endpoints';
import { generateTriIntersectionEndpointSet } from '../actions/template-tri-intersection-endpoints';

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
  ProviderRoleTypeWorkTaskTypeSuitabilityDto,
  number
>(
  '/api/v3/provider-role-type-work-task-type-suitability'
);



const {
  getByRowIdListAndColumnIdListAndLayerId,
  getByRowIdListAndLayerId,
  getColumnIdListAndLayerId,
  getTriIntersectionTable

} = generateTriIntersectionEndpointSet<
  ProviderRoleTypeWorkTaskTypeSuitabilityDto,
  number,
  number,
  number
>('/api/v2/workTaskType/providerRoleTypeSuitabilities');

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
,   getByRowIdListAndColumnIdListAndLayerId,
  getByRowIdListAndLayerId,
  getColumnIdListAndLayerId,
  getTriIntersectionTable


}

