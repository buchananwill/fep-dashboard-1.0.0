'use client';
import { useGlobalListener } from 'selective-context';
import {
  knowledgeLevelGroupContextKey,
  KnowledgeLevelGroupTemplate,
  knowledgeLevelGroupTemplate
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelGroupManager';
import { WorkNodeResponsiveSunburst } from '@/components/work-schema-nodes/nivo-sunburst-chart/ResponsiveSunburst';
import { KnowledgeLevelGroup } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';

export default function SunburstEditView() {
  const { currentState } = useGlobalListener<KnowledgeLevelGroupTemplate>({
    contextKey: knowledgeLevelGroupContextKey,
    initialValue: knowledgeLevelGroupTemplate,
    listenerKey: 'viewer'
  });

  return (
    <div className={'h-[75vh] w-[75vw]'}>
      <WorkNodeResponsiveSunburst data={currentState as KnowledgeLevelGroup} />
    </div>
  );
}
