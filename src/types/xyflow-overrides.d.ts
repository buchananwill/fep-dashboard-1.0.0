// File: types/xyflow-overrides.d.ts
import { Simplify } from 'type-fest';
import { NodeDataType } from '@/components/react-flow/generic/utils/adaptors';
import { OrganizationDto } from '@/api/generated-types/generated-types_';

declare module 'xyflow' {
  import {
    CoordinateExtent,
    NodeOrigin,
    Position,
    XYPosition
  } from '@xyflow/react';
  import { Handle, Optional } from '@xyflow/system';

  export type NodeBase<
    NodeData extends NodeDataType<NodeData>, // Allow it to accept any type by default
    NodeType extends string = string
  > = {
    id: string;
    position: XYPosition;
    data: NodeData; // This now accepts any type, not just Record<string, unknown>
    type?: NodeType;
    sourcePosition?: Position;
    targetPosition?: Position;
    hidden?: boolean;
    selected?: boolean;
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
    parentId?: string;
    zIndex?: number;
    extent?: 'parent' | CoordinateExtent;
    expandParent?: boolean;
    ariaLabel?: string;
    origin?: NodeOrigin;
    handles?: Omit<Optional<Handle, 'width' | 'height'>, 'nodeId'>[];
    measured?: {
      width?: number;
      height?: number;
    };
  };
}

export type NodeProps<NodeType extends NodeBase> = Pick<
  NodeType,
  | 'id'
  | 'data'
  | 'width'
  | 'height'
  | 'sourcePosition'
  | 'targetPosition'
  | 'selected'
  | 'dragHandle'
  | 'selectable'
  | 'deletable'
  | 'draggable'
  | 'parentId'
> &
  Required<Pick<NodeType, 'type' | 'dragging' | 'zIndex'>> & {
    /** whether a node is connectable or not */
    isConnectable: boolean;
    /** position absolute x value */
    positionAbsoluteX: number;
    /** position absolute x value */
    positionAbsoluteY: number;
  };
