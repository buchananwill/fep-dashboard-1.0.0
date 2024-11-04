import { nestedData as v1NestedData } from './data';
import {
  AvailabilitySummary,
  SuitabilitySummary
} from '@/app/test/provider-roles/data';
import { AssetDto } from '@/api/generated-types/generated-types';

type RolePostRequestStringMap = {
  baseEntity: Partial<AssetDto>;
  roleDataMap: Record<
    string,
    {
      suitabilities: SuitabilitySummary[];
      availabilities: AvailabilitySummary[];
    }
  >;
};

export const nestedData = v1NestedData.map((withoutMap) => {
  const { baseEntity, suitabilities, availabilities } = withoutMap;

  const roleDataMap = {} as RolePostRequestStringMap['roleDataMap'];

  suitabilities.forEach((suitability) => {
    let mapValue = roleDataMap[suitability.roleTypeName];
    if (mapValue === undefined) {
      mapValue = {} as RolePostRequestStringMap['roleDataMap'][string];
      mapValue.suitabilities = [];
      mapValue.availabilities = [];
      roleDataMap[suitability.roleTypeName] = mapValue;
    }
    mapValue.suitabilities.push(suitability);
  });
  availabilities.forEach((availability) => {
    let mapValue = roleDataMap[availability.roleTypeName];
    if (mapValue === undefined) {
      mapValue = {} as RolePostRequestStringMap['roleDataMap'][string];
      mapValue.suitabilities = [];
      mapValue.availabilities = [];
      roleDataMap[availability.roleTypeName] = mapValue;
    }
    mapValue.availabilities.push(availability);
  });
  return { baseEntity, roleDataMap } as RolePostRequestStringMap;
});
