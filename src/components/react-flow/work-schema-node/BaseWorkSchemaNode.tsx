'use client';
import { Handle, NodeProps, Position } from '@xyflow/react';

import { usePopoverFix } from '@/components/react-flow/generic/hooks/usePopoverFix';
import {
  AddNodesParams,
  GraphSelectiveContextKeys,
  MemoizedFunction,
  undefinedAddNodes,
  undefinedDeleteNodes,
  useGraphDispatch,
  useGraphListener
} from 'react-d3-force-wrapper';
import React, { useCallback, useMemo } from 'react';
import NodeGraphEditCluster from '@/components/react-flow/generic/components/nodes/NodeGraphEditCluster';
import { WorkSchemaNodeDto } from '@/api/zod-schemas/WorkSchemaNodeDtoSchema_';
import { WorkSchemaNodeType } from '@/components/react-flow/work-schema-node/workSchemaNodeTypesUi';
import { useLeafNodeRollUpListener } from '@/components/react-flow/work-schema-node/useLeafNodeRollUpListener';
import { NodeBase } from '@/components/react-flow/generic/types';

export type GenericDivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export function BaseWorkSchemaNode({
  data,
  isConnectable,
  positionAbsoluteX,
  positionAbsoluteY,
  type,
  children,
  className,
  style,
  label
}: NodeProps<NodeBase<WorkSchemaNodeDto>> &
  Pick<GenericDivProps, 'children' | 'className' | 'style'> & {
    label?: string;
  }) {
  const totalThisNode = useLeafNodeRollUpListener(data);

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

  const fixAddProps = usePopoverFix();
  const fixDeleteProps = usePopoverFix();
  useGraphListener(
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

  const anyPopoverOpen = fixAddProps.isOpen || fixDeleteProps.isOpen;

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

  const canHaveChild =
    data.resolutionMode !== 'LEAF' && data.resolutionMode !== 'CAROUSEL_OPTION';

  const canDelete =
    ['LEAF', 'OPEN'].includes(data.resolutionMode) ||
    (data.resolutionMode === 'CAROUSEL' && data.carouselId === undefined);

  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#0000cc' }}
        isConnectable={isConnectable}
      />
      <div className={className} style={style}>
        <div className={'flex items-center gap-1'}>
          {totalThisNode}
          <EditClusterMemo
            showAddChild={canHaveChild}
            addChild={addChild}
            showAddSibling={data.resolutionMode !== 'CAROUSEL_OPTION'}
            addSibling={addSibling}
            label={label}
            openDetailsModal={openDetailsModal}
            showDelete={canDelete}
            deleteNode={deleteNode}
            fixDeleteProps={fixDeleteProps}
            fixAddProps={fixAddProps}
            popoverPos={popoverPos}
            orientation={'left-to-right'}
          />
        </div>
        {children}
      </div>
      {canHaveChild && (
        <Handle
          type="source"
          position={Position.Right}
          style={{ background: '#cc0000' }}
          isConnectable={isConnectable}
        />
      )}
    </>
  );
}

export const BaseWorkSchemaNodeMemo = React.memo(BaseWorkSchemaNode);

const EditClusterMemo = React.memo(NodeGraphEditCluster);

export const PopoverDefaultPos = [0, 0];

const SerialChildTypes: WorkSchemaNodeType[] = ['CAROUSEL', 'LEAF', 'OPEN'];
const CarouselChildTypes: WorkSchemaNodeType[] = [
  'SERIAL',
  'CAROUSEL_GROUP',
  'CAROUSEL_OPTION',
  'LEAF',
  'OPEN'
];
const CarouselGroupChildTypes: WorkSchemaNodeType[] = ['CAROUSEL'];
