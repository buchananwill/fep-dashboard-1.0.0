import { z } from 'zod';
import { isValid, parseISO } from 'date-fns';
import { DayOfWeekObject, REGEX_DATE, REGEX_TIME } from './date-and-time';
import { HasUuidDtoSchema } from './dtos/HasUuidDtoSchema';
import { HasNameDtoSchema } from './dtos/HasNameDtoSchema';

const days = DayOfWeekObject;

export const zDateOnly = z
  .string()
  .regex(REGEX_DATE)
  .refine((arg) => (isValid(parseISO(arg)) ? arg : false));

export const zTimeOnly = z.string().regex(REGEX_TIME);

export const zDayOfWeek = z
  .string()
  .refine((arg) => Object.keys(days).includes(arg));

const LessonCycleSchema = z.object({
  periodVenueAssignments: z.map(z.number(), z.string()),
  enrolledStudentIds: z.set(z.number()),
  assignedTeacherIds: z.set(z.number()),
  requiredNumberOfPeriods: z.number(),
  subject: z.string(),
  ...HasNameDtoSchema.shape,
  ...HasUuidDtoSchema.shape
});
//
// export interface GraphDto<T extends HasNumberIdDto> {
//   nodes: DataNode<T>[];
//   closureDtos: ClosureDto[];
// }
//
// export interface GraphDtoPutRequestBody<T extends HasNumberIdDto> {
//   graphDto: GraphDto<T>;
//   deletedNodeIdList: number[];
//   deletedClosureIdList: number[];
// }
//
// export type DataNode<T extends HasNumberIdDto> = SimulationNodeDatum & {
//   id: number;
//   distanceFromRoot: number;
//   data: T;
// };
// export type DataLink<T extends HasNumberIdDto> = SimulationLinkDatum<
//   DataNode<T>
// > &
//   ClosureDto;

export { LessonCycleSchema };

export type LessonCycle = z.infer<typeof LessonCycleSchema>;
