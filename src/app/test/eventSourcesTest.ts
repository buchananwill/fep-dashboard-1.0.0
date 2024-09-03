import {
  colorizeKnowledgeDomains,
  getColorWithinSpace
} from '@/components/work-schema-nodes/nivo-sunburst-chart/view/colorizeKnowledgeDomains';
import { KnowledgeDomainDto } from '@/api/generated-types/generated-types';
import { color, hsl } from 'd3';

const eventSources = [
  {
    id: '1',
    sourceData: {
      id: 1,
      name: 'Music Theory',
      shortCode: 'MT'
    },
    events: [
      {
        start: '2024-09-06T09:00:00',
        end: '2024-09-06T10:00:00',
        id: 39,
        title: 'Teaching:Music Theory:2',
        workTaskTypeId: 8
      },
      {
        start: '2024-09-02T09:30:00',
        end: '2024-09-02T10:30:00',
        id: 40,
        title: 'Teaching:Music Theory:2',
        workTaskTypeId: 8
      },
      {
        start: '2024-09-02T09:30:00',
        end: '2024-09-02T10:30:00',
        id: 59,
        title: 'Teaching:Music Theory:1',
        workTaskTypeId: 1
      }
    ]
  },
  {
    id: '5',
    sourceData: {
      id: 5,
      name: 'Composition',
      shortCode: 'Co'
    },
    events: [
      {
        start: '2024-09-06T14:15:00',
        end: '2024-09-06T15:15:00',
        id: 36,
        title: 'Teaching:Composition:1',
        workTaskTypeId: 5
      },
      {
        start: '2024-09-06T11:00:00',
        end: '2024-09-06T12:00:00',
        id: 44,
        title: 'Teaching:Composition:2',
        workTaskTypeId: 12
      }
    ]
  },
  {
    id: '27',
    sourceData: {
      id: 27,
      name: 'Guitar',
      shortCode: 'Gtr'
    },
    events: [
      {
        start: '2024-09-06T18:15:00',
        end: '2024-09-06T19:00:00',
        id: 26,
        title: 'Teaching:Guitar:3',
        workTaskTypeId: 34
      }
    ]
  },
  {
    id: '26',
    sourceData: {
      id: 26,
      name: 'Double Bass',
      shortCode: 'Dbl'
    },
    events: [
      {
        start: '2024-09-06T18:45:00',
        end: '2024-09-06T19:30:00',
        id: 22,
        title: 'Teaching:Double Bass:2',
        workTaskTypeId: 32
      },
      {
        start: '2024-09-02T16:30:00',
        end: '2024-09-02T17:15:00',
        id: 23,
        title: 'Teaching:Double Bass:2',
        workTaskTypeId: 32
      }
    ]
  },
  {
    id: '25',
    sourceData: {
      id: 25,
      name: 'French Horn',
      shortCode: 'FH'
    },
    events: [
      {
        start: '2024-09-03T10:00:00',
        end: '2024-09-03T10:45:00',
        id: 16,
        title: 'Teaching:French Horn:2',
        workTaskTypeId: 30
      },
      {
        start: '2024-09-06T18:45:00',
        end: '2024-09-06T19:30:00',
        id: 17,
        title: 'Teaching:French Horn:2',
        workTaskTypeId: 30
      }
    ]
  },
  {
    id: '20',
    sourceData: {
      id: 20,
      name: 'Piano',
      shortCode: 'Pn'
    },
    events: [
      {
        start: '2024-09-03T17:15:00',
        end: '2024-09-03T18:00:00',
        id: 8,
        title: 'Teaching:Piano:1',
        workTaskTypeId: 25
      },
      {
        start: '2024-09-06T18:45:00',
        end: '2024-09-06T19:30:00',
        id: 9,
        title: 'Teaching:Piano:1',
        workTaskTypeId: 25
      }
    ]
  },
  {
    id: '6',
    sourceData: {
      id: 6,
      name: 'Pop Styles',
      shortCode: 'PS'
    },
    events: [
      {
        start: '2024-09-03T10:00:00',
        end: '2024-09-03T11:00:00',
        id: 37,
        title: 'Teaching:Pop Styles:1',
        workTaskTypeId: 6
      }
    ]
  },
  {
    id: '11',
    sourceData: {
      id: 11,
      name: 'Ensemble Rehearsals',
      shortCode: 'ER'
    },
    events: [
      {
        start: '2024-09-06T12:45:00',
        end: '2024-09-06T14:15:00',
        id: 52,
        title: 'Teaching:Ensemble Rehearsals:0',
        workTaskTypeId: 16
      },
      {
        start: '2024-09-02T11:30:00',
        end: '2024-09-02T13:00:00',
        id: 53,
        title: 'Teaching:Ensemble Rehearsals:0',
        workTaskTypeId: 16
      }
    ]
  },
  {
    id: '9',
    sourceData: {
      id: 9,
      name: 'Arranging',
      shortCode: 'Ar'
    },
    events: [
      {
        start: '2024-09-05T13:15:00',
        end: '2024-09-05T15:15:00',
        id: 46,
        title: 'Teaching:Arranging:2',
        workTaskTypeId: 14
      }
    ]
  },
  {
    id: '4',
    sourceData: {
      id: 4,
      name: 'Keyboard Skills',
      shortCode: 'KS'
    },
    events: [
      {
        start: '2024-09-04T15:15:00',
        end: '2024-09-04T16:15:00',
        id: 35,
        title: 'Teaching:Keyboard Skills:1',
        workTaskTypeId: 4
      },
      {
        start: '2024-09-06T10:00:00',
        end: '2024-09-06T11:00:00',
        id: 43,
        title: 'Teaching:Keyboard Skills:2',
        workTaskTypeId: 11
      }
    ]
  },
  {
    id: '7',
    sourceData: {
      id: 7,
      name: 'Production: Sequencing',
      shortCode: 'Ps'
    },
    events: [
      {
        start: '2024-09-04T12:45:00',
        end: '2024-09-04T13:45:00',
        id: 38,
        title: 'Teaching:Production: Sequencing:1',
        workTaskTypeId: 7
      }
    ]
  },
  {
    id: '12',
    sourceData: {
      id: 12,
      name: 'No Name',
      shortCode: 'NN'
    },
    events: [
      {
        start: '2024-09-02T13:45:00',
        end: '2024-09-02T14:15:00',
        id: 54,
        title: 'Teaching:No Name:0',
        workTaskTypeId: 17
      }
    ]
  },
  {
    id: '19',
    sourceData: {
      id: 19,
      name: 'Jazz/Pop Voice',
      shortCode: 'JPV'
    },
    events: [
      {
        start: '2024-09-05T14:45:00',
        end: '2024-09-05T15:30:00',
        id: 2,
        title: 'Teaching:Jazz/Pop Voice:1',
        workTaskTypeId: 24
      },
      {
        start: '2024-09-03T17:00:00',
        end: '2024-09-03T17:45:00',
        id: 3,
        title: 'Teaching:Jazz/Pop Voice:1',
        workTaskTypeId: 24
      },
      {
        start: '2024-09-06T18:45:00',
        end: '2024-09-06T19:30:00',
        id: 4,
        title: 'Teaching:Jazz/Pop Voice:1',
        workTaskTypeId: 24
      },
      {
        start: '2024-09-04T19:00:00',
        end: '2024-09-04T19:45:00',
        id: 5,
        title: 'Teaching:Jazz/Pop Voice:1',
        workTaskTypeId: 24
      },
      {
        start: '2024-09-05T14:00:00',
        end: '2024-09-05T14:45:00',
        id: 6,
        title: 'Teaching:Jazz/Pop Voice:1',
        workTaskTypeId: 24
      },
      {
        start: '2024-09-02T16:15:00',
        end: '2024-09-02T17:00:00',
        id: 7,
        title: 'Teaching:Jazz/Pop Voice:1',
        workTaskTypeId: 24
      },
      {
        start: '2024-09-04T12:15:00',
        end: '2024-09-04T13:00:00',
        id: 20,
        title: 'Teaching:Jazz/Pop Voice:2',
        workTaskTypeId: 31
      },
      {
        start: '2024-09-03T10:15:00',
        end: '2024-09-03T11:00:00',
        id: 21,
        title: 'Teaching:Jazz/Pop Voice:2',
        workTaskTypeId: 31
      },
      {
        start: '2024-09-04T17:30:00',
        end: '2024-09-04T18:15:00',
        id: 24,
        title: 'Teaching:Jazz/Pop Voice:3',
        workTaskTypeId: 33
      },
      {
        start: '2024-09-03T15:30:00',
        end: '2024-09-03T16:15:00',
        id: 25,
        title: 'Teaching:Jazz/Pop Voice:3',
        workTaskTypeId: 33
      },
      {
        start: '2024-09-03T16:15:00',
        end: '2024-09-03T17:00:00',
        id: 33,
        title: 'Teaching:Jazz/Pop Voice:3',
        workTaskTypeId: 33
      }
    ]
  },
  {
    id: '2',
    sourceData: {
      id: 2,
      name: 'Transcription',
      shortCode: 'Tr'
    },
    events: [
      {
        start: '2024-09-02T10:30:00',
        end: '2024-09-02T11:30:00',
        id: 1,
        title: 'Teaching:Transcription:1',
        workTaskTypeId: 2
      },
      {
        start: '2024-09-02T10:30:00',
        end: '2024-09-02T11:30:00',
        id: 41,
        title: 'Teaching:Transcription:2',
        workTaskTypeId: 9
      }
    ]
  },
  {
    id: '14',
    sourceData: {
      id: 14,
      name: 'Project Lab',
      shortCode: 'PL'
    },
    events: [
      {
        start: '2024-09-04T13:45:00',
        end: '2024-09-04T15:15:00',
        id: 58,
        title: 'Teaching:Project Lab:0',
        workTaskTypeId: 19
      }
    ]
  },
  {
    id: '16',
    sourceData: {
      id: 16,
      name: 'Production: Recording',
      shortCode: 'Pr'
    },
    events: [
      {
        start: '2024-09-05T10:30:00',
        end: '2024-09-05T12:00:00',
        id: 48,
        title: 'Teaching:Production: Recording:0',
        workTaskTypeId: 21
      }
    ]
  },
  {
    id: '10',
    sourceData: {
      id: 10,
      name: 'Reflection/PT',
      shortCode: 'RP'
    },
    events: [
      {
        start: '2024-09-02T09:00:00',
        end: '2024-09-02T09:30:00',
        id: 51,
        title: 'Teaching:Reflection/PT:0',
        workTaskTypeId: 15
      }
    ]
  },
  {
    id: '22',
    sourceData: {
      id: 22,
      name: 'Pop Guitar',
      shortCode: 'PGt'
    },
    events: [
      {
        start: '2024-09-04T11:45:00',
        end: '2024-09-04T12:30:00',
        id: 12,
        title: 'Teaching:Pop Guitar:2',
        workTaskTypeId: 27
      },
      {
        start: '2024-09-05T15:30:00',
        end: '2024-09-05T16:15:00',
        id: 13,
        title: 'Teaching:Pop Guitar:2',
        workTaskTypeId: 27
      }
    ]
  },
  {
    id: '21',
    sourceData: {
      id: 21,
      name: 'Classical Voice',
      shortCode: 'CVo'
    },
    events: [
      {
        start: '2024-09-06T19:00:00',
        end: '2024-09-06T19:45:00',
        id: 10,
        title: 'Teaching:Classical Voice:1',
        workTaskTypeId: 26
      },
      {
        start: '2024-09-03T16:45:00',
        end: '2024-09-03T17:30:00',
        id: 11,
        title: 'Teaching:Classical Voice:1',
        workTaskTypeId: 26
      },
      {
        start: '2024-09-02T16:15:00',
        end: '2024-09-02T17:00:00',
        id: 30,
        title: 'Teaching:Classical Voice:3',
        workTaskTypeId: 36
      },
      {
        start: '2024-09-03T15:30:00',
        end: '2024-09-03T16:15:00',
        id: 31,
        title: 'Teaching:Classical Voice:3',
        workTaskTypeId: 36
      },
      {
        start: '2024-09-06T18:00:00',
        end: '2024-09-06T18:45:00',
        id: 32,
        title: 'Teaching:Classical Voice:3',
        workTaskTypeId: 36
      }
    ]
  },
  {
    id: '15',
    sourceData: {
      id: 15,
      name: 'World Music',
      shortCode: 'WM'
    },
    events: [
      {
        start: '2024-09-05T09:00:00',
        end: '2024-09-05T10:30:00',
        id: 47,
        title: 'Teaching:World Music:0',
        workTaskTypeId: 20
      }
    ]
  },
  {
    id: '17',
    sourceData: {
      id: 17,
      name: 'Performance Class/Reflective Writing',
      shortCode: 'PW'
    },
    events: [
      {
        start: '2024-09-03T11:00:00',
        end: '2024-09-03T12:00:00',
        id: 49,
        title: 'Teaching:Performance Class/Reflective Writing:0',
        workTaskTypeId: 22
      }
    ]
  },
  {
    id: '13',
    sourceData: {
      id: 13,
      name: 'Purple English',
      shortCode: 'En'
    },
    events: [
      {
        start: '2024-09-02T14:15:00',
        end: '2024-09-02T16:15:00',
        id: 55,
        title: 'Teaching:Purple English:0',
        workTaskTypeId: 18
      },
      {
        start: '2024-09-03T09:00:00',
        end: '2024-09-03T10:00:00',
        id: 56,
        title: 'Teaching:Purple English:0',
        workTaskTypeId: 18
      },
      {
        start: '2024-09-04T09:00:00',
        end: '2024-09-04T11:00:00',
        id: 57,
        title: 'Teaching:Purple English:0',
        workTaskTypeId: 18
      }
    ]
  },
  {
    id: '24',
    sourceData: {
      id: 24,
      name: 'Production',
      shortCode: 'Pro'
    },
    events: [
      {
        start: '2024-09-03T10:15:00',
        end: '2024-09-03T11:00:00',
        id: 15,
        title: 'Teaching:Production:2',
        workTaskTypeId: 29
      },
      {
        start: '2024-09-02T16:15:00',
        end: '2024-09-02T17:00:00',
        id: 18,
        title: 'Teaching:Production:2',
        workTaskTypeId: 29
      },
      {
        start: '2024-09-04T12:15:00',
        end: '2024-09-04T13:00:00',
        id: 19,
        title: 'Teaching:Production:2',
        workTaskTypeId: 29
      },
      {
        start: '2024-09-03T15:00:00',
        end: '2024-09-03T15:45:00',
        id: 27,
        title: 'Teaching:Production:3',
        workTaskTypeId: 35
      },
      {
        start: '2024-09-03T15:45:00',
        end: '2024-09-03T16:30:00',
        id: 28,
        title: 'Teaching:Production:3',
        workTaskTypeId: 35
      },
      {
        start: '2024-09-05T15:15:00',
        end: '2024-09-05T16:00:00',
        id: 29,
        title: 'Teaching:Production:3',
        workTaskTypeId: 35
      }
    ]
  },
  {
    id: '23',
    sourceData: {
      id: 23,
      name: 'Drum Kit',
      shortCode: 'DK'
    },
    events: [
      {
        start: '2024-09-04T12:15:00',
        end: '2024-09-04T13:00:00',
        id: 14,
        title: 'Teaching:Drum Kit:2',
        workTaskTypeId: 28
      }
    ]
  },
  {
    id: '18',
    sourceData: {
      id: 18,
      name: 'Hand Drumming',
      shortCode: 'HD'
    },
    events: [
      {
        start: '2024-09-05T16:15:00',
        end: '2024-09-05T17:15:00',
        id: 50,
        title: 'Teaching:Hand Drumming:0',
        workTaskTypeId: 23
      }
    ]
  },
  {
    id: '8',
    sourceData: {
      id: 8,
      name: 'UCAS Applications',
      shortCode: 'UA'
    },
    events: [
      {
        start: '2024-09-05T12:45:00',
        end: '2024-09-05T13:15:00',
        id: 45,
        title: 'Teaching:UCAS Applications:2',
        workTaskTypeId: 13
      }
    ]
  },
  {
    id: '3',
    sourceData: {
      id: 3,
      name: 'Aural Skills',
      shortCode: 'AS'
    },
    events: [
      {
        start: '2024-09-03T12:45:00',
        end: '2024-09-03T13:45:00',
        id: 34,
        title: 'Teaching:Aural Skills:1',
        workTaskTypeId: 3
      },
      {
        start: '2024-09-03T13:45:00',
        end: '2024-09-03T14:45:00',
        id: 42,
        title: 'Teaching:Aural Skills:2',
        workTaskTypeId: 10
      }
    ]
  }
];

function colorizeEventSources(
  eventSources: {
    events: any[];
    id: string;
    color?: string;
    textColor?: string;
  }[]
) {
  let totalSources = eventSources.length;
  eventSources.forEach((source, index) => {
    let colorWithinSpace = getColorWithinSpace(index, totalSources);
    let hslColor = hsl(colorWithinSpace);
    hslColor.l = hslColor.l / 3;
    source.color = colorWithinSpace;
    source.textColor = hslColor.formatRgb();
  });
  return eventSources;
}

export const sourcesColorised = colorizeEventSources(eventSources);
