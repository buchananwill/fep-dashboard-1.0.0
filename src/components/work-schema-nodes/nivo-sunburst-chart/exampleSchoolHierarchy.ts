import {
  Bundle,
  KnowledgeDomainGroup,
  KnowledgeLevelSeriesGroup
} from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';

export const ExampleSchoolHierarchy: KnowledgeLevelSeriesGroup = {
  id: 'acringtonStanleySchoolForUnderdogs',

  knowledgeLevelSeries: {
    id: -1,
    knowledgeLevelIds: [],
    knowledgeLevelDescriptor: 'Year',
    name: 'Secondary'
  },

  children: [
    {
      workTaskTypeName: {
        id: -1,
        name: 'Teaching'
      },
      cycle: {
        id: 1,
        cycleDayZero: 'MONDAY',
        cycleLengthInDays: 14,
        cycleLengthInWeeks: 2,
        maxGroupSize: 2,
        cycleSubspanGroupSizes: []
      },
      id: 'Year 7 Classes',
      knowledgeLevel: {
        id: -1,
        levelOrdinal: 7,
        knowledgeLevelSeriesId: -1,
        name: 'Year 7'
      },
      children: [
        {
          type: 'bundle',
          children: [
            {
              type: 'knowledgeDomainGroup',
              knowledgeDomains: [
                { name: 'Punching Upwards', id: -1, shortCode: 'PU' }
              ],
              children: [
                {
                  type: 'leafList',
                  children: [
                    {
                      id: '7:1:PU:1:1',
                      size: 1,
                      type: 'leaf'
                    },
                    {
                      id: '7:1:PU:1:2',
                      size: 1,
                      type: 'leaf'
                    }
                  ],
                  id: '7:1:pu:1'
                },
                {
                  type: 'leafList',
                  children: [
                    {
                      id: '7:1:PU:2:1',
                      size: 2,
                      type: 'leaf'
                    },
                    {
                      id: '7:1:PU:2:2',
                      size: 2,
                      type: 'leaf'
                    }
                  ],
                  id: '7:1:pu:2'
                }
              ],
              id: '7:1:pu'
            }
          ],
          id: '7:1'
        }
      ],
      type: 'knowledgeLevelGroup'
    }
  ],
  type: 'knowledgeLevelSeriesGroup'
};

export const ExampleKnowledgeDomainGroup: KnowledgeDomainGroup = {
  knowledgeDomains: [
    {
      id: 5,
      name: 'Biology',
      shortCode: 'Bi'
    }
  ],
  children: [
    {
      children: [
        {
          size: 1,
          id: 'Bi:0:0',
          type: 'leaf'
        },
        {
          size: 1,
          id: 'Bi:0:1',
          type: 'leaf'
        }
      ],
      id: 'Bi:0',
      type: 'leafList'
    }
  ],
  id: 'Bi',
  type: 'knowledgeDomainGroup'
};

