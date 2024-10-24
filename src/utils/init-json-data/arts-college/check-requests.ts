import { KnowledgeLevelSeriesGroup } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';

const cycleRequest: CycleInitDto = {
  startDay: 'MONDAY',
  durationInWeeks: 1,
  omitDays: [5, 6],
  startOfDay: {
    defaultTime: '09:00:00'
  },
  endOfDay: {
    defaultTime: '20:00:00'
  },
  cycleSubspanDuration: 15,
  breaks: {},
  groupSizes: [2, 3, 4, 6, 8]
};

const courses: KnowledgeLevelSeriesGroup = {
  knowledgeLevelSeries: {
    name: 'Streams',
    id: 1,
    knowledgeLevels: [
      {
        name: '1',
        id: 1,
        levelOrdinal: 1,
        knowledgeLevelSeriesId: 1
      },
      {
        name: '2',
        id: 2,
        levelOrdinal: 2,
        knowledgeLevelSeriesId: 1
      },
      {
        name: 'Shared',
        id: 3,
        levelOrdinal: 0,
        knowledgeLevelSeriesId: 1
      }
    ]
  },
  organizationTypeName: 'Work Group',
  children: [
    {
      knowledgeLevel: {
        name: 'Shared',
        id: 3,
        levelOrdinal: 0,
        knowledgeLevelSeriesId: 1
      },
      children: [
        {
          children: [
            {
              knowledgeDomains: [
                {
                  id: 15,
                  name: 'World Music',
                  shortCode: 'WM',
                  color: {
                    id: 15,
                    r: 236,
                    g: 70,
                    b: 153,
                    a: 1.0,
                    name: 'fuchsia'
                  }
                }
              ],
              children: [
                {
                  children: [
                    {
                      size: 6,
                      path: '1/0/0/0/6/0',
                      type: 'leaf'
                    }
                  ],
                  path: '1/0/0/0/6',
                  type: 'leafList'
                }
              ],
              path: '1/0/0/0',
              type: 'knowledgeDomainGroup'
            },
            {
              knowledgeDomains: [
                {
                  id: 16,
                  name: 'Production: Recording',
                  shortCode: 'Pr',
                  color: {
                    id: 16,
                    r: 244,
                    g: 62,
                    b: 92,
                    a: 1.0,
                    name: 'rose'
                  }
                }
              ],
              children: [
                {
                  children: [
                    {
                      size: 6,
                      path: '1/0/0/1/6/0',
                      type: 'leaf'
                    }
                  ],
                  path: '1/0/0/1/6',
                  type: 'leafList'
                }
              ],
              path: '1/0/0/1',
              type: 'knowledgeDomainGroup'
            },
            {
              knowledgeDomains: [
                {
                  id: 17,
                  name: 'Performance Class/Reflective Writing',
                  shortCode: 'PW',
                  color: {
                    id: 1,
                    r: 239,
                    g: 67,
                    b: 67,
                    a: 1.0,
                    name: 'red'
                  }
                }
              ],
              children: [
                {
                  children: [
                    {
                      size: 4,
                      path: '1/0/0/2/4/0',
                      type: 'leaf'
                    }
                  ],
                  path: '1/0/0/2/4',
                  type: 'leafList'
                }
              ],
              path: '1/0/0/2',
              type: 'knowledgeDomainGroup'
            },
            {
              knowledgeDomains: [
                {
                  id: 18,
                  name: 'Hand Drumming',
                  shortCode: 'HD',
                  color: {
                    id: 2,
                    r: 249,
                    g: 116,
                    b: 21,
                    a: 1.0,
                    name: 'orange'
                  }
                }
              ],
              children: [
                {
                  children: [
                    {
                      size: 4,
                      path: '1/0/0/3/4/0',
                      type: 'leaf'
                    }
                  ],
                  path: '1/0/0/3/4',
                  type: 'leafList'
                }
              ],
              path: '1/0/0/3',
              type: 'knowledgeDomainGroup'
            },
            {
              knowledgeDomains: [
                {
                  id: 10,
                  name: 'Reflection/PT',
                  shortCode: 'RP',
                  color: {
                    id: 10,
                    r: 13,
                    g: 162,
                    b: 231,
                    a: 1.0,
                    name: 'sky'
                  }
                }
              ],
              children: [
                {
                  children: [
                    {
                      size: 2,
                      path: '1/0/0/4/2/0',
                      type: 'leaf'
                    }
                  ],
                  path: '1/0/0/4/2',
                  type: 'leafList'
                }
              ],
              path: '1/0/0/4',
              type: 'knowledgeDomainGroup'
            },
            {
              knowledgeDomains: [
                {
                  id: 11,
                  name: 'Ensemble Rehearsals',
                  shortCode: 'ER',
                  color: {
                    id: 11,
                    r: 65,
                    g: 133,
                    b: 241,
                    a: 1.0,
                    name: 'blue'
                  }
                }
              ],
              children: [
                {
                  children: [
                    {
                      size: 6,
                      path: '1/0/0/5/6/0',
                      type: 'leaf'
                    },
                    {
                      size: 6,
                      path: '1/0/0/5/6/1',
                      type: 'leaf'
                    }
                  ],
                  path: '1/0/0/5/6',
                  type: 'leafList'
                }
              ],
              path: '1/0/0/5',
              type: 'knowledgeDomainGroup'
            },
            {
              knowledgeDomains: [
                {
                  id: 12,
                  name: 'No Name',
                  shortCode: 'NN',
                  color: {
                    id: 12,
                    r: 100,
                    g: 103,
                    b: 242,
                    a: 1.0,
                    name: 'indigo'
                  }
                }
              ],
              children: [
                {
                  children: [
                    {
                      size: 2,
                      path: '1/0/0/6/2/0',
                      type: 'leaf'
                    }
                  ],
                  path: '1/0/0/6/2',
                  type: 'leafList'
                }
              ],
              path: '1/0/0/6',
              type: 'knowledgeDomainGroup'
            },
            {
              knowledgeDomains: [
                {
                  id: 13,
                  name: 'Purple English',
                  shortCode: 'En',
                  color: {
                    id: 13,
                    r: 137,
                    g: 90,
                    b: 246,
                    a: 1.0,
                    name: 'violet'
                  }
                }
              ],
              children: [
                {
                  children: [
                    {
                      size: 4,
                      path: '1/0/0/7/4/0',
                      type: 'leaf'
                    }
                  ],
                  path: '1/0/0/7/4',
                  type: 'leafList'
                },
                {
                  children: [
                    {
                      size: 8,
                      path: '1/0/0/7/8/0',
                      type: 'leaf'
                    },
                    {
                      size: 8,
                      path: '1/0/0/7/8/1',
                      type: 'leaf'
                    }
                  ],
                  path: '1/0/0/7/8',
                  type: 'leafList'
                }
              ],
              path: '1/0/0/7',
              type: 'knowledgeDomainGroup'
            },
            {
              knowledgeDomains: [
                {
                  id: 14,
                  name: 'Project Lab',
                  shortCode: 'PL',
                  color: {
                    id: 14,
                    r: 168,
                    g: 85,
                    b: 247,
                    a: 1.0,
                    name: 'purple'
                  }
                }
              ],
              children: [
                {
                  children: [
                    {
                      size: 6,
                      path: '1/0/0/8/6/0',
                      type: 'leaf'
                    }
                  ],
                  path: '1/0/0/8/6',
                  type: 'leafList'
                }
              ],
              path: '1/0/0/8',
              type: 'knowledgeDomainGroup'
            }
          ],
          name: 'All Students',
          type: 'bundle',
          path: '1/0/0'
        }
      ],
      path: '1/0',
      type: 'knowledgeLevelGroup'
    },
    {
      knowledgeLevel: {
        name: '2',
        id: 2,
        levelOrdinal: 2,
        knowledgeLevelSeriesId: 1
      },
      children: [
        {
          children: [
            {
              knowledgeDomains: [
                {
                  id: 1,
                  name: 'Music Theory',
                  shortCode: 'MT',
                  color: {
                    id: 1,
                    r: 239,
                    g: 67,
                    b: 67,
                    a: 1.0,
                    name: 'red'
                  }
                }
              ],
              children: [
                {
                  children: [
                    {
                      size: 4,
                      path: '1/1/0/0/4/0',
                      type: 'leaf'
                    },
                    {
                      size: 4,
                      path: '1/1/0/0/4/1',
                      type: 'leaf'
                    }
                  ],
                  path: '1/1/0/0/4',
                  type: 'leafList'
                }
              ],
              path: '1/1/0/0',
              type: 'knowledgeDomainGroup'
            }
          ],
          name: 'Music Theory 2',
          type: 'bundle',
          path: '1/1/0'
        },
        {
          children: [
            {
              knowledgeDomains: [
                {
                  id: 2,
                  name: 'Transcription',
                  shortCode: 'Tr',
                  color: {
                    id: 2,
                    r: 249,
                    g: 116,
                    b: 21,
                    a: 1.0,
                    name: 'orange'
                  }
                }
              ],
              children: [
                {
                  children: [
                    {
                      size: 4,
                      path: '1/1/1/0/4/0',
                      type: 'leaf'
                    }
                  ],
                  path: '1/1/1/0/4',
                  type: 'leafList'
                }
              ],
              path: '1/1/1/0',
              type: 'knowledgeDomainGroup'
            }
          ],
          name: 'Transcription 2',
          type: 'bundle',
          path: '1/1/1'
        },
        {
          children: [
            {
              knowledgeDomains: [
                {
                  id: 3,
                  name: 'Aural Skills',
                  shortCode: 'AS',
                  color: {
                    id: 3,
                    r: 245,
                    g: 159,
                    b: 10,
                    a: 1.0,
                    name: 'amber'
                  }
                }
              ],
              children: [
                {
                  children: [
                    {
                      size: 4,
                      path: '1/1/2/0/4/0',
                      type: 'leaf'
                    }
                  ],
                  path: '1/1/2/0/4',
                  type: 'leafList'
                }
              ],
              path: '1/1/2/0',
              type: 'knowledgeDomainGroup'
            }
          ],
          name: 'Aural Skills 2',
          type: 'bundle',
          path: '1/1/2'
        },
        {
          children: [
            {
              knowledgeDomains: [
                {
                  id: 4,
                  name: 'Keyboard Skills',
                  shortCode: 'KS',
                  color: {
                    id: 4,
                    r: 231,
                    g: 176,
                    b: 8,
                    a: 1.0,
                    name: 'yellow'
                  }
                }
              ],
              children: [
                {
                  children: [
                    {
                      size: 4,
                      path: '1/1/3/0/4/0',
                      type: 'leaf'
                    }
                  ],
                  path: '1/1/3/0/4',
                  type: 'leafList'
                }
              ],
              path: '1/1/3/0',
              type: 'knowledgeDomainGroup'
            }
          ],
          name: 'Keyboard Skills 2',
          type: 'bundle',
          path: '1/1/3'
        },
        {
          children: [
            {
              knowledgeDomains: [
                {
                  id: 5,
                  name: 'Composition',
                  shortCode: 'Co',
                  color: {
                    id: 5,
                    r: 130,
                    g: 203,
                    b: 21,
                    a: 1.0,
                    name: 'lime'
                  }
                }
              ],
              children: [
                {
                  children: [
                    {
                      size: 4,
                      path: '1/1/4/0/4/0',
                      type: 'leaf'
                    }
                  ],
                  path: '1/1/4/0/4',
                  type: 'leafList'
                }
              ],
              path: '1/1/4/0',
              type: 'knowledgeDomainGroup'
            }
          ],
          name: 'Composition 2',
          type: 'bundle',
          path: '1/1/4'
        },
        {
          children: [
            {
              knowledgeDomains: [
                {
                  id: 8,
                  name: 'UCAS Applications',
                  shortCode: 'UA',
                  color: {
                    id: 8,
                    r: 20,
                    g: 184,
                    b: 165,
                    a: 1.0,
                    name: 'teal'
                  }
                }
              ],
              children: [
                {
                  children: [
                    {
                      size: 2,
                      path: '1/1/5/0/2/0',
                      type: 'leaf'
                    }
                  ],
                  path: '1/1/5/0/2',
                  type: 'leafList'
                }
              ],
              path: '1/1/5/0',
              type: 'knowledgeDomainGroup'
            },
            {
              knowledgeDomains: [
                {
                  id: 9,
                  name: 'Arranging',
                  shortCode: 'Ar',
                  color: {
                    id: 9,
                    r: 7,
                    g: 182,
                    b: 213,
                    a: 1.0,
                    name: 'cyan'
                  }
                }
              ],
              children: [
                {
                  children: [
                    {
                      size: 8,
                      path: '1/1/5/1/8/0',
                      type: 'leaf'
                    }
                  ],
                  path: '1/1/5/1/8',
                  type: 'leafList'
                }
              ],
              path: '1/1/5/1',
              type: 'knowledgeDomainGroup'
            }
          ],
          name: 'Level 3 Year 2',
          type: 'bundle',
          path: '1/1/5'
        }
      ],
      path: '1/1',
      type: 'knowledgeLevelGroup'
    },
    {
      knowledgeLevel: {
        name: '1',
        id: 1,
        levelOrdinal: 1,
        knowledgeLevelSeriesId: 1
      },
      children: [
        {
          children: [
            {
              knowledgeDomains: [
                {
                  id: 1,
                  name: 'Music Theory',
                  shortCode: 'MT',
                  color: {
                    id: 1,
                    r: 239,
                    g: 67,
                    b: 67,
                    a: 1.0,
                    name: 'red'
                  }
                }
              ],
              children: [
                {
                  children: [
                    {
                      size: 4,
                      path: '1/2/0/0/4/0',
                      type: 'leaf'
                    }
                  ],
                  path: '1/2/0/0/4',
                  type: 'leafList'
                }
              ],
              path: '1/2/0/0',
              type: 'knowledgeDomainGroup'
            }
          ],
          name: 'Music Theory 1',
          type: 'bundle',
          path: '1/2/0'
        },
        {
          children: [
            {
              knowledgeDomains: [
                {
                  id: 2,
                  name: 'Transcription',
                  shortCode: 'Tr',
                  color: {
                    id: 2,
                    r: 249,
                    g: 116,
                    b: 21,
                    a: 1.0,
                    name: 'orange'
                  }
                }
              ],
              children: [
                {
                  children: [
                    {
                      size: 4,
                      path: '1/2/1/0/4/0',
                      type: 'leaf'
                    }
                  ],
                  path: '1/2/1/0/4',
                  type: 'leafList'
                }
              ],
              path: '1/2/1/0',
              type: 'knowledgeDomainGroup'
            }
          ],
          name: 'Transcription 1',
          type: 'bundle',
          path: '1/2/1'
        },
        {
          children: [
            {
              knowledgeDomains: [
                {
                  id: 3,
                  name: 'Aural Skills',
                  shortCode: 'AS',
                  color: {
                    id: 3,
                    r: 245,
                    g: 159,
                    b: 10,
                    a: 1.0,
                    name: 'amber'
                  }
                }
              ],
              children: [
                {
                  children: [
                    {
                      size: 4,
                      path: '1/2/2/0/4/0',
                      type: 'leaf'
                    }
                  ],
                  path: '1/2/2/0/4',
                  type: 'leafList'
                }
              ],
              path: '1/2/2/0',
              type: 'knowledgeDomainGroup'
            }
          ],
          name: 'Aural Skills 1',
          type: 'bundle',
          path: '1/2/2'
        },
        {
          children: [
            {
              knowledgeDomains: [
                {
                  id: 4,
                  name: 'Keyboard Skills',
                  shortCode: 'KS',
                  color: {
                    id: 4,
                    r: 231,
                    g: 176,
                    b: 8,
                    a: 1.0,
                    name: 'yellow'
                  }
                }
              ],
              children: [
                {
                  children: [
                    {
                      size: 4,
                      path: '1/2/3/0/4/0',
                      type: 'leaf'
                    }
                  ],
                  path: '1/2/3/0/4',
                  type: 'leafList'
                }
              ],
              path: '1/2/3/0',
              type: 'knowledgeDomainGroup'
            }
          ],
          name: 'Keyboard Skills 1',
          type: 'bundle',
          path: '1/2/3'
        },
        {
          children: [
            {
              knowledgeDomains: [
                {
                  id: 5,
                  name: 'Composition',
                  shortCode: 'Co',
                  color: {
                    id: 5,
                    r: 130,
                    g: 203,
                    b: 21,
                    a: 1.0,
                    name: 'lime'
                  }
                }
              ],
              children: [
                {
                  children: [
                    {
                      size: 4,
                      path: '1/2/4/0/4/0',
                      type: 'leaf'
                    }
                  ],
                  path: '1/2/4/0/4',
                  type: 'leafList'
                }
              ],
              path: '1/2/4/0',
              type: 'knowledgeDomainGroup'
            }
          ],
          name: 'Composition 1',
          type: 'bundle',
          path: '1/2/4'
        },
        {
          children: [
            {
              knowledgeDomains: [
                {
                  id: 6,
                  name: 'Pop Styles',
                  shortCode: 'PS',
                  color: {
                    id: 6,
                    r: 33,
                    g: 196,
                    b: 93,
                    a: 1.0,
                    name: 'green'
                  }
                }
              ],
              children: [
                {
                  children: [
                    {
                      size: 4,
                      path: '1/2/5/0/4/0',
                      type: 'leaf'
                    }
                  ],
                  path: '1/2/5/0/4',
                  type: 'leafList'
                }
              ],
              path: '1/2/5/0',
              type: 'knowledgeDomainGroup'
            },
            {
              knowledgeDomains: [
                {
                  id: 7,
                  name: 'Production: Sequencing',
                  shortCode: 'Ps',
                  color: {
                    id: 7,
                    r: 16,
                    g: 183,
                    b: 127,
                    a: 1.0,
                    name: 'emerald'
                  }
                }
              ],
              children: [
                {
                  children: [
                    {
                      size: 4,
                      path: '1/2/5/1/4/0',
                      type: 'leaf'
                    }
                  ],
                  path: '1/2/5/1/4',
                  type: 'leafList'
                }
              ],
              path: '1/2/5/1',
              type: 'knowledgeDomainGroup'
            }
          ],
          name: 'Level 3 Year 1',
          type: 'bundle',
          path: '1/2/5'
        }
      ],
      path: '1/2',
      type: 'knowledgeLevelGroup'
    }
  ],
  workTaskTypeName: {
    id: 1,
    name: 'Teaching'
  },
  path: '1',
  type: 'knowledgeLevelSeriesGroup'
};
