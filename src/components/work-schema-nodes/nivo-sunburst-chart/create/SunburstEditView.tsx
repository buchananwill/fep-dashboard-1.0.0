'use client';
import { useGlobalListener } from 'selective-context';
import {
  knowledgeLevelSeriesGroupContextKey,
  KnowledgeLevelGroupTemplate,
  knowledgeLevelGroupTemplate
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelSeriesGroupManager';
import { WorkNodeResponsiveSunburst } from '@/components/work-schema-nodes/nivo-sunburst-chart/ResponsiveSunburst';
import {
  KnowledgeLevelGroup,
  KnowledgeLevelSeriesGroup
} from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';

export default function SunburstEditView({
  knowledgeLevelSeriesGroup
}: {
  knowledgeLevelSeriesGroup: KnowledgeLevelSeriesGroup;
}) {
  const { currentState } = useGlobalListener<KnowledgeLevelSeriesGroup>({
    contextKey: knowledgeLevelSeriesGroupContextKey,
    initialValue: knowledgeLevelSeriesGroup,
    listenerKey: 'viewer'
  });

  return (
    <div className={'h-[75vh] w-[75vw]'}>
      <WorkNodeResponsiveSunburst
        data={currentState as KnowledgeLevelSeriesGroup}
      />
    </div>
  );
}
