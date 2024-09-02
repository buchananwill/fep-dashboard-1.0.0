const resourceRequirements = [
  {
    resourceRequirementItemRequests: [
      {
        providerRoleTypeName: 'Teacher',
        assetRoleTypeName: 'Studio',
        requiredNumber: 1
      }
    ],
    workTaskTypeMatrix: {
      knowledgeLevelSeriesDtoList: [
        {
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
        {
          name: 'Courses',
          id: 2,
          knowledgeLevels: [
            {
              name: 'Level 3 Year 1',
              id: 4,
              levelOrdinal: 1,
              knowledgeLevelSeriesId: 2
            },
            {
              name: 'Level 3 Year 2',
              id: 5,
              levelOrdinal: 2,
              knowledgeLevelSeriesId: 2
            },
            {
              name: 'Level 4',
              id: 6,
              levelOrdinal: 3,
              knowledgeLevelSeriesId: 2
            }
          ]
        }
      ],
      knowledgeDomainDtoInclusionList: [
        {
          id: 1,
          name: 'Music Theory',
          shortCode: 'MT'
        },
        {
          id: 2,
          name: 'Transcription',
          shortCode: 'Tr'
        },
        {
          id: 3,
          name: 'Aural Skills',
          shortCode: 'AS'
        },
        {
          id: 4,
          name: 'Keyboard Skills',
          shortCode: 'KS'
        },
        {
          id: 5,
          name: 'Composition',
          shortCode: 'Co'
        },
        {
          id: 6,
          name: 'Pop Styles',
          shortCode: 'PS'
        },
        {
          id: 7,
          name: 'Production: Sequencing',
          shortCode: 'Ps'
        },
        {
          id: 8,
          name: 'UCAS Applications',
          shortCode: 'UA'
        },
        {
          id: 9,
          name: 'Arranging',
          shortCode: 'Ar'
        },
        {
          id: 10,
          name: 'Reflection/PT',
          shortCode: 'RP'
        },
        {
          id: 11,
          name: 'Ensemble Rehearsals',
          shortCode: 'ER'
        },
        {
          id: 12,
          name: 'No Name',
          shortCode: 'NN'
        },
        {
          id: 13,
          name: 'Purple English',
          shortCode: 'En'
        },
        {
          id: 14,
          name: 'Project Lab',
          shortCode: 'PL'
        },
        {
          id: 15,
          name: 'World Music',
          shortCode: 'WM'
        },
        {
          id: 16,
          name: 'Production: Recording',
          shortCode: 'Pr'
        },
        {
          id: 17,
          name: 'Performance Class/Reflective Writing',
          shortCode: 'PW'
        },
        {
          id: 18,
          name: 'Hand Drumming',
          shortCode: 'HD'
        },
        {
          id: 19,
          name: 'Jazz/Pop Voice',
          shortCode: 'JPV'
        },
        {
          id: 20,
          name: 'Piano',
          shortCode: 'Pn'
        },
        {
          id: 21,
          name: 'Classical Voice',
          shortCode: 'CVo'
        },
        {
          id: 22,
          name: 'Pop Guitar',
          shortCode: 'PGt'
        },
        {
          id: 23,
          name: 'Drum Kit',
          shortCode: 'DK'
        },
        {
          id: 24,
          name: 'Production',
          shortCode: 'Pro'
        },
        {
          id: 25,
          name: 'French Horn',
          shortCode: 'FH'
        },
        {
          id: 26,
          name: 'Double Bass',
          shortCode: 'Dbl'
        },
        {
          id: 27,
          name: 'Guitar',
          shortCode: 'Gtr'
        },
        {
          id: 28,
          name: 'Classical Piano'
        },
        {
          id: 29,
          name: 'DJ'
        }
      ],
      knowledgeDomainDtoExclusionList: [],
      workTaskTypeNames: ['Teaching']
    }
  },
  {
    resourceRequirementItemRequests: [
      {
        providerRoleTypeName: 'Teacher',
        requiredNumber: 1
      },
      {
        assetRoleTypeName: 'Studio',
        requiredNumber: 2
      }
    ],
    workTaskTypeMatrix: {
      knowledgeLevelSeriesDtoList: [
        {
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
        {
          name: 'Courses',
          id: 2,
          knowledgeLevels: [
            {
              name: 'Level 3 Year 1',
              id: 4,
              levelOrdinal: 1,
              knowledgeLevelSeriesId: 2
            },
            {
              name: 'Level 3 Year 2',
              id: 5,
              levelOrdinal: 2,
              knowledgeLevelSeriesId: 2
            },
            {
              name: 'Level 4',
              id: 6,
              levelOrdinal: 3,
              knowledgeLevelSeriesId: 2
            }
          ]
        }
      ],
      knowledgeDomainDtoInclusionList: [
        {
          id: 23,
          name: 'Drum Kit',
          shortCode: 'DK'
        }
      ],
      knowledgeDomainDtoExclusionList: [],
      workTaskTypeNames: ['Teaching']
    }
  }
];
