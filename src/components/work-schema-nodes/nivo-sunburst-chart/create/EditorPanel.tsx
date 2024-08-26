import EditButtons from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/EditButtons';
import Selectors from './selection/Selectors';
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
