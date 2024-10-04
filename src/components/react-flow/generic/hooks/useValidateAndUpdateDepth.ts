import { DataNode, HasNumberId } from 'react-d3-force-wrapper';
import { Connection } from '@xyflow/react';
import { DispatchState } from '@/types';
import { useCallback } from 'react';
import { recalculateDepths } from '@/components/react-flow/generic/utils/recalculateDepths';

export function useValidateAndUpdateDepth<T extends HasNumberId>(
  checkToggleFirstAndAfter: () => void,
  idToNodeMap: Map<string, DataNode<T>>,
  onConnect: ({ source, target }: Connection) => void,
  dispatchNodes: DispatchState<DataNode<T>[]>,
  idToChildIdMap: Map<string, Set<string>>,
  validateWorkSchemaNodeHierarchy: (
    source: DataNode<T> | undefined,
    target: DataNode<T> | undefined
  ) => boolean = () => true
) {
  return useCallback(
    (connection: Connection) => {
      checkToggleFirstAndAfter();
      const { source, target } = connection;
      if (source && target) {
        const nodeSource = idToNodeMap.get(source);
        const nodeTarget = idToNodeMap.get(target);
        console.log({ nodeSource, nodeTarget });
        const validation =
          nodeTarget?.distanceFromRoot === 0 &&
          validateWorkSchemaNodeHierarchy(nodeSource, nodeTarget);
        console.log({ validation });
        if (validation && nodeSource && nodeTarget) {
          onConnect(connection);
          dispatchNodes((prevNodes) =>
            recalculateDepths(
              prevNodes,
              nodeTarget,
              idToChildIdMap,
              idToNodeMap,
              nodeSource.distanceFromRoot
            )
          );
        }
      }
    },
    [
      onConnect,
      idToNodeMap,
      dispatchNodes,
      idToChildIdMap,
      checkToggleFirstAndAfter,
      validateWorkSchemaNodeHierarchy
    ]
  );
}
