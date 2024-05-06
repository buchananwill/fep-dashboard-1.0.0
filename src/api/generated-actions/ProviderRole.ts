'use server';
import { ProviderRoleDto } from '../dtos/ProviderRoleDtoSchema';
import { generateBaseEndpointSet } from '@/api/actions/template-base-endpoints';
import { generateWithTypeEndpointSet } from '@/api/actions/template-type-endpoints';

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
} = generateBaseEndpointSet<ProviderRoleDto, number>('/api/v2/providerRoles');

const { getByTypeIdList } = generateWithTypeEndpointSet<ProviderRoleDto>(
  '/api/v2/providerRoles'
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
  getDtoListByExampleList,
  getByTypeIdList
};
