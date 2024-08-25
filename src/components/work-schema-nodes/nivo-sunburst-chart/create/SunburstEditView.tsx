'use client';
import { useGlobalListener } from 'selective-context';
import {
  knowledgeLevelGroupContextKey,
  KnowledgeLevelGroupTemplate,
  knowledgeLevelGroupTemplate
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelSeriesGroupManager';
import { WorkNodeResponsiveSunburst } from '@/components/work-schema-nodes/nivo-sunburst-chart/ResponsiveSunburst';
import { KnowledgeLevelGroup } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';

export default function SunburstEditView({
  klgt
}: {
  klgt: KnowledgeLevelGroupTemplate;
}) {
  const { currentState } = useGlobalListener<KnowledgeLevelGroupTemplate>({
    contextKey: knowledgeLevelGroupContextKey,
    initialValue: klgt,
    listenerKey: 'viewer'
  });

  return (
    <div className={'h-[75vh] w-[75vw]'}>
      <WorkNodeResponsiveSunburst data={currentState as KnowledgeLevelGroup} />
    </div>
  );
}
