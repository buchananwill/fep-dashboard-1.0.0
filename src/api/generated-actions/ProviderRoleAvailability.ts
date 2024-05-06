'use server';
import { ProviderRoleAvailabilityDto } from '../dtos/ProviderRoleAvailabilityDtoSchema';
import { generateBaseEndpointSet } from '@/api/actions/template-base-endpoints';
import { generateIntersectionEndpointSet } from '@/api/actions/template-intersection-endpoints';

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
} = generateBaseEndpointSet<ProviderRoleAvailabilityDto, number>(
  '/api/v2/providerRoles/availabilities'
);

const {
  getByRowIdListAndColumnIdList,
  getColumnIdList,
  getByRowIdList,
  getIntersectionTable
} = generateIntersectionEndpointSet<
  ProviderRoleAvailabilityDto,
  number,
  number
>('/api/v2/providerRoles/availabilities');

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
  getByRowIdListAndColumnIdList,
  getColumnIdList,
  getByRowIdList,
  getIntersectionTable
};
