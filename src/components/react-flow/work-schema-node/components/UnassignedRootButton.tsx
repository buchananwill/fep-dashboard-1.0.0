import { BaseLazyDtoUiProps } from 'dto-stores';
import { GraphDto, useDirectSimRefEditsDispatch } from 'react-d3-force-wrapper';
import React, { useCallback, useState, useTransition } from 'react';
import { Api } from '@/api/clientApi_';
import { convertGraphDtoToReactFlowState } from '@/components/react-flow/generic/utils/convertGraphDtoToReactFlowState';
import {
  convertToWorkSchemaFlowNode,
  WorkSchemaNodeDto
} from '@/components/react-flow/generic/utils/adaptors';
import { Button } from '@mantine/core';

export function UnassignedRootButton({
  entity
}: BaseLazyDtoUiProps<WorkSchemaNodeDto>) {
  const { dispatchNextSimVersion, nodeListRef, linkListRef } =
    useDirectSimRefEditsDispatch(`unassignedRootNode${entity.id}`);
  const [loaded, setLoaded] = useState(false);
  const [pending, startTransition] = useTransition();

  const onClick = useCallback(
    () =>
      startTransition(async () => {
        if (nodeListRef === null || linkListRef === null) return;
        if (nodeListRef.current.some((node) => entity.id === node.data.id))
          return;
        const graphDto = await Api.WorkSchemaNode.getGraphByRootId({
          rootId: entity.id
        });

        graphDto.closureDtos = graphDto.closureDtos.filter(
          (closure) => closure.value === 1
        );
        const { dataNodes, dataLinks } = convertGraphDtoToReactFlowState(
          graphDto as GraphDto<WorkSchemaNodeDto>,
          convertToWorkSchemaFlowNode
        );
        const nodes = [...nodeListRef.current, ...dataNodes];
        const links = [...linkListRef.current, ...dataLinks];
        dispatchNextSimVersion(nodes, links);
        setLoaded(true);
      }),
    [nodeListRef, linkListRef, dispatchNextSimVersion, entity.id]
  );

  return (
    <Button onClick={onClick} disabled={loaded || pending} loading={pending}>
      WorkSchemaNode: {entity.name ?? entity.id}
    </Button>
  );
}
