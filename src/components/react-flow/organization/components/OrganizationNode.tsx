import { Edge, useEdges } from '@xyflow/react';

import React, { memo, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import { BaseEditableNode } from '@/components/react-flow/generic/components/nodes/BaseEditableNode';
import { OrganizationDto } from '@/api/generated-types/generated-types';
import {
  useGlobalDispatch,
  useGlobalListener,
  useGlobalListenerGroup
} from 'selective-context';
import { isNumber } from 'lodash';
import NodeBundleSummaries from '@/components/react-flow/organization/components/NodeBundleSummaries';
import { NodeBase } from '@/components/react-flow/generic/types';
import { NodeProps } from '@/types/xyflow-overrides';
import { Simplify } from 'type-fest';
import { AllocationSummary } from '@/components/react-flow/organization/types';

const initialTotalMap = new Map<string, number>();

export function OrganizationNode(
  nodeProps: NodeProps<NodeBase<Simplify<OrganizationDto>>>
) {
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

  const allocationRollupOrZero = useMemo(() => {
    return workSchemaNodeAssignment?.workSchemaNodeId ? allocationRollup : 0;
  }, [workSchemaNodeAssignment?.workSchemaNodeId, allocationRollup]);

  useEffect(() => {
    dispatchWithoutListen(allocationRollupOrZero);
  }, [dispatchWithoutListen, allocationRollupOrZero]);

  const inheritedTotal = useMemo(() => {
    return [...currentState.values()].reduce(
      (prev, curr) => (isNumber(curr) ? prev + curr : prev),
      0
    );
  }, [currentState]);

  const summaries: AllocationSummary[] = useMemo(() => {
    return [
      { label: 'Local', amount: allocationRollupOrZero },
      { label: 'Inherited', amount: inheritedTotal },
      { label: 'Total', amount: allocationRollupOrZero + inheritedTotal }
    ];
  }, [allocationRollupOrZero, inheritedTotal]);

  return (
    <BaseEditableNode
      {...nodeProps}
      className={clsx(
        'container-3-cols relative gap-1 rounded-md border-black bg-white p-2 transition-colors-opacity',
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
