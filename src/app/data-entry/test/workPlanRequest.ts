import { WorkPlanRequest } from '@/api/generated-types/generated-types_';

export const requestTest: WorkPlanRequest = {
  organizationTypeName: 'Year 7',
  planName: 'Year 7 Test9',
  numberOfUsers: 180,
  synchronizedWorkPlanRequests: {
    '1': {
      name: 'Maths and Games4',
      workSchemaList: [61, 44],
      userCount: 180,
      organizationRepeatCount: 1,
      groupSize: 1
    },
    '2': {
      name: 'Humanities4',
      workSchemaList: [39, 6, 57, 49, 47],
      userCount: 180,
      organizationRepeatCount: 2,
      groupSize: 5
    }
  },
  independentWorkSchemas: [24, 37, 31, 25, 4, 28, 35, 38, 63, 13, 64, 1]
};
