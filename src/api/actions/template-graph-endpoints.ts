import {
  getWithoutBody,
  postEntitiesWithDifferentReturnType,
  putRequestWithDifferentReturnType
} from './template-actions';
import { isNotUndefined } from '../main';

import { constructUrl } from './template-base-endpoints';
import { HasNumberIdDto } from '@/api/dtos/HasNumberIdDtoSchema';
import { GraphDto, GraphDtoPutRequestBody } from 'react-d3-force-graph';

export type DepthOp = '>' | '>=' | '<' | '<=' | '=' | '!=';

export interface GraphEndpointSet<T extends HasNumberIdDto> {
  getGraph: () => Promise<GraphDto<T>>;
  putGraph: (
    graphPutRequest: GraphDtoPutRequestBody<T>
  ) => Promise<GraphDto<T>>;
  getGraphByRootId: (
    graphRootRequest: ByRootIdGraphRequest
  ) => Promise<GraphDto<T>>;
  getGraphByNodeList: (idList: number[]) => Promise<GraphDto<T>>;
}

export interface ByRootIdGraphRequest {
  rootId: number;
  depth?: number;
  depthOp?: DepthOp;
}

async function getGraphByRootId<T extends HasNumberIdDto>(
  { rootId, depth, depthOp }: ByRootIdGraphRequest,
  url: string
): Promise<GraphDto<T>> {
  const depthParam =
    isNotUndefined(depth) && isNotUndefined(depthOp)
      ? `?depth=${depth}&depthOp=${encodeURIComponent(depthOp)}`
      : '';
  return getWithoutBody(`${url}/byRootId/${rootId}${depthParam}`);
}
async function getGraphByNodeList<T extends HasNumberIdDto>(
  idList: number[],
  url: string
): Promise<GraphDto<T>> {
  return postEntitiesWithDifferentReturnType<number[], GraphDto<T>>(
    idList,
    `${url}/byNodeIdList`
  );
}

async function putGraph<T extends HasNumberIdDto>(
  graphPutRequestBody: GraphDtoPutRequestBody<T>,
  url: string
): Promise<GraphDto<T>> {
  return putRequestWithDifferentReturnType<
    GraphDtoPutRequestBody<T>,
    GraphDto<T>
  >(graphPutRequestBody, url);
}

async function getGraph<T extends HasNumberIdDto>(
  url: string
): Promise<GraphDto<T>> {
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
