'use server';
import {
  ActionResponsePromise,
  errorResponse,
  successResponse
} from './actionResponse';
import { HTTP_METHOD } from 'next/dist/server/web/http';
import {
  IdReferencedIntersectionTableDto,
  IntersectionPostRequestMap,
  IntersectionRequestParams
} from '../main';
import { notFound } from 'next/navigation';

function createRequestInit<T>({
  body,
  caching = 'no-cache',
  method = 'GET'
}: {
  body?: T;
  method?: HTTP_METHOD;
  caching?: RequestCache;
}): RequestInit {
  const init: RequestInit = {
    method: method,
    headers: {
      'Content-Type': 'application/json' // Indicate we're sending JSON data
    },
    cache: caching
  };
  if (body) {
    init.body = JSON.stringify(body);
    if (init.method === 'GET') init.method = 'POST';
  }
  return init;
}

export async function postEntities<T>(
  dtoList: T[],
  url: string
): ActionResponsePromise<T[]> {
  const requestInit = createRequestInit({ body: dtoList });
  return callApi<T[]>(url, requestInit);
}
export async function postEntitiesWithDifferentReturnType<T, U>(
  dtoOutbound: T,
  url: string
): ActionResponsePromise<U> {
  const requestInit = createRequestInit({ body: dtoOutbound, method: 'POST' });
  return callApi<U>(url, requestInit);
}
export async function putRequestWithDifferentReturnType<T, U>(
  request: T,
  url: string
): ActionResponsePromise<U> {
  const requestInit = createRequestInit({ body: request, method: 'PUT' });
  return callApi<U>(url, requestInit);
}

export async function getWithoutBody<T>(url: string) {
  const requestInit = createRequestInit({});
  return callApi<T>(url, requestInit);
}

export async function getDtoListByIds<T, U>(
  idList: T[],
  url: string
): ActionResponsePromise<U[]> {
  const requestInit = createRequestInit({ body: idList });
  return callApi(url, requestInit);
}

export async function putEntities<T>(
  entities: T,
  url: string
): ActionResponsePromise<T> {
  const requestInit = createRequestInit({
    body: entities,
    method: 'PUT'
  });

  return callApi<T>(url, requestInit);
}

export async function patchEntity<T>(
  entity: T,
  url: string
): ActionResponsePromise<T> {
  const requestInit = createRequestInit({
    body: entity,
    method: 'PATCH'
  });
  return callApi<T>(url, requestInit);
}
export async function putEntity<T>(
  entity: T,
  url: string
): ActionResponsePromise<T> {
  const requestInit = createRequestInit({
    body: entity,
    method: 'PUT'
  });
  return callApi<T>(url, requestInit);
}
export async function patchEntityList<T>(
  entityList: T[],
  url: string
): ActionResponsePromise<T[]> {
  const requestInit = createRequestInit({
    body: entityList,
    method: 'PATCH'
  });
  return callApi<T[]>(url, requestInit);
}
export async function postEntity<T>(
  entity: T,
  url: string
): ActionResponsePromise<T> {
  const requestInit = createRequestInit({
    body: entity,
    method: 'POST'
  });
  return callApi<T>(url, requestInit);
}

export async function postIntersectionTableRequest<T, U, V>({
  url,
  idsForHasIdTypeT,
  idsForHasIdTypeU
}: IntersectionRequestParams<T, U>) {
  const requestBody: IntersectionPostRequestMap<T, U> = {};
  requestBody[`idListTypeT`] = idsForHasIdTypeT;
  requestBody[`idListTypeU`] = idsForHasIdTypeU;
  createRequestInit({
    body: requestBody,
    method: 'POST'
  });
  return postEntitiesWithDifferentReturnType<
    IntersectionPostRequestMap<T, U>,
    IdReferencedIntersectionTableDto<V>
  >(requestBody, url);
}

export async function deleteEntities<T>(
  entityBody: T[],
  url: string
): ActionResponsePromise<T[]> {
  const request = createRequestInit({ body: entityBody, method: 'DELETE' });
  return callApi<T[]>(url, request);
}

export async function deleteEntity<T>(url: string): ActionResponsePromise<T> {
  const request = createRequestInit({ method: 'DELETE' });
  return callApi<T>(url, request);
}

async function callApi<T>(
  url: string,
  request: RequestInit
): ActionResponsePromise<T> {
  try {
    const response = await fetch(url, request);
    if (response.status >= 200 && response.status < 300) {
      const responseBody: T = await response.json();
      const message = response.statusText;
      return successResponse(responseBody, message);
    } else {
      console.error(response);
      console.error('From: %s', url);
      const newVar = await response.json();
      const errorMessage: string = newVar.message;
      const originalRequest: T = newVar.requestBody;
      // return errorResponse(errorMessage, originalRequest);
      notFound();
    }
  } catch (error) {
    console.error('Error fetching data: ', error);
    // return errorResponse('Error');
    throw Error('Error while fetching data.');
  }
}
