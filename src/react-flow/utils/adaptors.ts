import { Coordinate, FlowEdge, FlowNode } from '@/react-flow/types';
import {
  ClosureDto,
  DataNode,
  DataNodeDto,
  getAnyIdAsString
} from 'react-d3-force-graph';
import { HasNumberId } from '@/api/main';

const nodeType = 'organization';

// const stringOrNumber = ["string", "number"] as const;

export function convertToReactFlowNode<T extends HasNumberId>(
  dataNode: DataNodeDto<T> & Partial<Coordinate>
): FlowNode<T> {
  const stringId = getAnyIdAsString(dataNode);
  const x = dataNode.x || 0;
  const y = dataNode.y || 0;
  const position = { x, y: y };
  return { ...dataNode, id: stringId, position, type: nodeType, x, y };
}

export function convertToReactFlowEdge<T extends HasNumberId>(
  closureDto: ClosureDto
): FlowEdge<T> {
  const stringId = getAnyIdAsString(closureDto);
  const sourceId = getStringIdFromConnection(closureDto.source);
  const targetId = getStringIdFromConnection(closureDto.target);

  return { ...closureDto, target: targetId, source: sourceId, id: stringId };
}

export function getStringIdFromConnection(
  connection: number | string | DataNode<any>
) {
  if (typeof connection === 'object') return getAnyIdAsString(connection);
  else return `${connection}`;
}

export function convertDataNodeDtoListToFlowNodeList<T extends HasNumberId>(
  list: DataNodeDto<T>[]
) {
  return list.map((n) => convertToReactFlowNode(n));
}

export function convertClosureDtoListToEdgeList(list: ClosureDto[]) {
  return list.map((l) => convertToReactFlowEdge(l));
}
