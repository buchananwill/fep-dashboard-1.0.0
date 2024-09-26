import {
  Coordinate,
  FlowEdge,
  FlowNode,
  NodeConvertor
} from '@/components/react-flow/generic/types';
import {
  ClosureDto,
  DataNode,
  DataNodeDto,
  getAnyIdAsString
} from 'react-d3-force-wrapper';

import { HasNumberId } from '@/api/types';
import { OrganizationDto } from '@/api/generated-types/generated-types';
import { Simplify } from 'type-fest';
import { z } from 'zod';
import { WorkSchemaNodeDtoSchema } from '@/api/generated-schemas/schemas';

const organizationNodeType = 'organization';

// export type NodeDataType<T> = T extends Record<string, any> ? T : Simplify<T>;

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

export type OrganizationDtoAsType = Simplify<OrganizationDto>;

export const convertToOrganizationNode =
  createNodeConvertor<OrganizationDtoAsType>(organizationNodeType);

export const convertToWorkSchemaFlowNode = (
  dataNode: DataNodeDto<Simplify<WorkSchemaNodeDto>> & Partial<Coordinate>
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

export type WorkSchemaNodeDto = z.infer<typeof WorkSchemaNodeDtoSchema>;
