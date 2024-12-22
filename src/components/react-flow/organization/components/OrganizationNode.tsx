import { Edge, useEdges } from '@xyflow/react';

import React, { memo, useMemo } from 'react';
import clsx from 'clsx';
import { BaseEditableNode } from '@/components/react-flow/generic/components/nodes/BaseEditableNode';
import {
  OrganizationDto,
  WorkSchemaNodeRootTotalDeliveryAllocationRollupDto
} from '@/api/generated-types/generated-types_';
import { isNumber } from 'lodash';
import NodeBundleSummaries from '@/components/react-flow/organization/components/NodeBundleSummaries';
import { NodeBase } from '@/components/react-flow/generic/types';
import { NodeProps } from '@/types/xyflow-overrides';
import { Simplify } from 'type-fest';
import { AllocationSummary } from '@/components/react-flow/organization/types';
import { useDtoStore, useReadAnyDto } from 'dto-stores';
import { workSchemaNodeRollUp } from '@/components/work-schema-node-assignments/WorkSchemaNodeAssignmentsPage';
import { isNotUndefined } from '@/api/main';
import { useNodeContext } from 'react-d3-force-wrapper';
import classes from '../../generic/components/nodes/base-editable-node.module.css';

export function OrganizationNode(
  nodeProps: NodeProps<NodeBase<Simplify<OrganizationDto>>>
) {
  const { nodes } = useNodeContext<OrganizationDto>();
  const { selected, dragging, data } = nodeProps;
  const listenerKey = `organizationNode:${data.id}`;

  const edges = useEdges();

  const ancestorNodeIdList = useMemo(() => {
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
    return [...setOfParentIds];
  }, [edges, nodeProps.id]);

  const readAnyDeliveryRollUp =
    useReadAnyDto<WorkSchemaNodeRootTotalDeliveryAllocationRollupDto>(
      workSchemaNodeRollUp
    );

  const { workSchemaNodeAssignment } = data;

  const { entity: workSchemaNodeRoot } =
    useDtoStore<WorkSchemaNodeRootTotalDeliveryAllocationRollupDto>({
      entityId: workSchemaNodeAssignment?.workSchemaNodeId ?? -1,
      entityClass: workSchemaNodeRollUp,
      listenerKey
    });

  console.log({ data, workSchemaNodeRoot, ancestorNodeIdList });

  const localAllocation = workSchemaNodeRoot?.deliveryAllocationSum ?? 0;

  const inheritedTotal = useMemo(() => {
    return nodes
      .filter((node) => ancestorNodeIdList.includes(node.id))
      .map((organizationDto) => {
        const workSchemaNodeId =
          organizationDto.data.workSchemaNodeAssignment?.workSchemaNodeId;
        return workSchemaNodeId !== undefined
          ? readAnyDeliveryRollUp(workSchemaNodeId)?.deliveryAllocationSum
          : undefined;
      })
      .filter(isNotUndefined)
      .reduce((prev, curr) => (isNumber(curr) ? prev + curr : prev), 0);
  }, [nodes, ancestorNodeIdList, readAnyDeliveryRollUp]);

  const summaries: AllocationSummary[] = useMemo(() => {
    return [
      { label: 'Local', amount: localAllocation },
      { label: 'Inherited', amount: inheritedTotal },
      { label: 'Total', amount: localAllocation + inheritedTotal }
    ];
  }, [localAllocation, inheritedTotal]);

  return (
    <BaseEditableNode
      {...nodeProps}
      className={clsx(
        classes.baseEditableNode,
        selected && 'border-2',
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
