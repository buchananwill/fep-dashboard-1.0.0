import data from '@/utils/init-json-data/resources/provider-role-summaries.json';
import { DayOfWeekArray } from '@/api/date-and-time';
import { snakeToCamelKey } from '@/app/test/provider-roles/snakeToCamelKey';

export type SuitabilitySummary = {
  roleTypeName: string;
  taskTypeName: string;
  knowledgeDomainName: string;
  knowledgeLevelName: string;
  rating: number;
};

export type AvailabilitySummary = {
  roleTypeName: string;
  day: string;
  startTime: string;
  endTime: string;
  availabilityCode: string;
};

const allDayEveryDay = DayOfWeekArray.map((item) => item.toUpperCase()).map(
  (item) => ({
    day: item,
    roleTypeName: 'Teacher',
    startTime: '08:00:00',
    endTime: '18:00:00',
    availabilityCode: 'TRUE'
  })
);

export const camelData = data.map((item) => snakeToCamelKey(item));

const fullNameMap = new Map<string, SuitabilitySummary[]>();

camelData.forEach((item) => {
  const fullName = `${item.firstName}_${item.lastName}`;
  let summaryList = fullNameMap.get(fullName);
  if (summaryList === undefined) {
    summaryList = [];
    fullNameMap.set(fullName, summaryList);
  }
  const {
    providerRoleTypeName,
    taskTypeName,
    knowledgeDomainName,
    knowledgeLevelName,
    rating
  } = item;
  summaryList.push({
    roleTypeName: providerRoleTypeName,
    taskTypeName,
    knowledgeDomainName,
    knowledgeLevelName,
    rating
  });
});

export const nestedData = [...fullNameMap.entries()].map(([key, value]) => {
  const strings = key.split('_');
  const firstName = strings[0];
  const lastName = strings[1];
  return {
    baseEntity: { firstName, lastName },
    suitabilitySummaries: value,
    availabilitySummaries: allDayEveryDay
  };
});
