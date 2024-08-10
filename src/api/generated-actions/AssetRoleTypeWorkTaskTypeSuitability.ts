'use server';
import { AssetRoleTypeWorkTaskTypeSuitabilityDto } from '@/api/zod-schemas/AssetRoleTypeWorkTaskTypeSuitabilityDtoSchema';
import { generateBaseEndpointSet } from '../actions/template-base-endpoints';
import { generateTriIntersectionEndpointSet } from '../actions/template-tri-intersection-endpoints';

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
  AssetRoleTypeWorkTaskTypeSuitabilityDto,
  number
>(
  '/api/v2/workTaskTypes/assetRoleSuitabilities'
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

