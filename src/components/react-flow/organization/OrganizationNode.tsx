import { Edge, NodeProps, useEdges } from 'reactflow';

import React, { memo, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { BaseEditableNode } from '@/react-flow/components/nodes/BaseEditableNode';
import { OrganizationDto } from '@/api/dtos/OrganizationDtoSchema';
import { EntityClassMap } from '@/api/entity-class-map';

import { sumAllSchemas } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schemas/_functions/sumDeliveryAllocations';
import {
  ArrayPlaceholder,
  useGlobalDispatch,
  useGlobalListener,
  useGlobalListenerGroup
} from 'selective-context';
import { isNumber } from 'lodash';

import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { WorkSeriesSchemaBundleDto } from '@/api/dtos/WorkSeriesSchemaBundleDtoSchema';
import {
  useDtoStore,
  useLazyDtoListListener,
  useLazyDtoStore
} from 'dto-stores';
import { AllocationSummary } from '@/components/react-flow/organization/allocationSummary';
import NodeBundleSummaries from '@/components/react-flow/organization/NodeBundleSummaries';
import { AllocationRollupEntityClass } from '@/components/react-flow/work-schema-node/WorkSchemaNodeLayoutFlowWithForces';
import { AllocationRollup } from '@/components/react-flow/work-schema-node/useLeafNodeController';
import { ObjectPlaceholder } from '@/api/literals';

const initialTotalMap = new Map<string, number>();

export function OrganizationNode(nodeProps: NodeProps<OrganizationDto>) {
  const { selected, dragging, data } = nodeProps;
  const listenerKey = `organizationNode:${data.id}`;

  const { dispatchWithoutListen } = useGlobalDispatch(
    `allocationTotal:${data.id}`
  );
  const edges = useEdges();

  const ancestorNodeAllocationKeyList = useMemo(() => {
    const localEdges = getEdgesToParents(edges, nodeProps.id);

    let allEdges = [...localEdges];

    let nextTier = [...localEdges];
    while (nextTier.length > 0) {
      const currentTier = [...nextTier];
      nextTier = [];
      for (let localEdge of currentTier) {
        const edgesToParents = getEdgesToParents(edges, localEdge.source);
        nextTier = [...nextTier, ...edgesToParents];
        allEdges = [...allEdges, ...edgesToParents];
      }
    }
    const setOfParentIds = new Set(allEdges.map((e) => e.source));
    return [...setOfParentIds].map((id) => `allocationTotal:${id}`);
  }, [edges, nodeProps.id]);
  const { currentState } = useGlobalListenerGroup({
    contextKeys: ancestorNodeAllocationKeyList,
    listenerKey: `${data.id}`,
    initialValue: initialTotalMap
  });

  const { workSchemaNodeAssignment } = data;

  const { currentState: allocationRollup } = useGlobalListener<number>({
    contextKey: `rollupTotal:${workSchemaNodeAssignment?.workSchemaNodeId}`,
    initialValue: 0,
    listenerKey: listenerKey
  });

  useEffect(() => {
    dispatchWithoutListen(allocationRollup);
  }, [dispatchWithoutListen, allocationRollup]);

  const inheritedTotal = useMemo(() => {
    return [...currentState.values()].reduce(
      (prev, curr) => (isNumber(curr) ? prev + curr : prev),
      0
    );
  }, [currentState]);

  const summaries: AllocationSummary[] = useMemo(() => {
    return [
      { label: 'Local', amount: allocationRollup },
      { label: 'Inherited', amount: inheritedTotal },
      { label: 'Total', amount: allocationRollup + inheritedTotal }
    ];
  }, [allocationRollup, inheritedTotal]);

  return (
    <BaseEditableNode
      {...nodeProps}
      className={clsx(
        'relative flex flex-col gap-1 rounded-md border-black bg-white p-2 transition-colors-opacity',
        selected ? 'border-2' : 'border',
        dragging ? 'opacity-50' : ''
      )}
    >
      <NodeBundleSummariesMemo summaries={summaries} />
    </BaseEditableNode>
  );
}

const NodeBundleSummariesMemo = memo(NodeBundleSummaries);

function getEdgesToParents(edges: Edge[], childId: string) {
  return edges.filter((e) => {
    return e.target === childId;
  });
}
