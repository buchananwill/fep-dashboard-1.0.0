import { KnowledgeLevelSeriesGroup } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';

const OneToOneEnrollments: KnowledgeLevelSeriesGroup = {
  id: '2',
  children: [
    {
      type: 'knowledgeLevelGroup',
      workTaskTypeName: {
        name: 'Teaching',
        id: 1
      },
      knowledgeLevel: {
        id: 10,
        name: 'Diploma',
        levelOrdinal: 9,
        knowledgeLevelSeriesId: 2
      },
      children: [
        {
          type: 'bundle',
          id: '2:1:1',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                {
                  name: 'Jazz/Pop Voice',
                  id: 54,
                  shortCode: 'JPV'
                }
              ],
              children: [
                {
                  type: 'leafList',
                  children: [
                    {
                      type: 'leaf',
                      size: 4,
                      id: '2:1:1:1:4:1'
                    }
                  ],
                  id: '2:1:1:1:4'
                }
              ],
              id: '2:1:1:1'
            }
          ],
          name: 'Xuan'
        }
      ],
      id: '2:1',
      cycle: {
        id: 1,
        cycleDayZero: 'MONDAY',
        cycleLengthInDays: 7,
        cycleLengthInWeeks: 1,
        maxGroupSize: 4,
        cycleSubspanGroupSizes: [2, 4, 6, 8]
      }
    }
  ],
  type: 'knowledgeLevelSeriesGroup',
  knowledgeLevelSeries: {
    id: 2,
    name: 'Grades',
    knowledgeLevelDescriptor: 'Music Grade',
    knowledgeLevels: [
      { id: 1, name: 'Initial', levelOrdinal: 0, knowledgeLevelSeriesId: 2 },
      { id: 2, name: 'Grade 1', levelOrdinal: 1, knowledgeLevelSeriesId: 2 },
      { id: 3, name: 'Grade 2', levelOrdinal: 2, knowledgeLevelSeriesId: 2 },
      { id: 4, name: 'Grade 3', levelOrdinal: 3, knowledgeLevelSeriesId: 2 },
      { id: 5, name: 'Grade 4', levelOrdinal: 4, knowledgeLevelSeriesId: 2 },
      { id: 6, name: 'Grade 5', levelOrdinal: 5, knowledgeLevelSeriesId: 2 },
      { id: 7, name: 'Grade 6', levelOrdinal: 6, knowledgeLevelSeriesId: 2 },
      { id: 8, name: 'Grade 7', levelOrdinal: 7, knowledgeLevelSeriesId: 2 },
      { id: 9, name: 'Grade 8', levelOrdinal: 8, knowledgeLevelSeriesId: 2 },
      { id: 10, name: 'Diploma', levelOrdinal: 9, knowledgeLevelSeriesId: 2 },
      {
        id: 11,
        name: 'Higher Diploma',
        levelOrdinal: 10,
        knowledgeLevelSeriesId: 2
      },
      {
        id: 12,
        name: 'Master Diploma',
        levelOrdinal: 11,
        knowledgeLevelSeriesId: 2
      }
    ]
  }
};
