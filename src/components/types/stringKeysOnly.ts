import { NodeDataType } from '@/components/react-flow/generic/utils/adaptors';
import {
  CoordinateExtent,
  NodeOrigin,
  Position,
  XYPosition
} from '@xyflow/react';
import { Handle, Optional } from '@/components/react-flow/generic/types';

type Constrained<T extends Record<string, unknown>> = { constrainedData: T };

// Utility type to check if a type contains only string keys
export type HasOnlyStringKeys<T> = {
  [K in keyof T]: K extends string ? T[K] : never;
};

// Recursive parameter to flip non-string keys to never
type LessConstrained<T extends HasOnlyStringKeys<T>> = {
  unconstrainedData: T;
};

interface HasNumberKey {
  [key: number]: string;
}
interface SimpleData {
  name: string;
  id: number;
}

// Examples:

// Rejected
// type ConstrainedData = Constrained<SimpleData>;
// Allowed
type UnconstrainedData = LessConstrained<SimpleData>;
// Rejected
// type NumberConstrained = LessConstrained<HasNumberKey>;

export type NodeBase<
  NodeData extends HasOnlyStringKeys<NodeData>, // Allow it to accept any type by default
  NodeType extends string = string
> = {
  id: string;
  position: XYPosition;
  data: NodeData; // This now accepts interfaces as well as types.
  type?: NodeType;
  // ... other declarations
};

// Rejected
// type NumberKeyNode = NodeBase<HasNumberKey>;

// Allowed
type SimpleNode = NodeBase<SimpleData>;