export const ExampleCarousel: KnowledgeDomainGroup = {
  knowledgeDomains: [
    {
      id: 27,
      name: 'PE as an Option',
      shortCode: 'Pe'
    },
    {
      id: 14,
      name: 'French',
      shortCode: 'Fr'
    },
    {
      id: 16,
      name: 'Geography',
      shortCode: 'Gg'
    },
    {
      id: 31,
      name: 'RS',
      shortCode: 'Rs'
    },
    {
      id: 19,
      name: 'History',
      shortCode: 'Hi'
    },
    {
      id: 17,
      name: 'German',
      shortCode: 'Ge'
    },
    {
      id: 21,
      name: 'Learning Development',
      shortCode: 'Ld'
    },
    {
      id: 8,
      name: 'Computing',
      shortCode: 'Cm'
    },
    {
      id: 22,
      name: 'Music',
      shortCode: 'Mu'
    },
    {
      id: 4,
      name: 'Art',
      shortCode: 'Ar'
    },
    {
      id: 20,
      name: 'Latin',
      shortCode: 'La'
    }
  ],
  children: [
    {
      children: [
        {
          size: 1,
          id: 'Pe,Fr,Gg,Rs,Hi,Ge,Ld,Cm,Mu,Ar,La:0:0',
          type: 'leaf'
        },
        {
          size: 1,
          id: 'Pe,Fr,Gg,Rs,Hi,Ge,Ld,Cm,Mu,Ar,La:0:1',
          type: 'leaf'
        },
        {
          size: 1,
          id: 'Pe,Fr,Gg,Rs,Hi,Ge,Ld,Cm,Mu,Ar,La:0:2',
          type: 'leaf'
        },
        {
          size: 1,
          id: 'Pe,Fr,Gg,Rs,Hi,Ge,Ld,Cm,Mu,Ar,La:0:3',
          type: 'leaf'
        },
        {
          size: 1,
          id: 'Pe,Fr,Gg,Rs,Hi,Ge,Ld,Cm,Mu,Ar,La:0:4',
          type: 'leaf'
        }
      ],
      id: 'Pe,Fr,Gg,Rs,Hi,Ge,Ld,Cm,Mu,Ar,La:0',
      type: 'leafList'
    }
  ],
  id: 'Pe,Fr,Gg,Rs,Hi,Ge,Ld,Cm,Mu,Ar,La',
  type: 'knowledgeDomainGroup'
};

