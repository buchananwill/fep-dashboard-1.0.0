import { z } from 'zod';
import { ProviderRoleTypeDtoSchema } from '@/api/dtos/ProviderRoleTypeDtoSchema';
import { AssetRoleTypeDtoSchema } from '@/api/dtos/AssetRoleTypeDtoSchema';
import { TaskTypeClassificationItemDtoSchema } from '@/api/dtos/TaskTypeClassificationItemDtoSchema';
import { PartyClassificationItemDtoSchema } from '@/api/dtos/PartyClassificationItemDtoSchema';
import { AssetClassificationItemDtoSchema } from '@/api/dtos/AssetClassificationItemDtoSchema';

export const ClassificationTypeEnum = z.enum([
  'WORK_TASK_TYPE_TO_ASSET',
  'WORK_TASK_TYPE_TO_PARTY',
  'PARTY_TO_WORK_TASK_TYPE',
  'ASSET_TO_WORK_TASK_TYPE'
]);

export const TaskTypeClassificationDtoSchema = z.object({
  id: z.number(),
  providerRoleType: ProviderRoleTypeDtoSchema,
  assetRoleType: AssetRoleTypeDtoSchema,
  cycleSubspanTotal: z.number(),
  feasibilityReportId: z.number(),
  taskTypeClassificationItems: z.array(TaskTypeClassificationItemDtoSchema),
  partyClassificationItems: z.array(PartyClassificationItemDtoSchema),
  assetClassificationItems: z.array(AssetClassificationItemDtoSchema),
  classificationType: ClassificationTypeEnum
});
export type TaskTypeClassificationDto = z.infer<
  typeof TaskTypeClassificationDtoSchema
>;

export type ClassificationType = z.infer<typeof ClassificationTypeEnum>;
