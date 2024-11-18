import { ForceGraphPage } from 'react-d3-force-wrapper';
import { Api } from '@/api/clientApi';
import { convertGraphDtoToReactFlowState } from '@/components/react-flow/generic/utils/convertGraphDtoToReactFlowState';
import { convertInitJsonTemplateDataNodeToFlowNode } from '@/components/react-flow/generic/utils/adaptors';
import { InitJsonTemplateFlow } from '@/components/react-flow/init-json-template/components/InitJsonTemplateFlow';
import { ReactFlowWrapper } from '@/components/react-flow/generic/components/wrappers/ReactFlowWrapper';
import { EdgeAnimationContextType } from '@/components/react-flow/generic/components/wrappers/edgeAnimationContext';
import { defaultForceGraphPageOptions } from '@/components/work-schema-node-assignments/defaultForceGraphPageOptions';

export default async function InitJsonTemplateGraphPage() {
  const graph = await Api.InitJsonTemplate.getGraph();

  const { dataNodes, dataLinks } = convertGraphDtoToReactFlowState(
    graph,
    convertInitJsonTemplateDataNodeToFlowNode
  );

  return (
    <ForceGraphPage
      dataNodes={dataNodes}
      dataLinks={dataLinks}
      graphName={'init-json-templates'}
      options={options}
    >
      <ReactFlowWrapper edgeAnimationContext={EdgeAnimation}>
        <InitJsonTemplateFlow></InitJsonTemplateFlow>
      </ReactFlowWrapper>
    </ForceGraphPage>
  );
}

const EdgeAnimation: EdgeAnimationContextType = {
  direction: 'to-target'
};

const options = {
  ...defaultForceGraphPageOptions,
  forces: {
    custom: true,
    collide: true
  }
};
