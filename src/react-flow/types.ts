import { Edge, Node } from 'reactflow';
import { DataLink, DataNode } from 'react-d3-force-wrapper/dist/types/util';
import { HasNumberId } from '@/api/types';

export type FlowNode<T extends HasNumberId> = Node & DataNode<T>;
export type FlowEdge<T extends HasNumberId> = Edge & DataLink<T>;

export interface Coordinate {
  x: number;
  y: number;
}
