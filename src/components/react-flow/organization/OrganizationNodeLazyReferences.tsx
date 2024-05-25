import { Edge, NodeProps, useEdges } from 'reactflow';

import React, { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { BaseNode } from '@/react-flow/components/nodes/BaseNode';
import { OrganizationDto } from '@/api/dtos/OrganizationDtoSchema';
import { Chip } from '@nextui-org/chip';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkSeriesBundleAssignmentDto } from '@/api/dtos/WorkSeriesBundleAssignmentDtoSchema';
import { sumAllSchemas } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/functions/sum-delivery-allocations';
import {
  ArrayPlaceholder,
  useGlobalDispatch,
  useGlobalListenerGroup
} from 'selective-context';
import { isNumber } from 'lodash';
import {
  useReferencedEntity,
  useReferencedEntityListListener
} from 'dto-stores';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { WorkSeriesSchemaBundleDto } from '@/api/dtos/WorkSeriesSchemaBundleDtoSchema';

export interface AllocationSummary {
  label: string;
  amount: number;
}
export interface AllocationTotal {
  id: number;
  amount: number;
}

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

  const { workSeriesBundleAssignment } = data;
  const { currentState: schemaBundle } =
    useReferencedEntity<WorkSeriesSchemaBundleDto>(
      workSeriesBundleAssignment.workSeriesSchemaBundleId,
      EntityClassMap.workSeriesSchemaBundle,
      listenerKey
    );

  const [localTotal, setLocalTotal] = useState(0);
  const seriesSchemaIdContextKeys = useMemo(
    () =>
      schemaBundle?.workProjectSeriesSchemaIds?.map(
        (id) => `${EntityClassMap.workProjectSeriesSchema}:${id}`
      ) ?? ArrayPlaceholder,
    [schemaBundle]
  );

  const { currentState: schemaMap } =
    useReferencedEntityListListener<WorkProjectSeriesSchemaDto>(
      schemaBundle?.workProjectSeriesSchemaIds ?? ArrayPlaceholder,
      EntityClassMap.workProjectSeriesSchema,
      listenerKey
    );

  useEffect(() => {
    let sum = 0;

    sum = sumAllSchemas([...schemaMap.values()]);
    setLocalTotal(sum);
    dispatchWithoutListen(sum);
  }, [setLocalTotal, schemaMap, dispatchWithoutListen]);

  const inheritedTotal = useMemo(() => {
    return [...currentState.values()].reduce(
      (prev, curr) => (isNumber(curr) ? prev + curr : prev),
      0
    );
  }, [currentState]);

  const summaries: AllocationSummary[] = useMemo(() => {
    return [
      { label: 'Local', amount: localTotal },
      { label: 'Inherited', amount: inheritedTotal },
      { label: 'Total', amount: localTotal + inheritedTotal }
    ];
  }, [localTotal, inheritedTotal]);

  return (
    <BaseNode
      {...nodeProps}
      className={clsx(
        'relative flex flex-col gap-1 rounded-md border-black p-2 transition-colors-opacity bg-white',
        selected ? 'border-2' : 'border',
        dragging ? 'opacity-50' : ''
      )}
    >
      <ul>
        {summaries.map(({ label, amount }) => (
          <li key={label} className={'flex justify-between'}>
            {label}:{' '}
            <Chip
              classNames={{ base: 'h-5' }}
              color={amount === 0 ? 'default' : 'primary'}
            >
              {amount}
            </Chip>
          </li>
        ))}
      </ul>
    </BaseNode>
  );
}

// export default React.memo(OrganizationNode);

function getEdgesToParents(edges: Edge[], childId: string) {
  return edges.filter((e) => {
    return e.target === childId;
  });
}