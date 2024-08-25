import { K_D_TEMPLATE_ID } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelSeriesGroupManager';
import NestedWorkNodeChildSelector from '@/components/work-schema-nodes/nivo-sunburst-chart/create/NestedWorkNodeChildSelector';
import EditButtons from '@/components/work-schema-nodes/nivo-sunburst-chart/create/EditButtons';
import Selectors from './Selectors';
import { KnowledgeLevelSeriesGroup } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';

export default function EditorPanel({
  initialKnowledgeLevelSeriesGroup
}: {
  initialKnowledgeLevelSeriesGroup: KnowledgeLevelSeriesGroup;
}) {
  return (
    <div className={'grid grid-cols-2 gap-2'}>
      <Selectors />
      <EditButtons
        initialKnowledgeLevelSeriesGroup={initialKnowledgeLevelSeriesGroup}
      ></EditButtons>
    </div>
  );
}
