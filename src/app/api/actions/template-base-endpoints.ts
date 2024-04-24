import { ActionResponsePromise } from './actionResponse';
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
import { BASE_URL, HasNumberId, HasUuid, isNotUndefined, Page } from '../main';

export function constructUrl(
  resourceSegments: string[] | string,
  action?: string
) {
  const basePath = BASE_URL;

  const resourcePath = Array.isArray(resourceSegments)
    ? resourceSegments.join('/')
    : resourceSegments;
  return `${basePath}${resourcePath}${
    isNotUndefined(action) ? `/${action}` : ''
  }`;
}

export interface PageRequest {
  page?: number;
  pageSize?: number;
  sort?: string;
}

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends object ? RecursivePartial<T[P]> : T[P];
};

export interface BaseEndpointSet<T, ID_TYPE extends string | number> {
  getPage: (pageRequest: PageRequest) => ActionResponsePromise<Page<T>>;
  getAll: () => ActionResponsePromise<T[]>;
  putList: (dtoList: T[]) => ActionResponsePromise<T[]>;
  postList: (dtoList: T[]) => ActionResponsePromise<T[]>;
  deleteIdList: (idDeletionList: ID_TYPE[]) => ActionResponsePromise<ID_TYPE[]>;
  getOne: (id: ID_TYPE) => ActionResponsePromise<T>;
  putOne: (dto: T) => ActionResponsePromise<T>;
  postOne: (dto: T) => ActionResponsePromise<T>;
  deleteOne: (id: ID_TYPE) => ActionResponsePromise<ID_TYPE>;
  getDtoListByParamList: (idList: ID_TYPE[]) => ActionResponsePromise<T[]>;
  getDtoListByBodyList: (idList: ID_TYPE[]) => ActionResponsePromise<T[]>;
  getDtoListByExampleList: (
    exampleList: RecursivePartial<T>[]
  ) => ActionResponsePromise<T[]>;
}

async function getDtoList<T>(
  { page = 0, pageSize = 10 }: PageRequest,
  url: string
): ActionResponsePromise<Page<T>> {
  return getWithoutBody(`${url}?page=${page}&size=${pageSize}`);
}

async function getAll<T>(url: string) {
  return getWithoutBody<T[]>(`${url}/listAll`);
}
async function getDtoListByParamList<T, ID_TYPE extends string | number>(
  idList: ID_TYPE[],
  url: string
): ActionResponsePromise<T[]> {
  const paramString = idList.map((id) => `id=${id}`).join('&');
  return getWithoutBody(`${url}/listById?${paramString}`);
}
async function getDtoListByBodyList<T, ID_TYPE extends string | number>(
  idList: ID_TYPE[],
  url: string
): ActionResponsePromise<T[]> {
  return getDtoListByIds<ID_TYPE, T>(idList, `${url}/listById`);
}
async function getDtoListByExampleList<T>(
  exampleList: RecursivePartial<T>[],
  url: string
): ActionResponsePromise<T[]> {
  return postEntitiesWithDifferentReturnType<RecursivePartial<T>[], T[]>(
    exampleList,
    `${url}/listByExampleList`
  );
}

async function putDtoList<T>(
  dtoList: T[],
  url: string
): ActionResponsePromise<T[]> {
  return putEntities(dtoList, url);
}

async function postDtoList<T>(
  dtoList: T[],
  url: string
): ActionResponsePromise<T[]> {
  return postEntities(dtoList, url);
}

async function deleteDtoList<ID_TYPE>(
  deletionIdList: ID_TYPE[],
  url: string
): ActionResponsePromise<ID_TYPE[]> {
  return deleteEntities(deletionIdList, url);
}

function getSingletonCrudUrl(url: string, id: number | string) {
  return `${url}/${id}`;
}

async function getDto<T, ID_TYPE extends number | string>(
  id: ID_TYPE,
  url: string
): ActionResponsePromise<T> {
  return getWithoutBody(getSingletonCrudUrl(url, id));
}

async function putDto<T extends HasNumberId | HasUuid>(
  dto: T,
  url: string
): ActionResponsePromise<T> {
  return putEntity(dto, getSingletonCrudUrl(url, dto.id));
}

async function postDto<T>(dto: T, url: string): ActionResponsePromise<T> {
  return postEntity(dto, `${url}/create`);
}

async function deleteOneEntity<ID_TYPE extends number | string>(
  deletionId: ID_TYPE,
  url: string
): ActionResponsePromise<ID_TYPE> {
  return deleteEntity(getSingletonCrudUrl(url, deletionId));
}

export function generateBaseEndpointSet<
  T extends HasNumberId | HasUuid,
  ID_TYPE extends string | number
>(path: string | string[]): BaseEndpointSet<T, ID_TYPE> {
  const generatedUrl = constructUrl(path);

  return {
    getPage: (pageRequest) => getDtoList<T>(pageRequest, generatedUrl),
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
