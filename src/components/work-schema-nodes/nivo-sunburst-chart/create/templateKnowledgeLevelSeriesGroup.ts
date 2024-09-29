import { KnowledgeLevelSeriesGroup } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { KnowledgeLevelSeriesGroupTemplate } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelSeriesGroupManager';

export const TemplateKnowledgeLevelSeriesGroup: KnowledgeLevelSeriesGroupTemplate =
  {
    type: 'knowledgeLevelSeriesGroup',
    children: [],
    organizationTypeName: 'Class',
    path: 'template'
  };

export function initDefaults(
  defaults: Partial<KnowledgeLevelSeriesGroup>
): KnowledgeLevelSeriesGroupTemplate {
  return { ...TemplateKnowledgeLevelSeriesGroup, ...defaults };
}
