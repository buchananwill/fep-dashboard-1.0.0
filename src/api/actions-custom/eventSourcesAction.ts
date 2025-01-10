'use server';
import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';

export async function getEventSourcesAsKnowledgeDomains(scheduleId: number) {
  const url = constructUrl(
    `/api/v2/workProjectSeries/assignments/schedule/${scheduleId}/asKnowledgeDomainEventSourcesOutlook`
  );
  return getWithoutBody(url);
}
