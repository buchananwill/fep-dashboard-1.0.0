import { z } from 'zod';
export const EventDtoSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  eventEnd: z.date(),
  eventStart: z.date(),
  scheduleId: z.number(),
  eventReasonId: z.number(),
  eventReasonType: z.string(),
  normalizedEventOutcome: z.number(),
  calendarId: z.string().uuid(),
  ownerRoleId: z.number()
});
