import EditButtons from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/EditButtons';
import Selectors from './selection/Selectors';
import { KnowledgeLevelSeriesGroup } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';

export default function EditorPanel({
  initialKnowledgeLevelSeriesGroup
}: {
  initialKnowledgeLevelSeriesGroup: KnowledgeLevelSeriesGroup;
}) {
  return (
    <div className={'absolute right-0 grid grid-cols-2 gap-2'}>
      <EditButtons
        initialKnowledgeLevelSeriesGroup={initialKnowledgeLevelSeriesGroup}
      ></EditButtons>
      <Selectors />
    </div>
  );
}
