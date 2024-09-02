const events = [
  {
    start: '2024-09-04T12:15:00',
    end: '2024-09-04T13:00:00',
    id: 20,
    title: 'Teaching:Jazz/Pop Voice:2',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 31,
      knowledgeDomain: {
        id: 19,
        name: 'Jazz/Pop Voice',
        shortCode: 'JPV'
      },
      knowledgeLevel: {
        name: 'Level 3 Year 2',
        id: 5,
        levelOrdinal: 2,
        knowledgeLevelSeriesId: 2
      },
      knowledgeLevelSeriesId: 2
    }
  },
  {
    start: '2024-09-03T10:15:00',
    end: '2024-09-03T11:00:00',
    id: 21,
    title: 'Teaching:Jazz/Pop Voice:2',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 31,
      knowledgeDomain: {
        id: 19,
        name: 'Jazz/Pop Voice',
        shortCode: 'JPV'
      },
      knowledgeLevel: {
        name: 'Level 3 Year 2',
        id: 5,
        levelOrdinal: 2,
        knowledgeLevelSeriesId: 2
      },
      knowledgeLevelSeriesId: 2
    }
  },
  {
    start: '2024-09-04T17:30:00',
    end: '2024-09-04T18:15:00',
    id: 24,
    title: 'Teaching:Jazz/Pop Voice:3',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 33,
      knowledgeDomain: {
        id: 19,
        name: 'Jazz/Pop Voice',
        shortCode: 'JPV'
      },
      knowledgeLevel: {
        name: 'Level 4',
        id: 6,
        levelOrdinal: 3,
        knowledgeLevelSeriesId: 2
      },
      knowledgeLevelSeriesId: 2
    }
  },
  {
    start: '2024-09-03T15:30:00',
    end: '2024-09-03T16:15:00',
    id: 25,
    title: 'Teaching:Jazz/Pop Voice:3',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 33,
      knowledgeDomain: {
        id: 19,
        name: 'Jazz/Pop Voice',
        shortCode: 'JPV'
      },
      knowledgeLevel: {
        name: 'Level 4',
        id: 6,
        levelOrdinal: 3,
        knowledgeLevelSeriesId: 2
      },
      knowledgeLevelSeriesId: 2
    }
  },
  {
    start: '2024-09-06T18:15:00',
    end: '2024-09-06T19:00:00',
    id: 26,
    title: 'Teaching:Guitar:3',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 34,
      knowledgeDomain: {
        id: 27,
        name: 'Guitar',
        shortCode: 'Gtr'
      },
      knowledgeLevel: {
        name: 'Level 4',
        id: 6,
        levelOrdinal: 3,
        knowledgeLevelSeriesId: 2
      },
      knowledgeLevelSeriesId: 2
    }
  },
  {
    start: '2024-09-03T15:00:00',
    end: '2024-09-03T15:45:00',
    id: 27,
    title: 'Teaching:Production:3',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 35,
      knowledgeDomain: {
        id: 24,
        name: 'Production',
        shortCode: 'Pro'
      },
      knowledgeLevel: {
        name: 'Level 4',
        id: 6,
        levelOrdinal: 3,
        knowledgeLevelSeriesId: 2
      },
      knowledgeLevelSeriesId: 2
    }
  },
  {
    start: '2024-09-06T19:00:00',
    end: '2024-09-06T19:45:00',
    id: 10,
    title: 'Teaching:Classical Voice:1',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 26,
      knowledgeDomain: {
        id: 21,
        name: 'Classical Voice',
        shortCode: 'CVo'
      },
      knowledgeLevel: {
        name: 'Level 3 Year 1',
        id: 4,
        levelOrdinal: 1,
        knowledgeLevelSeriesId: 2
      },
      knowledgeLevelSeriesId: 2
    }
  },
  {
    start: '2024-09-03T16:45:00',
    end: '2024-09-03T17:30:00',
    id: 11,
    title: 'Teaching:Classical Voice:1',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 26,
      knowledgeDomain: {
        id: 21,
        name: 'Classical Voice',
        shortCode: 'CVo'
      },
      knowledgeLevel: {
        name: 'Level 3 Year 1',
        id: 4,
        levelOrdinal: 1,
        knowledgeLevelSeriesId: 2
      },
      knowledgeLevelSeriesId: 2
    }
  },
  {
    start: '2024-09-02T09:30:00',
    end: '2024-09-02T10:30:00',
    id: 40,
    title: 'Teaching:Music Theory:2',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 8,
      knowledgeDomain: {
        id: 1,
        name: 'Music Theory',
        shortCode: 'MT'
      },
      knowledgeLevel: {
        name: '2',
        id: 2,
        levelOrdinal: 2,
        knowledgeLevelSeriesId: 1
      },
      knowledgeLevelSeriesId: 1
    }
  },
  {
    start: '2024-09-06T09:00:00',
    end: '2024-09-06T10:00:00',
    id: 39,
    title: 'Teaching:Music Theory:2',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 8,
      knowledgeDomain: {
        id: 1,
        name: 'Music Theory',
        shortCode: 'MT'
      },
      knowledgeLevel: {
        name: '2',
        id: 2,
        levelOrdinal: 2,
        knowledgeLevelSeriesId: 1
      },
      knowledgeLevelSeriesId: 1
    }
  },
  {
    start: '2024-09-03T10:00:00',
    end: '2024-09-03T10:45:00',
    id: 16,
    title: 'Teaching:French Horn:2',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 30,
      knowledgeDomain: {
        id: 25,
        name: 'French Horn',
        shortCode: 'FH'
      },
      knowledgeLevel: {
        name: 'Level 3 Year 2',
        id: 5,
        levelOrdinal: 2,
        knowledgeLevelSeriesId: 2
      },
      knowledgeLevelSeriesId: 2
    }
  },
  {
    start: '2024-09-06T18:45:00',
    end: '2024-09-06T19:30:00',
    id: 17,
    title: 'Teaching:French Horn:2',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 30,
      knowledgeDomain: {
        id: 25,
        name: 'French Horn',
        shortCode: 'FH'
      },
      knowledgeLevel: {
        name: 'Level 3 Year 2',
        id: 5,
        levelOrdinal: 2,
        knowledgeLevelSeriesId: 2
      },
      knowledgeLevelSeriesId: 2
    }
  },
  {
    start: '2024-09-03T16:15:00',
    end: '2024-09-03T17:00:00',
    id: 33,
    title: 'Teaching:Jazz/Pop Voice:3',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 33,
      knowledgeDomain: {
        id: 19,
        name: 'Jazz/Pop Voice',
        shortCode: 'JPV'
      },
      knowledgeLevel: {
        name: 'Level 4',
        id: 6,
        levelOrdinal: 3,
        knowledgeLevelSeriesId: 2
      },
      knowledgeLevelSeriesId: 2
    }
  },
  {
    start: '2024-09-03T09:00:00',
    end: '2024-09-03T10:00:00',
    id: 56,
    title: 'Teaching:Purple English:0',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 18,
      knowledgeDomain: {
        id: 13,
        name: 'Purple English',
        shortCode: 'En'
      },
      knowledgeLevel: {
        name: 'Shared',
        id: 3,
        levelOrdinal: 0,
        knowledgeLevelSeriesId: 1
      },
      knowledgeLevelSeriesId: 1
    }
  },
  {
    start: '2024-09-04T09:00:00',
    end: '2024-09-04T11:00:00',
    id: 57,
    title: 'Teaching:Purple English:0',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 18,
      knowledgeDomain: {
        id: 13,
        name: 'Purple English',
        shortCode: 'En'
      },
      knowledgeLevel: {
        name: 'Shared',
        id: 3,
        levelOrdinal: 0,
        knowledgeLevelSeriesId: 1
      },
      knowledgeLevelSeriesId: 1
    }
  },
  {
    start: '2024-09-02T14:15:00',
    end: '2024-09-02T16:15:00',
    id: 55,
    title: 'Teaching:Purple English:0',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 18,
      knowledgeDomain: {
        id: 13,
        name: 'Purple English',
        shortCode: 'En'
      },
      knowledgeLevel: {
        name: 'Shared',
        id: 3,
        levelOrdinal: 0,
        knowledgeLevelSeriesId: 1
      },
      knowledgeLevelSeriesId: 1
    }
  },
  {
    start: '2024-09-02T16:15:00',
    end: '2024-09-02T17:00:00',
    id: 30,
    title: 'Teaching:Classical Voice:3',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 36,
      knowledgeDomain: {
        id: 21,
        name: 'Classical Voice',
        shortCode: 'CVo'
      },
      knowledgeLevel: {
        name: 'Level 4',
        id: 6,
        levelOrdinal: 3,
        knowledgeLevelSeriesId: 2
      },
      knowledgeLevelSeriesId: 2
    }
  },
  {
    start: '2024-09-03T15:30:00',
    end: '2024-09-03T16:15:00',
    id: 31,
    title: 'Teaching:Classical Voice:3',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 36,
      knowledgeDomain: {
        id: 21,
        name: 'Classical Voice',
        shortCode: 'CVo'
      },
      knowledgeLevel: {
        name: 'Level 4',
        id: 6,
        levelOrdinal: 3,
        knowledgeLevelSeriesId: 2
      },
      knowledgeLevelSeriesId: 2
    }
  },
  {
    start: '2024-09-03T12:45:00',
    end: '2024-09-03T13:45:00',
    id: 34,
    title: 'Teaching:Aural Skills:1',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 3,
      knowledgeDomain: {
        id: 3,
        name: 'Aural Skills',
        shortCode: 'AS'
      },
      knowledgeLevel: {
        name: '1',
        id: 1,
        levelOrdinal: 1,
        knowledgeLevelSeriesId: 1
      },
      knowledgeLevelSeriesId: 1
    }
  },
  {
    start: '2024-09-04T11:45:00',
    end: '2024-09-04T12:30:00',
    id: 12,
    title: 'Teaching:Pop Guitar:2',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 27,
      knowledgeDomain: {
        id: 22,
        name: 'Pop Guitar',
        shortCode: 'PGt'
      },
      knowledgeLevel: {
        name: 'Level 3 Year 2',
        id: 5,
        levelOrdinal: 2,
        knowledgeLevelSeriesId: 2
      },
      knowledgeLevelSeriesId: 2
    }
  },
  {
    start: '2024-09-05T15:30:00',
    end: '2024-09-05T16:15:00',
    id: 13,
    title: 'Teaching:Pop Guitar:2',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 27,
      knowledgeDomain: {
        id: 22,
        name: 'Pop Guitar',
        shortCode: 'PGt'
      },
      knowledgeLevel: {
        name: 'Level 3 Year 2',
        id: 5,
        levelOrdinal: 2,
        knowledgeLevelSeriesId: 2
      },
      knowledgeLevelSeriesId: 2
    }
  },
  {
    start: '2024-09-04T12:15:00',
    end: '2024-09-04T13:00:00',
    id: 19,
    title: 'Teaching:Production:2',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 29,
      knowledgeDomain: {
        id: 24,
        name: 'Production',
        shortCode: 'Pro'
      },
      knowledgeLevel: {
        name: 'Level 3 Year 2',
        id: 5,
        levelOrdinal: 2,
        knowledgeLevelSeriesId: 2
      },
      knowledgeLevelSeriesId: 2
    }
  },
  {
    start: '2024-09-02T16:15:00',
    end: '2024-09-02T17:00:00',
    id: 18,
    title: 'Teaching:Production:2',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 29,
      knowledgeDomain: {
        id: 24,
        name: 'Production',
        shortCode: 'Pro'
      },
      knowledgeLevel: {
        name: 'Level 3 Year 2',
        id: 5,
        levelOrdinal: 2,
        knowledgeLevelSeriesId: 2
      },
      knowledgeLevelSeriesId: 2
    }
  },
  {
    start: '2024-09-03T17:00:00',
    end: '2024-09-03T17:45:00',
    id: 3,
    title: 'Teaching:Jazz/Pop Voice:1',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 24,
      knowledgeDomain: {
        id: 19,
        name: 'Jazz/Pop Voice',
        shortCode: 'JPV'
      },
      knowledgeLevel: {
        name: 'Level 3 Year 1',
        id: 4,
        levelOrdinal: 1,
        knowledgeLevelSeriesId: 2
      },
      knowledgeLevelSeriesId: 2
    }
  },
  {
    start: '2024-09-05T14:45:00',
    end: '2024-09-05T15:30:00',
    id: 2,
    title: 'Teaching:Jazz/Pop Voice:1',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 24,
      knowledgeDomain: {
        id: 19,
        name: 'Jazz/Pop Voice',
        shortCode: 'JPV'
      },
      knowledgeLevel: {
        name: 'Level 3 Year 1',
        id: 4,
        levelOrdinal: 1,
        knowledgeLevelSeriesId: 2
      },
      knowledgeLevelSeriesId: 2
    }
  },
  {
    start: '2024-09-05T09:00:00',
    end: '2024-09-05T10:30:00',
    id: 47,
    title: 'Teaching:World Music:0',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 20,
      knowledgeDomain: {
        id: 15,
        name: 'World Music',
        shortCode: 'WM'
      },
      knowledgeLevel: {
        name: 'Shared',
        id: 3,
        levelOrdinal: 0,
        knowledgeLevelSeriesId: 1
      },
      knowledgeLevelSeriesId: 1
    }
  },
  {
    start: '2024-09-05T13:15:00',
    end: '2024-09-05T15:15:00',
    id: 46,
    title: 'Teaching:Arranging:2',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 14,
      knowledgeDomain: {
        id: 9,
        name: 'Arranging',
        shortCode: 'Ar'
      },
      knowledgeLevel: {
        name: '2',
        id: 2,
        levelOrdinal: 2,
        knowledgeLevelSeriesId: 1
      },
      knowledgeLevelSeriesId: 1
    }
  },
  {
    start: '2024-09-03T10:15:00',
    end: '2024-09-03T11:00:00',
    id: 15,
    title: 'Teaching:Production:2',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 29,
      knowledgeDomain: {
        id: 24,
        name: 'Production',
        shortCode: 'Pro'
      },
      knowledgeLevel: {
        name: 'Level 3 Year 2',
        id: 5,
        levelOrdinal: 2,
        knowledgeLevelSeriesId: 2
      },
      knowledgeLevelSeriesId: 2
    }
  },
  {
    start: '2024-09-06T18:45:00',
    end: '2024-09-06T19:30:00',
    id: 4,
    title: 'Teaching:Jazz/Pop Voice:1',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 24,
      knowledgeDomain: {
        id: 19,
        name: 'Jazz/Pop Voice',
        shortCode: 'JPV'
      },
      knowledgeLevel: {
        name: 'Level 3 Year 1',
        id: 4,
        levelOrdinal: 1,
        knowledgeLevelSeriesId: 2
      },
      knowledgeLevelSeriesId: 2
    }
  },
  {
    start: '2024-09-04T19:00:00',
    end: '2024-09-04T19:45:00',
    id: 5,
    title: 'Teaching:Jazz/Pop Voice:1',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 24,
      knowledgeDomain: {
        id: 19,
        name: 'Jazz/Pop Voice',
        shortCode: 'JPV'
      },
      knowledgeLevel: {
        name: 'Level 3 Year 1',
        id: 4,
        levelOrdinal: 1,
        knowledgeLevelSeriesId: 2
      },
      knowledgeLevelSeriesId: 2
    }
  },
  {
    start: '2024-09-02T11:30:00',
    end: '2024-09-02T13:00:00',
    id: 53,
    title: 'Teaching:Ensemble Rehearsals:0',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 16,
      knowledgeDomain: {
        id: 11,
        name: 'Ensemble Rehearsals',
        shortCode: 'ER'
      },
      knowledgeLevel: {
        name: 'Shared',
        id: 3,
        levelOrdinal: 0,
        knowledgeLevelSeriesId: 1
      },
      knowledgeLevelSeriesId: 1
    }
  },
  {
    start: '2024-09-06T12:45:00',
    end: '2024-09-06T14:15:00',
    id: 52,
    title: 'Teaching:Ensemble Rehearsals:0',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 16,
      knowledgeDomain: {
        id: 11,
        name: 'Ensemble Rehearsals',
        shortCode: 'ER'
      },
      knowledgeLevel: {
        name: 'Shared',
        id: 3,
        levelOrdinal: 0,
        knowledgeLevelSeriesId: 1
      },
      knowledgeLevelSeriesId: 1
    }
  },
  {
    start: '2024-09-03T10:00:00',
    end: '2024-09-03T11:00:00',
    id: 37,
    title: 'Teaching:Pop Styles:1',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 6,
      knowledgeDomain: {
        id: 6,
        name: 'Pop Styles',
        shortCode: 'PS'
      },
      knowledgeLevel: {
        name: '1',
        id: 1,
        levelOrdinal: 1,
        knowledgeLevelSeriesId: 1
      },
      knowledgeLevelSeriesId: 1
    }
  },
  {
    start: '2024-09-06T18:00:00',
    end: '2024-09-06T18:45:00',
    id: 32,
    title: 'Teaching:Classical Voice:3',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 36,
      knowledgeDomain: {
        id: 21,
        name: 'Classical Voice',
        shortCode: 'CVo'
      },
      knowledgeLevel: {
        name: 'Level 4',
        id: 6,
        levelOrdinal: 3,
        knowledgeLevelSeriesId: 2
      },
      knowledgeLevelSeriesId: 2
    }
  },
  {
    start: '2024-09-04T12:45:00',
    end: '2024-09-04T13:45:00',
    id: 38,
    title: 'Teaching:Production: Sequencing:1',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 7,
      knowledgeDomain: {
        id: 7,
        name: 'Production: Sequencing',
        shortCode: 'Ps'
      },
      knowledgeLevel: {
        name: '1',
        id: 1,
        levelOrdinal: 1,
        knowledgeLevelSeriesId: 1
      },
      knowledgeLevelSeriesId: 1
    }
  },
  {
    start: '2024-09-03T17:15:00',
    end: '2024-09-03T18:00:00',
    id: 8,
    title: 'Teaching:Piano:1',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 25,
      knowledgeDomain: {
        id: 20,
        name: 'Piano',
        shortCode: 'Pn'
      },
      knowledgeLevel: {
        name: 'Level 3 Year 1',
        id: 4,
        levelOrdinal: 1,
        knowledgeLevelSeriesId: 2
      },
      knowledgeLevelSeriesId: 2
    }
  },
  {
    start: '2024-09-06T18:45:00',
    end: '2024-09-06T19:30:00',
    id: 9,
    title: 'Teaching:Piano:1',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 25,
      knowledgeDomain: {
        id: 20,
        name: 'Piano',
        shortCode: 'Pn'
      },
      knowledgeLevel: {
        name: 'Level 3 Year 1',
        id: 4,
        levelOrdinal: 1,
        knowledgeLevelSeriesId: 2
      },
      knowledgeLevelSeriesId: 2
    }
  },
  {
    start: '2024-09-05T10:30:00',
    end: '2024-09-05T12:00:00',
    id: 48,
    title: 'Teaching:Production: Recording:0',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 21,
      knowledgeDomain: {
        id: 16,
        name: 'Production: Recording',
        shortCode: 'Pr'
      },
      knowledgeLevel: {
        name: 'Shared',
        id: 3,
        levelOrdinal: 0,
        knowledgeLevelSeriesId: 1
      },
      knowledgeLevelSeriesId: 1
    }
  },
  {
    start: '2024-09-03T15:45:00',
    end: '2024-09-03T16:30:00',
    id: 28,
    title: 'Teaching:Production:3',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 35,
      knowledgeDomain: {
        id: 24,
        name: 'Production',
        shortCode: 'Pro'
      },
      knowledgeLevel: {
        name: 'Level 4',
        id: 6,
        levelOrdinal: 3,
        knowledgeLevelSeriesId: 2
      },
      knowledgeLevelSeriesId: 2
    }
  },
  {
    start: '2024-09-05T15:15:00',
    end: '2024-09-05T16:00:00',
    id: 29,
    title: 'Teaching:Production:3',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 35,
      knowledgeDomain: {
        id: 24,
        name: 'Production',
        shortCode: 'Pro'
      },
      knowledgeLevel: {
        name: 'Level 4',
        id: 6,
        levelOrdinal: 3,
        knowledgeLevelSeriesId: 2
      },
      knowledgeLevelSeriesId: 2
    }
  },
  {
    start: '2024-09-05T16:15:00',
    end: '2024-09-05T17:15:00',
    id: 50,
    title: 'Teaching:Hand Drumming:0',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 23,
      knowledgeDomain: {
        id: 18,
        name: 'Hand Drumming',
        shortCode: 'HD'
      },
      knowledgeLevel: {
        name: 'Shared',
        id: 3,
        levelOrdinal: 0,
        knowledgeLevelSeriesId: 1
      },
      knowledgeLevelSeriesId: 1
    }
  },
  {
    start: '2024-09-02T09:00:00',
    end: '2024-09-02T09:30:00',
    id: 51,
    title: 'Teaching:Reflection/PT:0',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 15,
      knowledgeDomain: {
        id: 10,
        name: 'Reflection/PT',
        shortCode: 'RP'
      },
      knowledgeLevel: {
        name: 'Shared',
        id: 3,
        levelOrdinal: 0,
        knowledgeLevelSeriesId: 1
      },
      knowledgeLevelSeriesId: 1
    }
  },
  {
    start: '2024-09-03T13:45:00',
    end: '2024-09-03T14:45:00',
    id: 42,
    title: 'Teaching:Aural Skills:2',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 10,
      knowledgeDomain: {
        id: 3,
        name: 'Aural Skills',
        shortCode: 'AS'
      },
      knowledgeLevel: {
        name: '2',
        id: 2,
        levelOrdinal: 2,
        knowledgeLevelSeriesId: 1
      },
      knowledgeLevelSeriesId: 1
    }
  },
  {
    start: '2024-09-02T09:30:00',
    end: '2024-09-02T10:30:00',
    id: 59,
    title: 'Teaching:Music Theory:1',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 1,
      knowledgeDomain: {
        id: 1,
        name: 'Music Theory',
        shortCode: 'MT'
      },
      knowledgeLevel: {
        name: '1',
        id: 1,
        levelOrdinal: 1,
        knowledgeLevelSeriesId: 1
      },
      knowledgeLevelSeriesId: 1
    }
  },
  {
    start: '2024-09-05T14:00:00',
    end: '2024-09-05T14:45:00',
    id: 6,
    title: 'Teaching:Jazz/Pop Voice:1',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 24,
      knowledgeDomain: {
        id: 19,
        name: 'Jazz/Pop Voice',
        shortCode: 'JPV'
      },
      knowledgeLevel: {
        name: 'Level 3 Year 1',
        id: 4,
        levelOrdinal: 1,
        knowledgeLevelSeriesId: 2
      },
      knowledgeLevelSeriesId: 2
    }
  },
  {
    start: '2024-09-02T16:15:00',
    end: '2024-09-02T17:00:00',
    id: 7,
    title: 'Teaching:Jazz/Pop Voice:1',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 24,
      knowledgeDomain: {
        id: 19,
        name: 'Jazz/Pop Voice',
        shortCode: 'JPV'
      },
      knowledgeLevel: {
        name: 'Level 3 Year 1',
        id: 4,
        levelOrdinal: 1,
        knowledgeLevelSeriesId: 2
      },
      knowledgeLevelSeriesId: 2
    }
  },
  {
    start: '2024-09-02T10:30:00',
    end: '2024-09-02T11:30:00',
    id: 41,
    title: 'Teaching:Transcription:2',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 9,
      knowledgeDomain: {
        id: 2,
        name: 'Transcription',
        shortCode: 'Tr'
      },
      knowledgeLevel: {
        name: '2',
        id: 2,
        levelOrdinal: 2,
        knowledgeLevelSeriesId: 1
      },
      knowledgeLevelSeriesId: 1
    }
  },
  {
    start: '2024-09-02T13:45:00',
    end: '2024-09-02T14:15:00',
    id: 54,
    title: 'Teaching:No Name:0',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 17,
      knowledgeDomain: {
        id: 12,
        name: 'No Name',
        shortCode: 'NN'
      },
      knowledgeLevel: {
        name: 'Shared',
        id: 3,
        levelOrdinal: 0,
        knowledgeLevelSeriesId: 1
      },
      knowledgeLevelSeriesId: 1
    }
  },
  {
    start: '2024-09-06T14:15:00',
    end: '2024-09-06T15:15:00',
    id: 36,
    title: 'Teaching:Composition:1',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 5,
      knowledgeDomain: {
        id: 5,
        name: 'Composition',
        shortCode: 'Co'
      },
      knowledgeLevel: {
        name: '1',
        id: 1,
        levelOrdinal: 1,
        knowledgeLevelSeriesId: 1
      },
      knowledgeLevelSeriesId: 1
    }
  },
  {
    start: '2024-09-02T16:30:00',
    end: '2024-09-02T17:15:00',
    id: 23,
    title: 'Teaching:Double Bass:2',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 32,
      knowledgeDomain: {
        id: 26,
        name: 'Double Bass',
        shortCode: 'Dbl'
      },
      knowledgeLevel: {
        name: 'Level 3 Year 2',
        id: 5,
        levelOrdinal: 2,
        knowledgeLevelSeriesId: 2
      },
      knowledgeLevelSeriesId: 2
    }
  },
  {
    start: '2024-09-06T18:45:00',
    end: '2024-09-06T19:30:00',
    id: 22,
    title: 'Teaching:Double Bass:2',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 32,
      knowledgeDomain: {
        id: 26,
        name: 'Double Bass',
        shortCode: 'Dbl'
      },
      knowledgeLevel: {
        name: 'Level 3 Year 2',
        id: 5,
        levelOrdinal: 2,
        knowledgeLevelSeriesId: 2
      },
      knowledgeLevelSeriesId: 2
    }
  },
  {
    start: '2024-09-06T11:00:00',
    end: '2024-09-06T12:00:00',
    id: 44,
    title: 'Teaching:Composition:2',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 12,
      knowledgeDomain: {
        id: 5,
        name: 'Composition',
        shortCode: 'Co'
      },
      knowledgeLevel: {
        name: '2',
        id: 2,
        levelOrdinal: 2,
        knowledgeLevelSeriesId: 1
      },
      knowledgeLevelSeriesId: 1
    }
  },
  {
    start: '2024-09-04T13:45:00',
    end: '2024-09-04T15:15:00',
    id: 58,
    title: 'Teaching:Project Lab:0',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 19,
      knowledgeDomain: {
        id: 14,
        name: 'Project Lab',
        shortCode: 'PL'
      },
      knowledgeLevel: {
        name: 'Shared',
        id: 3,
        levelOrdinal: 0,
        knowledgeLevelSeriesId: 1
      },
      knowledgeLevelSeriesId: 1
    }
  },
  {
    start: '2024-09-02T10:30:00',
    end: '2024-09-02T11:30:00',
    id: 1,
    title: 'Teaching:Transcription:1',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 2,
      knowledgeDomain: {
        id: 2,
        name: 'Transcription',
        shortCode: 'Tr'
      },
      knowledgeLevel: {
        name: '1',
        id: 1,
        levelOrdinal: 1,
        knowledgeLevelSeriesId: 1
      },
      knowledgeLevelSeriesId: 1
    }
  },
  {
    start: '2024-09-03T11:00:00',
    end: '2024-09-03T12:00:00',
    id: 49,
    title: 'Teaching:Performance Class/Reflective Writing:0',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 22,
      knowledgeDomain: {
        id: 17,
        name: 'Performance Class/Reflective Writing',
        shortCode: 'PW'
      },
      knowledgeLevel: {
        name: 'Shared',
        id: 3,
        levelOrdinal: 0,
        knowledgeLevelSeriesId: 1
      },
      knowledgeLevelSeriesId: 1
    }
  },
  {
    start: '2024-09-05T12:45:00',
    end: '2024-09-05T13:15:00',
    id: 45,
    title: 'Teaching:UCAS Applications:2',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 13,
      knowledgeDomain: {
        id: 8,
        name: 'UCAS Applications',
        shortCode: 'UA'
      },
      knowledgeLevel: {
        name: '2',
        id: 2,
        levelOrdinal: 2,
        knowledgeLevelSeriesId: 1
      },
      knowledgeLevelSeriesId: 1
    }
  },
  {
    start: '2024-09-06T10:00:00',
    end: '2024-09-06T11:00:00',
    id: 43,
    title: 'Teaching:Keyboard Skills:2',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 11,
      knowledgeDomain: {
        id: 4,
        name: 'Keyboard Skills',
        shortCode: 'KS'
      },
      knowledgeLevel: {
        name: '2',
        id: 2,
        levelOrdinal: 2,
        knowledgeLevelSeriesId: 1
      },
      knowledgeLevelSeriesId: 1
    }
  },
  {
    start: '2024-09-04T12:15:00',
    end: '2024-09-04T13:00:00',
    id: 14,
    title: 'Teaching:Drum Kit:2',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 28,
      knowledgeDomain: {
        id: 23,
        name: 'Drum Kit',
        shortCode: 'DK'
      },
      knowledgeLevel: {
        name: 'Level 3 Year 2',
        id: 5,
        levelOrdinal: 2,
        knowledgeLevelSeriesId: 2
      },
      knowledgeLevelSeriesId: 2
    }
  },
  {
    start: '2024-09-04T15:15:00',
    end: '2024-09-04T16:15:00',
    id: 35,
    title: 'Teaching:Keyboard Skills:1',
    workTaskTypeDto: {
      name: 'Teaching',
      id: 4,
      knowledgeDomain: {
        id: 4,
        name: 'Keyboard Skills',
        shortCode: 'KS'
      },
      knowledgeLevel: {
        name: '1',
        id: 1,
        levelOrdinal: 1,
        knowledgeLevelSeriesId: 1
      },
      knowledgeLevelSeriesId: 1
    }
  }
];

export const eventsWithDates = events.map((eventWithString) => ({
  ...eventWithString,
  start: new Date(eventWithString.start),
  end: new Date(eventWithString.end)
}));
