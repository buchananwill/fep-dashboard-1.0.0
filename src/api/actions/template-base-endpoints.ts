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
} from './template-actions';
import { isNotUndefined } from '../main';
import { PartialDeep } from 'type-fest';
import { HasNumberId, HasUuid, Page } from '@/api/types';
import { BASE_URL } from '@/api/BASE_URL';

export function constructUrl(
  resourceSegments: string[] | string,
  action?: string
) {
  const basePath = BASE_URL;

  let resourcePath = Array.isArray(resourceSegments)
    ? resourceSegments.join('/')
    : resourceSegments;
  resourcePath = resourcePath.startsWith('/')
    ? resourcePath
    : `/${resourcePath}`;
  return `${basePath}${resourcePath}${
    isNotUndefined(action) ? `/${action}` : ''
  }`;
}

export interface PageRequest {
  page?: number;
  pageSize?: number;
  sort?: string;
}

export interface BaseEndpointSet<T, ID_TYPE extends string | number> {
  getPage: (pageRequest: PageRequest) => Promise<Page<T>>;
  getIdList: () => Promise<ID_TYPE[]>;
  getAll: () => Promise<T[]>;
  putList: (dtoList: T[]) => Promise<T[]>;
  postList: (dtoList: T[]) => Promise<T[]>;
  deleteIdList: (idDeletionList: ID_TYPE[]) => Promise<ID_TYPE[]>;
  getOne: (id: ID_TYPE) => Promise<T>;
  putOne: (dto: T) => Promise<T>;
  postOne: (dto: T) => Promise<T>;
  deleteOne: (id: ID_TYPE) => Promise<ID_TYPE>;
  getDtoListByParamList: (idList: ID_TYPE[]) => Promise<T[]>;
  getDtoListByBodyList: (idList: ID_TYPE[]) => Promise<T[]>;
  getDtoListByExampleList: (exampleList: PartialDeep<T>[]) => Promise<T[]>;
}

async function getDtoList<T>(
  { page = 0, pageSize = 10 }: PageRequest,
  url: string
): Promise<Page<T>> {
  return getWithoutBody(`${url}?page=${page}&size=${pageSize}`);
}

async function getIdList<IdType>(url: string): Promise<IdType[]> {
  return getWithoutBody(`${url}/idList`);
}

async function getAll<T>(url: string) {
  return getWithoutBody<T[]>(`${url}/listAll`);
}
async function getDtoListByParamList<T, ID_TYPE extends string | number>(
  idList: ID_TYPE[],
  url: string
): Promise<T[]> {
  const paramString = idList.map((id) => `id=${id}`).join('&');
  return getWithoutBody(`${url}/listById?${paramString}`);
}
async function getDtoListByBodyList<T, ID_TYPE extends string | number>(
  idList: ID_TYPE[],
  url: string
): Promise<T[]> {
  return getDtoListByIds<ID_TYPE, T>(idList, `${url}/listById`);
}
async function getDtoListByExampleList<T>(
  exampleList: PartialDeep<T>[],
  url: string
): Promise<T[]> {
  return postEntitiesWithDifferentReturnType<PartialDeep<T>[], T[]>(
    exampleList,
    `${url}/listByExampleList`
  );
}

async function putDtoList<T>(dtoList: T[], url: string): Promise<T[]> {
  return putEntities(dtoList, url);
}

async function postDtoList<T>(dtoList: T[], url: string): Promise<T[]> {
  return postEntities(dtoList, url);
}

async function deleteDtoList<ID_TYPE>(
  deletionIdList: ID_TYPE[],
  url: string
): Promise<ID_TYPE[]> {
  return deleteEntities(deletionIdList, url);
}

function getSingletonCrudUrl(url: string, id: number | string) {
  return `${url}/${id}`;
}

async function getDto<T, ID_TYPE extends number | string>(
  id: ID_TYPE,
  url: string
): Promise<T> {
  return getWithoutBody(getSingletonCrudUrl(url, id));
}

async function putDto<T extends HasNumberId | HasUuid>(
  dto: T,
  url: string
): Promise<T> {
  return putEntity(dto, getSingletonCrudUrl(url, dto.id));
}

async function postDto<T>(dto: T, url: string): Promise<T> {
  return postEntity(dto, `${url}/create`);
}

async function deleteOneEntity<ID_TYPE extends number | string>(
  deletionId: ID_TYPE,
  url: string
): Promise<ID_TYPE> {
  return deleteEntity(getSingletonCrudUrl(url, deletionId));
}

export function generateBaseEndpointSet<
  T extends HasNumberId | HasUuid,
  ID_TYPE extends string | number
>(path: string | string[]): BaseEndpointSet<T, ID_TYPE> {
  const generatedUrl = constructUrl(path);

  return {
    getPage: (pageRequest) => getDtoList<T>(pageRequest, generatedUrl),
    getIdList: () => getIdList<ID_TYPE>(generatedUrl),
    getAll: () => getAll(generatedUrl),
    putList: (dtoList) => putDtoList(dtoList, generatedUrl),
    postList: (dtoList) => postDtoList(dtoList, generatedUrl),
    deleteIdList: (idDeletionList) =>
      deleteDtoList<ID_TYPE>(idDeletionList, generatedUrl),
    getOne: (id) => getDto(id, generatedUrl),
    putOne: (dto) => putDto(dto, generatedUrl),
    postOne: (dto) => postDto(dto, generatedUrl),
    deleteOne: (id) => deleteOneEntity(id, generatedUrl),
    getDtoListByParamList: (idList) =>
      getDtoListByParamList<T, ID_TYPE>(idList, generatedUrl),
    getDtoListByBodyList: (idList) =>
      getDtoListByBodyList<T, ID_TYPE>(idList, generatedUrl),
    getDtoListByExampleList: (exampleList) =>
      getDtoListByExampleList(exampleList, generatedUrl)
  };
}
