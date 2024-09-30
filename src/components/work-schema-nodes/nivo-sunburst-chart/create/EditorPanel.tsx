import SelectionController from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/SelectionController';
import Selectors from './selection/Selectors';
import { KnowledgeLevelSeriesGroup } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import TopLevelSelectors from '@/components/work-schema-nodes/nivo-sunburst-chart/create/selection/TopLevelSelectors';
import { KnowledgeLevelSeriesGroupTemplate } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelSeriesGroupManager';

export default function EditorPanel({
  initialKnowledgeLevelSeriesGroup
}: {
  initialKnowledgeLevelSeriesGroup: KnowledgeLevelSeriesGroupTemplate;
}) {
  return (
    <>
      <SelectionController
        initialKnowledgeLevelSeriesGroup={initialKnowledgeLevelSeriesGroup}
      />
      <div className={'flex w-full max-w-[45%] flex-col  gap-2 '}>
        <TopLevelSelectors />
        <Selectors />
      </div>
    </>
  );
}
