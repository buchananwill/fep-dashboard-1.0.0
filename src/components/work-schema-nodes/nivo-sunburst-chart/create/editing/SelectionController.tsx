'use client';
import { useGlobalController } from 'selective-context';
import { KnowledgeLevelSeriesGroup } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';

export const SelectionPathKey = 'selectionPath';

export default function SelectionController({
  initialKnowledgeLevelSeriesGroup
}: {
  initialKnowledgeLevelSeriesGroup: KnowledgeLevelSeriesGroup;
}) {
  useGlobalController({
    contextKey: SelectionPathKey,
    initialValue: initialKnowledgeLevelSeriesGroup.path ?? '',
    listenerKey: 'edit-buttons'
  });

  return null;
}