export const ExampleCarouselGroup: Bundle = {
  children: [
    {
      knowledgeDomains: [
        {
          id: 2,
          name: 'PSHE'
        },
        {
          id: 10,
          name: 'Drama',
          shortCode: 'Dr'
        },
        {
          id: 9,
          name: 'Design and T',
          shortCode: 'Dt'
        },
        {
          id: 27,
          name: 'PE as an Option',
          shortCode: 'Pe'
        },
        {
          id: 14,
          name: 'French',
          shortCode: 'Fr'
        },
        {
          id: 16,
          name: 'Geography',
          shortCode: 'Gg'
        },
        {
          id: 31,
          name: 'RS',
          shortCode: 'Rs'
        },
        {
          id: 19,
          name: 'History',
          shortCode: 'Hi'
        },
        {
          id: 17,
          name: 'German',
          shortCode: 'Ge'
        },
        {
          id: 21,
          name: 'Learning Development',
          shortCode: 'Ld'
        },
        {
          id: 8,
          name: 'Computing',
          shortCode: 'Cm'
        }
      ],
      children: [
        {
          children: [
            {
              size: 1,
              id: 'PSHE,Dr,Dt,Pe,Fr,Gg,Rs,Hi,Ge,Ld,Cm:0:0',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'PSHE,Dr,Dt,Pe,Fr,Gg,Rs,Hi,Ge,Ld,Cm:0:1',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'PSHE,Dr,Dt,Pe,Fr,Gg,Rs,Hi,Ge,Ld,Cm:0:2',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'PSHE,Dr,Dt,Pe,Fr,Gg,Rs,Hi,Ge,Ld,Cm:0:3',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'PSHE,Dr,Dt,Pe,Fr,Gg,Rs,Hi,Ge,Ld,Cm:0:4',
              type: 'leaf'
            }
          ],
          id: 'PSHE,Dr,Dt,Pe,Fr,Gg,Rs,Hi,Ge,Ld,Cm:0',
          type: 'leafList'
        }
      ],
      id: 'PSHE,Dr,Dt,Pe,Fr,Gg,Rs,Hi,Ge,Ld,Cm',
      type: 'knowledgeDomainGroup'
    },
    {
      knowledgeDomains: [
        {
          id: 10,
          name: 'Drama',
          shortCode: 'Dr'
        },
        {
          id: 9,
          name: 'Design and T',
          shortCode: 'Dt'
        },
        {
          id: 27,
          name: 'PE as an Option',
          shortCode: 'Pe'
        },
        {
          id: 14,
          name: 'French',
          shortCode: 'Fr'
        },
        {
          id: 16,
          name: 'Geography',
          shortCode: 'Gg'
        },
        {
          id: 31,
          name: 'RS',
          shortCode: 'Rs'
        },
        {
          id: 19,
          name: 'History',
          shortCode: 'Hi'
        },
        {
          id: 17,
          name: 'German',
          shortCode: 'Ge'
        },
        {
          id: 21,
          name: 'Learning Development',
          shortCode: 'Ld'
        },
        {
          id: 8,
          name: 'Computing',
          shortCode: 'Cm'
        },
        {
          id: 22,
          name: 'Music',
          shortCode: 'Mu'
        }
      ],
      children: [
        {
          children: [
            {
              size: 1,
              id: 'Dr,Dt,Pe,Fr,Gg,Rs,Hi,Ge,Ld,Cm,Mu:0:0',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Dr,Dt,Pe,Fr,Gg,Rs,Hi,Ge,Ld,Cm,Mu:0:1',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Dr,Dt,Pe,Fr,Gg,Rs,Hi,Ge,Ld,Cm,Mu:0:2',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Dr,Dt,Pe,Fr,Gg,Rs,Hi,Ge,Ld,Cm,Mu:0:3',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Dr,Dt,Pe,Fr,Gg,Rs,Hi,Ge,Ld,Cm,Mu:0:4',
              type: 'leaf'
            }
          ],
          id: 'Dr,Dt,Pe,Fr,Gg,Rs,Hi,Ge,Ld,Cm,Mu:0',
          type: 'leafList'
        }
      ],
      id: 'Dr,Dt,Pe,Fr,Gg,Rs,Hi,Ge,Ld,Cm,Mu',
      type: 'knowledgeDomainGroup'
    },
    {
      knowledgeDomains: [
        {
          id: 9,
          name: 'Design and T',
          shortCode: 'Dt'
        },
        {
          id: 27,
          name: 'PE as an Option',
          shortCode: 'Pe'
        },
        {
          id: 14,
          name: 'French',
          shortCode: 'Fr'
        },
        {
          id: 16,
          name: 'Geography',
          shortCode: 'Gg'
        },
        {
          id: 31,
          name: 'RS',
          shortCode: 'Rs'
        },
        {
          id: 19,
          name: 'History',
          shortCode: 'Hi'
        },
        {
          id: 17,
          name: 'German',
          shortCode: 'Ge'
        },
        {
          id: 21,
          name: 'Learning Development',
          shortCode: 'Ld'
        },
        {
          id: 8,
          name: 'Computing',
          shortCode: 'Cm'
        },
        {
          id: 22,
          name: 'Music',
          shortCode: 'Mu'
        },
        {
          id: 4,
          name: 'Art',
          shortCode: 'Ar'
        }
      ],
      children: [
        {
          children: [
            {
              size: 1,
              id: 'Dt,Pe,Fr,Gg,Rs,Hi,Ge,Ld,Cm,Mu,Ar:0:0',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Dt,Pe,Fr,Gg,Rs,Hi,Ge,Ld,Cm,Mu,Ar:0:1',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Dt,Pe,Fr,Gg,Rs,Hi,Ge,Ld,Cm,Mu,Ar:0:2',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Dt,Pe,Fr,Gg,Rs,Hi,Ge,Ld,Cm,Mu,Ar:0:3',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Dt,Pe,Fr,Gg,Rs,Hi,Ge,Ld,Cm,Mu,Ar:0:4',
              type: 'leaf'
            }
          ],
          id: 'Dt,Pe,Fr,Gg,Rs,Hi,Ge,Ld,Cm,Mu,Ar:0',
          type: 'leafList'
        }
      ],
      id: 'Dt,Pe,Fr,Gg,Rs,Hi,Ge,Ld,Cm,Mu,Ar',
      type: 'knowledgeDomainGroup'
    },
    {
      knowledgeDomains: [
        {
          id: 27,
          name: 'PE as an Option',
          shortCode: 'Pe'
        },
        {
          id: 14,
          name: 'French',
          shortCode: 'Fr'
        },
        {
          id: 16,
          name: 'Geography',
          shortCode: 'Gg'
        },
        {
          id: 31,
          name: 'RS',
          shortCode: 'Rs'
        },
        {
          id: 19,
          name: 'History',
          shortCode: 'Hi'
        },
        {
          id: 17,
          name: 'German',
          shortCode: 'Ge'
        },
        {
          id: 21,
          name: 'Learning Development',
          shortCode: 'Ld'
        },
        {
          id: 8,
          name: 'Computing',
          shortCode: 'Cm'
        },
        {
          id: 22,
          name: 'Music',
          shortCode: 'Mu'
        },
        {
          id: 4,
          name: 'Art',
          shortCode: 'Ar'
        },
        {
          id: 20,
          name: 'Latin',
          shortCode: 'La'
        }
      ],
      children: [
        {
          children: [
            {
              size: 1,
              id: 'Pe,Fr,Gg,Rs,Hi,Ge,Ld,Cm,Mu,Ar,La:0:0',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Pe,Fr,Gg,Rs,Hi,Ge,Ld,Cm,Mu,Ar,La:0:1',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Pe,Fr,Gg,Rs,Hi,Ge,Ld,Cm,Mu,Ar,La:0:2',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Pe,Fr,Gg,Rs,Hi,Ge,Ld,Cm,Mu,Ar,La:0:3',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Pe,Fr,Gg,Rs,Hi,Ge,Ld,Cm,Mu,Ar,La:0:4',
              type: 'leaf'
            }
          ],
          id: 'Pe,Fr,Gg,Rs,Hi,Ge,Ld,Cm,Mu,Ar,La:0',
          type: 'leafList'
        }
      ],
      id: 'Pe,Fr,Gg,Rs,Hi,Ge,Ld,Cm,Mu,Ar,La',
      type: 'knowledgeDomainGroup'
    },
    {
      knowledgeDomains: [
        {
          id: 14,
          name: 'French',
          shortCode: 'Fr'
        },
        {
          id: 16,
          name: 'Geography',
          shortCode: 'Gg'
        },
        {
          id: 31,
          name: 'RS',
          shortCode: 'Rs'
        },
        {
          id: 19,
          name: 'History',
          shortCode: 'Hi'
        },
        {
          id: 17,
          name: 'German',
          shortCode: 'Ge'
        },
        {
          id: 21,
          name: 'Learning Development',
          shortCode: 'Ld'
        },
        {
          id: 8,
          name: 'Computing',
          shortCode: 'Cm'
        },
        {
          id: 22,
          name: 'Music',
          shortCode: 'Mu'
        },
        {
          id: 4,
          name: 'Art',
          shortCode: 'Ar'
        },
        {
          id: 20,
          name: 'Latin',
          shortCode: 'La'
        },
        {
          id: 1,
          name: 'Academic'
        }
      ],
      children: [
        {
          children: [
            {
              size: 1,
              id: 'Fr,Gg,Rs,Hi,Ge,Ld,Cm,Mu,Ar,La,Academic:0:0',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Fr,Gg,Rs,Hi,Ge,Ld,Cm,Mu,Ar,La,Academic:0:1',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Fr,Gg,Rs,Hi,Ge,Ld,Cm,Mu,Ar,La,Academic:0:2',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Fr,Gg,Rs,Hi,Ge,Ld,Cm,Mu,Ar,La,Academic:0:3',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Fr,Gg,Rs,Hi,Ge,Ld,Cm,Mu,Ar,La,Academic:0:4',
              type: 'leaf'
            }
          ],
          id: 'Fr,Gg,Rs,Hi,Ge,Ld,Cm,Mu,Ar,La,Academic:0',
          type: 'leafList'
        }
      ],
      id: 'Fr,Gg,Rs,Hi,Ge,Ld,Cm,Mu,Ar,La,Academic',
      type: 'knowledgeDomainGroup'
    }
  ],
  id: 'Year 9',
  type: 'bundle'
};

