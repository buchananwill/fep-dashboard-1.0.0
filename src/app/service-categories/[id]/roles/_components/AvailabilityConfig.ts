import { Api } from '@/api/clientApi_';
import { EntityClassMap } from '@/api/entity-class-map';
import { AvailabilityType } from '@/app/service-categories/[id]/roles/_components/AvailabilityType';
import { ProviderCell } from '@/app/service-categories/[id]/roles/_components/ProviderCell';
import { GenericIdReferenceCell } from '@/components/tables/getCellIdReference';
import { AssetCell } from '@/app/service-categories/[id]/roles/_components/AssetCell';

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
