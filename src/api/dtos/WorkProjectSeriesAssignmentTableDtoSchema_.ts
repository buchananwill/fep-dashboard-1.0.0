import { CycleSubspanDtoSchema } from './CycleSubspanDtoSchema';
import { WorkProjectSeriesAssignmentDtoSchema } from './WorkProjectSeriesAssignmentDtoSchema';
import { z } from 'zod';
import { OrganizationDtoSchema } from '@/api/dtos/OrganizationDtoSchema_';
export const WorkProjectSeriesAssignmentTableDtoSchema = z.object({
  cycleSubspanDtoList: z.array(CycleSubspanDtoSchema),
  organizationList: z.array(OrganizationDtoSchema),
  organizationToCycleSubspanIdToAssignmentId: z.record(
    z.string(),
    z.record(z.string(), z.array(z.number()))
  ),
  assignmentIdToDtoMap: z.record(
    z.string(),
    WorkProjectSeriesAssignmentDtoSchema
  )
});
export type WorkProjectSeriesAssignmentTableDto = z.infer<
  typeof WorkProjectSeriesAssignmentTableDtoSchema
>;
