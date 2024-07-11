import { TaskTypeClassificationItemDtoSchema } from './TaskTypeClassificationItemDtoSchema';
import { AssetRoleTypeDtoSchema } from './AssetRoleTypeDtoSchema';
import { ProviderRoleTypeDtoSchema } from './ProviderRoleTypeDtoSchema';
import { AssetClassificationItemDtoSchema } from './AssetClassificationItemDtoSchema';
import { PartyClassificationItemDtoSchema } from './PartyClassificationItemDtoSchema';
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
  classificationType: z.string(),
});
export type TaskTypeClassificationDto = z.infer<typeof TaskTypeClassificationDtoSchema>;