'use client';
import { Handle, Position } from '@xyflow/react';

import {
  GraphSelectiveContextKeys,
  MemoizedFunction,
  undefinedLabelAccessor,
  useGraphDispatch,
  useGraphListener
} from 'react-d3-force-wrapper';
import React, { useCallback } from 'react';
import { HasNumberId } from '@/api/types';
import { NodeBase } from '@/components/react-flow/generic/types';
import { NodeProps } from '@/types/xyflow-overrides';

export type GenericDivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export function BaseReadOnlyNode<
  NodeData extends HasNumberId & {},
  NodeType extends string,
  BaseNodeType extends NodeBase<NodeData, NodeType>
>({
  data,
  isConnectable,
  positionAbsoluteX,
  positionAbsoluteY,
  type,
  children,
  className,
  style
}: NodeProps<BaseNodeType> &
  Pick<GenericDivProps, 'children' | 'className' | 'style'>) {
  const { dispatchWithoutListen: toggleDetailsModal } = useGraphDispatch(
    GraphSelectiveContextKeys.nodeDetailsModalOpen
  );
  const listenerKey = `node:${data.id}`;
  const { dispatchWithoutListen: sendNodeData } = useGraphDispatch(
    GraphSelectiveContextKeys.nodeInModal
  );

  const {
    currentState: { memoizedFunction: labelAccessor }
  } = useGraphListener(
    GraphSelectiveContextKeys.nodeLabelAccessor,
    listenerKey,
    undefinedLabelAccessor as MemoizedFunction<[NodeData, string], string>
  );

  const { id } = data;

  const openDetailsModal = useCallback(() => {
    sendNodeData(structuredClone(data));
    toggleDetailsModal((isOpen: boolean) => !isOpen);
  }, [data, toggleDetailsModal, sendNodeData]);

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#0000cc' }}
        isConnectable={isConnectable}
      />
      <div className={className} style={style}>
        {children}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#cc0000' }}
        isConnectable={isConnectable}
      />
    </>
  );
}

export const BaseNodeMemo = React.memo(BaseReadOnlyNode);

export const PopoverDefaultPos = [0, 0];
