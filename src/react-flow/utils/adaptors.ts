import {
  Coordinate,
  FlowEdge,
  FlowNode,
  NodeConvertor
} from '@/react-flow/types';
import {
  ClosureDto,
  DataNode,
  DataNodeDto,
  getAnyIdAsString
} from 'react-d3-force-wrapper';

import { HasNumberId } from '@/api/types';
import { WorkSchemaNodeDto } from '@/api/zod-schemas/WorkSchemaNodeDtoSchema_';
import { OrganizationDto } from '@/api/zod-schemas/OrganizationDtoSchema_';

const organizationNodeType = 'organization';

export type NodeDataType = HasNumberId & Record<string, unknown>;

function convertToReactFlowNode<T extends NodeDataType>(
  nodeType: string,
  dataNode: DataNodeDto<T> & Partial<Coordinate>
): FlowNode<T> {
  const stringId = getAnyIdAsString(dataNode);
  const x = dataNode.x || 0;
  const y = dataNode.y || 0;
  const position = { x, y };
  return { ...dataNode, id: stringId, position, type: nodeType, x, y };
}

function createNodeConvertor<T extends NodeDataType>(
  nodeType: string
): NodeConvertor<T> {
  return (dataNode: DataNodeDto<T> & Partial<Coordinate>) =>
    convertToReactFlowNode(nodeType, dataNode);
}

export const convertToOrganizationNode =
  createNodeConvertor<OrganizationDto>(organizationNodeType);

export const convertToClassificationNode =
  createNodeConvertor('classificationNode');

export const convertToWorkSchemaFlowNode = (
  dataNode: DataNodeDto<WorkSchemaNodeDto> & Partial<Coordinate>
) => convertToReactFlowNode(dataNode.data.resolutionMode, dataNode);

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

export function convertDataNodeDtoListToFlowNodeList<T extends NodeDataType>(
  list: DataNodeDto<T>[],
  convertor: (node: DataNodeDto<T>) => FlowNode<T>
) {
  return list.map((n) => convertor(n));
}

export function convertClosureDtoListToEdgeList(list: ClosureDto[]) {
  return list.map((l) => convertToReactFlowEdge(l));
}
