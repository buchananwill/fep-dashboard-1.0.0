import { WorkTaskTypeDto } from '@/api/dtos/WorkTaskTypeDtoSchema';

/**
 * entry[1] i.e. the number: this is the maximum number of roles we want to create for the attached partial list, in this request.
 * */
export type RequestCreationParams = [
  string,
  number,
  Partial<WorkTaskTypeDto>[]
];
