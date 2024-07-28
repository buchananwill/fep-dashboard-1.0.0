import {
  postEntitiesWithDifferentReturnType,
  postIntersectionTableRequest
} from './template-actions';
import { constructUrl } from './template-base-endpoints';
import {
  IdReferencedIntersectionTableDto,
  IntersectionRequestParams
} from '@/api/types';

export interface IntersectionEndpoints<T, U, V> {
  getIntersectionTable: (
    idsForHasIdTypeT: T[],
    idsForHasIdTypeU: U[]
  ) => Promise<IdReferencedIntersectionTableDto<V>>;
  getByRowIdList: (
    rowIdList: string[] | number[]
  ) => Promise<IdReferencedIntersectionTableDto<T>>;
  getColumnIdList: (
    columnIdList: string[] | number[]
  ) => Promise<IdReferencedIntersectionTableDto<T>>;
  getByRowIdListAndColumnIdList: (
    idsForHasIdTypeT: T[],
    idsForHasIdTypeU: U[]
  ) => Promise<IdReferencedIntersectionTableDto<T>>;
}

async function getIntersectionTable<T, U, V>(
  request: IntersectionRequestParams<T, U>
): Promise<IdReferencedIntersectionTableDto<V>> {
  const modifiedUrlRequest = {
    ...request,
    url: `${request.url}/intersectionTable`
  };
  return postIntersectionTableRequest<T, U, V>(modifiedUrlRequest);
}

export function generateIntersectionEndpointSet<T, U, V>(
  path: string | string[]
): IntersectionEndpoints<T, U, V> {
  const generatedUrl = constructUrl(path);

  return {
    getIntersectionTable: (idsForHasIdTypeT, idsForHasIdTypeU) =>
      getIntersectionTable<T, U, V>({
        idsForHasIdTypeT,
        idsForHasIdTypeU,
        url: generatedUrl
      }),
    getByRowIdList: (rowIdList) => getByRowIdList(rowIdList, generatedUrl),
    getColumnIdList: (columnIdList) =>
      getByColumnIdList(columnIdList, generatedUrl),
    getByRowIdListAndColumnIdList: (idsForHasIdTypeT, idsForHasIdTypeU) =>
      getIntersectionEntitiesByRowAndColumnIdLists({
        idsForHasIdTypeT,
        idsForHasIdTypeU,
        url: generatedUrl
      })
  };
}

async function getIntersectionEntitiesByRowAndColumnIdLists<T>(
  request: IntersectionRequestParams<any, any>
): Promise<IdReferencedIntersectionTableDto<T>> {
  const modifiedUrlRequest = {
    ...request,
    url: `${request.url}/byRowIdListAndColumnIdList`
  };
  return postIntersectionTableRequest<any, any, T>(modifiedUrlRequest);
}
async function getByRowIdList<T>(
  idList: string[] | number[],
  url: string
): Promise<IdReferencedIntersectionTableDto<T>> {
  return postEntitiesWithDifferentReturnType<
    string[] | number[],
    IdReferencedIntersectionTableDto<T>
  >(idList, `${url}/byRowIdList`);
}
async function getByColumnIdList<T>(
  idList: string[] | number[],
  url: string
): Promise<IdReferencedIntersectionTableDto<T>> {
  return postEntitiesWithDifferentReturnType<
    string[] | number[],
    IdReferencedIntersectionTableDto<T>
  >(idList, `${url}/byColumnIdList`);
}
