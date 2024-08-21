import { KnowledgeLevelSeriesGroup } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';

export const streamedLessons: KnowledgeLevelSeriesGroup = {
  type: 'knowledgeLevelSeriesGroup',
  knowledgeLevelSeries: {
    name: 'Streams',
    knowledgeLevelDescriptor: 'Stream',
    knowledgeLevelIds: [1, 2],
    id: 1
  },
  children: [
    {
      id: '1:1',
      type: 'knowledgeLevelGroup',
      cycle: {
        id: 1,
        cycleDayZero: 'MONDAY',
        cycleLengthInDays: 7,
        cycleLengthInWeeks: 1,
        maxGroupSize: 4,
        cycleSubspanGroupSizes: [2, 3, 4]
      },
      workTaskTypeName: {
        name: 'Teaching',
        id: 1
      },
      knowledgeLevel: {
        name: '1',
        levelOrdinal: 1,
        id: 1,
        knowledgeLevelSeriesId: 1
      },
      children: [
        {
          id: '1:1:1',
          type: 'bundle',
          children: [
            {
              id: '1:1:1:1',
              type: 'knowledgeDomainGroup',
              children: [
                {
                  id: '1:1:1:4:1',
                  type: 'leafList',
                  children: [
                    {
                      type: 'leaf',
                      size: 4,
                      id: '1:1:1:4:1:1'
                    }
                  ]
                }
              ],
              knowledgeDomains: [
                {
                  name: 'Music Theory',
                  id: 1,
                  shortCode: 'MT'
                }
              ]
            }
          ]
        },
        {
          id: '1:1:2',
          type: 'bundle',
          children: [
            {
              id: '1:1:2:1',
              type: 'knowledgeDomainGroup',
              children: [
                {
                  id: '1:1:2:4:1',
                  type: 'leafList',
                  children: [
                    {
                      type: 'leaf',
                      size: 4,
                      id: '1:1:2:4:1:1'
                    }
                  ]
                }
              ],
              knowledgeDomains: [
                {
                  name: 'Transcription',
                  id: 2,
                  shortCode: 'Tr'
                }
              ]
            }
          ]
        },
        {
          id: '1:1:3',
          type: 'bundle',
          children: [
            {
              id: '1:1:3:1',
              type: 'knowledgeDomainGroup',
              children: [
                {
                  id: '1:1:3:4:1',
                  type: 'leafList',
                  children: [
                    {
                      type: 'leaf',
                      size: 4,
                      id: '1:1:3:4:1:1'
                    }
                  ]
                }
              ],
              knowledgeDomains: [
                {
                  name: 'Aural Skills',
                  id: 3,
                  shortCode: 'AS'
                }
              ]
            }
          ]
        },
        {
          id: '1:1:4',
          type: 'bundle',
          children: [
            {
              id: '1:1:4:1',
              type: 'knowledgeDomainGroup',
              children: [
                {
                  id: '1:1:4:1:4',
                  type: 'leafList',
                  children: [
                    {
                      type: 'leaf',
                      size: 4,
                      id: '1:1:4:1:4:1'
                    }
                  ]
                }
              ],
              knowledgeDomains: [
                {
                  name: 'Keyboard Skills',
                  id: 4,
                  shortCode: 'KS'
                }
              ]
            }
          ]
        },
        {
          id: '1:1:5',
          type: 'bundle',
          children: [
            {
              id: '1:1:5:1',
              type: 'knowledgeDomainGroup',
              children: [
                {
                  id: '1:1:5:4:1',
                  type: 'leafList',
                  children: [
                    {
                      type: 'leaf',
                      size: 4,
                      id: '1:1:5:1:1:1'
                    }
                  ]
                }
              ],
              knowledgeDomains: [
                {
                  name: 'Composition',
                  id: 5,
                  shortCode: 'Co'
                }
              ]
            }
          ]
        },
        {
          id: '1:1:6',
          type: 'bundle',
          children: [
            {
              id: '1:1:6:1',
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                {
                  id: 6,
                  name: 'Pop Styles',
                  shortCode: 'PS'
                }
              ],
              children: [
                {
                  id: '1:1:6:4:4',
                  type: 'leafList',
                  children: [
                    {
                      type: 'leaf',
                      size: 4,
                      id: '1:1:6:1:4:1'
                    }
                  ]
                }
              ]
            },
            {
              id: '1:1:6:2',
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                {
                  id: 6,
                  name: 'Production: Sequencing',
                  shortCode: 'Ps'
                }
              ],
              children: [
                {
                  id: '1:1:6:2:4',
                  type: 'leafList',
                  children: [
                    {
                      type: 'leaf',
                      size: 4,
                      id: '1:1:6:2:4:1'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: '1:2',
      type: 'knowledgeLevelGroup',
      cycle: {
        id: 1,
        cycleDayZero: 'MONDAY',
        cycleLengthInDays: 14,
        cycleLengthInWeeks: 2,
        maxGroupSize: 2,
        cycleSubspanGroupSizes: []
      },
      workTaskTypeName: {
        name: 'Teaching',
        id: 1
      },
      knowledgeLevel: {
        name: '2',
        levelOrdinal: 2,
        id: 2,
        knowledgeLevelSeriesId: 1
      },
      children: [
        {
          id: '1:2:1',
          type: 'bundle',
          children: [
            {
              id: '1:2:1:1',
              type: 'knowledgeDomainGroup',
              children: [
                {
                  id: '1:2:1:4:1',
                  type: 'leafList',
                  children: [
                    {
                      type: 'leaf',
                      size: 4,
                      id: '1:2:1:1:1:1'
                    }
                  ]
                }
              ],
              knowledgeDomains: [
                {
                  name: 'Music Theory',
                  id: 1,
                  shortCode: 'MT'
                }
              ]
            }
          ]
        },
        {
          id: '1:2:2',
          type: 'bundle',
          children: [
            {
              id: '1:2:2:1',
              type: 'knowledgeDomainGroup',
              children: [
                {
                  id: '1:2:2:4:1',
                  type: 'leafList',
                  children: [
                    {
                      type: 'leaf',
                      size: 4,
                      id: '1:2:2:1:1:1'
                    }
                  ]
                }
              ],
              knowledgeDomains: [
                {
                  name: 'Transcription',
                  id: 2,
                  shortCode: 'Tr'
                }
              ]
            }
          ]
        },
        {
          id: '1:2:3',
          type: 'bundle',
          children: [
            {
              id: '1:2:3:1',
              type: 'knowledgeDomainGroup',
              children: [
                {
                  id: '1:2:3:4:1',
                  type: 'leafList',
                  children: [
                    {
                      type: 'leaf',
                      size: 4,
                      id: '1:2:3:1:1:1'
                    }
                  ]
                }
              ],
              knowledgeDomains: [
                {
                  name: 'Aural Skills',
                  id: 3,
                  shortCode: 'AS'
                }
              ]
            }
          ]
        },
        {
          id: '1:2:4',
          type: 'bundle',
          children: [
            {
              id: '1:2:4:1',
              type: 'knowledgeDomainGroup',
              children: [
                {
                  id: '1:2:4:4:1',
                  type: 'leafList',
                  children: [
                    {
                      type: 'leaf',
                      size: 4,
                      id: '1:2:4:1:1:1'
                    }
                  ]
                }
              ],
              knowledgeDomains: [
                {
                  name: 'Keyboard Skills',
                  id: 4,
                  shortCode: 'KS'
                }
              ]
            }
          ]
        },
        {
          id: '1:2:5',
          type: 'bundle',
          children: [
            {
              id: '1:2:5:1',
              type: 'knowledgeDomainGroup',
              children: [
                {
                  id: '1:2:5:4:1',
                  type: 'leafList',
                  children: [
                    {
                      type: 'leaf',
                      size: 4,
                      id: '1:2:5:1:1:1'
                    }
                  ]
                }
              ],
              knowledgeDomains: [
                {
                  name: 'Composition',
                  id: 5,
                  shortCode: 'Co'
                }
              ]
            }
          ]
        },
        {
          id: '1:2:6',
          type: 'bundle',
          children: [
            {
              id: '1:2:6:1',
              type: 'knowledgeDomainGroup',
              children: [
                {
                  id: '1:2:6:4:1',
                  type: 'leafList',
                  children: [
                    {
                      type: 'leaf',
                      size: 4,
                      id: '1:2:6:1:1:1'
                    }
                  ]
                }
              ],
              knowledgeDomains: [
                {
                  name: 'UCAS Applications',
                  id: 5,
                  shortCode: 'UA'
                }
              ]
            },
            {
              id: '1:2:6:2',
              type: 'knowledgeDomainGroup',
              children: [
                {
                  id: '1:2:6:2:4:1',
                  type: 'leafList',
                  children: [
                    {
                      type: 'leaf',
                      size: 4,
                      id: '1:2:6:2:4:1'
                    }
                  ]
                }
              ],
              knowledgeDomains: [
                {
                  name: 'Arranging',
                  id: 5,
                  shortCode: 'Ar'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: '1:3',
      type: 'knowledgeLevelGroup',
      cycle: {
        id: 1,
        cycleDayZero: 'MONDAY',
        cycleLengthInDays: 7,
        cycleLengthInWeeks: 1,
        maxGroupSize: 4,
        cycleSubspanGroupSizes: [2, 3, 4, 6]
      },
      workTaskTypeName: {
        name: 'Teaching',
        id: 1
      },
      knowledgeLevel: {
        name: 'Shared',
        levelOrdinal: 0,
        id: 3,
        knowledgeLevelSeriesId: 1
      },
      children: [
        {
          id: '1:3:1',
          type: 'bundle',
          children: [
            {
              id: '1:3:1:1',
              type: 'knowledgeDomainGroup',
              children: [
                {
                  id: '1:3:1:1:2',
                  type: 'leafList',
                  children: [
                    {
                      type: 'leaf',
                      size: 2,
                      id: '1:3:1:1:2:1'
                    }
                  ]
                }
              ],
              knowledgeDomains: [
                {
                  name: 'Reflection/PT',
                  id: 1,
                  shortCode: 'RP'
                }
              ]
            },
            {
              id: '1:3:1:2',
              type: 'knowledgeDomainGroup',
              children: [
                {
                  id: '1:3:1:2:6',
                  type: 'leafList',
                  children: [
                    {
                      type: 'leaf',
                      size: 6,
                      id: '1:3:1:2:6:1'
                    },
                    {
                      type: 'leaf',
                      size: 6,
                      id: '1:3:1:2:6:2'
                    }
                  ]
                }
              ],
              knowledgeDomains: [
                {
                  name: 'Ensemble Rehearsals',
                  id: 11,
                  shortCode: 'ER'
                }
              ]
            },
            {
              id: '1:3:1:3',
              type: 'knowledgeDomainGroup',
              children: [
                {
                  id: '1:3:1:3:2',
                  type: 'leafList',
                  children: [
                    {
                      type: 'leaf',
                      size: 2,
                      id: '1:3:1:3:2:1'
                    }
                  ]
                }
              ],
              knowledgeDomains: [
                {
                  name: 'No Name',
                  id: 12,
                  shortCode: 'NN'
                }
              ]
            },
            {
              id: '1:3:1:4',
              type: 'knowledgeDomainGroup',
              children: [
                {
                  id: '1:3:1:4:4',
                  type: 'leafList',
                  children: [
                    {
                      type: 'leaf',
                      size: 4,
                      id: '1:3:1:3:4:1'
                    },
                    {
                      type: 'leaf',
                      size: 4,
                      id: '1:3:1:3:4:2'
                    }
                  ]
                },
                {
                  id: '1:3:1:4:8',
                  type: 'leafList',
                  children: [
                    {
                      type: 'leaf',
                      size: 8,
                      id: '1:3:1:4:8:1'
                    }
                  ]
                }
              ],
              knowledgeDomains: [
                {
                  name: 'Purple English',
                  id: 12,
                  shortCode: 'En'
                }
              ]
            },
            {
              id: '1:3:1:5',
              type: 'knowledgeDomainGroup',
              children: [
                {
                  id: '1:3:1:5:6',
                  type: 'leafList',
                  children: [
                    {
                      type: 'leaf',
                      size: 6,
                      id: '1:3:1:5:6:1'
                    }
                  ]
                }
              ],
              knowledgeDomains: [
                {
                  name: 'Project Lab',
                  id: 1,
                  shortCode: 'PL'
                }
              ]
            },
            {
              id: '1:3:1:6',
              type: 'knowledgeDomainGroup',
              children: [
                {
                  id: '1:3:1:6:4',
                  type: 'leafList',
                  children: [
                    {
                      type: 'leaf',
                      size: 4,
                      id: '1:3:1:6:4:1',
                      startTime: '16:15'
                    }
                  ]
                }
              ],
              knowledgeDomains: [
                {
                  name: 'Project Lab',
                  id: 1,
                  shortCode: 'PL'
                }
              ]
            },
            {
              id: '1:3:1:7',
              type: 'knowledgeDomainGroup',
              children: [
                {
                  id: '1:3:1:7:6',
                  type: 'leafList',
                  children: [
                    {
                      type: 'leaf',
                      size: 6,
                      id: '1:3:1:7:6:1',
                      startTime: '3.09:00'
                    }
                  ]
                }
              ],
              knowledgeDomains: [
                {
                  name: 'World Music',
                  id: 1,
                  shortCode: 'WM'
                }
              ]
            },
            {
              id: '1:3:1:8',
              type: 'knowledgeDomainGroup',
              children: [
                {
                  id: '1:3:1:8:6',
                  type: 'leafList',
                  children: [
                    {
                      type: 'leaf',
                      size: 6,
                      id: '1:3:1:8:6:1',
                      startTime: '3.10:30'
                    }
                  ]
                }
              ],
              knowledgeDomains: [
                {
                  name: 'Production: Recording',
                  id: 1,
                  shortCode: 'Pr'
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  id: '1'
};

export const sharedLessons: KnowledgeLevelSeriesGroup = {
  type: 'knowledgeLevelSeriesGroup',
  knowledgeLevelSeries: {
    name: 'Shared',
    knowledgeLevelDescriptor: 'N/A',
    knowledgeLevelIds: [3],
    id: 2
  },
  children: [],
  id: '2'
};
