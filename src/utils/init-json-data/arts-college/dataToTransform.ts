import {
  AssetDto,
  RolePostRequest
} from '@/api/generated-types/generated-types';
import { PersonDto } from '@/api/zod-schemas/PersonDtoSchema';

export const assetPostRequests: RolePostRequest<AssetDto>[] = [
  {
    baseEntity: {
      name: '3',
      id: 1,
      type: { name: 'room', id: 1, isMoveable: false }
    },
    suitabilities: [
      {
        workTaskTypeMatrix: {
          knowledgeLevelSeriesDtoList: [
            { name: 'Courses', id: 2, knowledgeLevelSeries: [] }
          ],
          knowledgeDomainInclusionList: [
            { name: 'Drum Kit', id: -1 },
            { name: 'Piano', id: -1 },
            { name: 'Classical Piano', id: -1 },
            { name: 'Production', id: -1 },
            { name: 'French Horn', id: -1 },
            { name: 'Jazz/Pop Voice', id: -1 },
            { name: 'Guitar', id: -1 },
            { name: 'Double Bass', id: -1 },
            { name: 'Jazz/Pop Voice', id: -1 }
          ],
          knowledgeDomainExclusionList: [],
          workTaskTypeNames: ['Teaching']
        },
        roleTypeNames: ['Studio'],
        rating: 4
      }
    ],
    availabilities: [
      {
        day: 'WEDNESDAY',
        startTime: '10:00',
        endTime: '20:00',
        roleTypeNames: ['Studio'],
        availabilityCode: 'TRUE'
      },
      {
        day: 'THURSDAY',
        startTime: '10:00',
        endTime: '20:00',
        roleTypeNames: ['Studio'],
        availabilityCode: 'TRUE'
      }
    ]
  },
  {
    baseEntity: {
      name: '3a',
      id: 2,
      type: { name: 'room', id: 1, isMoveable: false }
    },
    suitabilities: [
      {
        workTaskTypeMatrix: {
          knowledgeLevelSeriesDtoList: [
            { name: 'Courses', id: 2, knowledgeLevelSeries: [] }
          ],
          knowledgeDomainInclusionList: [
            { name: 'Piano', id: -1 },
            { name: 'Classical Piano', id: -1 },
            { name: 'Production', id: -1 },
            { name: 'French Horn', id: -1 },
            { name: 'Jazz/Pop Voice', id: -1 }
          ],
          knowledgeDomainExclusionList: [],
          workTaskTypeNames: ['Teaching']
        },
        roleTypeNames: ['Studio'],
        rating: 4
      }
    ],
    availabilities: [
      {
        day: 'MONDAY',
        startTime: '09:00',
        endTime: '20:00',
        roleTypeNames: ['Studio'],
        availabilityCode: 'TRUE'
      },
      {
        day: 'TUESDAY',
        startTime: '09:00',
        endTime: '20:00',
        roleTypeNames: ['Studio'],
        availabilityCode: 'TRUE'
      },
      {
        day: 'WEDNESDAY',
        startTime: '09:00',
        endTime: '10:00',
        roleTypeNames: ['Studio'],
        availabilityCode: 'TRUE'
      },
      {
        day: 'THURSDAY',
        startTime: '09:00',
        endTime: '10:00',
        roleTypeNames: ['Studio'],
        availabilityCode: 'TRUE'
      },
      {
        day: 'FRIDAY',
        startTime: '09:00',
        endTime: '20:00',
        roleTypeNames: ['Studio'],
        availabilityCode: 'TRUE'
      }
    ]
  },
  {
    baseEntity: {
      name: '3b',
      id: 3,
      type: { name: 'room', id: 1, isMoveable: false }
    },
    suitabilities: [
      {
        workTaskTypeMatrix: {
          knowledgeLevelSeriesDtoList: [
            { name: 'Courses', id: 2, knowledgeLevelSeries: [] }
          ],
          knowledgeDomainInclusionList: [
            { name: 'Guitar', id: -1 },
            { name: 'Double Bass', id: -1 },
            { name: 'Jazz/Pop Voice', id: -1 }
          ],
          knowledgeDomainExclusionList: [],
          workTaskTypeNames: ['Teaching']
        },
        roleTypeNames: ['Studio'],
        rating: 4
      }
    ],
    availabilities: [
      {
        day: 'MONDAY',
        startTime: '09:00',
        endTime: '20:00',
        roleTypeNames: ['Studio'],
        availabilityCode: 'TRUE'
      },
      {
        day: 'TUESDAY',
        startTime: '09:00',
        endTime: '20:00',
        roleTypeNames: ['Studio'],
        availabilityCode: 'TRUE'
      },
      {
        day: 'WEDNESDAY',
        startTime: '09:00',
        endTime: '10:00',
        roleTypeNames: ['Studio'],
        availabilityCode: 'TRUE'
      },
      {
        day: 'THURSDAY',
        startTime: '09:00',
        endTime: '10:00',
        roleTypeNames: ['Studio'],
        availabilityCode: 'TRUE'
      },
      {
        day: 'FRIDAY',
        startTime: '09:00',
        endTime: '20:00',
        roleTypeNames: ['Studio'],
        availabilityCode: 'TRUE'
      }
    ]
  },
  {
    baseEntity: {
      name: '8',
      id: 4,
      type: { name: 'room', id: 1, isMoveable: false }
    },
    suitabilities: [
      {
        workTaskTypeMatrix: {
          knowledgeLevelSeriesDtoList: [
            { name: 'Courses', id: 2, knowledgeLevelSeries: [] }
          ],
          knowledgeDomainInclusionList: [
            { name: 'French Horn', id: -1 },
            { name: 'Jazz/Pop Voice', id: -1 }
          ],
          knowledgeDomainExclusionList: [],
          workTaskTypeNames: ['Teaching']
        },
        roleTypeNames: ['Studio'],
        rating: 4
      }
    ],
    availabilities: [
      {
        day: 'MONDAY',
        startTime: '09:00',
        endTime: '20:00',
        roleTypeNames: ['Studio'],
        availabilityCode: 'TRUE'
      },
      {
        day: 'TUESDAY',
        startTime: '09:00',
        endTime: '20:00',
        roleTypeNames: ['Studio'],
        availabilityCode: 'TRUE'
      },
      {
        day: 'WEDNESDAY',
        startTime: '09:00',
        endTime: '20:00',
        roleTypeNames: ['Studio'],
        availabilityCode: 'TRUE'
      },
      {
        day: 'THURSDAY',
        startTime: '09:00',
        endTime: '20:00',
        roleTypeNames: ['Studio'],
        availabilityCode: 'TRUE'
      },
      {
        day: 'FRIDAY',
        startTime: '09:00',
        endTime: '20:00',
        roleTypeNames: ['Studio'],
        availabilityCode: 'TRUE'
      }
    ]
  },
  {
    baseEntity: {
      name: '14',
      id: 5,
      type: { name: 'room', id: 1, isMoveable: false }
    },
    suitabilities: [
      {
        workTaskTypeMatrix: {
          knowledgeLevelSeriesDtoList: [
            { name: 'Courses', id: 2, knowledgeLevelSeries: [] }
          ],
          knowledgeDomainInclusionList: [
            { name: 'Guitar', id: -1 },
            { name: 'Double Bass', id: -1 },
            { name: 'Classical Voice', id: -1 },
            { name: 'Jazz/Pop Voice', id: -1 },
            { name: 'DJ', id: -1 }
          ],
          knowledgeDomainExclusionList: [],
          workTaskTypeNames: ['Teaching']
        },
        roleTypeNames: ['Studio'],
        rating: 4
      }
    ],
    availabilities: [
      {
        day: 'MONDAY',
        startTime: '09:00',
        endTime: '20:00',
        roleTypeNames: ['Studio'],
        availabilityCode: 'TRUE'
      },
      {
        day: 'TUESDAY',
        startTime: '09:00',
        endTime: '20:00',
        roleTypeNames: ['Studio'],
        availabilityCode: 'TRUE'
      },
      {
        day: 'WEDNESDAY',
        startTime: '09:00',
        endTime: '20:00',
        roleTypeNames: ['Studio'],
        availabilityCode: 'TRUE'
      },
      {
        day: 'THURSDAY',
        startTime: '09:00',
        endTime: '20:00',
        roleTypeNames: ['Studio'],
        availabilityCode: 'TRUE'
      },
      {
        day: 'FRIDAY',
        startTime: '09:00',
        endTime: '20:00',
        roleTypeNames: ['Studio'],
        availabilityCode: 'TRUE'
      }
    ]
  },
  {
    baseEntity: {
      name: '16',
      id: 6,
      type: { name: 'room', id: 1, isMoveable: false }
    },
    suitabilities: [
      {
        workTaskTypeMatrix: {
          knowledgeLevelSeriesDtoList: [
            { name: 'Courses', id: 2, knowledgeLevelSeries: [] }
          ],
          knowledgeDomainInclusionList: [
            { name: 'Classical Voice', id: -1 },
            { name: 'Jazz/Pop Voice', id: -1 }
          ],
          knowledgeDomainExclusionList: [],
          workTaskTypeNames: ['Teaching']
        },
        roleTypeNames: ['Studio'],
        rating: 4
      }
    ],
    availabilities: [
      {
        day: 'MONDAY',
        startTime: '16:00',
        endTime: '20:00',
        roleTypeNames: ['Studio'],
        availabilityCode: 'TRUE'
      },
      {
        day: 'TUESDAY',
        startTime: '16:00',
        endTime: '20:00',
        roleTypeNames: ['Studio'],
        availabilityCode: 'TRUE'
      },
      {
        day: 'WEDNESDAY',
        startTime: '16:00',
        endTime: '20:00',
        roleTypeNames: ['Studio'],
        availabilityCode: 'TRUE'
      },
      {
        day: 'THURSDAY',
        startTime: '16:00',
        endTime: '20:00',
        roleTypeNames: ['Studio'],
        availabilityCode: 'TRUE'
      },
      {
        day: 'FRIDAY',
        startTime: '16:00',
        endTime: '20:00',
        roleTypeNames: ['Studio'],
        availabilityCode: 'TRUE'
      }
    ]
  }
];
