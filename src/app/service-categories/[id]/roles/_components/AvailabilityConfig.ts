import { Api } from '@/api/clientApi_';
import { EntityClassMap } from '@/api/entity-class-map';
import { AvailabilityType } from '@/app/service-categories/[id]/roles/_components/AvailabilityType';

export const availabilityConfig: {
  [Property in AvailabilityType]: {
    update: (items: any[]) => Promise<any>;
    entityClass: 'AssetRoleAvailability' | 'ProviderRoleAvailability';
    // | 'UserRoleAvailability';
  };
} = {
  provider: {
    update: Api.ProviderRoleAvailability.putList,
    entityClass: EntityClassMap.providerRoleAvailability
  },
  asset: {
    update: Api.AssetRoleAvailability.putList,
    entityClass: EntityClassMap.assetRoleAvailability
  }
  // user: {
  //   update: async () => {},
  //   entityClass: `${EntityClassMap.userRole}Availability`
  // }
};
