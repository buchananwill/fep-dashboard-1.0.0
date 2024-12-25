import { WorkPlanRequest } from '@/api/generated-types/generated-types_';

export const initialRequest: WorkPlanRequest = {
  organizationTypeName: 'Year 7',
  planName: 'New Lesson Plan',
  numberOfUsers: 180,
  synchronizedWorkPlanRequests: {},
  independentWorkSchemas: []
};
