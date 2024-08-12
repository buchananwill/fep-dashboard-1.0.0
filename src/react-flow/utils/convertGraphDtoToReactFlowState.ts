import { DataNodeDto, GraphDto } from 'react-d3-force-wrapper';
import {
  convertClosureDtoListToEdgeList,
  convertDataNodeDtoListToFlowNodeList,
  NodeDataType
} from '@/react-flow/utils/adaptors';
import { FlowNode } from '@/react-flow/types';

export function convertGraphDtoToReactFlowState<T extends NodeDataType>(
  classGraph: GraphDto<T>,
  convertor: (node: DataNodeDto<T>) => FlowNode<T>
) {
  const dataNodes = convertDataNodeDtoListToFlowNodeList<T>(
    classGraph.nodes,
    convertor
  ).map((flowNode) => {
    return new Proxy(flowNode, handler);
  });
  const dataLinks = convertClosureDtoListToEdgeList(classGraph.closureDtos)
    .filter(
      (l) =>
        dataNodes.find((n) => l.target === n.id) &&
        dataNodes.find((n) => l.source === n.id)
    )
    .filter((l) => l.value === 1);
  return { dataNodes, dataLinks };
}

let handler = {
  set(target, property, value) {
    if (property === 'x' || property === 'y') {
      target[property] = value;
      callback(property, value); // Trigger callback whenever the property is modified
      return true; // Indicate success
    }
    return Reflect.set(...arguments); // Default behavior for other properties
  }
};

function callback(property: string, newValue: any) {
  console.log(property, ' changed to:', newValue);
}
