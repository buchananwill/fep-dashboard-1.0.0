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
import React, { useCallback, useEffect, useMemo } from 'react';
import NodeGraphEditCluster from '@/react-flow/components/nodes/NodeGraphEditCluster';
import { HasNumberId } from '@/api/types';
import { WorkSchemaNodeDto } from '@/api/dtos/WorkSchemaNodeDtoSchema';
import { WorkSchemaNodeType } from '@/components/react-flow/work-schema-node/workSchemaNodeTypesUi';
import {
  Identifier,
  useDtoStore,
  useLazyDtoStore,
  useReadAnyDto
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import {
  determineLocalAllocation,
  determineLocalResolution
} from '@/components/react-flow/work-schema-node/workSchemaNodeCallbacks';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { CarouselOptionDto } from '@/api/dtos/CarouselOptionDtoSchema';
import {
  useGlobalController,
  useGlobalDispatch,
  useGlobalListener
} from 'selective-context';
import { EmptyArray, ObjectPlaceholder } from '@/api/literals';
import { AllocationRollupEntityClass } from '@/components/react-flow/work-schema-node/WorkSchemaNodeLayoutFlowWithForces';

export type GenericDivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

interface AllocationRollup {
  id: Identifier;
  allocationRollup: number[];
}

export function BaseWorkSchemaNode({
  data,
  isConnectable,
  xPos,
  yPos,
  type,
  children,
  className,
  style,
  label
}: NodeProps<WorkSchemaNodeDto> &
  Pick<GenericDivProps, 'children' | 'className' | 'style'> & {
    label?: string;
  }) {
  const { carouselOptionId, workProjectSeriesSchemaId } = data;
  const { entity: carouselOption } = useDtoStore<CarouselOptionDto>({
    entityId: carouselOptionId ?? 0,
    entityClass: EntityClassMap.carouselOption
  });
  const { entity: workProjectSeriesSchema } =
    useDtoStore<WorkProjectSeriesSchemaDto>({
      entityId:
        workProjectSeriesSchemaId ??
        carouselOption?.workProjectSeriesSchemaId ??
        '',
      entityClass: EntityClassMap.workProjectSeriesSchema
    });

  const { dispatchWithoutListen } =
    useGlobalDispatch<Map<string, WorkProjectSeriesSchemaDto>>(
      'leafToSchemaMap'
    );

  useEffect(() => {
    if (workProjectSeriesSchema) {
      dispatchWithoutListen((prevState) => {
        const updateMap = new Map(prevState.entries());
        updateMap.set(String(data.id), workProjectSeriesSchema);
        return updateMap;
      });
    }
  }, [workProjectSeriesSchema, dispatchWithoutListen, data.id]);

  const { dispatchWithoutListen: toggleDetailsModal } = useGraphDispatch(
    GraphSelectiveContextKeys.nodeDetailsModalOpen
  );
  const listenerKey = `node:${data.id}`;
  const { dispatchWithoutListen: sendNodeData } = useGraphDispatch(
    GraphSelectiveContextKeys.nodeInModal
  );

  const { currentState: allocationRollup } =
    useGlobalListener<AllocationRollup>({
      contextKey: `${AllocationRollupEntityClass}:${data.id}`,
      initialValue: ObjectPlaceholder as AllocationRollup,
      listenerKey: `baseNode:${data.id}`
    });

  const totalThisNode = useMemo(() => {
    return allocationRollup?.allocationRollup
      ? allocationRollup.allocationRollup.reduce((prev, curr) => prev + curr, 0)
      : 0;
  }, [allocationRollup]);

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

  const anyPopoverOpen = fixAddProps.isOpen || fixDeleteProps.isOpen;

  const popoverPos = useMemo(() => {
    return anyPopoverOpen ? [xPos, yPos] : PopoverDefaultPos;
  }, [xPos, yPos, anyPopoverOpen]);

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
