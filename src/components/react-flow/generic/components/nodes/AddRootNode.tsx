import {
  AddNodesParams,
  GraphSelectiveContextKeys,
  MemoizedFunction,
  undefinedAddNodes,
  useGraphListener
} from 'react-d3-force-wrapper';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { Button } from '@mantine/core';
import { HasNumberId } from '@/api/types';
import { EmptyArray } from '@/api/client-literals';

export function AddRootNode<T extends HasNumberId>({}: {}) {
  const listenerKey = useUuidListenerKey();
  const { currentState: addNodes } = useGraphListener(
    GraphSelectiveContextKeys.addNodes,
    listenerKey,
    undefinedAddNodes as MemoizedFunction<AddNodesParams, void>
  );
  return (
    <div className={'fixed left-1/2 top-1/2 z-50'}>
      <Button
        onClick={() =>
          addNodes.memoizedFunction({
            sourceNodeIdList: EmptyArray,
            relation: 'sibling'
          })
        }
      >
        Add Root
      </Button>
    </div>
  );
}
