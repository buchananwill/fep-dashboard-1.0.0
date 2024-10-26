'use client';
import { Handle, Position } from '@xyflow/react';

import { usePopoverFix } from '@/components/react-flow/generic/hooks/usePopoverFix';
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
import NodeGraphEditCluster from '@/components/react-flow/generic/components/nodes/NodeGraphEditCluster';
import { NodeBase } from '@/components/react-flow/generic/types';
import { NodeDataType } from '@/components/react-flow/generic/utils/adaptors';
import { NodeProps } from '@/types/xyflow-overrides';

export type GenericDivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export function BaseEditableNode<
  NodeData extends NodeDataType,
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
    currentState: { memoizedFunction }
  } = useGraphListener(
    GraphSelectiveContextKeys.addNodes,
    listenerKey,
    undefinedAddNodes as MemoizedFunction<AddNodesParams, void>
  );
  const {
    currentState: { memoizedFunction: memoizedDeleteNodes }
  } = useGraphListener<MemoizedFunction<string[], void>>(
    GraphSelectiveContextKeys.deleteNodes,
    listenerKey,
    undefinedDeleteNodes
  );
  const {
    currentState: { memoizedFunction: labelAccessor }
  } = useGraphListener(
    GraphSelectiveContextKeys.nodeLabelAccessor,
    listenerKey,
    undefinedLabelAccessor as MemoizedFunction<[NodeData, string], string>
  );
  const fixAddProps = usePopoverFix();
  const fixDeleteProps = usePopoverFix();
  const { currentState } = useGraphListener(
    GraphSelectiveContextKeys.nodeCloneFunction,
    listenerKey,
    undefined
  );

  const { id } = data;
  const addSibling = useCallback(() => {
    memoizedFunction({
      sourceNodeIdList: [`${id}`],
      relation: 'sibling'
    });
  }, [memoizedFunction, id]);

  const anyPopoverOpen = fixAddProps.opened || fixDeleteProps.opened;

  const popoverPos = useMemo(() => {
    return anyPopoverOpen
      ? [positionAbsoluteX, positionAbsoluteY]
      : PopoverDefaultPos;
  }, [positionAbsoluteX, positionAbsoluteY, anyPopoverOpen]);

  const openDetailsModal = useCallback(() => {
    sendNodeData(structuredClone(data));
    toggleDetailsModal((isOpen: boolean) => !isOpen);
  }, [data, toggleDetailsModal, sendNodeData]);

  const deleteNode = useCallback(() => {
    memoizedDeleteNodes([`${data.id}`]); // converting the data id to a string to match the DataNode id.
  }, [memoizedDeleteNodes, data.id]);

  const addChild = useCallback(
    () =>
      memoizedFunction({
        sourceNodeIdList: [`${data.id}`],
        relation: 'child'
      }),
    [memoizedFunction, data.id]
  );

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#0000cc' }}
        isConnectable={isConnectable}
      />
      <div className={className} style={style}>
        <EditClusterMemo
          addChild={addChild}
          addSibling={addSibling}
          label={type ? labelAccessor([data, type]) : 'node'}
          openDetailsModal={openDetailsModal}
          deleteNode={deleteNode}
          fixDeleteProps={fixDeleteProps}
          fixAddProps={fixAddProps}
          popoverPos={popoverPos}
        />
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

export const BaseNodeMemo = React.memo(BaseEditableNode);

const EditClusterMemo = React.memo(NodeGraphEditCluster);

export const PopoverDefaultPos = [0, 0];
