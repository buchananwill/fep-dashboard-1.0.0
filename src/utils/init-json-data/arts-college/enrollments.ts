import { KnowledgeLevelSeriesGroup } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';

export const OneToOneEnrollments: KnowledgeLevelSeriesGroup = {
  path: '2',
  children: [
    {
      type: 'knowledgeLevelGroup',
      workTaskTypeName: {
        name: 'Teaching',
        id: 1
      },
      knowledgeLevel: {
        id: 4,
        name: 'Level 3 Year 1',
        levelOrdinal: 1,
        knowledgeLevelSeriesId: 2
      },
      children: [
        {
          name: 'Student 1',
          type: 'bundle',
          path: '2/0/0',
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
                  path: '2/0/0/0/3',
                  type: 'leafList',
                  children: [
                    {
                      path: '2/0/0/0/3/0',
                      type: 'leaf',
                      size: 3,
                      selected: false
                    },
                    {
                      path: '2/0/0/0/3/1',
                      type: 'leaf',
                      size: 3,
                      selected: false
                    }
                  ],
                  selected: false
                }
              ],
              path: '2/0/0/0',
              color: 'rgb(110, 64, 170)'
            }
          ]
        },
        {
          name: 'Student 2',
          type: 'bundle',
          path: '2/0/1',
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
                  path: '2/0/1/0/3',
                  type: 'leafList',
                  children: [
                    {
                      path: '2/0/1/0/3/0',
                      type: 'leaf',
                      size: 3,
                      selected: false
                    },
                    {
                      path: '2/0/1/0/3/1',
                      type: 'leaf',
                      size: 3,
                      selected: false
                    }
                  ],
                  selected: false
                }
              ],
              path: '2/0/1/0',
              color: 'rgb(110, 64, 170)'
            }
          ]
        },
        {
          name: 'Student 3',
          type: 'bundle',
          path: '2/0/2',
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
                  path: '2/0/2/0/3',
                  type: 'leafList',
                  children: [
                    {
                      path: '2/0/2/0/3/0',
                      type: 'leaf',
                      size: 3,
                      selected: false
                    },
                    {
                      path: '2/0/2/0/3/1',
                      type: 'leaf',
                      size: 3,
                      selected: false
                    }
                  ],
                  selected: false
                }
              ],
              path: '2/0/2/0',
              color: 'rgb(110, 64, 170)'
            }
          ]
        },
        {
          name: 'Student 4',
          type: 'bundle',
          path: '2/0/3',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                {
                  name: 'Piano',
                  id: 4,
                  shortCode: 'Pn'
                }
              ],
              children: [
                {
                  path: '2/0/3/0/3',
                  type: 'leafList',
                  children: [
                    {
                      path: '2/0/3/0/3/0',
                      type: 'leaf',
                      size: 3,
                      selected: false
                    },
                    {
                      path: '2/0/3/0/3/1',
                      type: 'leaf',
                      size: 3,
                      selected: false
                    }
                  ],
                  selected: false
                }
              ],
              path: '2/0/3/0',
              color: 'rgb(191, 60, 175)'
            }
          ]
        },
        {
          name: 'Student 5',
          type: 'bundle',
          path: '2/0/4',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                {
                  name: 'Classical Voice',
                  id: 53,
                  shortCode: 'CVo'
                }
              ],
              children: [
                {
                  path: '2/0/4/0/3',
                  type: 'leafList',
                  children: [
                    {
                      path: '2/0/4/0/3/0',
                      type: 'leaf',
                      size: 3,
                      selected: false
                    },
                    {
                      path: '2/0/4/0/3/1',
                      type: 'leaf',
                      size: 3,
                      selected: false
                    }
                  ],
                  selected: false
                }
              ],
              path: '2/0/4/0',
              color: 'rgb(254, 75, 131)'
            }
          ]
        }
      ],
      path: '2/0',
      cycle: {
        id: 1,
        cycleDayZero: 'MONDAY',
        cycleLengthInDays: 7,
        cycleLengthInWeeks: 1,
        maxGroupSize: 4,
        cycleSubspanGroupSizes: [2, 4, 6, 8]
      }
    },
    {
      type: 'knowledgeLevelGroup',
      workTaskTypeName: {
        name: 'Teaching',
        id: 1
      },
      knowledgeLevel: {
        id: 5,
        name: 'Level 3 Year 2',
        levelOrdinal: 2,
        knowledgeLevelSeriesId: 2
      },
      children: [
        {
          name: 'Student 6',
          type: 'bundle',
          path: '2/1/0',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                {
                  name: 'Pop Guitar',
                  id: 54,
                  shortCode: 'PGt'
                }
              ],
              children: [
                {
                  path: '2/1/0/0/3',
                  type: 'leafList',
                  children: [
                    {
                      path: '2/1/0/0/3/0',
                      type: 'leaf',
                      size: 3,
                      selected: false
                    },
                    {
                      path: '2/1/0/0/3/1',
                      type: 'leaf',
                      size: 3,
                      selected: false
                    }
                  ],
                  selected: false
                }
              ],
              path: '2/1/0/0',
              color: 'rgb(255, 120, 71)'
            }
          ]
        },
        {
          name: 'Student 7',
          type: 'bundle',
          path: '2/1/1',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                {
                  name: 'Drum Kit',
                  id: 54,
                  shortCode: 'DK'
                }
              ],
              children: [
                {
                  path: '2/1/1/0/3',
                  type: 'leafList',
                  children: [
                    {
                      path: '2/1/1/0/3/0',
                      type: 'leaf',
                      size: 3,
                      selected: false
                    }
                  ],
                  selected: false
                }
              ],
              path: '2/1/1/0',
              color: 'rgb(226, 183, 47)'
            },
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                {
                  name: 'Production',
                  id: 54,
                  shortCode: 'Pro'
                }
              ],
              children: [
                {
                  path: '2/1/1/1/3',
                  type: 'leafList',
                  children: [
                    {
                      path: '2/1/1/1/3/0',
                      type: 'leaf',
                      size: 3,
                      selected: false
                    }
                  ],
                  selected: false
                }
              ],
              path: '2/1/1/1',
              color: 'rgb(175, 240, 91)'
            }
          ]
        },
        {
          name: 'Student 8',
          type: 'bundle',
          path: '2/1/2',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                {
                  name: 'French Horn',
                  id: 54,
                  shortCode: 'FH'
                }
              ],
              children: [
                {
                  path: '2/1/2/0/3',
                  type: 'leafList',
                  children: [
                    {
                      path: '2/1/2/0/3/0',
                      type: 'leaf',
                      size: 3,
                      selected: false
                    },
                    {
                      path: '2/1/2/0/3/1',
                      type: 'leaf',
                      size: 3,
                      selected: false
                    }
                  ],
                  selected: false
                }
              ],
              path: '2/1/2/0',
              color: 'rgb(82, 246, 103)'
            }
          ]
        },
        {
          name: 'Student 9',
          type: 'bundle',
          path: '2/1/3',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                {
                  name: 'Production',
                  id: 54,
                  shortCode: 'Pro'
                }
              ],
              children: [
                {
                  path: '2/1/3/0/3',
                  type: 'leafList',
                  children: [
                    {
                      path: '2/1/3/0/3/0',
                      type: 'leaf',
                      size: 3,
                      selected: false
                    },
                    {
                      path: '2/1/3/0/3/1',
                      type: 'leaf',
                      size: 3,
                      selected: false
                    }
                  ],
                  selected: false
                }
              ],
              path: '2/1/3/0',
              color: 'rgb(175, 240, 91)'
            }
          ]
        },
        {
          name: 'Student 10',
          type: 'bundle',
          path: '2/1/4',
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
                  path: '2/1/4/0/3',
                  type: 'leafList',
                  children: [
                    {
                      path: '2/1/4/0/3/0',
                      type: 'leaf',
                      size: 3,
                      selected: false
                    },
                    {
                      path: '2/1/4/0/3/1',
                      type: 'leaf',
                      size: 3,
                      selected: false
                    }
                  ],
                  selected: false
                }
              ],
              path: '2/1/4/0',
              color: 'rgb(110, 64, 170)'
            }
          ]
        },
        {
          name: 'Student 11',
          type: 'bundle',
          path: '2/1/5',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                {
                  name: 'Double Bass',
                  id: 54,
                  shortCode: 'Dbl'
                }
              ],
              children: [
                {
                  path: '2/1/5/0/3',
                  type: 'leafList',
                  children: [
                    {
                      path: '2/1/5/0/3/0',
                      type: 'leaf',
                      size: 3,
                      selected: false
                    },
                    {
                      path: '2/1/5/0/3/1',
                      type: 'leaf',
                      size: 3,
                      selected: false
                    }
                  ],
                  selected: false
                }
              ],
              path: '2/1/5/0',
              color: 'rgb(29, 223, 163)'
            }
          ]
        }
      ],
      path: '2/1',
      cycle: {
        id: 1,
        cycleDayZero: 'MONDAY',
        cycleLengthInDays: 7,
        cycleLengthInWeeks: 1,
        maxGroupSize: 4,
        cycleSubspanGroupSizes: [2, 4, 6, 8]
      }
    },
    {
      type: 'knowledgeLevelGroup',
      workTaskTypeName: {
        name: 'Teaching',
        id: 1
      },
      knowledgeLevel: {
        id: 6,
        name: 'Level 4',
        levelOrdinal: 3,
        knowledgeLevelSeriesId: 2
      },
      children: [
        {
          name: 'Student 12',
          type: 'bundle',
          path: '2/2/0',
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
                  path: '2/2/0/0/3',
                  type: 'leafList',
                  children: [
                    {
                      path: '2/2/0/0/3/0',
                      type: 'leaf',
                      size: 3,
                      selected: false
                    },
                    {
                      path: '2/2/0/0/3/1',
                      type: 'leaf',
                      size: 3,
                      selected: false
                    }
                  ],
                  selected: false
                }
              ],
              path: '2/2/0/0',
              color: 'rgb(110, 64, 170)'
            }
          ]
        },
        {
          name: 'Student 13',
          type: 'bundle',
          path: '2/2/1',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                {
                  name: 'Guitar',
                  id: 54,
                  shortCode: 'Gtr'
                }
              ],
              children: [
                {
                  path: '2/2/1/0/3',
                  type: 'leafList',
                  children: [
                    {
                      path: '2/2/1/0/3/0',
                      type: 'leaf',
                      size: 3,
                      selected: false
                    }
                  ],
                  selected: false
                }
              ],
              path: '2/2/1/0',
              color: 'rgb(35, 171, 216)'
            },
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                {
                  name: 'Production',
                  id: 54,
                  shortCode: 'Pro'
                }
              ],
              children: [
                {
                  path: '2/2/1/1/3',
                  type: 'leafList',
                  children: [
                    {
                      path: '2/2/1/1/3/0',
                      type: 'leaf',
                      size: 3,
                      selected: false
                    }
                  ],
                  selected: false
                }
              ],
              path: '2/2/1/1',
              color: 'rgb(175, 240, 91)'
            }
          ]
        },
        {
          name: 'Student 14',
          type: 'bundle',
          path: '2/2/2',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                {
                  name: 'Production',
                  id: 54,
                  shortCode: 'Pro'
                }
              ],
              children: [
                {
                  path: '2/2/2/0/3',
                  type: 'leafList',
                  children: [
                    {
                      path: '2/2/2/0/3/0',
                      type: 'leaf',
                      size: 3,
                      selected: false
                    },
                    {
                      path: '2/2/2/0/3/1',
                      type: 'leaf',
                      size: 3,
                      selected: false
                    }
                  ],
                  selected: false
                }
              ],
              path: '2/2/2/0',
              color: 'rgb(175, 240, 91)'
            }
          ]
        },
        {
          name: 'Student 15',
          type: 'bundle',
          path: '2/2/3',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                {
                  name: 'Classical Voice',
                  id: 54,
                  shortCode: 'CVo'
                }
              ],
              children: [
                {
                  path: '2/2/3/0/3',
                  type: 'leafList',
                  children: [
                    {
                      path: '2/2/3/0/3/0',
                      type: 'leaf',
                      size: 3,
                      selected: false
                    },
                    {
                      path: '2/2/3/0/3/1',
                      type: 'leaf',
                      size: 3,
                      selected: false
                    }
                  ],
                  selected: false
                }
              ],
              path: '2/2/3/0',
              color: 'rgb(254, 75, 131)'
            }
          ]
        },
        {
          name: 'Student 16',
          type: 'bundle',
          path: '2/2/4',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                {
                  name: 'Classical/Pop Voice',
                  id: 54,
                  shortCode: 'CPV'
                }
              ],
              children: [
                {
                  path: '2/2/4/0/3',
                  type: 'leafList',
                  children: [
                    {
                      path: '2/2/4/0/3/0',
                      type: 'leaf',
                      size: 3,
                      selected: false
                    },
                    {
                      path: '2/2/4/0/3/1',
                      type: 'leaf',
                      size: 3,
                      selected: false
                    }
                  ],
                  selected: false
                }
              ],
              path: '2/2/4/0',
              color: 'rgb(76, 110, 219)'
            }
          ]
        }
      ],
      path: '2/2',
      cycle: {
        id: 1,
        cycleDayZero: 'MONDAY',
        cycleLengthInDays: 7,
        cycleLengthInWeeks: 1,
        maxGroupSize: 4,
        cycleSubspanGroupSizes: [2, 3, 4, 6, 8]
      }
    }
  ],
  type: 'knowledgeLevelSeriesGroup',
  knowledgeLevelSeries: {
    id: 2,
    name: 'Courses',
    knowledgeLevelDescriptor: 'Course',
    knowledgeLevels: [
      {
        id: 4,
        name: 'Level 3 Year 1',
        levelOrdinal: 1,
        knowledgeLevelSeriesId: 2
      },
      {
        id: 5,
        name: 'Level 3 Year 2',
        levelOrdinal: 2,
        knowledgeLevelSeriesId: 2
      },
      {
        id: 6,
        name: 'Level 4',
        levelOrdinal: 3,
        knowledgeLevelSeriesId: 2
      }
    ]
  }
};
