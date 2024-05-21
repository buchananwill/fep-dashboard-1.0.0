import { Edge, NodeProps, useEdges, useReactFlow } from 'reactflow';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { BaseNodeMemo } from '@/react-flow/components/nodes/BaseNode';
import { OrganizationDto } from '@/api/dtos/OrganizationDtoSchema';
import { Chip } from '@nextui-org/chip';
import { useDtoStoreListener } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkSeriesBundleAssignmentDto } from '@/api/dtos/WorkSeriesBundleAssignmentDtoSchema';
import { getDtoListByBodyList } from '@/api/generated-actions/WorkProjectSeriesSchema';
import { sumAllSchemas } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/functions/sum-delivery-allocations';
import {
  ArrayPlaceholder,
  useGlobalController,
  useGlobalDispatch,
  useGlobalListenerGroup
} from 'selective-context';
import { d } from '@nextui-org/slider/dist/use-slider-64459b54';
import { isNumber } from 'lodash';

const localMock: number = 45;
const inheritedMock: number = 13;

const summariesStatic: AllocationSummary[] = [
  { label: 'Local', amount: localMock },
  { label: 'Inherited', amount: inheritedMock },
  { label: 'Total', amount: localMock + inheritedMock }
];

interface AllocationSummary {
  label: string;
  amount: number;
}
export interface AllocationTotal {
  id: number;
  amount: number;
}

const initialTotalMap = new Map<string, number>();

function OrganizationNode(nodeProps: NodeProps<OrganizationDto>) {
  const { selected, dragging, data } = nodeProps;

  const { dispatchWithoutListen } = useGlobalDispatch(
    `allocationTotal:${data.id}`
  );
  const edges = useEdges();
  const { getNodes, getNode } = useReactFlow();
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

  const { workSeriesBundleAssignmentId } = data;
  const { currentState: schemaBundleAssignment } =
    useDtoStoreListener<WorkSeriesBundleAssignmentDto>(
      workSeriesBundleAssignmentId,
      EntityClassMap.workSeriesBundleAssignment,
      `organizationNode:${data.id}`
    );

  const [localTotal, setLocalTotal] = useState(0);
  const seriesSchemaIds =
    schemaBundleAssignment?.workSeriesSchemaBundle
      ?.workProjectSeriesSchemaIds ?? ArrayPlaceholder;

  useEffect(() => {
    const setLocalSum = async () => {
      let sum = 0;
      await getDtoListByBodyList(seriesSchemaIds).then((r) => {
        sum = sumAllSchemas(r);
      });

      setLocalTotal(sum);
      dispatchWithoutListen(sum);
    };
    setLocalSum();
  }, [setLocalTotal, seriesSchemaIds, dispatchWithoutListen]);

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
    <BaseNodeMemo
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
            <Chip classNames={{ base: 'h-5' }} color={'primary'}>
              {amount}
            </Chip>
          </li>
        ))}
      </ul>
    </BaseNodeMemo>
  );
}

export default React.memo(OrganizationNode);

function getEdgesToParents(edges: Edge[], childId: string) {
  return edges.filter((e) => {
    return e.target === childId;
  });
}
