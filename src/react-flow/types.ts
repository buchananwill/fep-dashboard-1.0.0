import { Edge, Node } from 'reactflow';
import { HasNumberId } from '@/api/types';
import { DataLink, DataNode, DataNodeDto } from 'react-d3-force-wrapper';
import {
  CoordinateExtent,
  Handle,
  HandleType,
  NodeOrigin,
  Position,
  XYPosition
} from '@xyflow/react';

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

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type NodeBase<
  NodeData extends Record<string, unknown> = Record<string, unknown>,
  NodeType extends string = string
> = {
  /** Unique id of a node */
  id: string;
  /** Position of a node on the pane
   * @example { x: 0, y: 0 }
   */
  position: XYPosition;
  /** Arbitrary data passed to a node */
  data: NodeData;
  /** Type of node defined in nodeTypes */
  type?: NodeType;
  /** Only relevant for default, source, target nodeType. controls source position
   * @example 'right', 'left', 'top', 'bottom'
   */
  sourcePosition?: Position;
  /** Only relevant for default, source, target nodeType. controls target position
   * @example 'right', 'left', 'top', 'bottom'
   */
  targetPosition?: Position;
  hidden?: boolean;
  selected?: boolean;
  /** True, if node is being dragged */
  dragging?: boolean;
  draggable?: boolean;
  selectable?: boolean;
  connectable?: boolean;
  deletable?: boolean;
  dragHandle?: string;
  width?: number;
  height?: number;
  initialWidth?: number;
  initialHeight?: number;
  /** Parent node id, used for creating sub-flows */
  parentId?: string;
  zIndex?: number;
  /** Boundary a node can be moved in
   * @example 'parent' or [[0, 0], [100, 100]]
   */
  extent?: 'parent' | CoordinateExtent;
  expandParent?: boolean;
  ariaLabel?: string;
  /** Origin of the node relative to it's position
   * @example
   * [0.5, 0.5] // centers the node
   * [0, 0] // top left
   * [1, 1] // bottom right
   */
  origin?: NodeOrigin;
  handles?: Omit<Optional<Handle, 'width' | 'height'>, 'nodeId'>[];
  measured?: {
    width?: number;
    height?: number;
  };
};

export type Handle = {
  id?: string | null;
  nodeId: string;
  x: number;
  y: number;
  position: Position;
  type: HandleType;
  width: number;
  height: number;
};
