import { WorkProjectSeriesSchemaDtoSchema } from './WorkProjectSeriesSchemaDtoSchema';
import { z } from 'zod';
export const WorkProjectSeriesDeliveryDtoSchema = z.object({
  id: z.number(),
  partyId: z.number(),
  workProjectSeriesSchema: WorkProjectSeriesSchemaDtoSchema,
});
export type WorkProjectSeriesDeliveryDto = z.infer<typeof WorkProjectSeriesDeliveryDtoSchema>;