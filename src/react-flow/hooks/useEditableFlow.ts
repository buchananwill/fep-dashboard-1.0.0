import {
  DataLink,
  DataNode,
  GraphDto,
  GraphDtoPutRequestBody,
  GraphSelectiveContextKeys,
  MemoizedFunction,
  useAllEdits,
  useGraphDispatch,
  useNodeEditing
} from 'react-d3-force-wrapper';
import { FlowNode, NodeConvertor, NodeValidator } from '@/react-flow/types';
import { useLayoutFlowWithForces } from '@/react-flow/hooks/useLayoutFlowWithForces';
import { useCallback, useMemo, useRef, useTransition } from 'react';
import { useReactFlow } from '@xyflow/react';
import { convertGraphDtoToReactFlowState } from '@/react-flow/utils/convertGraphDtoToReactFlowState';
import { useGlobalDispatch } from 'selective-context';
import { useHasChangesFlagCallback } from 'dto-stores/dist/hooks/internal/useHasChangesFlagCallback';
import { NodeDataType } from '@/react-flow/utils/adaptors';

export interface ServerAction<T, U> {
  (request: T): Promise<U>;
}

export function useEditableFlow<T extends NodeDataType>(
  cloneFunction: MemoizedFunction<FlowNode<T>, FlowNode<T>>,
  templateNode: FlowNode<T>,
  templateLink: DataLink<T>,
  putServerAction: ServerAction<GraphDtoPutRequestBody<T>, GraphDto<T>>,
  nodeConvertor: NodeConvertor<T>,
  entityClass: string,
  nodeValidator: NodeValidator<T>
) {
  // 4. Call the hook to set up the layout with forces
  const {
    flowOverlayProps,
    reactFlowProps,
    dispatchNodes,
    dispatchEdges,
    contextData
  } = useLayoutFlowWithForces<T>();
  const [isPending, startTransition] = useTransition();
  const { fitView } = useReactFlow();
  const { dispatchWithoutListen: dispatchDeletedLinkIds } = useGraphDispatch(
    GraphSelectiveContextKeys.deletedLinkIds
  );
  const { dispatchWithoutListen: dispatchDeletedNodeIds } = useGraphDispatch(
    GraphSelectiveContextKeys.deletedNodeIds
  );
  const { dispatchWithoutListen: dispatchUnsavedGraph } = useGraphDispatch(
    GraphSelectiveContextKeys.unsavedNodeData
  );

  const updateGraphAndSyncUi = useCallback(
    async (request: GraphDtoPutRequestBody<T>) => {
      startTransition(async () => {
        putServerAction(request as GraphDtoPutRequestBody<T>).then(
          (graphDto) => {
            const { dataNodes, dataLinks } = convertGraphDtoToReactFlowState(
              graphDto,
              nodeConvertor
            );
            dispatchNodes(dataNodes);
            dispatchEdges(() => {
              return dataLinks.filter((link) => link.value === 1);
            });
            dispatchDeletedLinkIds([]);
            dispatchDeletedNodeIds([]);
            dispatchUnsavedGraph(false);
            fitView();
          }
        );
      });
    },
    [
      dispatchNodes,
      dispatchEdges,
      dispatchDeletedNodeIds,
      dispatchDeletedLinkIds,
      dispatchUnsavedGraph,
      fitView,
      nodeConvertor,
      putServerAction
    ]
  );

  // Set up the available edit hooks.
  const { unsavedChanges, onConfirm } = useNodeEditing(
    cloneFunction as MemoizedFunction<DataNode<T>, FlowNode<T>>,
    templateNode,
    templateLink,
    updateGraphAndSyncUi,
    nodeValidator
  );
  useAllEdits();

  const { dispatchWithoutListen: changesDispatch } =
    useGlobalDispatch('unsavedChanges');

  useHasChangesFlagCallback(
    onConfirm,
    unsavedChanges,
    changesDispatch,
    `${entityClass}-graph`
  );
  return {
    flowOverlayProps,
    reactFlowProps,
    isPending,
    contextData,
    dispatchNodes,
    dispatchEdges
  };
}
