'use server';
import { HTTP_METHOD } from 'next/dist/server/web/http';
import {
  IdReferencedIntersectionTableDto,
  IntersectionPostRequestMap,
  IntersectionRequestParams
} from '@/api/types';

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

export async function postEntities<T>(dtoList: T[], url: string): Promise<T[]> {
  const requestInit = createRequestInit({ body: dtoList });
  return callApi<T[]>(url, requestInit);
}
export async function postEntitiesWithDifferentReturnType<T, U>(
  dtoOutbound: T,
  url: string
): Promise<U> {
  const requestInit = createRequestInit({ body: dtoOutbound, method: 'POST' });
  return callApi<U>(url, requestInit);
}
export async function putRequestWithDifferentReturnType<T, U>(
  request: T,
  url: string
): Promise<U> {
  const requestInit = createRequestInit({ body: request, method: 'PUT' });
  return callApi<U>(url, requestInit);
}

export async function getWithoutBody<T>(url: string) {
  const requestInit = createRequestInit({ method: 'GET' });
  return callApi<T>(url, requestInit);
}

export async function getDtoListByIds<T, U>(
  idList: T[],
  url: string
): Promise<U[]> {
  const requestInit = createRequestInit({ body: idList });
  return callApi(url, requestInit);
}

export async function putEntities<T>(entities: T, url: string): Promise<T> {
  const requestInit = createRequestInit({
    body: entities,
    method: 'PUT'
  });

  return callApi<T>(url, requestInit);
}

export async function patchEntity<T>(entity: T, url: string): Promise<T> {
  const requestInit = createRequestInit({
    body: entity,
    method: 'PATCH'
  });
  return callApi<T>(url, requestInit);
}
export async function putEntity<T>(entity: T, url: string): Promise<T> {
  const requestInit = createRequestInit({
    body: entity,
    method: 'PUT'
  });
  return callApi<T>(url, requestInit);
}
export async function patchEntityList<T>(
  entityList: T[],
  url: string
): Promise<T[]> {
  const requestInit = createRequestInit({
    body: entityList,
    method: 'PATCH'
  });
  return callApi<T[]>(url, requestInit);
}
export async function postEntity<T>(entity: T, url: string): Promise<T> {
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
): Promise<T[]> {
  const request = createRequestInit({ body: entityBody, method: 'DELETE' });
  return callApi<T[]>(url, request);
}

export async function deleteEntity<T>(url: string): Promise<T> {
  const request = createRequestInit({ method: 'DELETE' });
  return callApi<T>(url, request);
}

async function callApi<T>(url: string, request: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, request);

    // Check if response is successful
    if (response.status >= 200 && response.status < 300) {
      const contentType = response.headers.get('content-type') || '';

      if (contentType.includes('application/json')) {
        return await response.json(); // Parse as JSON if content type is JSON
      } else if (contentType.includes('text/plain')) {
        // If it's plain text, you can log or handle it appropriately
        const text = await response.text();
        console.warn('Received plain text response:', text);
        throw new Error('Expected JSON but received plain text');
      } else {
        throw new Error(`Unsupported content type: ${contentType}`);
      }
    } else {
      console.error(
        `Error from API: ${response.status} - ${response.statusText}`
      );
      console.error('From: %s', url);

      // Check for error response type
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        console.error(response);
        // Handle JSON response for errors
        const errorJson = await response.json();
        console.error(errorJson);
      } else if (contentType.includes('text/plain')) {
        // Handle plain text error response
        const errorText = await response.text();
        console.error('Error message:', errorText);
      } else {
        console.error('Unsupported error content type:', contentType);
      }
      throw new Error();
      // notFound(); // Custom error handler
    }
  } catch (error) {
    console.error('Error fetching data:', request, url);
    throw Error('Error while fetching data.');
  }
}
