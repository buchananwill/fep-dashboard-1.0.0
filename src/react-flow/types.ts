import { Edge, Node } from 'reactflow';
import { HasNumberId } from '@/api/types';
import { DataLink, DataNode, DataNodeDto } from 'react-d3-force-wrapper';

export type FlowNode<T extends HasNumberId> = Node & DataNode<T>;
export type FlowEdge<T extends HasNumberId> = Edge & DataLink<T>;

export interface Coordinate {
  x: number;
  y: number;
}

export interface NodeValidator<T extends HasNumberId> {
  (node: DataNode<T>): DataNodeDto<T> | undefined;
}

export interface NodeConvertor<T extends HasNumberId> {
  (dataNodeDto: DataNodeDto<T> & Partial<Coordinate>): FlowNode<T>;
}
