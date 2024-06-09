import { ActionResponsePromise } from './actionResponse';
import {
  postEntitiesWithDifferentReturnType,
  postIntersectionTableRequest
} from './template-actions';
import { constructUrl } from './template-base-endpoints';
import {
  IdReferencedIntersectionTableDto,
  IntersectionRequestParams
} from '@/api/types';

export interface TriIntersectionEndpoints<T, U, V, W> {
  getTriIntersectionTable: (
    idsForHasIdTypeT: U[],
    idsForHasIdTypeU: V[],
    layerId: W
  ) => Promise<IdReferencedIntersectionTableDto<T>>;
  getByRowIdListAndLayerId: (
    rowIdList: string[] | number[],
    layerId: W
  ) => Promise<IdReferencedIntersectionTableDto<T>>;
  getColumnIdListAndLayerId: (
    columnIdList: string[] | number[],
    layerId: W
  ) => Promise<IdReferencedIntersectionTableDto<T>>;
  getByRowIdListAndColumnIdListAndLayerId: (
    idsForHasIdTypeT: T[],
    idsForHasIdTypeU: U[],
    layerId: W
  ) => Promise<IdReferencedIntersectionTableDto<T>>;
}

async function getTriIntersectionTable<T, U, V, W>(
  request: IntersectionRequestParams<U, V>,
  layerId: W
): Promise<IdReferencedIntersectionTableDto<T>> {
  const modifiedUrlRequest = {
    ...request,
    url: `${request.url}/${layerId}/intersectionTable`
  };
  return postIntersectionTableRequest<U, V, T>(modifiedUrlRequest);
}

export function generateTriIntersectionEndpointSet<T, U, V, W>(
  path: string | string[]
): TriIntersectionEndpoints<T, U, V, W> {
  const generatedUrl = constructUrl(path);

  return {
    getTriIntersectionTable: (idsForHasIdTypeT, idsForHasIdTypeU, layerId) =>
      getTriIntersectionTable<T, U, V, W>(
        {
          idsForHasIdTypeT,
          idsForHasIdTypeU,
          url: generatedUrl
        },
        layerId
      ),
    getByRowIdListAndLayerId: (rowIdList, layerId) =>
      getByRowIdListAndLayerId(rowIdList, generatedUrl, layerId),
    getColumnIdListAndLayerId: (columnIdList, layerId) =>
      getByColumnIdListAndLayerId(columnIdList, generatedUrl, layerId),
    getByRowIdListAndColumnIdListAndLayerId: (
      idsForHasIdTypeT,
      idsForHasIdTypeU,
      layerId
    ) =>
      getTriIntersectionEntitiesByRowAndColumnIdLists(
        {
          idsForHasIdTypeT,
          idsForHasIdTypeU,
          url: generatedUrl
        },
        layerId
      )
  };
}

async function getTriIntersectionEntitiesByRowAndColumnIdLists<T, W>(
  request: IntersectionRequestParams<any, any>,
  layerId: W
): Promise<IdReferencedIntersectionTableDto<T>> {
  const modifiedUrlRequest = {
    ...request,
    url: `${request.url}/${layerId}/byRowIdListAndColumnIdList`
  };
  return postIntersectionTableRequest<any, any, T>(modifiedUrlRequest);
}
async function getByRowIdListAndLayerId<T, W>(
  idList: string[] | number[],
  url: string,
  layerId: W
): Promise<IdReferencedIntersectionTableDto<T>> {
  return postEntitiesWithDifferentReturnType<
    string[] | number[],
    IdReferencedIntersectionTableDto<T>
  >(idList, `${url}/${layerId}/byRowIdList`);
}
async function getByColumnIdListAndLayerId<T, W>(
  idList: string[] | number[],
  url: string,
  layerId: W
): Promise<IdReferencedIntersectionTableDto<T>> {
  return postEntitiesWithDifferentReturnType<
    string[] | number[],
    IdReferencedIntersectionTableDto<T>
  >(idList, `${url}/${layerId}/byColumnIdList`);
}
