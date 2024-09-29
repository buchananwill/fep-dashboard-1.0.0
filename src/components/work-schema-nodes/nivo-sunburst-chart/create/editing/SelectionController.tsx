'use client';
import { useGlobalController } from 'selective-context';
import { KnowledgeLevelSeriesGroup } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { KnowledgeLevelSeriesGroupTemplate } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelSeriesGroupManager';

export const SelectionPathKey = 'selectionPath';

export default function SelectionController({
  initialKnowledgeLevelSeriesGroup
}: {
  initialKnowledgeLevelSeriesGroup: KnowledgeLevelSeriesGroupTemplate;
}) {
  useGlobalController({
    contextKey: SelectionPathKey,
    initialValue: initialKnowledgeLevelSeriesGroup.path ?? '',
    listenerKey: 'edit-buttons'
  });

  return null;
}
