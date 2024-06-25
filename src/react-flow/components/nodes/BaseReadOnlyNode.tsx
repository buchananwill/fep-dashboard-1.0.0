'use client';
import { Handle, NodeProps, Position } from 'reactflow';

import { usePopoverFix } from '@/react-flow/hooks/usePopoverFix';
import {
  AddNodesParams,
  GraphSelectiveContextKeys,
  MemoizedFunction,
  undefinedAddNodes,
  undefinedDeleteNodes,
  undefinedLabelAccessor,
  useGraphDispatch,
  useGraphListener
} from 'react-d3-force-wrapper';
import React, { useCallback, useMemo } from 'react';
import NodeGraphEditCluster from '@/react-flow/components/nodes/NodeGraphEditCluster';
import { HasNumberId } from '@/api/types';

export type GenericDivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export function BaseReadOnlyNode<T extends HasNumberId>({
  data,
  isConnectable,
  xPos,
  yPos,
  type,
  children,
  className,
  style
}: NodeProps<T> & Pick<GenericDivProps, 'children' | 'className' | 'style'>) {
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
    undefinedLabelAccessor as MemoizedFunction<[T, string], string>
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
