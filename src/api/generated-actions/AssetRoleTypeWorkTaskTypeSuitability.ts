'use server';
import { AssetRoleTypeWorkTaskTypeSuitabilityDto } from '@/api/generated-types/generated-types_';
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
  AssetRoleTypeWorkTaskTypeSuitabilityDto,
  number
>(
  '/api/v3/asset-role-type-work-task-type-suitability'
);



const {
  getByRowIdListAndColumnIdListAndLayerId,
  getByRowIdListAndLayerId,
  getColumnIdListAndLayerId,
  getTriIntersectionTable

} = generateTriIntersectionEndpointSet<
  AssetRoleTypeWorkTaskTypeSuitabilityDto,
  number,
  number,
  number
>('/api/v2/workTaskTypes/assetRoleSuitabilities');

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

