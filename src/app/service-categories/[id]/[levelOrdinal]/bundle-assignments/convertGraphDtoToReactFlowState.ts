import { GraphDto, HasNumberId } from 'react-d3-force-wrapper';
import {
  convertClosureDtoListToEdgeList,
  convertDataNodeDtoListToFlowNodeList
} from '@/react-flow/utils/adaptors';

export function convertGraphDtoToReactFlowState<T extends HasNumberId>(
  classGraph: GraphDto<T>
) {
  const dataNodes = convertDataNodeDtoListToFlowNodeList<T>(classGraph.nodes);
  const dataLinks = convertClosureDtoListToEdgeList(
    classGraph.closureDtos
  ).filter(
    (l) =>
      dataNodes.find((n) => l.target === n.id) &&
      dataNodes.find((n) => l.source === n.id)
  );
  return { dataNodes, dataLinks };
}
