import { Edge, Node } from 'reactflow';
import { HasNumberId } from '@/api/main';
import { DataLink, DataNode } from 'react-d3-force-wrapper/dist/types/util';

export type FlowNode<T extends HasNumberId> = Node & DataNode<T>;
export type FlowEdge<T extends HasNumberId> = Edge & DataLink<T>;

export interface Coordinate {
  x: number;
  y: number;
}
