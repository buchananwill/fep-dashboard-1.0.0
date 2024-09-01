import SelectionController from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/SelectionController';
import Selectors from './selection/Selectors';
import { KnowledgeLevelSeriesGroup } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import TopLevelSelectors from '@/components/work-schema-nodes/nivo-sunburst-chart/create/selection/TopLevelSelectors';

export default function EditorPanel({
  initialKnowledgeLevelSeriesGroup
}: {
  initialKnowledgeLevelSeriesGroup: KnowledgeLevelSeriesGroup;
}) {
  return (
    <>
      <SelectionController
        initialKnowledgeLevelSeriesGroup={initialKnowledgeLevelSeriesGroup}
      />
      <div className={'flex flex-col gap-2'}>
        <TopLevelSelectors />
        <Selectors />
      </div>
    </>
  );
}
