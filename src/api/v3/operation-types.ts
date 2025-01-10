import { Entity, Identifier } from 'dto-stores';
import {
  deleteDtoList,
  deleteOneEntity,
  DtoListParams,
  ExampleListParams,
  getAll,
  getDto,
  getDtoListByBodyList,
  getDtoListByExampleList,
  getDtoListByParamList,
  getDtoPage,
  getIdList,
  IdListParams,
  IdParams,
  PageRequestParams,
  postDto,
  postDtoList,
  putDto,
  putDtoList
} from '@/api/v3/operations';
import {
  deleteEntities,
  postEntitiesWithDifferentReturnType
} from '@/api/actions/template-actions';
import { HasIdClass, HasNumberId, HasUuid } from '@/api/types';

export type ClientApiParams<
  T extends HasIdClass<ID_TYPE>,
  ID_TYPE extends Identifier = T['id']
> = {
  deleteDtoList: IdListParams<ID_TYPE>;
  putDto: { dto: T & (HasNumberId | HasUuid) };
  getDto: IdParams<ID_TYPE>;
  postDto: { dto: T };
  deleteOneEntity: IdParams<ID_TYPE>;
  postDtoList: DtoListParams<T>;
  putDtoList: DtoListParams<T>;
  getDtoListByExampleList: ExampleListParams<T>;
  getDtoListByBodyList: IdListParams<string | number>;
  getIdList: object;
  getDtoPage: PageRequestParams;
  getAll: object;
};
export type ApiOperationKey<T extends HasIdClass> = keyof ClientApiParams<T>;
type ClientApiReturnDefinition<
  T extends HasIdClass<ID_TYPE>,
  ID_TYPE extends Identifier
> = {
  deleteDtoList: Awaited<ReturnType<typeof deleteDtoList<ID_TYPE>>>;
  putDto: Awaited<ReturnType<typeof putDto<T>>>;
  getDto: Awaited<ReturnType<typeof getDto<T, ID_TYPE>>>;
  postDto: Awaited<ReturnType<typeof postDto<T>>>;
  deleteOneEntity: Awaited<ReturnType<typeof deleteOneEntity<ID_TYPE>>>;
  postDtoList: Awaited<ReturnType<typeof postDtoList<T>>>;
  putDtoList: Awaited<ReturnType<typeof putDtoList<T>>>;
  getDtoListByExampleList: Awaited<
    ReturnType<typeof getDtoListByExampleList<T>>
  >;
  getDtoListByBodyList: Awaited<
    ReturnType<typeof getDtoListByBodyList<T, ID_TYPE>>
  >;
  getIdList: Awaited<ReturnType<typeof getIdList<ID_TYPE>>>;
  getDtoPage: Awaited<ReturnType<typeof getDtoPage<T>>>;
  getAll: Awaited<ReturnType<typeof getAll<T>>>;
};
export type OperationKeyReturn<
  T extends Entity,
  OperationKey extends ApiOperationKey<T>
> = ClientApiReturnDefinition<T, any>[OperationKey];
