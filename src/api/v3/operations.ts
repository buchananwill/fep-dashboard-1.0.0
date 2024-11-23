'server only';
import {
  deleteEntities,
  deleteEntity,
  getDtoListByIds,
  getWithoutBody,
  postEntities,
  postEntitiesWithDifferentReturnType,
  postEntity,
  putEntities,
  putEntity
} from '@/api/actions/template-actions';
import { Page } from '@/api/types';
import { Entity } from 'dto-stores';
import { PartialDeep } from 'type-fest';
import { PageRequest } from '@/api/actions/template-base-endpoints';

export type UrlParams = { url: string };
export type IdParams<ID_TYPE extends number | string> = {
  id: ID_TYPE;
};
export type IdListParams<ID_TYPE extends number | string> = {
  idList: ID_TYPE[];
};
export type DtoListParams<T> = {
  dtoList: T[];
};
export type PageRequestParams = {
  pageRequest: PageRequest;
};
export type ExampleListParams<T> = {
  exampleList: PartialDeep<T>[];
};

export async function getDtoPage<T>(
  params: PageRequestParams & UrlParams
): Promise<Page<T>> {
  const { page = 0, pageSize = 10 } = params.pageRequest;
  return getWithoutBody(`${params.url}?page=${page}&size=${pageSize}`);
}

export async function getIdList<IdType>(params: UrlParams): Promise<IdType[]> {
  return getWithoutBody(`${params.url}/idList`);
}

export async function getAll<T>(params: UrlParams): Promise<T[]> {
  return getWithoutBody<T[]>(`${params.url}/listAll`);
}

export async function getDtoListByParamList<T, ID_TYPE extends string | number>(
  params: IdListParams<ID_TYPE> & UrlParams
): Promise<T[]> {
  const paramString = params.idList.map((id) => `id=${id}`).join('&');
  return getWithoutBody(`${params.url}/listById?${paramString}`);
}

export async function getDtoListByBodyList<T, ID_TYPE extends string | number>(
  params: IdListParams<ID_TYPE> & UrlParams
): Promise<T[]> {
  return getDtoListByIds<ID_TYPE, T>(params.idList, `${params.url}/listById`);
}

export async function getDtoListByExampleList<T>(
  params: ExampleListParams<T> & UrlParams
): Promise<T[]> {
  return postEntitiesWithDifferentReturnType<PartialDeep<T>[], T[]>(
    params.exampleList,
    `${params.url}/listByExampleList`
  );
}

export async function putDtoList<T>(
  params: DtoListParams<T> & UrlParams
): Promise<T[]> {
  return putEntities(params.dtoList, params.url);
}

export async function postDtoList<T>(
  params: DtoListParams<T> & UrlParams
): Promise<T[]> {
  return postEntities(params.dtoList, params.url);
}

export async function deleteDtoList<ID_TYPE extends string | number>(
  params: IdListParams<ID_TYPE> & UrlParams
): Promise<ID_TYPE[]> {
  return deleteEntities(params.idList, params.url);
}

function getSingletonCrudUrl(
  params: IdParams<number | string> & UrlParams
): string {
  return `${params.url}/${params.id}`;
}

export async function getDto<T, ID_TYPE extends number | string>(
  params: IdParams<ID_TYPE> & UrlParams
): Promise<T> {
  return getWithoutBody(getSingletonCrudUrl(params));
}

export async function putDto<T extends Entity>(
  params: { dto: T } & UrlParams
): Promise<T> {
  return putEntity(
    params.dto,
    getSingletonCrudUrl({ url: params.url, id: params.dto.id })
  );
}

export async function postDto<T>(params: { dto: T } & UrlParams): Promise<T> {
  return postEntity(params.dto, `${params.url}/create`);
}

export async function deleteOneEntity<ID_TYPE extends number | string>(
  params: IdParams<ID_TYPE> & UrlParams
): Promise<ID_TYPE> {
  return deleteEntity(getSingletonCrudUrl(params));
}
