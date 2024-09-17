import { TaskTypeClassificationItemDtoSchema } from './TaskTypeClassificationItemDtoSchema';
import { AssetClassificationItemDtoSchema } from './AssetClassificationItemDtoSchema';
import { PartyClassificationItemDtoSchema } from './PartyClassificationItemDtoSchema';
import { z } from 'zod';
export const TaskTypeClassificationDtoSchema = z.object({
  id: z.number(),
  cycleSubspanTotal: z.number(),
  feasibilityReportId: z.number(),
  taskTypeClassificationItems: z.array(TaskTypeClassificationItemDtoSchema),
  partyClassificationItems: z.array(PartyClassificationItemDtoSchema),
  assetClassificationItems: z.array(AssetClassificationItemDtoSchema),
  classificationType: z.string(),
  name: z.string()
});
