import { WorkProjectSeriesSchemaDto } from '@/api/zod-schemas/WorkProjectSeriesSchemaDtoSchema_';

export function getAssigneeCountColor(
  count: number,
  schema: WorkProjectSeriesSchemaDto
) {
  if (count === 0) return 'bg-gray-300';
  const breakpointsPassed = count / schema.userToProviderRatio;
  if (breakpointsPassed <= 1) return 'bg-emerald-200';
  if (breakpointsPassed <= 2) return 'bg-yellow-100';
  if (breakpointsPassed <= 3) return 'bg-orange-200';
  if (breakpointsPassed <= 4) return 'bg-red-300';
  else return 'bg-fuchsia-300';
}