export const ExampleGeneralBundle: Bundle = {
  children: [
    {
      knowledgeDomains: [
        {
          id: 22,
          name: 'Music',
          shortCode: 'Mu'
        }
      ],
      children: [
        {
          children: [
            {
              size: 1,
              id: 'Mu:0:0',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Mu:0:1',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Mu:0:2',
              type: 'leaf'
            }
          ],
          id: 'Mu:0',
          type: 'leafList'
        }
      ],
      id: 'Mu',
      type: 'knowledgeDomainGroup'
    },
    {
      knowledgeDomains: [
        {
          id: 29,
          name: 'Physics',
          shortCode: 'Ph'
        }
      ],
      children: [
        {
          children: [
            {
              size: 1,
              id: 'Ph:0:0',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Ph:0:1',
              type: 'leaf'
            }
          ],
          id: 'Ph:0',
          type: 'leafList'
        }
      ],
      id: 'Ph',
      type: 'knowledgeDomainGroup'
    },
    {
      knowledgeDomains: [
        {
          id: 5,
          name: 'Biology',
          shortCode: 'Bi'
        }
      ],
      children: [
        {
          children: [
            {
              size: 1,
              id: 'Bi:0:0',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Bi:0:1',
              type: 'leaf'
            }
          ],
          id: 'Bi:0',
          type: 'leafList'
        }
      ],
      id: 'Bi',
      type: 'knowledgeDomainGroup'
    },
    {
      knowledgeDomains: [
        {
          id: 8,
          name: 'Computing',
          shortCode: 'Cm'
        }
      ],
      children: [
        {
          children: [
            {
              size: 1,
              id: 'Cm:0:0',
              type: 'leaf'
            }
          ],
          id: 'Cm:0',
          type: 'leafList'
        }
      ],
      id: 'Cm',
      type: 'knowledgeDomainGroup'
    },
    {
      knowledgeDomains: [
        {
          id: 14,
          name: 'French',
          shortCode: 'Fr'
        }
      ],
      children: [
        {
          children: [
            {
              size: 1,
              id: 'Fr:0:0',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Fr:0:1',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Fr:0:2',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Fr:0:3',
              type: 'leaf'
            }
          ],
          id: 'Fr:0',
          type: 'leafList'
        }
      ],
      id: 'Fr',
      type: 'knowledgeDomainGroup'
    },
    {
      knowledgeDomains: [
        {
          id: 19,
          name: 'History',
          shortCode: 'Hi'
        }
      ],
      children: [
        {
          children: [
            {
              size: 1,
              id: 'Hi:0:0',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Hi:0:1',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Hi:0:2',
              type: 'leaf'
            }
          ],
          id: 'Hi:0',
          type: 'leafList'
        }
      ],
      id: 'Hi',
      type: 'knowledgeDomainGroup'
    },
    {
      knowledgeDomains: [
        {
          id: 4,
          name: 'Art',
          shortCode: 'Ar'
        }
      ],
      children: [
        {
          children: [
            {
              size: 1,
              id: 'Ar:0:0',
              type: 'leaf'
            }
          ],
          id: 'Ar:0',
          type: 'leafList'
        },
        {
          children: [
            {
              size: 2,
              id: 'Ar:1:0',
              type: 'leaf'
            }
          ],
          id: 'Ar:1',
          type: 'leafList'
        }
      ],
      id: 'Ar',
      type: 'knowledgeDomainGroup'
    },
    {
      knowledgeDomains: [
        {
          id: 6,
          name: 'Chemistry',
          shortCode: 'Ch'
        }
      ],
      children: [
        {
          children: [
            {
              size: 1,
              id: 'Ch:0:0',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Ch:0:1',
              type: 'leaf'
            }
          ],
          id: 'Ch:0',
          type: 'leafList'
        }
      ],
      id: 'Ch',
      type: 'knowledgeDomainGroup'
    },
    {
      knowledgeDomains: [
        {
          id: 16,
          name: 'Geography',
          shortCode: 'Gg'
        }
      ],
      children: [
        {
          children: [
            {
              size: 1,
              id: 'Gg:0:0',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Gg:0:1',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Gg:0:2',
              type: 'leaf'
            }
          ],
          id: 'Gg:0',
          type: 'leafList'
        }
      ],
      id: 'Gg',
      type: 'knowledgeDomainGroup'
    },
    {
      knowledgeDomains: [
        {
          id: 26,
          name: 'PE',
          shortCode: 'PE'
        }
      ],
      children: [
        {
          children: [
            {
              size: 1,
              id: 'PE:0:0',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'PE:0:1',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'PE:0:2',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'PE:0:3',
              type: 'leaf'
            }
          ],
          id: 'PE:0',
          type: 'leafList'
        }
      ],
      id: 'PE',
      type: 'knowledgeDomainGroup'
    },
    {
      knowledgeDomains: [
        {
          id: 10,
          name: 'Drama',
          shortCode: 'Dr'
        }
      ],
      children: [
        {
          children: [
            {
              size: 1,
              id: 'Dr:0:0',
              type: 'leaf'
            }
          ],
          id: 'Dr:0',
          type: 'leafList'
        }
      ],
      id: 'Dr',
      type: 'knowledgeDomainGroup'
    },
    {
      knowledgeDomains: [
        {
          id: 31,
          name: 'RS',
          shortCode: 'Rs'
        }
      ],
      children: [
        {
          children: [
            {
              size: 1,
              id: 'Rs:0:0',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Rs:0:1',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Rs:0:2',
              type: 'leaf'
            }
          ],
          id: 'Rs:0',
          type: 'leafList'
        }
      ],
      id: 'Rs',
      type: 'knowledgeDomainGroup'
    },
    {
      knowledgeDomains: [
        {
          id: 23,
          name: 'Maths',
          shortCode: 'Mm'
        }
      ],
      children: [
        {
          children: [
            {
              size: 1,
              id: 'Mm:0:0',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Mm:0:1',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Mm:0:2',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Mm:0:3',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Mm:0:4',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Mm:0:5',
              type: 'leaf'
            }
          ],
          id: 'Mm:0',
          type: 'leafList'
        }
      ],
      id: 'Mm',
      type: 'knowledgeDomainGroup'
    },
    {
      knowledgeDomains: [
        {
          id: 20,
          name: 'Latin',
          shortCode: 'La'
        }
      ],
      children: [
        {
          children: [
            {
              size: 1,
              id: 'La:0:0',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'La:0:1',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'La:0:2',
              type: 'leaf'
            }
          ],
          id: 'La:0',
          type: 'leafList'
        }
      ],
      id: 'La',
      type: 'knowledgeDomainGroup'
    },
    {
      knowledgeDomains: [
        {
          id: 21,
          name: 'Learning Development',
          shortCode: 'Ld'
        }
      ],
      children: [
        {
          children: [
            {
              size: 1,
              id: 'Ld:0:0',
              type: 'leaf'
            }
          ],
          id: 'Ld:0',
          type: 'leafList'
        }
      ],
      id: 'Ld',
      type: 'knowledgeDomainGroup'
    },
    {
      knowledgeDomains: [
        {
          id: 17,
          name: 'German',
          shortCode: 'Ge'
        }
      ],
      children: [
        {
          children: [
            {
              size: 1,
              id: 'Ge:0:0',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Ge:0:1',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Ge:0:2',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'Ge:0:3',
              type: 'leaf'
            }
          ],
          id: 'Ge:0',
          type: 'leafList'
        }
      ],
      id: 'Ge',
      type: 'knowledgeDomainGroup'
    },
    {
      knowledgeDomains: [
        {
          id: 12,
          name: 'English',
          shortCode: 'El'
        }
      ],
      children: [
        {
          children: [
            {
              size: 1,
              id: 'El:0:0',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'El:0:1',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'El:0:2',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'El:0:3',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'El:0:4',
              type: 'leaf'
            },
            {
              size: 1,
              id: 'El:0:5',
              type: 'leaf'
            }
          ],
          id: 'El:0',
          type: 'leafList'
        }
      ],
      id: 'El',
      type: 'knowledgeDomainGroup'
    }
  ],
  id: 'Year 7: Bundle 3',
  type: 'bundle'
};
