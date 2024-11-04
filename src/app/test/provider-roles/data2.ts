import data from '@/utils/init-json-data/resources/provider-role-summaries-2.json';
import { PersonDto } from '@/api/generated-types/generated-types';
import {
  AvailabilitySummary,
  SuitabilitySummary
} from '@/app/test/provider-roles/data';

type RolePostRequestStringMap = {
  baseEntity: Partial<PersonDto>;
  roleDataMap: Record<
    string,
    {
      suitabilities: SuitabilitySummary[];
      availabilities: AvailabilitySummary[];
    }
  >;
};

export const nestedData = data.map((withoutMap) => {
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
