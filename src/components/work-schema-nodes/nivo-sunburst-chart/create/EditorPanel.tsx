import { K_D_TEMPLATE_ID } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelGroupManager';
import NestedWorkNodeChildSelector from '@/components/work-schema-nodes/nivo-sunburst-chart/create/NestedWorkNodeChildSelector';
import EditButtons from '@/components/work-schema-nodes/nivo-sunburst-chart/create/EditButtons';
import Selectors from './Selectors';

export default function EditorPanel() {
  return (
    <div className={'grid grid-cols-2 gap-2'}>
      <Selectors />
      <EditButtons></EditButtons>
    </div>
  );
}
