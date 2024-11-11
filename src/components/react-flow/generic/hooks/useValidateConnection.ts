import { DataNode, HasNumberId } from 'react-d3-force-wrapper';
import { Connection } from '@xyflow/react';
import { useCallback } from 'react';

export function useValidateConnection<T extends HasNumberId>(
  checkToggleFirstAndAfter: () => void,
  idToNodeMap: Map<string, DataNode<T>>,
  onConnect: ({ source, target }: Connection) => void,
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
        const validation = validateNodeHierarchy(nodeSource, nodeTarget);
        if (validation && nodeSource && nodeTarget) {
          onConnect(connection);
        }
      }
    },
    [onConnect, idToNodeMap, checkToggleFirstAndAfter, validateNodeHierarchy]
  );
}
