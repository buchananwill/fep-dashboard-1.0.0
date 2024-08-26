'use server';

import { KnowledgeLevelSeriesGroup } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';

export default async function submitKnowledgeLevelSeries(
  data: KnowledgeLevelSeriesGroup
) {
  return postEntitiesWithDifferentReturnType(
    data,
    constructUrl('/api/v2/workSchemaNode/knowledgeLevelSeriesGroup')
  );
}
