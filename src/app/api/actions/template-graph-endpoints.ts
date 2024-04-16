import { ActionResponsePromise } from './actionResponse';
import {
  getWithoutBody,
  postEntitiesWithDifferentReturnType,
  putRequestWithDifferentReturnType
} from './template-actions';
import { isNotUndefined } from '../main';

import { GraphDto, GraphDtoPutRequestBody } from '../zod-mods';
import { HasNumberIdDto } from '../dtos/HasNumberIdDtoSchema';
import { constructUrl } from './template-base-endpoints';

export type DepthOp = '>' | '>=' | '<' | '<=' | '=' | '!=';

export interface GraphEndpointSet<T extends HasNumberIdDto> {
  getGraph: () => ActionResponsePromise<GraphDto<T>>;
  putGraph: (
    graphPutRequest: GraphDtoPutRequestBody<T>
  ) => ActionResponsePromise<GraphDto<T>>;
  getGraphByRootId: (
    graphRootRequest: ByRootIdGraphRequest
  ) => ActionResponsePromise<GraphDto<T>>;
  getGraphByNodeList: (idList: number[]) => ActionResponsePromise<GraphDto<T>>;
}

export interface ByRootIdGraphRequest {
  rootId: number;
  depth?: number;
  depthOp?: DepthOp;
}

async function getGraphByRootId<T extends HasNumberIdDto>(
  { rootId, depth, depthOp }: ByRootIdGraphRequest,
  url: string
): ActionResponsePromise<GraphDto<T>> {
  const depthParam =
    isNotUndefined(depth) && isNotUndefined(depthOp)
      ? `?depth=${depth}&depthOp=${encodeURIComponent(depthOp)}`
      : '';
  return getWithoutBody(`${url}/byRootId/${rootId}${depthParam}`);
}
async function getGraphByNodeList<T extends HasNumberIdDto>(
  idList: number[],
  url: string
): ActionResponsePromise<GraphDto<T>> {
  return postEntitiesWithDifferentReturnType<number[], GraphDto<T>>(
    idList,
    `${url}/byNodeIdList`
  );
}

async function putGraph<T extends HasNumberIdDto>(
  graphPutRequestBody: GraphDtoPutRequestBody<T>,
  url: string
): ActionResponsePromise<GraphDto<T>> {
  return putRequestWithDifferentReturnType<
    GraphDtoPutRequestBody<T>,
    GraphDto<T>
  >(graphPutRequestBody, url);
}

async function getGraph<T extends HasNumberIdDto>(
  url: string
): ActionResponsePromise<GraphDto<T>> {
  return getWithoutBody(url);
}

export function generateGraphEndpointSet<T extends HasNumberIdDto>(
  path: string | string[]
): GraphEndpointSet<T> {
  const generatedUrl = constructUrl(path, 'graphs');

  return {
    getGraph: () => getGraph<T>(generatedUrl),
    putGraph: (putRequest) => putGraph(putRequest, generatedUrl),
    getGraphByRootId: (byRootRequest) =>
      getGraphByRootId<T>(byRootRequest, generatedUrl),
    getGraphByNodeList: (idList) => getGraphByNodeList(idList, generatedUrl)
  };
}
