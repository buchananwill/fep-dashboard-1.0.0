import data from '@/utils/init-json-data/resources/asset-role-summaries.json';
import { DayOfWeekArray } from '@/api/date-and-time';
import { snakeToCamelKey } from '@/app/test/provider-roles/snakeToCamelKey';
import { AssetDto } from '@/api/generated-types/generated-types';

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
    roleTypeName: 'Class Room',
    startTime: '08:00:00',
    endTime: '18:00:00',
    availabilityCode: 'TRUE'
  })
);

export const camelData = data.map((item) => snakeToCamelKey(item));

const nameMapSuitabilities = new Map<string, SuitabilitySummary[]>();
const nameMapAssets = new Map<string, Partial<AssetDto>>();

camelData.forEach((item) => {
  const fullName = item.name;
  let summaryList = nameMapSuitabilities.get(fullName);
  let assetDto = nameMapAssets.get(fullName);
  if (summaryList === undefined || assetDto === undefined) {
    summaryList = [];
    nameMapSuitabilities.set(fullName, summaryList);
    nameMapAssets.set(fullName, {
      name: item.name,
      type: { name: item.assetTypeName, isMoveable: item.isMoveable, id: NaN }
    });
  }
  const {
    assetRoleTypeName,
    taskTypeName,
    knowledgeDomainName,
    knowledgeLevelName,
    rating
  } = item;
  summaryList.push({
    roleTypeName: assetRoleTypeName,
    taskTypeName,
    knowledgeDomainName,
    knowledgeLevelName,
    rating
  });
});

export const nestedData = [...nameMapSuitabilities.entries()].map(
  ([key, value]) => {
    return {
      baseEntity: nameMapAssets.get(key) as AssetDto,
      suitabilities: value,
      availabilities: allDayEveryDay
    };
  }
);
