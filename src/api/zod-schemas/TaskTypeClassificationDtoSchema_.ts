import { z } from 'zod';
import { AssetRoleTypeDtoSchema } from '@/api/zod-schemas/AssetRoleTypeDtoSchema';
import { TaskTypeClassificationItemDtoSchema } from '@/api/zod-schemas/TaskTypeClassificationItemDtoSchema';
import { PartyClassificationItemDtoSchema } from '@/api/zod-schemas/PartyClassificationItemDtoSchema';
import { AssetClassificationItemDtoSchema } from '@/api/zod-schemas/AssetClassificationItemDtoSchema';
import { ProviderRoleTypeDtoSchema } from '@/api/zod-schemas/ProviderRoleTypeDtoSchema';

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
