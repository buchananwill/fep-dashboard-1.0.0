'use server';
import { ProviderRoleTypeWorkTaskTypeSuitabilityDto } from '../dtos/ProviderRoleTypeWorkTaskTypeSuitabilityDtoSchema';
import { generateBaseEndpointSet } from '@/api/actions/template-base-endpoints';
import { generateTriIntersectionEndpointSet } from '@/api/actions/template-tri-intersection-endpoints';

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
} = generateBaseEndpointSet<ProviderRoleTypeWorkTaskTypeSuitabilityDto, number>(
  '/api/v2/workTaskType/providerRoleTypeSuitabilities'
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
  deleteIdList,
  postList,
  putList,
  getOne,
  postOne,
  putOne,
  deleteOne,
  getDtoListByBodyList,
  getDtoListByParamList,
  getDtoListByExampleList,
  getByRowIdListAndColumnIdListAndLayerId,
  getByRowIdListAndLayerId,
  getColumnIdListAndLayerId,
  getTriIntersectionTable
};
