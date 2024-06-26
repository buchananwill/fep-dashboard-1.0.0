import { DataNodeDto, GraphDto, HasNumberId } from 'react-d3-force-wrapper';
import {
  convertClosureDtoListToEdgeList,
  convertDataNodeDtoListToFlowNodeList,
  convertToOrganizationNode
} from '@/react-flow/utils/adaptors';
import { FlowNode } from '@/react-flow/types';

export function convertGraphDtoToReactFlowState<T extends HasNumberId>(
  classGraph: GraphDto<T>,
  convertor: (node: DataNodeDto<T>) => FlowNode<T>
) {
  const dataNodes = convertDataNodeDtoListToFlowNodeList<T>(
    classGraph.nodes,
    convertor
  );
  const dataLinks = convertClosureDtoListToEdgeList(
    classGraph.closureDtos
  ).filter(
    (l) =>
      dataNodes.find((n) => l.target === n.id) &&
      dataNodes.find((n) => l.source === n.id)
  );
  return { dataNodes, dataLinks };
}