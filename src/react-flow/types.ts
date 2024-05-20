import { DataLink, DataNode } from "react-d3-force-graph";
import { Edge, Node } from "reactflow";

export type FlowNode = Node & DataNode<any>;
export type FlowEdge = Edge & DataLink<any>;

export interface Coordinate {
  x: number;
  y: number;
}
