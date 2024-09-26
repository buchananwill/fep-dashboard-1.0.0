interface CycleInitDto {
  startDay: DayOfWeek;
  durationInWeeks: number;
  startOfDay: TimeRule;
  endOfDay: TimeRule;
  omitDays: number[];
  cycleSubspanDuration: number;
  breaks: Record<number, Break[]>;
  groupSizes: number[];
}

interface Break {
  startTime: string;
  endTime: string;
}

interface TimeRule {
  defaultTime: string;
  exceptions?: Record<number, string>;
}

type DayOfWeek = 'MONDAY'; // TODO ...complete

const csvpaTimetable: CycleInitDto = {
  startDay: 'MONDAY',
  durationInWeeks: 1,
  omitDays: [5, 6],
  startOfDay: {
    defaultTime: '09:00'
  },
  endOfDay: {
    defaultTime: '20:00:00'
  },
  cycleSubspanDuration: 15,
  breaks: {
    '0': [
      {
        startTime: '13:00:00',
        endTime: '13:45'
      }
    ],
    '1': [
      {
        startTime: '12:00:00',
        endTime: '12:45'
      }
    ],
    '2': [
      {
        startTime: '11:00:00',
        endTime: '11:45'
      }
    ],
    '3': [
      {
        startTime: '12:00:00',
        endTime: '12:45'
      }
    ],
    '4': [
      {
        startTime: '12:00:00',
        endTime: '12:45'
      }
    ]
  },
  groupSizes: [2, 4, 6, 8]
};
