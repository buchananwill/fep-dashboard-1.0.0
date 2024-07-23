import { BaseLazyDtoUiProps } from 'dto-stores';
import { WorkSchemaNodeDto } from '@/api/dtos/WorkSchemaNodeDtoSchema_';
import { useDirectSimRefEditsDispatch } from 'react-d3-force-wrapper';
import React, { useCallback, useState, useTransition } from 'react';
import { Api } from '@/api/clientApi_';
import { convertGraphDtoToReactFlowState } from '@/react-flow/utils/convertGraphDtoToReactFlowState';
import { convertToWorkSchemaFlowNode } from '@/react-flow/utils/adaptors';
import { Button } from '@nextui-org/button';

export function UnassignedRootButton({
  entity
}: BaseLazyDtoUiProps<WorkSchemaNodeDto>) {
  const { dispatchNextSimVersion, nodeListRef, linkListRef } =
    useDirectSimRefEditsDispatch(`unassignedRootNode${entity.id}`);
  const [loaded, setLoaded] = useState(false);
  const [pending, startTransition] = useTransition();

  const onPress = useCallback(
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
          graphDto,
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
    <Button
      onPress={onPress}
      isDisabled={loaded || pending}
      isLoading={pending}
    >
      WorkSchemaNode: {entity.name ?? entity.id}
    </Button>
  );
}
