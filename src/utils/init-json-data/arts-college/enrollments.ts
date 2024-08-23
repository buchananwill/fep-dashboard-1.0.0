import { KnowledgeLevelSeriesGroup } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';

export const OneToOneEnrollments: KnowledgeLevelSeriesGroup = {
  id: '2',
  children: [
    {
      type: 'knowledgeLevelGroup',
      workTaskTypeName: { name: 'Teaching', id: 1 },
      knowledgeLevel: {
        id: 1,
        name: 'Level 3 Year 1',
        levelOrdinal: 1,
        knowledgeLevelSeriesId: 2
      },
      children: [
        {
          name: 'Xuan',
          type: 'bundle',
          id: '2:0:0',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                { name: 'Jazz/Pop Voice', id: 54, shortCode: 'JPV' }
              ],
              children: [],
              id: '2:0:0:0'
            }
          ]
        },
        {
          name: 'Yan',
          type: 'bundle',
          id: '2:0:1',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                { name: 'Jazz/Pop Voice', id: 54, shortCode: 'JPV' }
              ],
              children: [],
              id: '2:0:1:0'
            }
          ]
        },
        {
          name: 'Wu 1',
          type: 'bundle',
          id: '2:0:2',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                { name: 'Jazz/Pop Voice', id: 54, shortCode: 'JPV' }
              ],
              children: [],
              id: '2:0:2:0'
            }
          ]
        },
        {
          name: 'Huang',
          type: 'bundle',
          id: '2:0:3',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [{ name: 'Piano', id: 4, shortCode: 'Pn' }],
              children: [],
              id: '2:0:3:0'
            }
          ]
        },
        {
          name: 'Wu 2',
          type: 'bundle',
          id: '2:0:4',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                { name: 'Classical Voice', id: 53, shortCode: 'CVo' }
              ],
              children: [],
              id: '2:0:4:0'
            }
          ]
        }
      ],
      id: '2:0',
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
      workTaskTypeName: { name: 'Teaching', id: 1 },
      knowledgeLevel: {
        id: 1,
        name: 'Level 3 Year 2',
        levelOrdinal: 2,
        knowledgeLevelSeriesId: 2
      },
      children: [
        {
          name: 'Chen',
          type: 'bundle',
          id: '2:1:0',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                { name: 'Pop Guitar', id: 54, shortCode: 'PGt' }
              ],
              children: [],
              id: '2:1:0:0'
            }
          ]
        },
        {
          name: 'Wang 1',
          type: 'bundle',
          id: '2:1:1',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [{ name: 'Drum Kit', id: 54, shortCode: 'DK' }],
              children: [],
              id: '2:1:1:0'
            },
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                { name: 'Production', id: 54, shortCode: 'Pro' }
              ],
              children: [],
              id: '2:1:1:1'
            }
          ]
        },
        {
          name: 'Wang 2',
          type: 'bundle',
          id: '2:1:2',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                { name: 'French Horn', id: 54, shortCode: 'FH' }
              ],
              children: [],
              id: '2:1:2:0'
            }
          ]
        },
        {
          name: 'Yu',
          type: 'bundle',
          id: '2:1:3',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                { name: 'Production', id: 54, shortCode: 'Pro' }
              ],
              children: [],
              id: '2:1:3:0'
            }
          ]
        },
        {
          name: 'Wang 3',
          type: 'bundle',
          id: '2:1:4',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                { name: 'Jazz/Pop Voice', id: 54, shortCode: 'JPV' }
              ],
              children: [],
              id: '2:1:4:0'
            }
          ]
        },
        {
          name: 'Tatianna',
          type: 'bundle',
          id: '2:1:5',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                { name: 'Double Bass', id: 54, shortCode: 'Dbl' }
              ],
              children: [],
              id: '2:1:5:0'
            }
          ]
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
    },
    {
      type: 'knowledgeLevelGroup',
      workTaskTypeName: { name: 'Teaching', id: 1 },
      knowledgeLevel: {
        id: 1,
        name: 'Level 4',
        levelOrdinal: 3,
        knowledgeLevelSeriesId: 2
      },
      children: [
        {
          name: 'Wong',
          type: 'bundle',
          id: '2:2:0',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                { name: 'Jazz/Pop Voice', id: 54, shortCode: 'JPV' }
              ],
              children: [],
              id: '2:2:0:0'
            }
          ]
        },
        {
          name: 'Taubaldiyev',
          type: 'bundle',
          id: '2:2:1',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [{ name: 'Guitar', id: 54, shortCode: 'Gtr' }],
              children: [],
              id: '2:2:1:0'
            },
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                { name: 'Production', id: 54, shortCode: 'Pro' }
              ],
              children: [],
              id: '2:2:1:1'
            }
          ]
        },
        {
          name: 'Xiong',
          type: 'bundle',
          id: '2:2:2',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                { name: 'Production', id: 54, shortCode: 'Pro' }
              ],
              children: [],
              id: '2:2:2:0'
            }
          ]
        },
        {
          name: 'Li',
          type: 'bundle',
          id: '2:2:3',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                { name: 'Classical Voice', id: 54, shortCode: 'CVo' }
              ],
              children: [],
              id: '2:2:3:0'
            }
          ]
        },
        {
          name: 'Xie',
          type: 'bundle',
          id: '2:2:4',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                { name: 'Classical/Pop Voice', id: 54, shortCode: 'CPV' }
              ],
              children: [],
              id: '2:2:4:0'
            }
          ]
        }
      ],
      id: '2:2',
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
    name: 'Courses',
    knowledgeLevelDescriptor: 'Course',
    knowledgeLevels: [
      {
        id: 4,
        name: 'Level 3 Year 1',
        levelOrdinal: 0,
        knowledgeLevelSeriesId: 2
      },
      {
        id: 5,
        name: 'Level 3 Year 2',
        levelOrdinal: 1,
        knowledgeLevelSeriesId: 2
      },
      {
        id: 6,
        name: 'Level 4',
        levelOrdinal: 2,
        knowledgeLevelSeriesId: 2
      }
    ]
  }
};

