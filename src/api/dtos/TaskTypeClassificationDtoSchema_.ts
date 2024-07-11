import { z } from 'zod';
import { AssetRoleTypeDtoSchema } from '@/api/generated-dtos/AssetRoleTypeDtoSchema';
import { TaskTypeClassificationItemDtoSchema } from '@/api/generated-dtos/TaskTypeClassificationItemDtoSchema';
import { PartyClassificationItemDtoSchema } from '@/api/generated-dtos/PartyClassificationItemDtoSchema';
import { AssetClassificationItemDtoSchema } from '@/api/generated-dtos/AssetClassificationItemDtoSchema';
import { ProviderRoleTypeDtoSchema } from '@/api/generated-dtos/ProviderRoleTypeDtoSchema';

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
  name: z.string(),
  classificationType: ClassificationTypeEnum
});
export type TaskTypeClassificationDto = z.infer<
  typeof TaskTypeClassificationDtoSchema
>;

export type ClassificationType = z.infer<typeof ClassificationTypeEnum>;
