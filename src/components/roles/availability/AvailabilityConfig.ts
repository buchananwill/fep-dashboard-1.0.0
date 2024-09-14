import { Api } from '@/api/clientApi_';
import { EntityClassMap } from '@/api/entity-class-map';
import { AvailabilityType } from '@/components/roles/availability/AvailabilityType';
import { ProviderCell } from '@/components/grids/ProviderCell';
import { GenericIdReferenceCell } from '@/components/tables/getCellIdReference';
import { AssetCell } from '@/components/grids/AssetCell';

export const availabilityConfig: {
  [Property in AvailabilityType]: {
    update: (items: any[]) => Promise<any>;
    entityClass: 'AssetRoleAvailability' | 'ProviderRoleAvailability';
    roleCell: GenericIdReferenceCell;
    // | 'UserRoleAvailability';
  };
} = {
  provider: {
    update: Api.ProviderRoleAvailability.putList,
    entityClass: EntityClassMap.providerRoleAvailability,
    roleCell: ProviderCell
  },
  asset: {
    update: Api.AssetRoleAvailability.putList,
    entityClass: EntityClassMap.assetRoleAvailability,
    roleCell: AssetCell
  }
  // user: {
  //   update: async () => {},
  //   entityClass: `${EntityClassMap.userRole}Availability`
  // }
};
