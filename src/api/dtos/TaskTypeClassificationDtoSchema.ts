import { TaskTypeClassificationItemDtoSchema } from '../generated-dtos/TaskTypeClassificationItemDtoSchema';
import { AssetRoleTypeDtoSchema } from '../generated-dtos/AssetRoleTypeDtoSchema';
import { ProviderRoleTypeDtoSchema } from '../generated-dtos/ProviderRoleTypeDtoSchema';
import { AssetClassificationItemDtoSchema } from '../generated-dtos/AssetClassificationItemDtoSchema';
import { PartyClassificationItemDtoSchema } from '../generated-dtos/PartyClassificationItemDtoSchema';
import { z } from 'zod';
export const TaskTypeClassificationDtoSchema = z.object({
  id: z.number(),
  providerRoleType: ProviderRoleTypeDtoSchema,
  assetRoleType: AssetRoleTypeDtoSchema,
  cycleSubspanTotal: z.number(),
  feasibilityReportId: z.number(),
  taskTypeClassificationItems: z.array(TaskTypeClassificationItemDtoSchema),
  partyClassificationItems: z.array(PartyClassificationItemDtoSchema),
  assetClassificationItems: z.array(AssetClassificationItemDtoSchema),
  classificationType: z.string()
});
export type TaskTypeClassificationDto = z.infer<
  typeof TaskTypeClassificationDtoSchema
>;
