import {
  getWithoutBody,
  postEntitiesWithDifferentReturnType,
  putRequestWithDifferentReturnType
} from './template-actions';
import { isNotUndefined } from '../main';

import { constructUrl } from './template-base-endpoints';
import { GraphDto, GraphDtoPutRequestBody } from 'react-d3-force-wrapper';
import { HasNumberId } from '@/api/types';

export type DepthOp = '>' | '>=' | '<' | '<=' | '=' | '!=';

export interface GraphEndpointSet<T extends HasNumberId> {
  getGraph: () => Promise<GraphDto<T>>;
  putGraph: (
    graphPutRequest: GraphDtoPutRequestBody<T>
  ) => Promise<GraphDto<T>>;
  getGraphByRootId: (
    graphRootRequest: ByRootIdGraphRequest
  ) => Promise<GraphDto<T>>;
  getGraphByNodeList: (idList: number[]) => Promise<GraphDto<T>>;
  getRootNodeList: () => Promise<T[]>;
}

export interface ByRootIdGraphRequest {
  rootId: number;
  depth?: number;
  depthOp?: DepthOp;
}

async function getGraphByRootId<T extends HasNumberId>(
  { rootId, depth, depthOp }: ByRootIdGraphRequest,
  url: string
): Promise<GraphDto<T>> {
  const depthParam =
    isNotUndefined(depth) && isNotUndefined(depthOp)
      ? `?depth=${depth}&depthOp=${encodeURIComponent(depthOp)}`
      : '';
  return getWithoutBody(`${url}/byRootId/${rootId}${depthParam}`);
}
async function getGraphByNodeList<T extends HasNumberId>(
  idList: number[],
  url: string
): Promise<GraphDto<T>> {
  return postEntitiesWithDifferentReturnType<number[], GraphDto<T>>(
    idList,
    `${url}/byNodeIdList`
  );
}

async function getRootNodeList<T extends HasNumberId>(
  url: string
): Promise<T[]> {
  return getWithoutBody(`${url}/rootNodeList`);
}

async function putGraph<T extends HasNumberId>(
  graphPutRequestBody: GraphDtoPutRequestBody<T>,
  url: string
): Promise<GraphDto<T>> {
  return putRequestWithDifferentReturnType<
    GraphDtoPutRequestBody<T>,
    GraphDto<T>
  >(graphPutRequestBody, url);
}

async function getGraph<T extends HasNumberId>(
  url: string
): Promise<GraphDto<T>> {
  return getWithoutBody(url);
}

export function generateGraphEndpointSet<T extends HasNumberId>(
  path: string | string[]
): GraphEndpointSet<T> {
  const generatedUrl = constructUrl(path, 'graphs');

  return {
    getGraph: () => getGraph<T>(generatedUrl),
    putGraph: (putRequest) => putGraph(putRequest, generatedUrl),
    getGraphByRootId: (byRootRequest) =>
      getGraphByRootId<T>(byRootRequest, generatedUrl),
    getGraphByNodeList: (idList) => getGraphByNodeList(idList, generatedUrl),
    getRootNodeList: () => getRootNodeList(generatedUrl)
  };
}
