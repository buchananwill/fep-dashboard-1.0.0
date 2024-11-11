import { DataNode, HasNumberId } from 'react-d3-force-wrapper';
import { Connection } from '@xyflow/react';
import { DispatchState } from '@/types';
import { useCallback } from 'react';

export function useValidateAndUpdateDepth<T extends HasNumberId>(
  checkToggleFirstAndAfter: () => void,
  idToNodeMap: Map<string, DataNode<T>>,
  onConnect: ({ source, target }: Connection) => void,
  dispatchNodes: DispatchState<DataNode<T>[]>,
  idToChildIdMap: Map<string, Set<string>>,
  validateNodeHierarchy: (
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
        const validation =
          // nodeTarget?.distanceFromRoot === 0 &&
          validateNodeHierarchy(nodeSource, nodeTarget);
        if (validation && nodeSource && nodeTarget) {
          onConnect(connection);
          // dispatchNodes((prevNodes) =>
          //   recalculateDepths(
          //     prevNodes,
          //     nodeTarget,
          //     idToChildIdMap,
          //     idToNodeMap,
          //     nodeSource.distanceFromRoot
          //   )
          // );
        }
      }
    },
    [
      onConnect,
      idToNodeMap,
      dispatchNodes,
      idToChildIdMap,
      checkToggleFirstAndAfter,
      validateNodeHierarchy
    ]
  );
}
