const suitabilityTemplate = {
  workTaskTypeMatrix: {
    knowledgeLevelSeriesDtoList: [
      {
        name: 'Courses',
        id: 2,
        knowledgeLevels: []
      }
    ],
    knowledgeDomainList: [
      {
        name: 'Classical Piano'
      }
    ],

    workTaskTypeNames: ['Teaching']
  },
  roleTypeNames: ['Teacher'],
  rating: 4
};

const availabilityTemplate = {
  day: 'WEDNESDAY',
  startTime: '17:00',
  endTime: '20:00',
  roleTypeNames: ['Teacher'],
  availabilityCode: 'TRUE'
};

const providers = [
  {
    baseEntity: {
      id: 0,
      personalName: 'Jamie'
    },
    suitabilities: [
      {
        workTaskTypeMatrix: {
          knowledgeLevelSeriesDtoList: [
            {
              name: 'Courses',
              id: 2,
              knowledgeLevels: []
            }
          ],
          knowledgeDomainList: [
            {
              name: 'Classical Piano'
            }
          ],

          workTaskTypeNames: ['Teaching']
        },
        roleTypeNames: ['Teacher'],
        rating: 4
      }
    ],
    availabilities: []
  }
];

const names = [
  {
    id: 0,
    dateOfBirth: '1990-09-25',
    personalName: 'Vivian',
    familyName: 'Choi'
  },
  {
    id: 0,
    dateOfBirth: '1990-09-25',
    personalName: 'Jamie',
    familyName: 'Brooks'
  },
  {
    id: 0,
    dateOfBirth: '1990-09-25',
    personalName: 'Rebecca',
    familyName: 'Moulton'
  },
  {
    id: 0,
    dateOfBirth: '1990-09-25',
    personalName: 'Sarah',
    familyName: 'Hunt'
  },
  {
    id: 0,
    dateOfBirth: '1990-09-25',
    personalName: 'Ian',
    familyName: 'Griffith'
  },
  {
    id: 0,
    dateOfBirth: '1990-09-25',
    personalName: 'Jeremy',
    familyName: 'Sparks'
  },
  {
    id: 0,
    dateOfBirth: '1990-09-25',
    personalName: 'Caroline',
    familyName: 'Prozesky'
  },
  {
    id: 0,
    dateOfBirth: '1990-09-25',
    personalName: 'Georgia',
    familyName: 'Van Etten'
  },
  {
    id: 0,
    dateOfBirth: '1990-09-25',
    personalName: 'Joel',
    familyName: 'Humann'
  },
  {
    id: 0,
    dateOfBirth: '1990-09-25',
    personalName: 'Karla',
    familyName: 'Polk'
  }
];

function replaceDayStartEnd(day: string, startTime: string, endTime: string) {
  return { ...availabilityTemplate, day, startTime, endTime };
}

function replaceKnowledgeDomainInclusions(knowledgeDomainNames: string[]) {
  return {
    ...suitabilityTemplate,
    workTaskTypeMatrix: {
      ...suitabilityTemplate.workTaskTypeMatrix,
      knowledgeDomainList: knowledgeDomainNames.map((name) => ({
        name,
        id: -1
      }))
    }
  };
}

export const allProviders = [
  {
    baseEntity: names[0],
    suitabilities: [replaceKnowledgeDomainInclusions(['Classical Piano'])],
    availabilities: [
      replaceDayStartEnd('TUESDAY', '10:00', '12:00'),
      replaceDayStartEnd('THURSDAY', '10:00', '12:00')
    ]
  },
  {
    baseEntity: names[1],
    suitabilities: [replaceKnowledgeDomainInclusions(['Piano'])],
    availabilities: [replaceDayStartEnd('WEDNESDAY', '17:00', '20:00')]
  },
  {
    baseEntity: names[2],
    suitabilities: [replaceKnowledgeDomainInclusions(['Classical Voice'])],
    availabilities: [
      replaceDayStartEnd('TUESDAY', '10:00', '16:00'),
      replaceDayStartEnd('THURSDAY', '14:00', '20:00')
    ]
  },
  {
    baseEntity: names[3],
    suitabilities: [replaceKnowledgeDomainInclusions(['Production'])],
    availabilities: [
      replaceDayStartEnd('TUESDAY', '9:00', '17:00'),
      replaceDayStartEnd('MONDAY', '12:00', '17:00'),
      replaceDayStartEnd('WEDNESDAY', '12:00', '17:00'),
      replaceDayStartEnd('THURSDAY', '12:00', '17:00')
    ]
  },
  {
    baseEntity: names[4],
    suitabilities: [
      replaceKnowledgeDomainInclusions(['Drum Kit', 'Production'])
    ],
    availabilities: [
      replaceDayStartEnd('WEDNESDAY', '10:00', '20:00'),
      replaceDayStartEnd('THURSDAY', '10:00', '20:00')
    ]
  },
  {
    baseEntity: names[5],
    suitabilities: [replaceKnowledgeDomainInclusions(['Guitar'])],
    availabilities: [
      replaceDayStartEnd('MONDAY', '14:15', '15:15'),
      replaceDayStartEnd('THURSDAY', '10:00', '12:00')
    ]
  },
  {
    baseEntity: names[6],
    suitabilities: [replaceKnowledgeDomainInclusions(['French Horn'])],
    availabilities: [replaceDayStartEnd('WEDNESDAY', '11:00', '13:00')]
  },
  {
    baseEntity: names[7],
    suitabilities: [replaceKnowledgeDomainInclusions(['Jazz/Pop Voice'])],
    availabilities: [
      replaceDayStartEnd('TUESDAY', '10:00', '12:00'),
      replaceDayStartEnd('THURSDAY', '10:00', '12:00')
    ]
  },
  {
    baseEntity: names[0],
    suitabilities: [replaceKnowledgeDomainInclusions(['Double Bass'])],
    availabilities: [
      replaceDayStartEnd('WEDNESDAY', '11:00', '12:00'),
      replaceDayStartEnd('FRIDAY', '11:00', '12:00')
    ]
  },
  {
    baseEntity: names[0],
    suitabilities: [replaceKnowledgeDomainInclusions(['DJ'])],
    availabilities: [replaceDayStartEnd('WEDNESDAY', '17:00', '20:00')]
  }
];
