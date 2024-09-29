'use client';
import { useGlobalListener } from 'selective-context';
import {
  KnowledgeLevelSeriesGroupContextKey,
  KnowledgeLevelSeriesGroupTemplate
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelSeriesGroupManager';
import { WorkNodeResponsiveSunburst } from '@/components/work-schema-nodes/nivo-sunburst-chart/WorkNodeResponsiveSunburst';
import { KnowledgeLevelSeriesGroup } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';

export default function SunburstEditView({
  knowledgeLevelSeriesGroup
}: {
  knowledgeLevelSeriesGroup: KnowledgeLevelSeriesGroupTemplate;
}) {
  const { currentState } = useGlobalListener<KnowledgeLevelSeriesGroupTemplate>(
    {
      contextKey: KnowledgeLevelSeriesGroupContextKey,
      initialValue: knowledgeLevelSeriesGroup,
      listenerKey: 'viewer'
    }
  );

  return (
    <WorkNodeResponsiveSunburst
      data={currentState as KnowledgeLevelSeriesGroup}
    />
  );
}
