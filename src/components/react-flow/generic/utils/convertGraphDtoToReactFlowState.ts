import { DataNodeDto, GraphDto } from 'react-d3-force-wrapper';
import {
  convertClosureDtoListToEdgeList,
  convertDataNodeDtoListToFlowNodeList,
  NodeDataType
} from '@/components/react-flow/generic/utils/adaptors';
import { FlowNode } from '@/components/react-flow/generic/types';

export function convertGraphDtoToReactFlowState<T extends NodeDataType>(
  classGraph: GraphDto<T>,
  convertor: (node: DataNodeDto<T>) => FlowNode<T>
) {
  const dataNodes = convertDataNodeDtoListToFlowNodeList<T>(
    classGraph.nodes,
    convertor
  );
  const dataLinks = convertClosureDtoListToEdgeList(classGraph.closureDtos)
    .filter(
      (l) =>
        dataNodes.find((n) => l.target === n.id) &&
        dataNodes.find((n) => l.source === n.id)
    )
    .filter((l) => l.value === 1);
  return { dataNodes, dataLinks };
}

function callback(property: string, newValue: any) {
  console.log(property, ' changed to:', newValue);
}