export const OneToOneWithOneHourEach = {
  id: '2',
  children: [
    {
      type: 'knowledgeLevelGroup',
      workTaskTypeName: { name: 'Teaching', id: 1 },
      knowledgeLevel: {
        id: 1,
        name: 'Level 3 Year 1',
        levelOrdinal: 1,
        knowledgeLevelSeriesId: 2
      },
      children: [
        {
          name: 'Xuan',
          type: 'bundle',
          id: '2:0:0',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                { name: 'Jazz/Pop Voice', id: 54, shortCode: 'JPV' }
              ],
              children: [
                {
                  id: '2:0:0:0:4',
                  type: 'leafList',
                  children: [
                    {
                      id: '2:0:0:0:4:0',
                      type: 'leaf',
                      size: 4,
                      selected: false
                    }
                  ],
                  selected: false
                }
              ],
              id: '2:0:0:0'
            }
          ]
        },
        {
          name: 'Yan',
          type: 'bundle',
          id: '2:0:1',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                { name: 'Jazz/Pop Voice', id: 54, shortCode: 'JPV' }
              ],
              children: [
                {
                  id: '2:0:1:0:4',
                  type: 'leafList',
                  children: [
                    {
                      id: '2:0:1:0:4:0',
                      type: 'leaf',
                      size: 4,
                      selected: false
                    }
                  ],
                  selected: false
                }
              ],
              id: '2:0:1:0'
            }
          ]
        },
        {
          name: 'Wu 1',
          type: 'bundle',
          id: '2:0:2',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                { name: 'Jazz/Pop Voice', id: 54, shortCode: 'JPV' }
              ],
              children: [
                {
                  id: '2:0:2:0:4',
                  type: 'leafList',
                  children: [
                    {
                      id: '2:0:2:0:4:0',
                      type: 'leaf',
                      size: 4,
                      selected: false
                    }
                  ],
                  selected: false
                }
              ],
              id: '2:0:2:0'
            }
          ]
        },
        {
          name: 'Huang',
          type: 'bundle',
          id: '2:0:3',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [{ name: 'Piano', id: 4, shortCode: 'Pn' }],
              children: [
                {
                  id: '2:0:3:0:4',
                  type: 'leafList',
                  children: [
                    {
                      id: '2:0:3:0:4:0',
                      type: 'leaf',
                      size: 4,
                      selected: false
                    }
                  ],
                  selected: false
                }
              ],
              id: '2:0:3:0'
            }
          ]
        },
        {
          name: 'Wu 2',
          type: 'bundle',
          id: '2:0:4',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                { name: 'Classical Voice', id: 53, shortCode: 'CVo' }
              ],
              children: [
                {
                  id: '2:0:4:0:4',
                  type: 'leafList',
                  children: [
                    {
                      id: '2:0:4:0:4:0',
                      type: 'leaf',
                      size: 4,
                      selected: false
                    }
                  ],
                  selected: false
                }
              ],
              id: '2:0:4:0'
            }
          ]
        }
      ],
      id: '2:0',
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
      workTaskTypeName: { name: 'Teaching', id: 1 },
      knowledgeLevel: {
        id: 1,
        name: 'Level 3 Year 2',
        levelOrdinal: 2,
        knowledgeLevelSeriesId: 2
      },
      children: [
        {
          name: 'Chen',
          type: 'bundle',
          id: '2:1:0',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                { name: 'Pop Guitar', id: 54, shortCode: 'PGt' }
              ],
              children: [
                {
                  id: '2:1:0:0:4',
                  type: 'leafList',
                  children: [
                    {
                      id: '2:1:0:0:4:0',
                      type: 'leaf',
                      size: 4,
                      selected: false
                    }
                  ],
                  selected: false
                }
              ],
              id: '2:1:0:0'
            }
          ]
        },
        {
          name: 'Wang 1',
          type: 'bundle',
          id: '2:1:1',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [{ name: 'Drum Kit', id: 54, shortCode: 'DK' }],
              children: [
                {
                  id: '2:1:1:0:4',
                  type: 'leafList',
                  children: [
                    {
                      id: '2:1:1:0:4:0',
                      type: 'leaf',
                      size: 4,
                      selected: false
                    }
                  ],
                  selected: false
                }
              ],
              id: '2:1:1:0'
            },
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                { name: 'Production', id: 54, shortCode: 'Pro' }
              ],
              children: [
                {
                  id: '2:1:1:1:4',
                  type: 'leafList',
                  children: [
                    {
                      id: '2:1:1:1:4:0',
                      type: 'leaf',
                      size: 4,
                      selected: false
                    }
                  ],
                  selected: false
                }
              ],
              id: '2:1:1:1'
            }
          ]
        },
        {
          name: 'Wang 2',
          type: 'bundle',
          id: '2:1:2',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                { name: 'French Horn', id: 54, shortCode: 'FH' }
              ],
              children: [
                {
                  id: '2:1:2:0:4',
                  type: 'leafList',
                  children: [
                    {
                      id: '2:1:2:0:4:0',
                      type: 'leaf',
                      size: 4,
                      selected: false
                    }
                  ],
                  selected: false
                }
              ],
              id: '2:1:2:0'
            }
          ]
        },
        {
          name: 'Yu',
          type: 'bundle',
          id: '2:1:3',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                { name: 'Production', id: 54, shortCode: 'Pro' }
              ],
              children: [
                {
                  id: '2:1:3:0:4',
                  type: 'leafList',
                  children: [
                    {
                      id: '2:1:3:0:4:0',
                      type: 'leaf',
                      size: 4,
                      selected: false
                    }
                  ],
                  selected: false
                }
              ],
              id: '2:1:3:0'
            }
          ]
        },
        {
          name: 'Wang 3',
          type: 'bundle',
          id: '2:1:4',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                { name: 'Jazz/Pop Voice', id: 54, shortCode: 'JPV' }
              ],
              children: [
                {
                  id: '2:1:4:0:4',
                  type: 'leafList',
                  children: [
                    {
                      id: '2:1:4:0:4:0',
                      type: 'leaf',
                      size: 4,
                      selected: false
                    }
                  ],
                  selected: false
                }
              ],
              id: '2:1:4:0'
            }
          ]
        },
        {
          name: 'Tatianna',
          type: 'bundle',
          id: '2:1:5',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                { name: 'Double Bass', id: 54, shortCode: 'Dbl' }
              ],
              children: [
                {
                  id: '2:1:5:0:4',
                  type: 'leafList',
                  children: [
                    {
                      id: '2:1:5:0:4:0',
                      type: 'leaf',
                      size: 4,
                      selected: false
                    }
                  ],
                  selected: false
                }
              ],
              id: '2:1:5:0'
            }
          ]
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
    },
    {
      type: 'knowledgeLevelGroup',
      workTaskTypeName: { name: 'Teaching', id: 1 },
      knowledgeLevel: {
        id: 1,
        name: 'Level 4',
        levelOrdinal: 3,
        knowledgeLevelSeriesId: 2
      },
      children: [
        {
          name: 'Wong',
          type: 'bundle',
          id: '2:2:0',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                { name: 'Jazz/Pop Voice', id: 54, shortCode: 'JPV' }
              ],
              children: [
                {
                  id: '2:2:0:0:4',
                  type: 'leafList',
                  children: [
                    {
                      id: '2:2:0:0:4:0',
                      type: 'leaf',
                      size: 4,
                      selected: false
                    }
                  ],
                  selected: false
                }
              ],
              id: '2:2:0:0'
            }
          ]
        },
        {
          name: 'Taubaldiyev',
          type: 'bundle',
          id: '2:2:1',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [{ name: 'Guitar', id: 54, shortCode: 'Gtr' }],
              children: [
                {
                  id: '2:2:1:0:4',
                  type: 'leafList',
                  children: [
                    {
                      id: '2:2:1:0:4:0',
                      type: 'leaf',
                      size: 4,
                      selected: false
                    }
                  ],
                  selected: false
                }
              ],
              id: '2:2:1:0'
            },
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                { name: 'Production', id: 54, shortCode: 'Pro' }
              ],
              children: [
                {
                  id: '2:2:1:1:4',
                  type: 'leafList',
                  children: [
                    {
                      id: '2:2:1:1:4:0',
                      type: 'leaf',
                      size: 4,
                      selected: false
                    }
                  ],
                  selected: false
                }
              ],
              id: '2:2:1:1'
            }
          ]
        },
        {
          name: 'Xiong',
          type: 'bundle',
          id: '2:2:2',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                { name: 'Production', id: 54, shortCode: 'Pro' }
              ],
              children: [
                {
                  id: '2:2:2:0:4',
                  type: 'leafList',
                  children: [
                    {
                      id: '2:2:2:0:4:0',
                      type: 'leaf',
                      size: 4,
                      selected: false
                    }
                  ],
                  selected: false
                }
              ],
              id: '2:2:2:0'
            }
          ]
        },
        {
          name: 'Li',
          type: 'bundle',
          id: '2:2:3',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                { name: 'Classical Voice', id: 54, shortCode: 'CVo' }
              ],
              children: [
                {
                  id: '2:2:3:0:4',
                  type: 'leafList',
                  children: [
                    {
                      id: '2:2:3:0:4:0',
                      type: 'leaf',
                      size: 4,
                      selected: false
                    }
                  ],
                  selected: false
                }
              ],
              id: '2:2:3:0'
            }
          ]
        },
        {
          name: 'Xie',
          type: 'bundle',
          id: '2:2:4',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                { name: 'Classical/Pop Voice', id: 54, shortCode: 'CPV' }
              ],
              children: [
                {
                  id: '2:2:4:0:4',
                  type: 'leafList',
                  children: [
                    {
                      id: '2:2:4:0:4:0',
                      type: 'leaf',
                      size: 4,
                      selected: false
                    }
                  ],
                  selected: false
                }
              ],
              id: '2:2:4:0'
            }
          ]
        }
      ],
      id: '2:2',
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
    name: 'Courses',
    knowledgeLevelDescriptor: 'Course',
    knowledgeLevels: [
      {
        id: 4,
        name: 'Level 3 Year 1',
        levelOrdinal: 0,
        knowledgeLevelSeriesId: 2
      },
      {
        id: 5,
        name: 'Level 3 Year 2',
        levelOrdinal: 1,
        knowledgeLevelSeriesId: 2
      },
      {
        id: 6,
        name: 'Level 4',
        levelOrdinal: 2,
        knowledgeLevelSeriesId: 2
      }
    ]
  }
};
